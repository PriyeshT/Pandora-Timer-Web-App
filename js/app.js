//Declare the variables
var setTimer = 0;
var $minutes = $("#mins");
var $seconds = $("#secs");
var $shortBreak = $('#short_break');
var $pomodoro = $("#pomodoro");
var $longBreak = $("#long_break");

/*
    Function to reduce timer length when "-" button is clicked
    Reduces timer length by 1.
*/
function reduceTime(){
  var minsStr = $minutes.html();
  var mins = parseInt(minsStr) - 1;
  if(mins === 1){
    document.getElementById('minus').style.pointerEvents = 'none';
  }
  if(mins < 10){
    mins = "0" + mins
  }
  $minutes.html(mins);
}

/*
    Function to increment timer length when "+" button is clicked
    Increments timer length by 1.
*/
function incrementTime(){
  var minsStr = $minutes.html();
  var mins = parseInt(minsStr) + 1;
  if(document.getElementById('minus').style.pointerEvents = 'none'){
    setMinusButtonStylePointerAuto();
  }
  if(mins < 10){
    mins = "0" + mins
  }
  $minutes.html(mins);

}

/*
    Set the minus buttons pointer event to auto. 
    Used when the minus button is disabled.
*/
function setMinusButtonStylePointerAuto(){
    document.getElementById('minus').style.pointerEvents = 'auto';
}

/*
    Start the timer.
*/

function startTimer(){
    
    if(setTimer === 0){
        setTimer = window.setInterval(function(){
        var minsStr = $minutes.html();
        var secsStr = $seconds.html();
        var mins = parseInt(minsStr);
        var secs = parseInt(secsStr);
        var updateSecs;
        var updateMins;
        /*
            If seconds is 0, then sets seconds to 60 and reduces seconds by 1 and minutes by 1.
            If seconds is 1, then reduces seconds by 2.
        */
        if(secs === 0){
            secs += 60;
            updateMins = eval(mins) - eval(1);
            updateSecs = eval(secs) - eval(1);
        }else if(updateSecs === 1){
            updateSecs = eval(secs) - eval(2);
        }else{
            updateSecs = eval(secs) - eval(1);
        }
        //Once the minutes and seconds value are less than 0, appends "0" to make 2 digit format.
        if (updateMins < 10 ){
          updateMins = "0" + updateMins;
          $minutes.html(updateMins);
        } else{
          $minutes.html(updateMins);
        } 
        if(updateSecs < 10 ){
          updateSecs = "0" + updateSecs;
          $seconds.html(updateSecs);
        }else{
          $seconds.html(updateSecs);
        }
        //When timer finishes, plays the notification sound and resets the timer.
          if(updateSecs <= 0 &&
            updateMins === undefined){
            var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
            var audio = new Audio(wav);
			audio.play();
            resetTimer();
            setMinusButtonStylePointerAuto();
          }
          
    },1000);
    }
    
}

// Stop timer 
function stopTimer(){
    clearInterval(setTimer);
    setTimer = 0;
}

function setShortBreakTimer(){
     $minutes.html("05");
     $seconds.html("00");
}

function setLongBreakTimer(){
     $minutes.html(10);
     $seconds.html("00");
}

function setPomodoroTimer(){
      $minutes.html(25);
      $seconds.html("00");
}

function resetTimer(){
    clearInterval(setTimer);
    stopTimer();
    if($pomodoro.hasClass("active")){
      setPomodoroTimer();
   }else if($shortBreak.hasClass("active")){
     setShortBreakTimer();
   }else{
     setLongBreakTimer();
   }
}

function setShortBreakCSS(){
    $shortBreak.removeClass("active");
    $shortBreak.css("background-color",'#2BA6CB');
}

function setPomodoroCSS(){   
  $pomodoro.removeClass("active");
  $pomodoro.css("background-color",'#2BA6CB');
}

function setLongBreakCSS(){
  $longBreak.removeClass("active");
  $longBreak.css("background-color",'#2BA6CB');
}

function setBackgroundColorForButton(){
    $(this).css("background-color",'#1E728C');
}

function showShortBreak(){
  setBackgroundColorForButton();
  $(this).addClass("active");
  setPomodoroCSS();
  setLongBreakCSS();
  setShortBreakTimer();
}

function showLongBreak(){
  setBackgroundColorForButton();
  $(this).addClass("active");
  setPomodoroCSS();
  setShortBreakCSS();
  setLongBreakTimer();
}

function showPomodoroSection(){
  setBackgroundColorForButton();
  $(this).addClass("active");
  setLongBreakCSS();
  setShortBreakCSS();
  resetTimer();
  setPomodoroTimer();
}

$(document).ready(function(){
    var startPomodoro = document.getElementById('start');
    startPomodoro.onclick = startTimer;
    var stopPomodoro = document.getElementById('stop');
    stopPomodoro.onclick = stopTimer;
    var resetPomodoro = document.getElementById('reset');
    reset.onclick = resetTimer;
    var shortBreak = document.getElementById('short_break');
    shortBreak.onclick = showShortBreak;
    var showPomodoro = document.getElementById('pomodoro');
    showPomodoro.onclick = showPomodoroSection;
    var longBreak = document.getElementById('long_break');
    longBreak.onclick = showLongBreak;
    var minusTime = document.getElementById('minus');
    minus.onclick = reduceTime;
    var plusTime = document.getElementById('plus');
    plusTime.onclick = incrementTime;
});
