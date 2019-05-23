/* Game rules 
    -Player must choose a number between a min and max 
    -Player gets a certain amount of guesses
    -Alert player how many guesses are left 
    -Notify player of the correct number if they lose 
    -Let player choose to play again
*/


//Game values
let min = 1,
    max = 10,
    winningGuess = getRandomNum(min, max),
    guessesLeft = 3;

//UI variables
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess');
const message = document.querySelector('.message');

//assigning minimum and maximum numbers in UI
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//add event listener to submit button when a number is guessed
guessBtn.addEventListener('click', function (){
    let userGuess = parseInt(guessInput.value);

    //validate
    if (isNaN(userGuess) || userGuess < min || userGuess > max ) {
        setMessage (`Please enter a number between ${min} and ${max}`, 'red');        
    }

    //check if winning number 
    if (userGuess === winningGuess) {
        //game over - won 

        gameOver(true, `${winningGuess} is the correct number, you win!`);

        
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //game over - lost 

            gameOver(false, `Game over, you lost! The correct number was ${winningGuess}`);
            guessInput.disabled = true;

        
        } else {
            //wrong answer 
            //change border colour of input box  
            guessInput.style.bordercolor = 'red';

            //set try again message and colour to red 
            setMessage(`That is incorrect. ${guessesLeft} guesses left`, 'red');
        }
    }
})

//game over function
function gameOver (won, msg){
    let color;
    won === true ? color = 'green': color = 'red';

    //disable data entry box
    guessInput.disabled = true;
    //change border colour
    guessInput.style.bordercolor = color;
    //set colour of message 
    message.style.color = color;
    //winning message
    setMessage(msg);

    //play again
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

//message function
function setMessage (msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

//generate random winning number
function getRandomNum(min, max){
    return (Math.floor(Math.random()*(max-min+1)+min));
}