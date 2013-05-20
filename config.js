module.exports.api_url = 'http://meme.loqi.me';
module.exports.default_image = 'http://meme.loqi.me/img/aliens.jpg';
module.exports.default_pos = 'bottom';
module.exports.debug = false;
module.exports.throttleSeconds = 0;
module.exports.detectors = [
    {
        regex: /(^I don't always .+) (but when I do,? .+$)/i,
        img: 'http://meme.loqi.me/img/most_interesting.jpg',
        testString: "I don't always test my code, but when I do, I do it in production."
    },
    {
        regex: /(\w+(?: \w+)?) (all the .+s(:?[!\.]+)?)/i,
        img: 'http://meme.loqi.me/img/all_the_things.jpg',
        testString: "Refactor all the things!"
    },
    {
        regex: /(^)(.+ alot[.!?]*)\s*$/i,
        img: 'http://i.imgur.com/oIwBdkb.png',
        testString: "We sure do use memes alot"
    },
    {
        regex: /(?:alot)(\s+)(.+)$/i,
        img: 'http://4.bp.blogspot.com/_D_Z-D2tzi14/S8TRIo4br3I/AAAAAAAACv4/Zh7_GcMlRKo/s400/ALOT.png',
        testString: "alot of memes"
    },
    {
        regex: /(^one does not simply) (.+$)/i,
        img: 'http://meme.loqi.me/img/boromir.jpg',
        testString: "One does not simply meme in IRC."
    },
    {
        regex: /(^not sure if [^\|]+)(?: \|)? (or .+$)/i,
        img: 'http://meme.loqi.me/img/fry.png',
        testString: "Not sure if this is working, or is awesome."
    },
    {
        regex: /(^yo,? (?:dawg|dog)[\.,]* I hea?rd (?:you|u) like .+) (so (?:i|we) .+$)?/i,
        img: 'http://meme.loqi.me/img/xzibit.jpg',
        testString: "Yo dawg I herd you like regex. so we put a regex in yo regex so you can match while you match."
    },
    {
        regex: /(^the .+) (is too (?:damn )?high[!\.]?$)/i,
        img: 'http://meme.loqi.me/img/too_damn_high.jpg',
        testString: "The amount of memes in this channel is too damn high!"
    },
    {
        regex: /(^(?:brace yourselves,? )?)(.+ (?:is|are) coming[!\.]?$)/i,
        img: 'http://meme.loqi.me/img/ned_stark.jpg',
        testString: "Brace yourselves the memes are coming."
    },
    {
        regex: /(^what if) (.+[\?!]+$)/i,
        img: 'http://meme.loqi.me/img/conspiracy_keanu.jpg',
        testString: "What if space nachos?!"
    },
    {
        regex: /(^.+) (and you should feel bad\.?$)/i,
        img: 'http://meme.loqi.me/img/you_should_feel_bad.jpg',
        testString: "This meme is bad; and you should feel bad."
    },
    {
        regex: /(^.+) (y u no .+$)/i,
        img: 'http://meme.loqi.me/img/y_u_no.jpg',
        testString: "IRC y u no do memes yourself?"
    },
    {
        regex: /(^am i the only one around here) (.+$)/i,
        img: 'http://meme.loqi.me/img/walter.jpg',
        testString: "Am I the only one around here who gives a shit about the rules?!"
    },
    {
        regex: /(^.+) (so hot right now[\.!]*$)/i,
        img: 'http://meme.loqi.me/img/mugatu.jpg',
        testString: "Memes, so hot right now."
    },
    {
        regex: /(^ermahgerd[!\.]*) (.+$)/i,
        img: 'http://meme.loqi.me/img/ermahgerd.jpg',
        testString: "ermahgerd! Space nachos!"
    },
    {
        regex: /(^.+) (is strong with this one[!\.]*$)/i,
        img: 'http://meme.loqi.me/img/emperor.jpg',
        testString: "The force is strong with this one."
    },
    {
        regex: /(^this is) (.+!$)/i,
        img: 'http://meme.loqi.me/img/sparta.jpg',
        testString: "This is IRC!"
    },
    {
        regex: /(^.+,?) (ain'?t nobody got time for? (?:th|d)at[!\.]*)$/i,
        img: 'http://meme.loqi.me/img/time_for.jpg',
        testString: "Bronchitis, ain't nobody got time for that!"
    },
    {
        regex: /(.+) (\w+ go(?:es)? to (?:eleven|11))!?$/i,
        img: 'http://meme.loqi.me/img/goes_to_eleven.jpg',
        testString: "The memes, they go to eleven!"
    },
    {
        regex: /(.+ over )([0-9]+)([\.!]*)$/i,
        img: 'http://meme.loqi.me/img/over_9000.jpg',
        testString: "His karma, it's over 9000!",
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
