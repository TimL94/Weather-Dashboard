var retrievedCityArray = localStorage.getItem('city');

$(document).ready(function(){
    createCityButtons();
})

$('.custom-container').each(function(){
    $(this).hide()
})

$('#search-button').on('click', function() {
    var cityInput = $('#search-text').val();
    cityQuerry(cityInput);
    saveCity($('#search-text').val());
    $('#search-text').val(null);
})
$(document).on('click', '.dropdown-item', function(event){
    var selectedCity = event.target.textContent;
    cityQuerry(selectedCity);
});



function getSavedCities(){
    
    var existingCitiesString = localStorage.getItem('Cities');

    if (existingCitiesString) {
        var existingCities = JSON.parse(existingCitiesString);
    }else {
        var existingCities = [];
        console.log(existingCities)
    }

    return existingCities;
    
}

function createCityButtons(){
    var savedCities = getSavedCities();
    console.log(savedCities)
    var $dropdownList = $('#dropdown-menu');

    $dropdownList.empty();
    savedCities.forEach(function(city) {
    
        var $listItem = $('<li>', {
            class: 'dropdown-item'
        });
        var $button = $('<button>', {
            class: 'btn',
            type: 'button'
        }).text(city);

    $listItem.append($button);
    $dropdownList.append($listItem);
    })
}



function saveCity(city){
    if (city.trim() !== ''){
        var existingCities = getSavedCities();

        if (!existingCities.includes(city)) {
            existingCities.push(city);

            var updateCitiesString = JSON.stringify(existingCities);

            localStorage.setItem('Cities', updateCitiesString);

            var $dropdownList = $('#dropdown-menu');

            var $listItem = $('<li>', {
                class: 'dropdown-item'
            });
            
            var $button = $('<button>', {
                class: 'btn',
                type: 'button'
            }).text(city);
    
            $listItem.append($button);
            $dropdownList.append($listItem);
        }
    }
}


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
        $('#box-2-1').text(data.list[4].dt_txt.split(' ')[0]);
        $('#img-2').attr('src', iconPre + data.list[4].weather[0].icon + iconSuf);
        $('#box-2-4').text('Temp: ' + data.list[4].main.temp + ' F');
        $('#box-2-5').text('Humidity: ' + data.list[4].main.humidity);
        $('#box-2-6').text('Wind Speed: ' + data.list[4].wind.speed + ' MPH');

        $('#box-3-1').text(data.list[12].dt_txt.split(' ')[0]);
        $('#img-3').attr('src', iconPre + data.list[12].weather[0].icon + iconSuf);
        $('#box-3-4').text('Temp: ' + data.list[12].main.temp + ' F');
        $('#box-3-5').text('Humidity: ' + data.list[12].main.humidity);
        $('#box-3-6').text('Wind Speed: ' + data.list[12].wind.speed + ' MPH');

        $('#box-4-1').text(data.list[20].dt_txt.split(' ')[0]);
        $('#img-4').attr('src', iconPre + data.list[20].weather[0].icon + iconSuf);
        $('#box-4-4').text('Temp: ' + data.list[20].main.temp + ' F');
        $('#box-4-5').text('Humidity: ' + data.list[20].main.humidity);
        $('#box-4-6').text('Wind Speed: ' + data.list[20].wind.speed + ' MPH');

        $('#box-5-1').text(data.list[28].dt_txt.split(' ')[0]);
        $('#img-5').attr('src', iconPre + data.list[28].weather[0].icon + iconSuf);
        $('#box-5-4').text('Temp: ' + data.list[28].main.temp + ' F');
        $('#box-5-5').text('Humidity: ' + data.list[28].main.humidity);
        $('#box-5-6').text('Wind Speed: ' + data.list[28].wind.speed + ' MPH');

        $('#box-6-1').text(data.list[36].dt_txt.split(' ')[0]);
        $('#img-6').attr('src', iconPre + data.list[36].weather[0].icon + iconSuf);
        $('#box-6-4').text('Temp: ' + data.list[36].main.temp + ' F');
        $('#box-6-5').text('Humidity: ' + data.list[36].main.humidity);
        $('#box-6-6').text('Wind Speed: ' + data.list[36].wind.speed + ' MPH');

    })

};