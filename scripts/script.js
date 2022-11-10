'use strict';

const game = {
title: 'Dogs',
isRunning: false,
easyMode: true,
playerForm: $('#name'),
form: $('#form'),
playerName: $('#playername'),
playerNameDisplay : $('#display'),
joinGameButton: $('#joingamebtn'),
easyToHardBtn: $('#easytohardbtn'),
hardToEasyBtn: $('#hardtoeasybtn'),
startScreen: $('#startscreen'),
gameScreen: $('#gamescreen'),
gameoverScreen: $('#gameoverscreen'),

// game screen
totalTime: 90,
timeRemaining: 90,
minutes: $('#mins'),
secounds: $('#secs'),
startBtn: $('#startbtn'),
stopBtn: $('#stopbtn'),
restartBtn: $('#restartbtn'),
exitBtn: $('#exitbtn'),
timeoutID: null,
score: $('.point'),
newScore: 0,
dogContainer: $('#dogcontainer'),
chosenDog: '',
dog: $('.dog'),

dog1: $('#dog1'),
dog2: $('#dog2'),
dog3: $('#dog3'),
dog4: $('#dog4'),
dog5: $('#dog5'),
dog6: $('#dog6'),
dog7: $('#dog7'),
dog8: $('#dog8'),
dog9: $('#dog9'),
dog10: $('#dog10'),
dog11: $('#dog11'),
dog12: $('#dog12'),
dog13: $('#dog13'),
dog14: $('#dog14'),
dog15: $('#dog15'),
newTarget: $('#newtarget'),
newDog: '',
newTargetArray: ['game.dog1','game.dog2','game.dog3','game.dog4','game.dog5','game.dog6','game.dog7','game.dog8','game.dog9','game.dog10','game.dog11','game.dog12','game.dog13','game.dog14','game.dog15'],

// gameover screen
finalPlayer: $('#finalplayer'),


// Countdown Loop - this is the method that will get called every second.
timer(){
    game.timeRemaining--;
    console.log(game.timeRemaining);
    game.timeoutID = setTimeout(game.timer,1000);
    game.showTime();
    game.updateBar()
},

// call the reset timer method to initialize the clack and progress bar to 90 seconds and full width
// Update progress bar
updateBar(){
    $('.progress-bar').css('width',`${game.timeRemaining / game.totalTime * 100}%`);},

// Update clock display
showTime() { 
    if (game.timeRemaining <= 60) {
    game.minutes.html('00')
} else if (Math.trunc(game.timeRemaining/60) < 10) {
    game.minutes.html('0' + Math.trunc(game.timeRemaining/60))
}
else {
    game.minutes.html(Math.trunc(game.timeRemaining/60))
};
if (game.timeRemaining >= 60){
    game.secounds.html(game.timeRemaining % 60)
} else {
    game.secounds.html(game.timeRemaining)
}
if (game.timeRemaining % 60 < 10) {
    game.secounds.html('0'+ (game.timeRemaining % 60))
}   
if (game.timeRemaining < 1) {
    game.stopBtn.hide();
    game.isRunning = false;
    clearTimeout(game.timeoutID);
    setTimeout(game.resetTimer, 5000);
    $('#gamescreen').hide();
    game.gameoverScreen.show();
    console.log('reset1')
    game.resetTimer();
}
},

// Reset timer
resetTimer() {
    console.log ('reset now')
    game.timeRemaining = 90;
    clearTimeout(game.timeoutID);
 
},

// Update the player's name on screen based on a parameter named playerName.
    setPlayer() {
        console.log(player.playerName)
        game.playerNameDisplay.html(player.playerName);
        game.finalPlayer.html(player.playerName);

    },
// show dogs in random order
    randomDog() {
                game.dogContainer.html($("#dogcontainer .dog").sort(function(){
                return Math.random()-0.5;
            }));
            game.handleDogClick();
    },


    newTargetDog(){
        game.chosenDog = '';
        game.newTarget.html('');
        const randomDogNumber = Math.floor(Math.random() * game.newTargetArray.length + 1);
        game.newDog = $(`div#dog${randomDogNumber}.dog`);
        const dogClone = $(`#dog${randomDogNumber}`).clone();
        game.newTarget.append(dogClone);
        if (this.easyMode == false){
            game.randomDog();
        } 
    },

    handleDogClick(){
        $('.dog').on('click', function (event) {
            if (game.isRunning == true){
            game.chosenDog = (event.currentTarget);
            if (game.chosenDog === game.newDog[0]) {
                console.log("match");
                game.newScore = game.newScore + 1;
                game.updateScore();
            } else {
                console.log("not match")
                game.newScore = game.newScore - 1;
                game.updateScore();
            }
            } else {
            alert("please start the game");
            }}
        );   
    },
    updateScore(){
        game.chosenDog = '';
        $('.point').html(game.newScore);
        game.newTargetDog();
    }
}

  
//modal
$("#setuphelp").on('click', event => { 
    $("#startModal").modal('show');
})

$("#closebtn").on('click', event => { 
$("#startModal").modal('hide');
})



let player = {
    playerName: null,
    newScore: 0,

// update the player name property in the player object itself, then calls the method in the game object to handle updating the DOM
   
    updateName() {
        console.log('updateName has been called.');
        player.playerName = game.playerNameDisplay.val();
        game.setPlayer();
    }
        

}

game.easyToHardBtn.on ('click', event =>{
    game.easyMode = false;
    game.easyToHardBtn.hide();
    game.hardToEasyBtn.show();
})

game.hardToEasyBtn.on ('click', event =>{
    game.easyMode = true;
    game.hardToEasyBtn.hide();
    game.easyToHardBtn.show();
})

game.joinGameButton.on ('click', event =>{
    console.log('updateName has been called.');
        player.playerName = game.playerForm.val();
        game.setPlayer();
        setup();
        game.startScreen.hide();
        game.gameScreen.show();
        game.randomDog();
        game.newTargetDog();

    

})

game.restartBtn.on ('click', event =>{
    console.log('restart');
        player.playerName = game.playerForm.val();
        game.setPlayer();
        setup();
        game.gameoverScreen.hide();
        game.gameScreen.show();
        game.randomDog();
        game.newTargetDog();
        game.newScore = 0;
        $('.point').html(game.newScore);
})

game.exitBtn.on ('click', event =>{
    console.log('exit');
        player.playerName = '';
        game.form.trigger("reset");
        game.gameoverScreen.hide();
        game.startScreen.show();
        game.newScore = 0;
        $('.point').html(game.newScore);
})


const setup = function() {
    // Setup - this method should
    // add an event listener/handler to the Start button which, on click, calls the start timer method
    game.startBtn.on ('click', event =>{
        if (game.isRunning === false) {
            game.isRunning = true;
            game.timer();
            game.showTime();
            game.startBtn.hide();
            game.stopBtn.show();
            
        };
    });

    
    // add an event listener/handler to the Pause button which, on click, calls the pause timer method
    game.stopBtn.on ('click', event =>{
        game.isRunning = false;
        clearTimeout(game.timeoutID);
        game.stopBtn.hide();
        game.startBtn.show();
    
    });

    game.showTime();
    game.updateBar();
    game.stopBtn.hide();
    game.startBtn.show();   
    console.log( "ready!" );
    }

    $('.screen').hide();
    game.startScreen.show();
    game.easyToHardBtn.show();
    game.hardToEasyBtn.hide();
    setup();
   
    
  
  


  