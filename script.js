
var output = document.getElementById('output');
var input = document.getElementById('input');

function savekeyWordsToLocalStorage(list) {
    const listString = JSON.stringify(list);
    localStorage.setItem('keyWords', listString);
}

function loadkeyWordsFromLocalStorage() {
    const listString = localStorage.getItem('keyWords');
    // return listString ? JSON.parse(listString) : [];

    const loadedList = listString ? JSON.parse(listString) : [];
    return loadedList.join('\n');
}


function replaceNewlinesWithBR(inputString) {
    let keyWords = inputString.replace(/\n/g, '<br>');
    return keyWords;
}

function createVerses(word, nextWord){
    if (nextWord == undefined || nextWord == ""){
        var verse = word + " går, \n" +
        "sjung hopp faderallan lallan lej,\n" +
        word + " går,\n" +
        "sjung hopp faderallan lej.\n" +
        "Och den som inte " + word + " tar\n" +
        "han heller inte får gå hem,\n" +
        word + " gåååååååår, [" + word + " tages]\n" +
        "sjung hopp faderallan lej.\n";    
    } else {
        var verse = word + " går, \n" +
        "sjung hopp faderallan lallan lej,\n" +
        word + " går,\n" +
        "sjung hopp faderallan lej.\n" +
        "Och den som inte " + word + " tar\n" +
        "han heller inte " + nextWord + " får,\n" +
        word + " gåååååååår, [" + word + " tages]\n" +
        "sjung hopp faderallan lej.\n";
    }

    console.log(verse);
    return(verse);
}

function divideList(inputWords){
    var words = inputWords.split(/\r\n|\r|\n/).filter(function(item) {
        return item !== "";
    });;
    return words;
}

function capitalizeWords(list) {
    return list.map(word => word.charAt(0).toUpperCase() + word.slice(1));
}

function createVersesFromList(words){
    var verses = "";
    for (var i = 0; i < words.length; i++){
        verses += createVerses(words[i], words[i+1]) + "\n";
    }
    return verses;
}

function updateOutput() { 
    let keyWords = divideList(input.value)
    keyWords = capitalizeWords(keyWords);
    let verses = createVersesFromList(keyWords);
    output.innerHTML = replaceNewlinesWithBR(verses);
    savekeyWordsToLocalStorage(keyWords);
}





input.addEventListener('input', updateOutput);


if (localStorage.getItem('keyWords') !== null) {
    let keyWords = loadkeyWordsFromLocalStorage();
    input.innerHTML = keyWords;
    updateOutput();
}