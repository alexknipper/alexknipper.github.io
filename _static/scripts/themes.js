function loadTheme() {
    //hi
}


function setTheme(name) {
    switch (name.toLower()) {
        case 'dark':
            document.documentElement.style.setProperty('--background-color', '#121212');
            break;
        case 'light':
            document.documentElement.style.setProperty('--background-color', '#CDCDCD');
            break;
    }
}