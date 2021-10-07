// ak-quote.js
// This file is designed to accompany the ak-quote.css stylesheet and provide several critical functions
// Alex Knipper

var quotes = [
    [
        "Do the thing and win the stuff.",
        "Alex Knipper"
    ],
    [
        "If we give up before we try, then nothing is going to happen.",
        "Eli Ayase"
    ],
    [
        "I'm saying that practically nobody feels that they're talented. That's what makes us strive to improve. As we strive to improve, we notice the people around us improving too, which makes us work even harder. I guess you could say friends are like rivals, in a way.",
        "Eli Ayase"
    ],
    [
        "Nothing will get done if you just complain about it.",
        "Riko Sakurauchi"
    ],
    [
        "If you've got passion, you can do anything.",
        "Dia Kurosawa"
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