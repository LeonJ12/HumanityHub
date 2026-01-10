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

const actionsGrid = document.querySelector('.actionsGrid');
if (actionsGrid) {
    const Buttons = document.querySelectorAll('.actionCard .cardActivity .buttonMain');
    Buttons.forEach(button => {
        button.addEventListener('click', (e) =>{
            e.preventDefault();
            const card = button.closest('.actionCard');
            const location = card.querySelector('.actionsLocation h2').innerText;
            const issue = card.querySelector('.issueType h2').innerText;
            sessionStorage.setItem('Lokacija', location);
            sessionStorage.setItem('Tip', issue);
            window.location.href = 'donation.html';
        })
    })
};
const donationForm = document.querySelector('.donationForm');
if (donationForm) {

        const savedLocation = sessionStorage.getItem('Lokacija');
        const savedType = sessionStorage.getItem('Tip');


        if (savedLocation && savedType) {
            const locationCell = document.getElementById('location');
            const typeCell = document.getElementById('type');
            locationCell.innerText = savedLocation; 
            typeCell.innerText = savedType;
        }
    };

const previewCard = document.querySelector('.previewCard');

    if (previewCard) {
        const homeButton = previewCard.querySelector('.buttonMain');

        if (homeButton) {
            homeButton.addEventListener('click', (e) => {
                e.preventDefault();

                sessionStorage.setItem('Lokacija', 'Sudan'); 
                sessionStorage.setItem('Tip', 'Zaštita djece');

                window.location.href = homeButton.getAttribute('href');
            });
        }
    }

const apiKey = 'LGCDL1P7N8CB';
const lat = 15.50; 
const lng = 32.56;

async function dohvatiVrijeme() {
    const url = 'https://api.timezonedb.com/v2.1/get-time-zone?key=LGCDL1P7N8CB&format=json&by=position&lat=15.50&lng=32.56';

    try {
        const odgovor = await fetch(url);
        const podaci = await odgovor.json();

        if (podaci.status === "OK") {

            const samoVrijeme = podaci.formatted.split(' ')[1].substring(0, 5);
            document.getElementById('vrijeme').innerText = samoVrijeme;
        } 
        else {
            console.error("Greška");
        }
    } catch (greska) {
        console.error(greska);
    }
}
async function dohvatiTemperaturu() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m`;
        try {
        const odgovor = await fetch(url);
        const podaci = await odgovor.json();
        const temperatura = podaci.current.temperature_2m;
        document.getElementById('temperatura').innerText = temperatura + "°C";
       
    } catch (greska) {
        console.error(greska);
    }
}
dohvatiVrijeme();
dohvatiTemperaturu();

