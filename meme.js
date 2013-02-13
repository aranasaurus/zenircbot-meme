var ZenIRCBot = require('zenircbot-api').ZenIRCBot;
var zen = new ZenIRCBot();
var sub = zen.get_redis_client();
var http = require('http');

zen.register_commands('meme.js', [{
    name: '!meme',
    description: 'Generates a meme with the given text. It will split on "." and put the first ' +
        'half on top, second on bottom. You can override the default image by putting an image url in [] ' +
        'after the message. The default image is the aliens guy.'
}]);

var getMeme = function(msg, channel, use_default) {
    var t1, t2, url;
    var img = false;
    var message = msg;

    // grab the image url (or figure it out)
    if (match=message.match(/(.+) \[?(http:\/\/[^\]]+)$/)) {
        message = match[1];
        img = match[2];
    } else if (message.match(/^i don't always.*/i)) {
        img = 'http://memecaptain.com/most_interesting.jpg';
    } else if (match=message.match(/([^ ]+ all the .*s)[!\.]?$/i)) {
        message = match[1];
        img = 'http://memecaptain.com/all_the_things.jpg';
    } else if (message.match(/^one does not simply .+$/i)) {
        img = 'http://memecaptain.com/boromir.jpg';
    } else if (message.match(/^not sure if .+ or .+$/i)) {
        img = 'http://memecaptain.com/fry.png';
    } else if (message.match(/^.*I hea?rd you like .+$/i)) {
        img = 'http://memecaptain.com/xzibit.jpg';
    } else if (message.match(/.+ so hot right now$/i)) {
        img = 'http://cdn.buzznet.com/assets/users16/rich/default/mugatu--large-msg-124777042649.jpg';
    } else if(use_default == true) {
        img = 'http://memecaptain.com/aliens.jpg';
    }

    if(img == false) {
        // Only make a meme if the image is set. 
        // This function is called for all IRC messages. if use_default=true,
        // then img will be set to the default meme. This is only the case when 
        // called explicitly from the !meme command. Otherwise, it is called
        // with use_default=false and we should not say a meme unless one of the
        // patterns matches.
        return;
    }

    // split the message into top/bottom
    if (message.indexOf('.') > 0) {
        var dot = message.indexOf('.');
        t1 = message.substring(0, dot+1);
        t2 = message.substring(dot+1, message.length);

        if (t2[0] === '.') {
            while (t2[0] === '.') {
                t2 = t2.substring(1, t2.length);
            }
            t1 = t1 + '..';
        }
    } else {
        t1 = '';
        t2 = message;
    }

    console.log('sending request t1='+t1+' t2='+t2+'img='+img);
    var options = {
        host: 'memecaptain.com',
        port: 80,
        path: '/g?u=' + encodeURI(img) + '&t1=' + encodeURI(t1) + '&t2=' + encodeURI(t2),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    http.get(options, function(res) {
        var memeData = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
            memeData += chunk;
        });

        res.on('end', function() {
            if (memeData) {
                var meme = JSON.parse(memeData);
                zen.send_privmsg(channel, meme.imageUrl);
            }
        });
    });
};

sub.subscribe('in');
sub.on('message', function( channel, message ) {
    var msg = JSON.parse(message);
    if (msg.version == 1) {
        if (msg.type == 'privmsg') {
            if (/^!meme /i.test(msg.data.message)) {
                getMeme(msg.data.message.substring(6, msg.data.message.length), msg.data.channel, true);
            } else {
                getMeme(msg.data.message, msg.data.channel, false);
            }
        } else if (msg.type == 'topic') {
            getMeme(msg.data.topic, msg.data.channel, true);
        }
    }
});
