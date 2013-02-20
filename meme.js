var ZenIRCBot = require('zenircbot-api').ZenIRCBot;
var zen = new ZenIRCBot();
var sub = zen.get_redis_client();
var http = require('http');

var DEBUG = false;
var debugLog = function(msg) {
    if (DEBUG) {
        console.log(msg);
    }
};

// TODO: A test harness for detectors using their supplied testStrings.

zen.register_commands('meme.js', [{
    name: '!meme',
    description: 'Generates a meme with the given text. It will split on "." and put the first ' +
        'half on top, second on bottom. You can override the default image by putting an image url in [] ' +
        'after the message. The default image is the aliens guy.'
}]);

var getMeme = function(msg, channel, explicit) {
    var t1 = false, t2 = false, img = false;
    var message = msg;
    var defaultImg = 'http://memecaptain.com/aliens.jpg';

    debugLog('getMeme called: msg: "' + msg + '" channel: ' + channel + ' explicit: ' + explicit);

    var detectors = [
        {
            regex: /(^I don't always .+) (but when I do,? .+$)/i,
            img: 'http://memecaptain.com/most_interesting.jpg',
            testString: "I don't always test my code, but when I do, I do it in production."
        },
        {
            regex: /([^ ]+ all the .*s)()/i,
            img: 'http://memecaptain.com/all_the_things.jpg',
            testString: "Refactor all the things!"
        },
        {
            regex: /(^one does not simply) (.+$)/i,
            img: 'http://memecaptain.com/boromir.jpg',
            testString: "One does not simply meme in IRC."
        },
        {
            regex: /(^not sure if .+) (or .+$)/i,
            img: 'http://memecaptain.com/fry.jpg',
            testString: "Not sure if this is working, or is awesome."
        },
        {
            regex: /(^yo,? (?:dawg|dog)[\.,]* I hea?rd (?:you|u) like .+) (so (?:i|we) .+$)/i,
            img: 'http://memecaptain.com/xzibit.jpg',
            testString: "Yo dawg I herd you like regex. so we put a regex in yo regex so you can match while you match."
        },
        {
            regex: /(^the .+) (is too (?:damn )?high[!\.]?$)/i,
            img: 'http://memecaptain.com/too_damn_high.jpg',
            testString: "The amount of memes in this channel is too damn high!"
        },
        {
            regex: /(^(?:brace yourselves,? )?)(.+ (?:is|are) coming[!\.]?$)/i,
            img: 'http://memecaptain.com/ned_stark.jpg',
            testString: "Brace yourselves the memes are coming."
        },
        {
            regex: /(^what if) (.+[\?!]+$)/i,
            img: 'http://memecaptain.com/conspiracy_keanu.jpg',
            testString: "What if space nachos?!"
        },
        {
            regex: /(^.+) (and you should feel bad\.?$)/i,
            img: 'http://memecaptain.com/you_should_feel_bad.jpg',
            testString: "This meme is bad; and you should feel bad."
        },
        {
            regex: /(^.+) (y u no .+$)/i,
            img: 'http://memecaptain.com/y_u_no.jpg',
            testString: "IRC y u no do memes yourself?"
        },
        {
            regex: /(^am i the only one around here) (.+$)/i,
            img: 'http://memecaptain.com/walter.jpg',
            testString: "Am I the only one around here who gives a shit about the rules?!"
        },
        {
            regex: /(^.+) (so hot right now[\.!]*$)/i,
            img: 'http://cdn.buzznet.com/assets/users16/rich/default/mugatu--large-msg-124777042649.jpg',
            testString: "Memes, so hot right now."
        },
        {
            regex: /(^ermahgerd[!\.]*) (.+$)/i,
            img: 'http://i.imgur.com/KGaxT49.jpg',
            testString: "ermahgerd! Space nachos!"
        },
        {
            regex: /(^.+) (is strong with this one[!\.]*$)/i,
            img: 'http://twimg0-a.akamaihd.net/profile_images/1244937644/02emperor350.jpg',
            testString: "The force is strong with this one."
        },
        {
            regex: /(^this is) (.+!$)/i,
            img: 'http://itechnow.com/wp-content/uploads/2013/01/This-is-Sparta-.jpg',
            testString: "This is IRC!"
        },
        {   regex: /(^.+,?) (ain'?t nobody got time for? that|dat[!\.]*)$/i,
            img: 'http://i.imgur.com/hDxoEB8.jpg',
            testString: "Bronchitis, ain't nobody got time for that!"
        },
        {
            regex: /(.+ over )([0-9]+)([\.!]*)$/i,
            img: 'http://cache.ohinternet.com/images/thumb/1/1e/Over_9000_Vector_by_Vernacular.jpg/618px-Over_9000_Vector_by_Vernacular.jpg',
            testString: "Something over 5", // TODO: Get a valid testString for this one (I'm unfamiliar)
            postProc: function(match) {
                if (parseInt(match[2]) < 1000) {
                    match[2] *= 1000;
                }
                message = match[1] + match[2] + match[3];
                t1 = false;
                t2 = false;
            }
        }
    ];

    if (explicit && (match=message.match(/(.+) \[?(https?:\/\/[^\]]+)\]?$/))) {
        debugLog('explicit message detected, skipping detectors.');
        message = match[1];
        img = match[2];
    } else {
        for (var d in detectors) {
            var detector = detectors[d];
            debugLog('checking detector: ' + detector.testString);
            var match = detector.regex.exec(message);
            if (match) {
                debugLog('matched');
                t1 = match[1];
                t2 = match[2];
                img = detector.img;
                debugger;
                if (detector.postProc) {
                    debugLog('Running postProc, t1: "' + t1 + '" t2: "' + t2 + '" img: ' + img);
                    detector.postProc(match);
                }
                break;
            }
        }

        // No detectors matched, if this is an explicit call, set img to the default
        if (explicit) {
            debugLog('No meme auto detected, using default img: ' + defaultImg);
            img = defaultImg;
        }
    }
    debugLog('img: ' + img);
    debugLog('t1: ' + t1);
    debugLog('t2: ' + t2);

    if (img == false) {
        debugLog('bailing due to no memes matched in an implicit call');
        // Only make a meme if the image is set.
        // This function is called for all IRC messages. If explicit=true,
        // then img will be set to the default meme. This is only the case when
        // called explicitly from the !meme command. Otherwise, it is called
        // with explicit=false and we should not say a meme unless one of the
        // patterns match.
        return;
    }

    // messageRegex splits the text based on ., ..., or |
    var messageRegex = /(.+[\.+|\|]) ?(.*)/;
    // split the message into top/bottom only if t1 and t2 are both unset
    if (!t1 && !t2) {
        if (messageRegex.test(message)) {
        var match = messageRegex.exec(message);
        t1 = match[1].replace('|', '');
        t2 = match[2];
        } else {
            t1 = '';
            t2 = message;
        }
    }

    console.log('sending request t1='+t1+' t2='+t2+' img='+img);
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
    }).on('error', function(e) {
        // TODO: send this to zenircbot's admin spam, if possible.
        console.log('got error sending request: ' + e.message);
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
        } else if (msg.type === 'topic') {
            getMeme(msg.data.topic, msg.data.channel, true);
        }
    }
});
