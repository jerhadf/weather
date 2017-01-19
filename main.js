$( document ).ready(function() {

$(".title-main").click(function() {
    // css animations
    $(".title").animate({
        "opacity": "0"
    }, "1s");

    $(".weather").animate({
        "opacity": "1", 
        "padding-top":"50px", "padding-bottom": "50px", 
        "padding-left":"50px", "padding-right": "50px", 
        "background-color": "rgba(250, 250, 250, .15)"
    }, "1s");

    // get location
    var city;
    var coords = []; 
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'jsonp', 
        url: 'http://ipinfo.io',
        success: function(response) {

            //coords
            coords = response.loc.split(','); 

            //city 
            city = (response.city + ", " + response.region); 
            $(".location").html(city); 

            //initialize weather url variables
            var key = "&appid=a11c5f2fd284d93c21b0aee731238aec"; 
            var lat = "lat=" + coords[0];
            var long = "&lon=" + coords[1];
            var url = "http://api.openweathermap.org/data/2.5/weather?" + lat + long + key;

            // get weather
            $.ajax({
                url: url, 
                dataType: "jsonp", 
                success: function(response) {
                    // get temperature
                    console.log(response); 
                    var temp = Math.round(response.main.temp * (9/5) - 459.67); 
                    $('#temp').html(temp); 
                    
                    // get weather description, change background
                    var weatherDesc = response.weather[0].description; 
                    console.log(weatherDesc); 

                    switch(weatherDesc) {
                        case "mist":
                            $('.weatherdesc').html("Misty");
                            $('body').css({
                                "background-image":"url('Images/mist.png')", 
                                "transition":"1.75s"
                            });
                            break; 
                        case "clear sky" || "few clouds":
                            $('.weatherdesc').html("Clear skies");
                            $('body').css("background-image","url('Images/clearskies.png')");
                            break;
                        case "scattered clouds" || "broken clouds":
                            $('.weatherdesc').html("Cloudy");
                            break; 
                        case "shower rain" || "rain":
                            $('.weatherdesc').html("Raining");
                            break;
                        case "thunderstorm":
                            $('.weatherdesc').html("Thunderstorms");
                            break; 
                        case "snow":
                            $('.weatherdesc').html("Snowing");
                            break;
                    }
                }
            });
        }
    });
}); 

$("#unit").click(function() {
    console.log("there"); 
    var unit = $("#unit").html();
    var temp = $('#temp').html();

    if(unit === "Fahrenheit") {
        var unit = $("#unit").html("Celsius");
        temp = ((temp - 32)*5)/9; 
        $('#temp').html(temp);
    } else {
        var unit = $("#unit").html("Fahrenheit");
        temp = ((temp * 9)/5) + 32; 
        $('#temp').html(temp);
    }
}); 


}); 
