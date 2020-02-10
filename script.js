$(document).ready(function() {
//getting location (longitude & latitude) using navigator.geolocation
  var lat, long;

  function renderData(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

  //render the API data
  var weatherUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?appid=05dd0bc3af2437cbe26809509453a4e8&units=imperial&lat=" + lat + '&lon=' + long; //api url
  $.getJSON(weatherUrl, function(data) {
     var city = data.name; //get the name of the location
     var state=data.sys.country;  //get the state, if US show the US state
    if ( state== "US") {
      $.getJSON("https://api.weather.gov/points/"+lat+","+long, function(data) {
         state = data.properties.relativeLocation.properties.state;
        $("#city").html(city+", "+state);
      });
    }
    $("#city").html(city+", "+state);
    var temp = Math.round(data.main.temp);//get the temperature
     $("#temperature").html(temp + " ");
     var iconUrl = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png"; //get the weather condition icon
     var weatherDesc = data.weather[0].description;
     $("#weather-description").html(weatherDesc);
     var icon = "<img src='"+iconUrl+"' alt='"+weatherDesc+"'>";
     $("#icon").html(icon);

      //setting the background image according to the season
  if (temp < 34) {
    $("body").attr("background", "pictures/winter.jpg");
  }
  else if (temp<51) {
        $("body").attr("background", "pictures/fall.jpg");
  }
  else if(temp<68) {
    $("body").attr("background", "pictures/spring.jpg");
  }
  else {
     $("body").attr("background", "pictures/summer.jpg");
  }

   });//end of getJSON

  } //end of showPosition()

  function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(renderData)} else {$("#weather").html("The location & weather cannot be defined")};
}

  getLocation(); //calling the created function

  //getting the date
 var date = new Date().toString().substring(0, 11);
  $("#date").html(date);


}); // end of document.ready()

//converting Celcius to Fahrenheit and vise versa
function fahrToCel() {
  var oldTemp = $("#temperature").html();
  var newTemp = 0;
  var oldFahrCel = $("#fahrOrCel").html();
  var newFahrCel = "";

  if (oldFahrCel == "°F") {
    newTemp = Math.round((oldTemp-32)*5/9);
    $("#fahrOrCel").html("°C");
  } else {
    newTemp = Math.round(oldTemp*9/5+32);
    $("#fahrOrCel").html("°F");
  }
  $("#temperature").html(newTemp + " ");
}
