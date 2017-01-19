
$(".title-main").click(function() {
    // css animations
    $(".title").css({
        "opacity": "0"
    });

    $(".weather").animate({
        "opacity": "1", 
        "padding-top":"50px", "padding-bottom": "50px", 
        "padding-left":"50px", "padding-right": "50px", 
        "background-color": "rgba(250, 250, 250, .15)"
    }, 500);

    // user coordinates
    var lat; 
    var long; 
    function getLocation({
        navigator.geolocation.getCurrentPosition(
            function showPosition(position) {
                lat = position.coords.latitude; 
                long = position.coords.longitude; 
            })
    )}; 

    function getWeather(arg) {
        lat = "lat=" + lat; 
        long = "&lon=" + long;
        var key = "&appid=a11c5f2fd284d93c21b0aee731238aec"; 
        var url = "http://api.openweathermap.org/data/2.5/weather?" + lat + long + key; 

        console.log(url); 

        $.get(url, function(response) {
            console.log(response); 
        }, "jsonp");
    }

    getLocation(getWeather); 
    
}); 