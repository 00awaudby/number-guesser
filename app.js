// game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;


// ui elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");


// ASSIGN UI MIN AND MAX
minNum.textContent = min;
maxNum.textContent = max;


//PLAY AGAIN EVENT LISTENER
game.addEventListener("mousedown", function(e){
    if(e.target.className === "play-again"){
        window.location.reload();
    }
})


// LISTEN FOR GUESS
guessBtn.addEventListener("click", function(){
    let guess = parseInt(guessInput.value);
    console.log(guess)

    // VALIDATE
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    } else{
        // WRONG NUMBER
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // GAME OVER LOST

            gameOver(false, `GAME OVER, You lost. The correct number was ${winningNum}`);

        } else{
            //GAME CONTINUES ANSWER WRONG

            // CHANGE BORDER COLOR
            guessInput.style.borderColor = "red";

            // C;EAR INPUT
            guessInput.value = ";"


            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red")
        }

    }

    // CHECK IF WON
    if(guess === winningNum){
       gameOver(true, `${winningNum} is correct, YOU WIN!`)
    }
});


// GAME OVER
function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red";
        //DISABLE INPUT
        guessInput.disabled = true;
        // CHANGE BORDER COLOR
        guessInput.style.borderColor = color;
        // SET TEXT COLOR
        message.style.color = color;
        // SET MESSAGE
        setMessage(msg)


        //PLAY AGAIN
        guessBtn.value = "play again";
        guessBtn.className += "play-again";
}

//GET WINNING NUMBER
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


// SET MESSAGE
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}