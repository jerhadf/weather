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
                    var temp = response.main.temp; 
                    $('#temp').html(temp); 
                    
                }
            });
        }
    });
}); 
