zenircbot-meme
==============
A zenircbot service that implements a !meme command to generate a meme img

Usage
=====
```
!meme I'm not saying it's documentation | but it's documentation [aliens guy]
```

result:

![](http://meme.loqi.me/4Vv6KRD_.jpg)

Top text is filled with message before the first '.' is encountered. Unless there is no '.', then all of the text is put on the bottom of the image.

Default image is the Aliens guy:

<img src="http://meme.loqi.me/img/aliens.jpg" height="100" width="100" />

You can override the default image by putting an image url after the message surrounded by [].

Magic detectors
===============
The meme service will also automatically detect phrases based on regular expressions defined in [config.js](config.js).

## I don't always test my code, but when I do, I do it in production.
regex: `/(^I don't always .+) (but when I do,? .+$)/i`

![](http://meme.loqi.me/img/most_interesting.jpg)

## Refactor all the things!
regex: `/(\w+(?: \w+)?) (all the .+s)[!\.]*$/i`

![](http://meme.loqi.me/img/all_the_things.jpg)

## One does not simply meme in IRC
regex: `/(^one does not simply) (.+$)/i`

![](http://meme.loqi.me/img/boromir.jpg)

## Not sure if this is working, or is awesome.
regex: `/(^not sure if [^\|]+)(?: \|)? (or .+$)/i`

![](http://meme.loqi.me/img/fry.png)

## Yo dawg I herd you like regex. so we put a regex in yo regex so you can match while you match.
regex: `/(^yo,? (?:dawg|dog)[\.,]* I hea?rd (?:you|u) like .+) (so (?:i|we) .+$)/i`

![](http://meme.loqi.me/img/xzibit.jpg)

## The amount of memes in this channel is too damn high!
regex: `/(^the .+) (is too (?:damn )?high[!\.]?$)/i`
![](http://meme.loqi.me/img/too_damn_high.jpg)

## Brace yourselves the memes are coming.
regex: `/(^(?:brace yourselves,? )?)(.+ (?:is|are) coming[!\.]?$)/i`

![](http://meme.loqi.me/img/ned_stark.jpg)

## What if space nachos?!
regex: `/(^what if) (.+[\?!]+$)/i`

![](http://meme.loqi.me/img/conspiracy_keanu.jpg)

## This meme is bad; and you should feel bad.
regex: `/(^.+) (and you should feel bad\.?$)/i`

![](http://meme.loqi.me/img/you_should_feel_bad.jpg)

## IRC y u no do memes yourself?
regex: `/(^.+) (y u no .+$)/i`

![](http://meme.loqi.me/img/y_u_no.jpg)

## Am I the only one around here who gives a shit about the rules?!
regex: `/(^am i the only one around here) (.+$)/i`

image: ![](http://meme.loqi.me/img/walter.jpg)

## Memes, so hot right now.
regex: `/(^.+) (so hot right now[\.!]*$)/i`

![](http://meme.loqi.me/img/mugatu.jpg)

## ermahgerd! Space nachos!
regex: `/(^ermahgerd[!\.]*) (.+$)/i`

![](http://meme.loqi.me/img/ermahgerd.jpg)

## The force is strong with this one.
regex: `/(^.+) (is strong with this one[!\.]*$)/i`

![](http://meme.loqi.me/img/emperor.jpg)

## This is IRC!
regex: `/(^this is) (.+!$)/i`

![](http://meme.loqi.me/img/sparta.jpg)

## Bronchitis, ain't nobody got time for that!
regex: `/(^.+,?) (ain'?t nobody got time for? (?:th|d)at[!\.]*)$/i`

![](http://meme.loqi.me/img/time_for.jpg)

## The memes, they go to eleven!
regex: `/(.+) (\w+ go(?:es)? to (?:eleven|11))!?$/i`

![](http://meme.loqi.me/img/goes_to_eleven.jpg)

## fantastic!
regex: `/^()(fantastic)!*$/i`

![](http://meme.loqi.me/img/fantastic-doctor.jpg)

## His karma, it's over 9000!
regex: `/(.+ over )([0-9]+)([\.!]*)$/i`

![](http://meme.loqi.me/img/over_9000.jpg)

Example
=======
<code>!meme I don't always test my code. But when I do, I do it in production [http://memecaptain.com/most_interesting.jpg]</code>

![](http://memecaptain.com/8eba0c.jpg)

Note
====
The service will also send topic messages to the !meme command on topic change, if your version of zenircbot supports it.
I have a fork of it on my github, which supports it, and will update here after I send a pull request to wraithan.

Also it uses http://memecaptain.com for the meme genereation. You could theoretically run that on your own server using https://github.com/mmb/meme_captain
