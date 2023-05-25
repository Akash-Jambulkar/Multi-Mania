// Click Start/Reset ---> 
    //If the game is running: 
        //YES ---->Reload the page---> to start a new game
        //NO ---->Start the game:
            //Change the start btn to reset btn:
            //set starting score to 0
            //Start the countdown(timer):
                //If the time is > 0 ----> decrease the timer by 1second
                //If the timer is < 0 ---> Game Over --> Show the Score card 
                                                        //Change the reset btn to start btn
            //Show the questions:
                //If the answer is correct -->  
                    //show the correct box,
                    //Provide next questions and relative answers,
                    //Add a point to the score card
                //If the answer is wrong -->
                    //Show the try again box,
                    //If negative marking then reduce the score
                
var gameState = false; 
var gameScore; 
var action; // countdown ( timer )
var timeRemaining; 
var correctAnswer; //contains the correct answer

document.getElementById('startReset').onclick = function(){
    if(gameState == true){
        location.reload(); //to reload the page
    }
    else{ //initiating game
        gameState = true; //changing gameState
        gameScore = 0; //Score card must be 0 
        document.getElementById("scoreValue").innerHTML = gameScore;

        display("timeRemaining");
        timeRemaining=60;
        document.getElementById("timeRemainingValue").innerHTML=timeRemaining;
        hide('gameOver');
        document.getElementById("startReset").innerHTML = "Reset Game";

        //starting countdown
        startCountdown();

        //generating Q&A
        generateQuestions();
    }
}

//Clicking on an answer box
for(i=1;i<5;i++){
    document.getElementById('box'+i).onclick=function(){
        if(gameState == true){
            if(this.innerHTML == correctAnswer){
                //correct answer
                gameScore++;
                document.getElementById("scoreValue").innerHTML = gameScore;
                
                //hide wrong box and display correct box
                hide('wrong');
                display("correct"); 
                setTimeout(function(){
                    hide("correct");
                }, 1000);

                //generate new Questions:
                generateQuestions();

            }else{
                hide('correct');
                display('wrong') 
                setTimeout(function(){
                    hide("correct");
                }, 1000);
            }
        }
    }
}


//functions : 

//start counter
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -=1;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        
        if(timeRemaining == 0 ){//Game Over
            stopCountdown();
            display("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over<p><p>You Scored : "+gameScore+"<p>";
            hide("timeRemaining");
            hide('wrong');
            hide('correct');
            gameState = false;
            document.getElementById('startReset').innerHTML = "Start Game";
        }
    },1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hiding
function hide(Id){
    document.getElementById(Id).style.display="none";
}

//displaying 
function display(Id){
    document.getElementById(Id).style.display="block";
}

//generate questions and answers
function generateQuestions(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById('questions').innerHTML= x + "*" + y;
    var correctPosition = 1 + Math.round(3*(Math.random()));
        document.getElementById('box'+correctPosition).innerHTML = correctAnswer; // fills a correct ans to the random box

        //filling the other boxes with another ans:
        var answers = [correctAnswer];

        for(i=1;i<5;i++){
            if(i!== correctPosition){
                var wrongAnswer;
                do{
                    wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
                    }while(answers.indexOf(wrongAnswer)>-1)

                    document.getElementById('box'+i).innerHTML = wrongAnswer;
                        answers.push(wrongAnswer);                    
                }
            }
    }
