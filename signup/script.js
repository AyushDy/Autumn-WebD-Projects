const form= document.querySelector('form');
const hideButton= document.querySelector('#hide');

const passwordField= document.querySelector('#pass');
const userNameField= document.querySelector('#name');
const emailField   = document.querySelector('#email');
const confirmField = document.querySelector('#confirm');


const hideIconPath= './images/eye-password-hide-svgrepo-com.svg'
const showIconPath= './images/eye-password-show-svgrepo-com.svg'




let hideStatus = true;

let userNameCheck = true;
let emailCheck = true;
let passwordCheck = true;
let confirmCheck = true;


hideButton.addEventListener('click',toggleHideStatus);
passwordField.addEventListener('input',checkPassword);
userNameField.addEventListener('input', checkUserName);
emailField.addEventListener('input',checkEmail);
confirmField.addEventListener('input', checkConfirm);


form.addEventListener('submit',(event)=>{
    event.preventDefault();

    if(userNameCheck && emailCheck && passwordCheck && confirmCheck){
        alert('form submitted succesfully');
    }
});




function checkConfirm(){
    const password= passwordField.value
    const confirmPass= confirmField.value
    const confDiv = document.querySelector('.confirm')

    if(!confirmPass){
        confDiv.textContent='';
        confirmField.style.borderColor='rgb(214, 208, 208)';
        return;
    }

    if(password==confirmPass){
        confirmCheck= true;
        confirmField.style.borderColor='green';
        confDiv.textContent='';
        return;
    }

    confirmCheck=false;
    confirmField.style.borderColor='red';
    confDiv.textContent='passwords do not match';
}


function checkEmail(){
    const email = emailField.value;
    
    if(email.length<1){
        emailField.style.borderColor='rgb(214, 208, 208)';
        document.querySelector('.email').textContent='';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        emailCheck = false;
        invalidEmail();
        return;
    }
    emailCheck= true;
    validEmail();
}

function validEmail(){
    emailField.style.borderColor='green';
    document.querySelector('.email').textContent='';
}

function invalidEmail(){
    emailField.style.borderColor='red';
    document.querySelector('.email').textContent='Invalid email';
}


function checkUserName(){
    const name = userNameField.value;

    if(!name){
        document.querySelector('.name').textContent='';
        userNameField.style.borderColor='rgb(214, 208, 208)';
        return;
    }
    if(name.length <3 || name.length >25){
        userNameCheck = false;
        invalidUserName();
        return;
    }
    userNameCheck=true;
    validUserName();
}

function validUserName(){
    const userDiv= document.querySelector('.name');
    userDiv.textContent='';
    userNameField.style.borderColor='green';
}

function invalidUserName(){
    const userDiv= document.querySelector('.name');
    userDiv.textContent= 'username must be of (3-25) characters';
    userNameField.style.borderColor= 'red';
}


function checkPassword(){
    let flag1=false
    let flag2 = false
    let flag3 = false
    let flag4 = false
    let flag5 = false

    const password= passwordField.value;
    if(!password){
        document.querySelector('.pass').textContent='';
        passwordField.style.borderColor='rgb(214, 208, 208)';
        return;
    }
    if(password.length>=8 && password.length <=18){
        flag1=true;
    }
    for(let i=0;i<password.length;i++){
        if(password[i]>='a' && password[i]<='z'){
            flag2= true;
        }
        if(password[i]>='A' && password[i]<='Z'){
            flag3= true;
        }
        if(password[i]>='0' && password[i]<='9'){
            flag5=true;
        }
    }

    let sym = '!@#$%^&*'

    for(let i =0;i<8;i++){
        if(password.includes(sym[i])){
            flag4= true;
        }
    }

    if(flag1==true && flag2==true && flag3==true && flag4==true && flag5==true){
        validPassword();
        passwordCheck=true;
        return;
    }
    else invalidPassword(flag1,flag2,flag3,flag4,flag5);
    passwordCheck=false;
}

function validPassword(){
    passwordField.style.borderColor = 'green';
    document.querySelector('.pass').textContent=''
}


function invalidPassword(f1, f2, f3 , f4,f5){
    let errorText = ''
    if(f1==false) errorText+= 'must be of 8-18 chars,'
    if(!(f1 && f2 && f3 && f4 && f5)){
        errorText+= ' must include'
    if(f2==false) errorText+= ', a lowercase char'
    if(f3==false) errorText+= ', an uppercase char'
    if(f5==false) errorText+= ', a digit(0-9)'
    if(f4==false) errorText+= ', a symbol (!@#$%^&*)'
    errorText+='.';
    }

    passwordField.style.borderColor='red';

    const passDiv= document.querySelector('.pass');

    passDiv.textContent=errorText;
}


function toggleHideStatus(){
    if(hideStatus===true){
        passwordField.setAttribute('type','text');
        hideStatus=false;
        hideButton.setAttribute('src',showIconPath);
    }else{
        passwordField.setAttribute('type','password');
        hideStatus=true;
        hideButton.setAttribute('src',hideIconPath)
    }
}