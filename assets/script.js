var searchButton = document.getElementById('search-button');

$('.custom-container').each(function(){
    $(this).hide()
})

$('#search-button').on('click', function() {
    var cityInput = $('#search-text').val();
    cityQuerry(cityInput);
})
$('.dropdown-item').on('click', function(event){
    var selectedCity = event.target.textContent;
    cityQuerry(selectedCity);
});

function cityQuerry(city){
    var apiKey = '40841567bfc00bab4213cc8d746f025f';
    var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&cnt=50&q=' + city + '&appid=' + apiKey;
    var currentDayApiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + city +  '&appid=' + apiKey;
    var iconPre = 'https://openweathermap.org/img/wn/';
    var iconSuf = '@2x.png';

    $('.custom-container').each(function(){
        $(this).show()
    })

    $('#input-container').addClass('col-sm-3');

    fetch(currentDayApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        $('#box-1-1').text(dayjs().format('YYYY-MM-DD'));
        $('#img-1').attr('src', iconPre + data.weather[0].icon + iconSuf);
        $('#box-1-4').text('Temp: ' + data.main.temp + ' F');
        $('#box-1-5').text('Humidity: ' + data.main.humidity);
        $('#box-1-6').text('Wind Speed: ' + data.wind.speed + ' MPH');
    })

    fetch(fiveDayApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        $('.custom-city').each(function() {
            $(this).text(data.city.name)
        })
        
        var currentHour = dayjs().hour();
        console.log(currentHour);

        //updates main container with the current weather

        //updates the four smaller boxes with the next days
        $('#box-2-1').text(data.list[0].dt_txt.split(' ')[0]);
        $('#img-2').attr('src', iconPre + data.list[0].weather[0].icon + iconSuf);
        $('#box-2-4').text('Temp: ' + data.list[0].main.temp + ' F');
        $('#box-2-5').text('Humidity: ' + data.list[0].main.humidity);
        $('#box-2-6').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');

        $('#box-3-1').text(data.list[8].dt_txt.split(' ')[0]);
        $('#img-3').attr('src', iconPre + data.list[8].weather[0].icon + iconSuf);
        $('#box-3-4').text('Temp: ' + data.list[8].main.temp + ' F');
        $('#box-3-5').text('Humidity: ' + data.list[8].main.humidity);
        $('#box-3-6').text('Wind Speed: ' + data.list[8].wind.speed + ' MPH');

        $('#box-4-1').text(data.list[16].dt_txt.split(' ')[0]);
        $('#img-4').attr('src', iconPre + data.list[16].weather[0].icon + iconSuf);
        $('#box-4-4').text('Temp: ' + data.list[16].main.temp + ' F');
        $('#box-4-5').text('Humidity: ' + data.list[16].main.humidity);
        $('#box-4-6').text('Wind Speed: ' + data.list[16].wind.speed + ' MPH');

        $('#box-5-1').text(data.list[31].dt_txt.split(' ')[0]);
        $('#img-5').attr('src', iconPre + data.list[31].weather[0].icon + iconSuf);
        $('#box-5-4').text('Temp: ' + data.list[31].main.temp + ' F');
        $('#box-5-5').text('Humidity: ' + data.list[31].main.humidity);
        $('#box-5-6').text('Wind Speed: ' + data.list[31].wind.speed + ' MPH');

        $('#box-6-1').text(data.list[39].dt_txt.split(' ')[0]);
        $('#img-6').attr('src', iconPre + data.list[38].weather[0].icon + iconSuf);
        $('#box-6-4').text('Temp: ' + data.list[39].main.temp + ' F');
        $('#box-6-5').text('Humidity: ' + data.list[39].main.humidity);
        $('#box-6-6').text('Wind Speed: ' + data.list[39].wind.speed + ' MPH');

    })
};