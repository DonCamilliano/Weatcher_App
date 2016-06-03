$(document).ready(function() {
  var lat = 0;
  var lon = 0;
  var obj = {};
  var temp = 2;
  
 if (navigator.geolocation) {                                        
      navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      gettingJSON();
    });
  }
  
  /* Get data from Open Weather API */
var gettingJSON = function (){  
 $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=edbfa7c0394b041a6741b9e7d95c0a6a",function(data){
   $("#geoloc").html(data.name +', '+ data.sys.country);
   $("#wind").html('WIND: ' + data.wind.speed + ' m/s');
   $("#cloud")
      .html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>" + data.weather[0].description);
   var val = data.main.temp;
   if (temp % 2 === 0) {
     val = parseInt(val);
     $("#degree").html('TEMP: ' + val + ' °F');
   } else if (temp % 2 !== 0) {
     val = parseInt(val)-273;
     $("#degree").html('TEMP: ' + val + ' °C');
   }
  });
}

/* Change Degrees */
$('.btn').click(function() {
  temp = temp + 1;
  gettingJSON();
})

})


