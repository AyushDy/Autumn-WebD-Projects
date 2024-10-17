const url = 'https://newsapi.org/v2/everything?q=keyword&apiKey=c0ac0de734204609b73739f2914a5ef8';



function search() {
    let dataArray;
    fetch(url)
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

search();

function renderData(dataArray){
    const mainBody= document.querySelector('.body');

    const newArray = dataArray.map(ele=>{
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