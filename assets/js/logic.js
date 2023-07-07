// first we define the variables that will run trough the game, the timer, the time left and the number of question we are in
var currentQuestion = 0; // we set the current question to 0 se we can take the 0position of the question array (so we star in question 1)
var time = questions.length * 12; //in here we give 12 seconds to read and answer each question contained in the variable questions from the questions.js in this case is 5 questions so 60 seconds
var timerId; //then we define the timerId to keep track of the timer variable


var questionsList = document.getElementById('questions'); //in this var we call the dom item to generate the question list
var timerEl = document.getElementById('time'); // we call the dom item to set the timer 
var choicesEl = document.getElementById('choices'); // we call the dom item for each answer choice so we can list it
var submitBtn = document.getElementById('submit'); // we call the dom item for the sumbit button 
var startBtn = document.getElementById('start'); // we call the dom item for the start quizz button
var initialsEl = document.getElementById('initials'); //we call the dom item to get the initials for the user input
var feedbackEl = document.getElementById('feedback'); // in here we call feedback to enter the highscore that we got from the quizz

//we start by defining the start function of the quizz in which we will start calling and hiding elements so we can view the start card
function quizStart(){ //define function name
    var startCard = document.getElementById('start-screen'); // call the div by id and set it into a variable
    startCard.setAttribute('class', 'hide');//change the class to hide
    questionsList.removeAttribute('class'); //remove class from the questions div (initial class is hidden)
    timerId = setInterval(countdown,1000); //we set a time interval of 1000ms to keep the second count
    timerEl.textContent = time; // we set the text of the dom to the value of time
    getQuestion(); //we call the question get funtcion to generate the questions and callthem
};
//now we do a countdown  function taken from example 10 of the web api bootcamp
function countdown(){
    time --;
    timerEl.textContent = time;
    if (time <= 0){
        quizEnd;
    };
};
function getQuestion() { //define function name as above stated
    var currentQ = questions[currentQuestion]; //set the value of the current question to the array ofquestions.js
    var titleEl = document.getElementById('question-title'); //in here we make a variable to call the dom element of the question title
    titleEl.textContent = currentQ.title; 
    //now we need to generate the choices and read them from the array in questions.js
    choicesEl.innerHTML = ' '; //we use the innerHTML method to clean the value of any choiceEl
    //we need a for to loop inside the array and search for the values of the choices
    for (var i=0; i < currentQ.choices.length; i++){// we start the loop and deifne the variable for a loop that runs less than the lenght of the array in questions.js
        var choice = currentQ.choices[i]; // we define the choice number var to keep track of the number and asign the array value to the loop value
        var choiceBtn = document.createElement('button');//then we need to create a button to handle the choice
        choiceBtn.setAttribute('class', 'choice'); // we set the class of the button to choice to handle each instance of choices
        choiceBtn.setAttribute('value', choice); // now we set the value
        choiceBtn.textContent = i + 1 + ". "+ choice; // we set the text contetn to the content of choice
        choicesEl.appendChild(choiceBtn); //now we append the button each time
    };
};

//now we create a function to handle the click events of every choice
function clickQuestion (event){
    var btnEl = event.target;
//now we need a function to check if the answer is correct
if (btnEl.value !== questions[currentQuestion].answer){ //this if checks the value of the button and compares it to the value inside current question answer
    feedbackEl.textContent = 'Wrong!';
    time -= 7;  //we deduct five seconds for each wrong answer
    if (time < 0) { // we put this if to avoid going under 0 seconds and producing bugs
        time = 0; // we define time as 0 so it avoids the bug
    };
//now we need to display the time after the correct or incorrect answer
    timerEl.textContent = time; 
 
} else {
    feedbackEl.textContent = 'Correct!'; //we input the correct answer prompt on the feedback part of the index 
};
currentQuestion++;
//now we need to check if we have fisihed the questions or run out of time
if(time <= 0 || currentQuestion === questions.length){ //we check the timer for 0 OR for the match of currentquestion with total questions
    quizEnd(); //we execute the quiz end function to display score and input initials
} else {
    getQuestion(); //we go to the next question
};
//this part comes from the mdn of set timeout https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
feedbackEl.setAttribute('class', 'feedback');
setTimeout(function () {
  feedbackEl.setAttribute('class', 'feedback hide');
}, 2000);

};
//we declare the quiz end button, so we need to set the timer to 0 and clear the timer interval cause we have not cleared it in the previous functions
function quizEnd() {
    clearInterval( timerId); //clear the timer interval
    var endScrnEl = document.getElementById('end-screen'); //create update the screen to display the scores
    endScrnEl.removeAttribute('class'); // we remove the hide from the endscreen card
    questionsList.setAttribute('class', 'hide'); //we hide the questions card
    var fscore = document.getElementById('final-score'); // we set a var to display the final score on the span
    fscore.textContent = time; // we set the time score on the time field
  }
//now we take the highscore visualiser
function sHighScores(){ 
var initials = initialsEl.value; // we set a var to get the values of the initials from the input element
var newScore = { // we add an arrayed variable with a score and initials property
    score: time, //score=time
    initials: initials, // initials = initials
};
var highscores = JSON.parse(window.localStorage.getItem('highscores')) || []; //now we need to call a new variable to log the highscores on the local storage named highscores
highscores.push(newScore); //we push the new value to the storage
window.localStorage.setItem('highscores', JSON.stringify(highscores)); //now we set it as a string and save it local storage with the pushed value
window.location.href = "highscores.html"; //and we move to the html that contains the highscores
};
//we do an enter check to run the shighscore funtction in case the user does not use the submit button
function checkEnter(event) {

    if (event.key === 'Enter') {
      sHighScores();
    }
  }
  //we run the function on event listeners for the buttons we have on the page
submitBtn.onclick = sHighScores;
startBtn.onclick = quizStart;
choicesEl.onclick = clickQuestion;
initialsEl.onkeyup = checkEnter;
