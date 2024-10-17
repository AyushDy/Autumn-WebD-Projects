const API_KEY = '1082123a0ed5ee331e7ac76ff35ef4b9';
const inputField =  document.querySelector('#city');
const searchButton = document.querySelector('#go');
const tempDiv= document.querySelector('.temp');
const locationDiv = document.querySelector('.location')


let searchedCity = 'delhi';





inputField.addEventListener("input",updateCity);
searchButton.addEventListener('click',search);

function search(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
    console.log(data);
    renderData(data);
    })
    .catch(error => {
    console.log(error);
    showError(error);
    })
}

function renderData(data){
    const temperature = data.main.temp
    tempDiv.innerText = temperature + ' °C';
    locationDiv.innerText = searchedCity;

}

function updateCity(){
    searchedCity = inputField.value;
}

function showError(error){

}


