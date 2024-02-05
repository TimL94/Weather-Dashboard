var searchButton = document.getElementById('search-button');



searchButton.addEventListener('click', function(){
    var apiKey = '40841567bfc00bab4213cc8d746f025f';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&cnt=41&q=' + $('#search-text').val() + '&appid=' + apiKey;
    console.log($('#search-text').val());

    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        $('.custom-city').each(function() {
            $(this).text($('#search-text').val())
        })
        $('#box-1-1').text(data.list[0].dt_txt.split(' ')[0]);
        $('#box-1-2').text(data.list[0].weather[0].description);
        $('#box-1-3').text(data.list[0].weather[0].icon);
        $('#box-1-4').text(data.list[0].main.temp + ' F');
        $('#box-1-5').text('Humidity: ' + data.list[0].main.humidity);
        $('#box-1-6').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');

        $('#box-2-1').text(data.list[8].dt_txt.split(' ')[0]);
        $('#box-2-2').text(data.list[8].weather[0].description);
        $('#box-2-3').text(data.list[8].weather[0].icon);
        $('#box-2-4').text(data.list[8].main.temp + ' F');
        $('#box-2-5').text('Humidity: ' + data.list[8].main.humidity);
        $('#box-2-6').text('Wind Speed: ' + data.list[8].wind.speed + ' MPH');

        $('#box-3-1').text(data.list[16].dt_txt.split(' ')[0]);
        $('#box-3-2').text(data.list[16].weather[0].description);
        $('#box-3-3').text(data.list[16].weather[0].icon);
        $('#box-3-4').text(data.list[16].main.temp + ' F');
        $('#box-3-5').text('Humidity: ' + data.list[16].main.humidity);
        $('#box-3-6').text('Wind Speed: ' + data.list[16].wind.speed + ' MPH');

        $('#box-4-1').text(data.list[31].dt_txt.split(' ')[0]);
        $('#box-4-2').text(data.list[31].weather[0].description);
        $('#box-4-3').text(data.list[31].weather[0].icon);
        $('#box-4-4').text(data.list[31].main.temp + ' F');
        $('#box-4-5').text('Humidity: ' + data.list[32].main.humidity);
        $('#box-4-6').text('Wind Speed: ' + data.list[32].wind.speed + ' MPH');

        $('#box-5-1').text(data.list[39].dt_txt.split(' ')[0]);
        $('#box-5-2').text(data.list[39].weather[0].description);
        $('#box-5-3').text(data.list[39].weather[0].icon);
        $('#box-5-4').text(data.list[39].main.temp + ' F');
        $('#box-5-5').text('Humidity: ' + data.list[39].main.humidity);
        $('#box-5-6').text('Wind Speed: ' + data.list[39].wind.speed + ' MPH');



    })
});