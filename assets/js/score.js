// we define a function to get the scores from the local storage and display them in the high score page
function displayHighScore () {
var highscores = JSON.parse(window.localStorage.getItem('highscores')) || []; // we define a variable and parse the local storage to get the values or get an empty array
highscores.sort(function (a, b) { // we use the sort function to sort an array with the score function from chatGPT
    return b.score - a.score;
});

for (var i=0; i < highscores.length; i += 1) { //we do a loop for each score contained in the empty array or the highscore array
    var nName = document.createElement('li'); //create a list element to put the info into
    nName.textContent = highscores[i].initials + '-'+ highscores[i].score; // define the content for each list item in accordance to the initials and score info saved in local
    var hsLi = document.getElementById('highscores'); // we call the highscore element to a var
    hsLi.appendChild(nName); // we appen the element tot he page
}
}

//now we clear the highscores

function clHS(){
    window.localStorage.removeItem('highscores'); //we remove the items from the local storage
    window.location.reload(); //we reload the page
}

document.getElementById('clear').onclick = clHS; // asign an event listener for the clic of the clear button to clean the info
displayHighScore(); // call the main function to action.