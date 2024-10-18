
let keyword = ''
let refKeyword = ''
const searchField = document.querySelector('#search');
const searchButton = document.querySelector('#go');
const applyButton =  document.querySelector('#apply');


let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=c0ac0de734204609b73739f2914a5ef8`;


searchField.addEventListener('input', setKeyword);
searchButton.addEventListener('click', search);

    const toggleButton = document.getElementById('toggle-filters');
    const filters = document.querySelector('.hidden');

    toggleButton.addEventListener('click', function () {
        filters.classList.toggle('hidden');
    });



const languages = {
    "ar": "Arabic",
    "de": "German",
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "he": "Hebrew",
    "it": "Italian",
    "nl": "Dutch",
    "no": "Norwegian",
    "pt": "Portuguese",
    "ru": "Russian",
    "sv": "Swedish",
    "ud": "Urdu",
    "zh": "Chinese"
  }


  applyButton.addEventListener('click',applyFliters);

  function applyFliters(){
    const languageSelect = document.querySelector('#language');
    const sortBy = document.querySelector('#sort');
    const searchIn = document.querySelector('#searchIn')

    let newQuery = '';

    for(let option of languageSelect.options){
        if(option.selected){
            newQuery+= '&language='+option.value;
        }
    }

    for(let option of sortBy.options){
        if(option.selected){
            newQuery+= '&sortBy='+option.value;
            break;
        }
    }


    for(let option of searchIn.options){
        if(option.selected){
            newQuery+= '&searchIn='+option.value;
            break;
        }
    }
    keyword = refKeyword;
    keyword = keyword + newQuery;
    console.log(keyword);
  }

  
function setKeyword(){
    keyword = searchField.value ;
    refKeyword = keyword;
}


function search() {
    let dataArray;
    console.log(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=c0ac0de734204609b73739f2914a5ef8`);
    fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=c0ac0de734204609b73739f2914a5ef8`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dataArray = data.articles;
            renderData(dataArray);
        })
        .catch(err => {
            console.log(err);
        })
}

function renderData(dataArray){
    const mainBody= document.querySelector('.body');
    mainBody.innerHTML='';

    let newData = dataArray.filter(ele => {
        return (ele.urlToImage!=null);
    })

    let newArray = newData.map(ele=>{
        return createCard(ele);
    })

    newArray.forEach(ele=> { 
        mainBody.appendChild(ele);
    });
}

function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('box');

    card.appendChild(createImageContainer(data));
    card.appendChild(createTitle(data));
    card.appendChild(createAuthorData(data));
    card.appendChild(createCardDesc(data));

    return card;
}


function createImageContainer(data) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const image = document.createElement('img');
    image.setAttribute('src', data.urlToImage);
    image.classList.add('image')

    const source = document.createElement('p');
    source.classList.add('source');
    source.innerHTML = data.source.name;

    imageContainer.appendChild(image);
    imageContainer.appendChild(source);

    return imageContainer;
}


function createTitle(data) {
    const title = document.createElement('h2');
    title.classList.add('title');
    title.innerHTML = data.title;

    return title;
}

function createAuthorData(data) {
    const authorData = document.createElement('p');
    authorData.classList.add('author');

    let text = data.author;
    text += '| ' + data.publishedAt.substr(0, 10);

    authorData.innerHTML = text;

    return authorData;
}


function createCardDesc(data) {
    const descreption = document.createElement('p');
    descreption.classList.add('desc');

    descreption.innerHTML = data.content;
    return descreption;
}