var ZenIRCBot = require('zenircbot-api').ZenIRCBot;
var zen = new ZenIRCBot();
var sub = zen.get_redis_client();
var request = require('request');
var querystring = require('querystring');
var config = require('./config.js');

var DEBUG = config.debug;
var debugLog = function(msg) {
    if (DEBUG) {
        console.log(msg);
    }
};

// TODO: A test harness for detectors using their supplied testStrings.

var throttled = false;

function throttle() {
  throttled = true;
  setTimeout(function() {
    throttled = false;
  }, config.throttleSeconds * 1000);
}

zen.register_commands('meme.js', [{
    name: '!meme',
    description: 'Generates a meme with the given text. It will split on "." and put the first ' +
        'half on top, second on bottom. You can override the default image by putting an image url in [] ' +
        'after the message. The default image is the aliens guy.'
}]);

function imageSearch(query, callback) {
  query = querystring.stringify(query);
  debugLog('[image search] '+query);
  request('http://ajax.googleapis.com/ajax/services/search/images?'+query, function(error, response, body){
    callback(JSON.parse(body));
  });
}

function findSingleImage(search, callback) {
  var params = {
    v: '1.0',
    rsz: '8',
    q: search,
    safe: 'active'
  };

  imageSearch(params, function(data){
    var images = data.responseData.results;
    if(images.length > 0) {
      images.sort(function() {return 0.5 - Math.random()});
      var image = images[0];
      callback(image.unescapedUrl);
    }
  });
}

var sendMeme = function(channel, img, message, t1, t2) {
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
    // This list of test strings should all end up in their corresponding place:
    // top... bottom.
    // top... bottom
    // top... | bottom.
    // top... | bottom
    // top. bottom
    // top. bottom.
    // top. | bottom
    // top. | bottom.
    // top top.
    // top | bottom
    // top | bottom.
    // top | bottom...
    // |bottom
    // TODO: automate the testing of the above =P
    var messageRegex = /^([^\.\|]+(?:\.*|$))?\ ?\|? ?(.*$)/i;
    // split the message into top/bottom only if t1 and t2 are both unset
    if (!t1 && !t2) {
        if (messageRegex.test(message)) {
            var match = messageRegex.exec(message);
            t1 = match[1] || '';
            t2 = match[2] || '';

            if (t1 && !t2 && config.default_pos != 'top') {
                t1 = '';
                t2 = match[1];
            }
        }
    }

    var url = config.api_url+'/g?u=' + encodeURI(img) + '&t1=' + encodeURI(t1) + '&t2=' + encodeURI(t2);
    console.log('sending request t1='+t1+' t2='+t2+' img='+img);
    console.log(url);
    request(url, function(error, response, body){
        try {
            var meme = JSON.parse(body);
            zen.send_privmsg(channel, meme.imageUrl);
        } catch (error) {
            console.log("Unable to parse json from response:", response);
            if(meme.error) {
                zen.send_privmsg(channel, "Uhoh! "+meme.error)
            } else if(meme.imageUrl) {
                zen.send_privmsg(channel, meme.imageUrl);
            } else {
                zen.send_privmsg(channel, "Something went wrong!");
            }
        }
    });
};

var getMeme = function(msg, channel, explicit) {
    var t1 = false, t2 = false, img = false;
    var message = msg;

    debugLog('getMeme called: msg: "' + msg + '" channel: ' + channel + ' explicit: ' + explicit);

    if (explicit && ((match=message.match(/(.+) \[?(https?:\/\/[^\]]+)\]?$/)) || (match=message.match(/(.+) \[([^\]]+)\]$/)))) {
        debugLog('explicit message detected, skipping detectors.');
        message = match[1];
        img = match[2];
        if(!img.match(/^http/)) {
            // Find an image and use that!
            findSingleImage(img, function(imageUrl){
                sendMeme(channel, imageUrl, message, t1, t2);
            });
            return;
        }
    } else {
        for (var d in config.detectors) {
            var detector = config.detectors[d];
            debugLog('checking detector: ' + detector.testString);
            var match = detector.regex.exec(message);
            if (match) {
                debugLog('matched');
                t1 = match[1] || '';
                t2 = match[2] || '';
                img = detector.img;
                if (detector.postProc) {
                    debugLog('Running postProc, t1: "' + t1 + '" t2: "' + t2 + '" img: ' + img);
                    detector.postProc(match);
                }
                break;
            }
        }

        // No detectors matched, if this is an explicit call, set img to the default
        if (!img && explicit) {
            debugLog('No meme auto detected, using default img: ' + config.default_image);
            img = config.default_image;
        }
    }
    debugger;

    sendMeme(channel, img, message, t1, t2);
};

sub.subscribe('in');
sub.on('message', function( channel, message ) {
    var msg = JSON.parse(message);
    if (throttled) {
      return;
    }
    if (msg.version == 1) {
        if (msg.type == 'privmsg') {
            if (/^!meme /i.test(msg.data.message)) {
                getMeme(msg.data.message.substring(6, msg.data.message.length), msg.data.channel, true);
                throttle();
            } else {
                getMeme(msg.data.message, msg.data.channel, false);
                throttle();
            }
        } else if (msg.type === 'topic') {
            getMeme(msg.data.topic, msg.data.channel, true);
        }
    }
});
