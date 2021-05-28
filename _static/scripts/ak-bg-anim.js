// ak-bg-anim.js
// This file is designed to accompany the ak-bg-anim.css stylesheet and provide several critical functions
// Alex Knipper

var animations = {
    "starfall":{
        "attributes":{
            "color":[
                ["lightpink", "lightyellow", "lightgreen", "lightcyan", "lavender"]
            ],
            "size":[1,2.7],
            "fall-time":[15,35],
            "spin-time":[2.5,6],
            "delay":[0,10]
        },"units":{
            "size":"em",
            "fall-time":"s",
            "spin-time":"s",
            "delay":"s"
        }
    },
    "magic":{
        "attributes":{
            "color":{
                "default":["deeppink", "magenta", "purple", "crimson"],
                "vernal":["darkgreen", "springgreen", "mediumseagreen", "green", "pink", "palegoldenrod"],
                "summer":["aqua", "dodgerblue", "deepskyblue", "gold", "yellow"],
                "autumnal":["orangered", "orange", "red", "darkred", "goldenrod"],
                "winter":["white", "skyblue", "paleturquoise", "azure", "dodgerblue"],
                "crimson":["deeppink", "hotpink", "mediumvioletred", "red", "crimson"],
                "halloween":[
                    ["purple", "indigo", "blueviolet", "slateblue"],
                    ["lime", "springgreen", "green", "chartreuse"],
                    ["orange", "orangered", "gold", "coral"],
                    ["purple", "indigo", "blueviolet", "slateblue", "orange", "orangered", "gold", "coral"],
                    ["purple", "indigo", "blueviolet", "slateblue", "lime", "springgreen", "green", "chartreuse"]
                ]
            },
            "size":[.5,1.1],
            "sway-offset":[1,2.5],
            "fall-time":[15,35],
            "sway-time":[2.5,6],
            "spin-time":[4,8],
            "anim-dir":["normal", "reverse"]
        },"units":{
            "size":"em",
            "sway-offset":"%",
            "fall-time":"s",
            "sway-time":"s",
            "spin-time":"s"
        }
    },
    "snow":{
        "attributes":{
            "size":[1,2.5],
            "sway-offset":[1,2.5],
            "fall-time":[15,35],
            "sway-time":[2.5,6]
        },"units":{
            "size":"em",
            "sway-offset":"%",
            "fall-time":"s",
            "sway-time":"s"
        }
    }
}

var animationDates = {
    "default":"magic",
    "1/1-1/8":"snow",
    "12/1-12/24":"snow",
    "3/21":"vernal magic",
    "6/21":"summer magic",
    "9/21":"autumnal magic",
    "12/25-12/31":"winter magic",
    "2/14":"crimson magic"
}

function selectAnimFromDate() {
    // Get the current system date and year
    let date = Date.parse(new Date().toDateString("MM/DD/YYYY"));
    let year = String(new Date().getFullYear());
    // Convert all dates to splits and add the current year to each one
    let dateSplits = [];
    for (let i=0; i<Object.keys(animationDates).length; i++) {
        if (Object.keys(animationDates)[i] != "default") {
            let tempSplit = Object.keys(animationDates)[i].split("-");
            for (let j=0; j<tempSplit.length; j++) {
                tempSplit[j] += "/" + year;
            }
            dateSplits.push({"date":tempSplit,"anim":animationDates[Object.keys(animationDates)[i]]})
        }
    }
    // Iterate over all the date splits, appending all valid animations to an array
    let currentAnimations = [];
    for (let i=0; i<dateSplits.length; i++) {
        // If there is only one date in the split, check to see if today is that day. Otherwise, check to see if the date is within the date range
        if (dateSplits[i]["date"].length == 1 && Date.parse(dateSplits[i]["date"]) == date) {
            currentAnimations.push(dateSplits[i]["anim"]);
        } else if ((dateSplits[i]["date"].length > 1) && (Date.parse(dateSplits[i]["date"][0]) <= date) && (Date.parse(dateSplits[i]["date"][1]) >= date)) {
            currentAnimations.push(dateSplits[i]["anim"]);
        }
    }
    // Pick a random animation from the array, and spawn it in
    if (currentAnimations.length > 0) {
        startAnimCycle(currentAnimations[Math.floor(Math.random() * (currentAnimations.length))]);
    } else {
        startAnimCycle(animationDates["default"]);
    }
}

function startAnimCycle(animName) {
    // Get the animation element
    let animElem = document.getElementById('ak-bg-anim');
    // Select parameters based on the animation name
    animElem.className = animName;
    animSplit = animName.split(' ');
    switch (animSplit[animSplit.length-1]) {
        case 'starfall':
            spawnAnimElements(12, 2.5, '<i class="fas fa-star"></i>', animSplit, 25000);
            break;
        case 'magic':
            spawnAnimElements(25, 2.5, '🟄', animSplit, 15000);//&#128964;   &#10022;
            break;
        case 'snow':
            spawnAnimElements(25, 2.5, '', animSplit, 15000);
            break;
        default:
            break;
    }
}

function generateAnimJSON(splitName) {
    let name = splitName[splitName.length-1];
    let variant = (splitName.length > 1 && splitName[splitName.length-2] != 'reverse') ? splitName[splitName.length-2] : 'default';
    // If the animation doesn't exist, return empty JSON
    if (!animations[name]) {
        return {};
    } else {
        // Initialize the result JSON
        let result = {"attributes":{},"units":animations[name]["units"]};
        // For every feature, generate a unique instance (if there is one)
        for (let i=0; i<Object.keys(animations[name]["attributes"]).length; i++) {
            let feature = Object.keys(animations[name]["attributes"])[i];
            // If the feature has a named variant, attempt to access it
            let value;
            if (!Array.isArray(animations[name]["attributes"][feature]) && typeof(animations[name]["attributes"][feature]) == 'object') {
                // Access the named variant
                value = animations[name]["attributes"][feature][variant] ? animations[name]["attributes"][feature][variant] : animations[name]["attributes"][feature]['default'];
            } else {
                value = animations[name]["attributes"][feature];
            }
            // If the feature has multiple value sets, pick one and set it properly
            if (Array.isArray(value) && Array.isArray(value[0])) {
                // Select a value set at random, and assign that one to the feature
                result["attributes"][feature] = value[Math.floor(Math.random() * (value.length))];
            } else {
                // Otherwise, set the only value set there is
                result["attributes"][feature] = value;
            }
        }
        // Return the resulting JSON
        return result;
    }
}

function spawnAnimElements(number, offset, content, name, max_spawn_time) {
    // Generate a customized animation instance
    features = generateAnimJSON(name);
    // For as many elements as are needed, spawn them with a random position offset, with the values specified in the json
    let animElem = document.getElementById('ak-bg-anim');
    for (let i=0; i<number; i++) {
        // Spawn the span
        let elem = document.createElement('span');
        // For every feature, generate a unique value and add it to the element
        for (let j=0; j<Object.keys(features["attributes"]).length; j++) {
            let feature = Object.keys(features["attributes"])[j];
            let featureString;
            if (Array.isArray(features["attributes"][feature])) {
                if (typeof features["attributes"][feature][0] == 'string') {
                    featureString = features["attributes"][feature][Math.floor(Math.random() * features["attributes"][feature].length)];
                } else if (typeof features["attributes"][feature][0] == 'number') {
                    featureString = ((Math.random() * (features["attributes"][feature][1] - features["attributes"][feature][0])) + features["attributes"][feature][0]).toFixed(1) + features["units"][feature];
                }
            } else {
                if (typeof features["attributes"][feature] == 'string') {
                    featureString = features["attributes"][feature];
                } else if (typeof features["attributes"][feature] == 'number') {
                    featureString = features["attributes"][feature] + features["units"][feature];
                }
            }
            elem.style.setProperty(('--' + feature), featureString);
        }
        // Add the content to the span
        elem.innerHTML = content;
        // Set the span's positioning
        elem.style.setProperty('--position', ((Math.random() * offset) + (100/(number)*(i))).toFixed(1) + '%');
        // Add the span to the animation element
        setTimeout(function(){
            animElem.appendChild(elem);
        }, Math.random() * max_spawn_time);
    }
}