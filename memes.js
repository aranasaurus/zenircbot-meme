module.exports.detectors = [
    {
        regex: /(^I don't always .+) (but when I do,? .+$)/i,
        img: 'http://memecaptain.com/most_interesting.jpg',
        testString: "I don't always test my code, but when I do, I do it in production."
    },
    {
        regex: /([^ ]+ all the .*s)/i,
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
    {
        regex: /(^.+,?) (ain'?t nobody got time for? (?:th|d)at[!\.]*)$/i,
        img: 'http://i.imgur.com/hDxoEB8.jpg',
        testString: "Bronchitis, ain't nobody got time for that!"
    },
    {
        regex: /(.+) (\w+ go(?:es)? to (?:eleven|11))!?$/i,
        img: 'http://i660.photobucket.com/albums/uu328/zerosignal/goes_to_eleven.jpg',
        testString: "The memes, they go to eleven!"
    },
    {
        regex: /(.+ over )([0-9]+)([\.!]*)$/i,
        img: 'http://cache.ohinternet.com/images/thumb/1/1e/Over_9000_Vector_by_Vernacular.jpg/618px-Over_9000_Vector_by_Vernacular.jpg',
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
