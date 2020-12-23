// ak-bg-anim.js
// This file is designed to accompany the ak-bg-anim.css stylesheet and provide several critical functions
// Alex Knipper

function addAKBgAnimEvents() {
    // Add the '' event to the <>
}

function selectAnimFromDate() {
    // Get the current system date
    //date = //hi
}

function startAnimCycle(animName) {
    // Get the animation element
    let animElem = document.getElementById('ak-bg-anim');
    // Select parameters based on the animation name
    switch (animName) {
        case 'starfall':
            animElem.className = 'starfall';
            spawnAnimElements(12, 2.5, '<i class="fas fa-star"></i>' , {"color":['lightpink', 'lightyellow', 'lightgreen', 'lightcyan', 'lavender'], "size":[1,2.7], "fall-time":[12,30], "spin-time":[2.5,6], "delay":[0,10], "units":['', 'em', 's', 's', 's']})
            break;
        case 'reverse starfall':
            animElem.className = 'reverse starfall';
            spawnAnimElements(12, 2.5, '<i class="fas fa-star"></i>' , {"color":['lightpink', 'lightyellow', 'lightgreen', 'lightcyan', 'lavender'], "size":[1,2.7], "fall-time":[12,30], "spin-time":[2.5,6], "delay":[0,10], "units":['', 'em', 's', 's', 's']})
            break;
        case 'magic':
            break;
        case 'snow':
            break;
        default:
            break;
    }
}

function spawnAnimElements(number, offset, content, features) {
    // For as many elements as are needed, spawn them with a random position offset, with the values specified in the arrays
    let animElem = document.getElementById('ak-bg-anim');
    for (let i=0; i<number; i++) {
        // Spawn the span
        let elem = document.createElement('span');
        // For every feature, generate a unique value and add it to the element
        for (let j=0; j<Object.keys(features).length-1; j++) {
            let feature = Object.keys(features)[j];
            let featureString;
            if (typeof features[feature][0] == 'string') {
                featureString = features[feature][Math.floor(Math.random() * features[feature].length)];
            } else if (typeof features[feature][0] == 'number') {
                featureString = ((Math.random() * (features[feature][1] - features[feature][0])) + features[feature][0]).toFixed(1) + features['units'][j];
            }
            elem.style.setProperty(('--' + feature), featureString);
        }
        // Add the content to the span
        elem.innerHTML = content;
        // Set the span's positioning
        elem.style.setProperty('--position', ((Math.random() * offset) + (100/(number)*(i))).toFixed(1) + '%');
        // Add the span to the animation element
        animElem.appendChild(elem);
    }
}