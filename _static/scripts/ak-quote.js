// ak-quote.js
// This file is designed to accompany the ak-quote.css stylesheet and provide several critical functions
// Alex Knipper

var quotes = [
    [
        "If we give up before we try, then nothing is going to happen.",
        "Eli Ayase"
    ],
    [
        "I'm saying that practically nobody feels that they're talented. That's what makes us strive to improve. As we strive to improve, we notice the people around us improving too, which makes us work even harder. I guess you could say friends are like rivals, in a way.",
        "Eli Ayase"
    ],
    [
        "Why don't you give it a try? You don't need to come up with a reason, you try things because you want to. Isn't that how you start doing things that you really like?",
        "Nozomi Tojo"
    ],
    [
        "No one tries to make a miracle happen from the start. They just try as hard as they possibly can to do something. They want to make it work. They want to change something.",
        "Chika Takami"
    ],
    [
        "I wanted to be captivated by something. I wanted to do my best in something. I wanted to run forward in earnest. But I didn't know what that something was. The indifferent me was blown upwards and I landed upon it.",
        "Chika Takami"
    ],
    [
        "Nothing will get done if you just complain about it.",
        "Riko Sakurauchi"
    ],
    [
        "You should care more about your own feelings. Lying to yourself and doing what other people want you to do will just hurt you.",
        "Hanamaru Kunikida"
    ],
    [
        "If you've got passion, you can do anything.",
        "Dia Kurosawa"
    ],
    [
        "In this world we inhabit... who can truly be said to live a life free of all woes? Those with a mind and with knowledge will certainly be troubled by all manner of things.",
        "Madame Ping"
    ],
    [
        "If I can't make the journey in one giant leap, I'll just have to settle for taking it one small step at a time.",
        "Sangonomiya Kokomi"
    ],
    [
        "Life isn’t just doing things for yourself. It’s possible to live in such a way that other people’s happiness makes you happy too.",
        "Asuna Yuuki"
    ],
    [
        "It's impossible to work hard for something you don't enjoy.",
        "Keiko Ayano"
    ],
    [
        "The world is not cut from the same cloth. It’s because it is overflowing with inexplicable, unidentifiable things that the world is so beautiful.",
        "Satsuki Kiryuin"
    ],
    [
        "We’ve all lost something, and I’ve seen what loss can do to people. But if we gave up every time we lost, then we’d never be able to move forward.",
        "Ruby Rose"
    ],
    [
        "Emotions can grant you strength, but you must never let them overpower you.",
        "Winter Schnee"
    ],
    [
        "As you live you lose reasons and hope. But as you keep on going, you pick up new reasons and hope.",
        "Asta"
    ],
    [
        "Being weak is nothing to be ashamed of… Staying weak is!",
        "Fuegoleon Vermillion"
    ],
    [
        "When you convince yourself you can’t do anymore, you’re finished. Even though you may still have some strength left that you’re just unaware of.",
        "Yomikawa Aiho"
    ],
    [
        "If you can just nurture the strength to stick to your convictions, the results you seek are sure to follow in time.",
        "Shirai Kuroko"
    ],
    [
        "The difference between the novice and the master is that the master has failed more times than the novice has tried.",
        "Ryushi Korogane"
    ],
    [
        "Broadly speaking, there are two reasons a person feels the desire to teach something: Either he wants to pass on his successes or he wants to pass on his failures.",
        "Ryushi Korogane"
    ],
    [
        "The past you’ve lost will never come back. I myself have made so many mistakes… But we can learn from the past so we don’t repeat it.",
        "Ryushi Korogane"
    ],
    [
        "Honestly, there isn’t much meaning to the splendid names given to you by your parents. What does have meaning is what the person behind that name does during their actual lifetime. The name doesn’t make the person. The name simply remains gently within the footprint left on the path a person walks.",
        "Ryushi Korogane"
    ],
    [
        "Even if we forget the faces of our friends, We will never forget the bonds that were carved into our souls.",
        "Yuzuru Otonashi"
    ],
    [
        "If there’s something you’re displeased with, fight! Become able to say no clearly to things you dislike, for the sake of protecting yourself.",
        "Fran"
    ],
    [
        "You don't get the things you dream of, you get the things you work for.",
        "Ursula Callistis"
    ],
    [
        "Don’t act because something is interesting, act because you want to find something more interesting.",
        "Junichirou Kagami"
    ],
    [
        "Live by your own rules. And have reality accept your own rules. If you are able to do that, the future is all yours.",
        "Junichirou Kagami"
    ],
    [
        "No matter how hard you’ve agonized over your path, you’ll always regret something about it later.",
        "Glenn Radars"
    ],
    [
        "The ones who accomplish true greatness are the fools who keep pressing onward. The ones who accomplish nothing are the wise who know when to quit.",
        "Celica Arfonia"
    ],
    [
        "Do the thing and win the stuff.",
        "Alex Knipper"
    ],
    [
        "We simply cannot see the world as it is. The world people see is nothing more than how our brains translate it. In other words, it’s subjective.",
        "Alis Color"
    ],
    [
        "There are some people who are rich and stay in beautiful places but are still unhappy. There are some people who are poor, but happy. In the end, happiness or sadness, only the person can determine.",
        "Alicia Florence"
    ],
    [
        "Choosing your calling based solely on your talents won’t always guarantee you happiness.",
        "Kaminski Natalia"
    ],
    [
        "Even a child that receives one bit of praise has the ability to excel in a single talent, and those who receive regular encouragement can feel confidence, achieve success, and become leading members of society. Because they don’t believe they are worthless, they don’t need to raise a fist and have vengeance against fate or the world at large.",
        "Lunge"
    ],
    [
        "People who neglect to make efforts or who don’t take any actions at all are always the ones who dream that someday they will suddenly become wildly successful.",
        "Misaki Nakahara"
    ],
    [
        "No one's going to believe just a bunch of words. You've got to take responsibility for your actions.",
        "Shinka Nibutani"
    ]
]

function getQuoteOfTheDay() {
    // Start by getting the QotD box & the date
    let QotD = document.getElementById("ak-quote");
    let date = new Date();

    // Now, convert the day, month, and year to integers
    let convertedDate = [
        parseInt(date.getMonth()) + 1,
        parseInt(date.getDate()),
        parseInt(date.getFullYear())
    ];

    // Using the day, month, and year gathered, run them through a hashing function to get the quote index
    let seed = xmur3(date.toDateString());
    let rng = mulberry32(seed());
    let hashedDate = [
        Math.ceil(convertedDate[0] / (1/rng())),
        convertedDate[1],
        Math.floor(convertedDate[2] * (rng()))
    ];
    let index = (hashedDate[0] + hashedDate[1] + hashedDate[2]) % quotes.length;

    // Using the generated index, insert the quote into the element
    let quoteCode = "<h1>Quote of the Day</h1><p>\"";
    quoteCode += quotes[index][0];
    quoteCode += "\"<br/>- ";
    quoteCode += quotes[index][1];
    if (quotes[index][2]) {
        quoteCode += "<br/>";
        quoteCode += quotes[index][2];
    }
    quoteCode += "</p>";
    
    // Add the quote code to the element's HTML
    QotD.innerHTML = quoteCode;
}

// Pseudo-random seed generator
function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

// Pseudo-random number generator
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}