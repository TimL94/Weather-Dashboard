
//This waits for the html elements to load and than creates buttons based on cities stored locally
$(document).ready(function(){
    createCityButtons();
})

//This hides the weather containers until the user inputs a city
$('.custom-container').each(function(){
    $(this).hide()
})


//This event handler waits for a search button to be clicked and than runs the fucntion to make the fetch calls and display the weather information
//The city is than saved and a button is created
$('#search-button').on('click', function() {
    var cityInput = $('#search-text').val();
    cityQuerry(cityInput);
    saveCity($('#search-text').val());
    $('#search-text').val(null);
})

//This waits for the html elements to load and allows the buttons on the dropdown menu that are added durring the current session to be functional
$(document).on('click', '.dropdown-item', function(event){
    var selectedCity = event.target.textContent;
    cityQuerry(selectedCity);
});


// this function pulls the cities stored in local storage and exportrs them as an array
function getSavedCities(){
    
    var existingCitiesString = localStorage.getItem('Cities');

    if (existingCitiesString) {
        var existingCities = JSON.parse(existingCitiesString);
    }else {
        var existingCities = [];
    }
    return existingCities;
}

//This function empties the dropdown menu and repopulates it from local storage
function createCityButtons(){
    var savedCities = getSavedCities();
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


//This function first makes sure that the value is a correct string and than adds it to the existing cities array
//if the array does not contain the current city a new button is created
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

//This is the main function contiaining two api fetch calls, one for the current weather conditions and a 5 day forrecast
//URL's are constructed into their own variables which are than fed into the api fetch
function cityQuerry(city){
    var apiKey = '40841567bfc00bab4213cc8d746f025f';
    var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&cnt=50&q=' + city + '&appid=' + apiKey;
    var currentDayApiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + city +  '&appid=' + apiKey;
    var iconPre = 'https://openweathermap.org/img/wn/';
    var iconSuf = '@2x.png';


    $('.custom-container').each(function(){
        $(this).show()
    })

    //resizes the container for better asthetics
    $('#input-container').addClass('col-sm-3');

    fetch(currentDayApiUrl)
    .then(function(response){
        return response.json();
    })

    //This updates the current day container, the date is pulled from dayjs
    .then(function(data) {
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

    //this adds the city name to each card
    .then(function (data) {
        $('.custom-city').each(function() {
            $(this).text(data.city.name)
        })
        

        //updates the four smaller boxes with the next days

        //Day 2
        $('#box-2-1').text(data.list[4].dt_txt.split(' ')[0]);
        $('#img-2').attr('src', iconPre + data.list[4].weather[0].icon + iconSuf);
        $('#box-2-4').text('Temp: ' + data.list[4].main.temp + ' F');
        $('#box-2-5').text('Humidity: ' + data.list[4].main.humidity);
        $('#box-2-6').text('Wind Speed: ' + data.list[4].wind.speed + ' MPH');

        //Day 3
        $('#box-3-1').text(data.list[12].dt_txt.split(' ')[0]);
        $('#img-3').attr('src', iconPre + data.list[12].weather[0].icon + iconSuf);
        $('#box-3-4').text('Temp: ' + data.list[12].main.temp + ' F');
        $('#box-3-5').text('Humidity: ' + data.list[12].main.humidity);
        $('#box-3-6').text('Wind Speed: ' + data.list[12].wind.speed + ' MPH');

        //Day 4
        $('#box-4-1').text(data.list[20].dt_txt.split(' ')[0]);
        $('#img-4').attr('src', iconPre + data.list[20].weather[0].icon + iconSuf);
        $('#box-4-4').text('Temp: ' + data.list[20].main.temp + ' F');
        $('#box-4-5').text('Humidity: ' + data.list[20].main.humidity);
        $('#box-4-6').text('Wind Speed: ' + data.list[20].wind.speed + ' MPH');

        //Day 5
        $('#box-5-1').text(data.list[28].dt_txt.split(' ')[0]);
        $('#img-5').attr('src', iconPre + data.list[28].weather[0].icon + iconSuf);
        $('#box-5-4').text('Temp: ' + data.list[28].main.temp + ' F');
        $('#box-5-5').text('Humidity: ' + data.list[28].main.humidity);
        $('#box-5-6').text('Wind Speed: ' + data.list[28].wind.speed + ' MPH');

        //Day 6
        $('#box-6-1').text(data.list[36].dt_txt.split(' ')[0]);
        $('#img-6').attr('src', iconPre + data.list[36].weather[0].icon + iconSuf);
        $('#box-6-4').text('Temp: ' + data.list[36].main.temp + ' F');
        $('#box-6-5').text('Humidity: ' + data.list[36].main.humidity);
        $('#box-6-6').text('Wind Speed: ' + data.list[36].wind.speed + ' MPH');

    })

};