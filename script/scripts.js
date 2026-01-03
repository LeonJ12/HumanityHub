const form = document.querySelector('.donationForm');
const username = document.getElementById('username');
const money = document.getElementById('Amount');
const email = document.getElementById('email');

if(form){
    form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});
}


const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const moneyValue = money.value.trim();
    let isValid = true;

    if(usernameValue === ''){
        setError(username, 'Upisi ime i prezime');
        isValid = false;
    }else if(!validateUsername(usernameValue)) {
        setError(username,'Moraš napisati ime i prezime pravilno');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if(emailValue === ''){
        setError(email,'Unesi email adresu');
        isValid = false;
    }else if(!validateEmail(emailValue))
    {
        setError(email,'Unesi pravilnu email adresu');
        isValid = false;
    }else {
        setSuccess(email);
    }

    if(moneyValue === '')
    {
        setError(money,'Odaberi koliko želiš donirati');
        isValid =false;
    }else if(!validateMoney(moneyValue))
    {
        setError(money,'Pogrešan unos');
        isValid = false;
    }else {
        setSuccess(money);
    }

    if(isValid)
    {
        alert('Uspješno poslano, hvala vam');
    }
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
};

const validateUsername = (username) => {
    if(!username.includes(' '))
    {
        return false;
    }
    const wordParts = username.split(' ');
    for(let part of wordParts)
    {
        for(let char of part)
        {
            if (
                (char < 'A' || char > 'Z') &&
                (char < 'a' || char > 'z')
            ) {
                return false;
            }
        }
    }
    return true;
};

const validateMoney = (money) => {
    return money > 0;
};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    if (errorDisplay) {
        errorDisplay.innerText = message;
    }
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    if (errorDisplay) {
        errorDisplay.innerText = '';
    }
};

const toTopButton = document.querySelector('#buttonTop');

document.addEventListener('scroll', () =>{
    if(window.scrollY > 300){
        toTopButton.classList.add('show');
    }else {
        toTopButton.classList.remove('show');
    }
});

toTopButton.addEventListener('click', (e) =>{
    e.preventDefault();
    window.scrollTo({
        top: 0
    })
});


const hambMeni = document.querySelector(".hamburger");
const nav = document.querySelector(".navContent");

const navLinks = document.querySelectorAll(".navContent a");

hambMeni.addEventListener("click",() =>{
    hambMeni.classList.toggle('active');
    nav.classList.toggle('active');
});

navLinks.forEach(element => {
    element.addEventListener("click", () =>{
    hambMeni.classList.remove('active');
    nav.classList.remove('active');
    })
});

