//Variable initializations
var keys = ['key1', 'key2', 'key3'];
var values = ['value1', 'value2', 'value3']

var size;
var csvString;
var currentState;
var rows;

var counter = 0;
var showCounter = true;//get it from config.js

const request = async()=>{
    const response = await fetch('data.csv');
    csvString = await response.text();
    console.log(csvString);

    setRows(csvString);
    //If current state is null, then we are showing the answer
    currentRow = rows[getRandomInt()];
    showQuestion(currentRow);
}

request();

function setRows(csvString) {
    rows = csvString.split(/\r\n|\n|\r/);
    size = rows.length;
    console.log(rows)
}

function getRandomInt() {
    return Math.floor(Math.random() * size);
}

function showQuestion(row) {
    document.getElementById("flashcard_div").innerHTML = row.split(",")[0];
    if(showCounter) {
        document.getElementById("counter").innerHTML = ++counter;
    }
}

function showAnswer(row) {
    document.getElementById("flashcard_div").innerHTML = (row.split(",")).slice(1).join(",");
}

function processInput() {
    if (currentRow !== null) {
        showAnswer(currentRow);
        currentRow = null;
    } else {
        currentRow = rows[getRandomInt()];
        showQuestion(currentRow);
    }
}

document.addEventListener('keypress', function(e) {
    if (e.code === 'Enter' || e.code === 'Space') {
        processInput();
    }
});

document.addEventListener('click', function(event) {
    processInput();
}, false);