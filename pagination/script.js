const dataContainer = document.querySelector('.content');
const pageIndexContainer = document.querySelector('.page-index');
let pageIndexBoxes= []
let leftButton;
let rightButton;

const submitButton =  document.querySelector('button');

const dataCountField = document.querySelector('#data-count')
const itemsPerPageField = document.querySelector('select');




let dummyData = [];
let noOfItems = 0;
let itemsPerPage= 0;
let currentPage = 0;
let totalPages = 0;



dataCountField.addEventListener('input',()=>{
    let value = parseInt(dataCountField.value);
    console.log(value);
    console.log(submitButton);
    if(!isNaN(value)){
        submitButton.style.display = 'block';
    }else{
        submitButton.style.display = 'none';
    }
})


itemsPerPageField.addEventListener('click',updateItemsPerPage)

function updateItemsPerPage(){
    const options = document.querySelectorAll('option');
    options.forEach(opt=>{
        if(opt.selected){
            itemsPerPage = parseInt(opt.value);
        }
    })
    noOfPages =  Math.ceil(noOfItems/itemsPerPage)
    currentPage = Math.min(noOfPages, currentPage);
    renderPageBoxes();
    updateActive();
}


submitButton.addEventListener('click',()=>{
    let totalItems= parseInt(dataCountField.value);
    noOfItems = 200;
    currentPage = 1;
    updateItemsPerPage();
    totalPages =  Math.ceil(noOfItems/itemsPerPage);
    if(totalItems!=NaN && totalItems != null){
       noOfItems = totalItems;
       totalPages =  Math.ceil(noOfItems/itemsPerPage);
    }
    makeData();
    renderPageBoxes();
});


function addEvents(){
    pageIndexBoxes.forEach(box=>{
        box.addEventListener('click',()=>{
            let page = parseInt(box.innerText);
            currentPage = page;
            renderPageBoxes();
            updateActive();
        })
    });
    leftButton.addEventListener('click',goLeft);
    rightButton.addEventListener('click',goRight);
}

function updateActive(){
    pageIndexBoxes.forEach(item=>{
        if(item.innerText == currentPage){
            item.classList.add("active");
        }else {
            item.classList.remove("active");
        }
    })
}

function renderPage(){
    let dataToDisplay = [];
    let startIndex = Math.min(noOfItems, itemsPerPage*(currentPage-1));
    let endIndex = Math.min(noOfItems, (currentPage)*itemsPerPage);
    dataToDisplay = dummyData.slice(startIndex, endIndex );

    renderData(dataToDisplay);
}


function renderData(data){
    dataContainer.innerHTML = '';
    data.forEach(item=>{
        const dataDiv = createDiv(item);
        dataContainer.appendChild(dataDiv);
    })
    console.log(dataContainer);
}


function renderPageBoxes(){
    pageIndexContainer.innerHTML = "";
    noOfPages = Math.ceil(noOfItems/itemsPerPage);

    pageIndexContainer.appendChild(addLeft());
    let maxPagesToDisplay= 5;
    let halfMax= Math.floor(maxPagesToDisplay/2);

    if(noOfPages<=maxPagesToDisplay){
        for(let i=1;i<=noOfPages;i++){
            pageIndexContainer.appendChild(addPageBox(i));
        }
    }else{
        let startPage = Math.max(1,currentPage-halfMax);
        let endpage = Math.min(noOfPages, currentPage+halfMax);

        if(startPage <= halfMax){
            startPage=1;
            endpage = maxPagesToDisplay;
        }else if(startPage >= noOfPages-halfMax){
            startPage = noOfPages-maxPagesToDisplay+1;
            endpage = noOfPages;
        }

        if(startPage>1){
            pageIndexContainer.appendChild(addPageBox(1));
            if(startPage>2){
                pageIndexContainer.appendChild(addDotBox());
            }
        }

        for(let i=startPage;i<= endpage;i++){
            pageIndexContainer.appendChild(addPageBox(i));
        }

        if(endpage< noOfPages){
            if(endpage<noOfPages-1){
                pageIndexContainer.appendChild(addDotBox());
            }
            pageIndexContainer.appendChild(addPageBox(noOfPages));
        }
    }
    
    pageIndexContainer.appendChild(addRight());
    pageIndexBoxes = document.querySelectorAll('.index-box');
    renderPage();
    addEvents();
    updateActive();
}

function goLeft(){
    currentPage = Math.max(1, currentPage-1);
    renderPageBoxes();
    updateActive();
}


function goRight(){
    currentPage = Math.min(noOfPages, currentPage+1);
    renderPageBoxes();
    updateActive();
}

function addLeft(){
    const box= document.createElement('div');
    box.classList.add("left");
    box.innerText = "<";
    leftButton = box;
    return box;
}

function addRight(){
    const box= document.createElement('div');
    box.classList.add("right");
    box.innerText = ">";
    rightButton =box;
    return box;
}

function addPageBox(page){
    const box= document.createElement('div');
    box.classList.add("index-box");
    box.innerText = `${page}`;
    return box;
}

function addDotBox(){
    const box= document.createElement('div');
    box.classList.add("dot-box");
    box.innerText = `...`;
    return box;
}


function createDiv(item){
    const box= document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    h3.innerText = item.name;
    p.innerText = item.info;
    box.appendChild(h3);
    box.appendChild(p);
    box.classList.add("box");

    return box;
}



function makeData(){
    dummyData = [];
    for(let i=1;i<= noOfItems;i++){
        let obj= {
            name :`Student ${i}`,
            info : `misc info ${i}`
        }
        dummyData.push(obj);
    }
}

