
$(document).ready(function(e){
  //hide the buttons and the folder while the timer is counting 
  $(".singlebutton").hide();
 document.getElementById('examtimer_tree0').style.display = 'none';

});

//used this function to get the ID from the url
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// save the ID gotten from the url and save it here
var id = getParameterByName('id'); // 6

function get_time() {
  //using the json post method to post the ID to get_time.php
  $.post("templates/get_time.php", {id:id},
  function(data, status){
    //save the time gotten from the DB into a hidden input type
    document.getElementById("time_setting").value=data;
    });
}
get_time();


//the function responsible for the timer countdown
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
  };
}

function initializeClock(id, endtime) {

      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
          var t = getTimeRemaining(endtime);

          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);



          if (t.total <= 0) {
              var v = document.getElementById('clockdiv');
              var x = document.getElementById('demo');
              var z = document.getElementById('msg');
              document.getElementById('examtimer_tree0').style.display = 'block';
              $(".singlebutton").show();

              clearInterval(timeinterval);

              v.style.display = 'none';
              z.style.display = 'none';

          }


      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
}

function warming_up(){

  var deadline = $('#time_setting').val();
   initializeClock('clockdiv', deadline);
}

//delay the javascript by seconds to allow the page to load
window.setTimeout(warming_up,1000);
