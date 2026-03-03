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


const validateInputs = async () => {
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
       const donationDto = {
        campaignId : parseInt(sessionStorage.getItem('CampaignId')),
        amount : parseFloat(moneyValue),
        donorName : usernameValue,
        donorEmail : emailValue
       }
       try{
        const response = await fetch('https://localhost:7091/api/Donation',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donationDto)
            }
        );
        if(response.ok)
        {
            const result = await response.json();
                alert(`Hvala vam na donaciji, ${result.donorName}!`);
                form.reset();
        }
        else {
            const errorDetails = await response.json();
            console.log("Greška s backenda:", errorDetails);
        }
       }
       catch(error)
       {
        console.error("Greska sa backend")
       }
    }
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
};

const validateUsername = (username) => {
     return /^[A-Za-zČčĆćŽžŠšĐđ]+(\s[A-Za-zČčĆćŽžŠšĐđ]+)+$/.test(username);
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


///////////
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
                sessionStorage.setItem('CampaignId',1);
                window.location.href = homeButton.getAttribute('href');
            });
        }
    }
////////////


const lat = 15.50; 
const lng = 32.56;
const vrijemeText = document.getElementById('vrijeme');
if(vrijemeText)
{
async function dohvatiVrijeme() {
    const url = 'https://api.timezonedb.com/v2.1/get-time-zone?key=LGCDL1P7N8CB&format=json&by=position&lat=15.50&lng=32.56';

    try {
        const odgovor = await fetch(url);
        const podaci = await odgovor.json();

        if (podaci.status === "OK") {

            const samoVrijeme = podaci.formatted.split(' ')[1].substring(0, 5);
            vrijemeText.innerText = samoVrijeme;
        } 
        else {
            console.error("Greška");
        }
    } catch (greska) {
        console.error(greska);
    }
}
dohvatiVrijeme();
}
const temperaturaText = document.getElementById('temperatura');
if(temperaturaText)
{
async function dohvatiTemperaturu() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m`;
        try {
        const odgovor = await fetch(url);
        const podaci = await odgovor.json();
        const temperatura = podaci.current.temperature_2m;
        temperaturaText.innerText = temperatura + "°C";
       
    } catch (greska) {
        console.error(greska);
    }
}
dohvatiTemperaturu();
}
////////
const campaignImages = 
{
    "Sudan" : "../images/sudan.jpg",
    "Ukrajina" : "../images/ukrajina.png",
    "Afganistan" : "../images/afganistan.jpg",
    "Kongo" : "../images/kongo.png",
    "Sirija" : "../images/siria.png",
    "Brazil" : "../images/brazil.png"
}
const issueImages =
{
    "Epidemija" : "../images/epidemija.png",
    "Rat" : "../images/swords.png",
    "Zaštita djece" : "../images/child-abuse.png"
} 
function getImageByLocation(title)
{
    return campaignImages[title];
}
function getImagebyIssue(issue)
{
    return issueImages[issue];
}
async function dohvatiKampanje()
{
    try{
        const response = await fetch('https://localhost:7091/api/Campaign');
        if(response.ok){
            const kampanje = await response.json();
            kampanje.forEach(kampanja => {
                const imageSrc = getImageByLocation(kampanja.title);
                const issueSrc = getImagebyIssue(kampanja.descriptionIssue);
                CreateCampaign(kampanja,imageSrc,issueSrc);
            }
        );
        }
        else 
        { 
            const errorDetails = await response.json();
            console.log("Greška s backenda:", errorDetails);
        }
    }
    catch(error)
    {
        console.error("Greska sa backendom");
    }
}
function CreateCampaign(kampanja,imageSrc,issueSrc)
{
    const campaignsGrid = document.querySelector(".actionsGrid");
        const card = document.createElement('div');
        card.className = "actionCard cardMod";
        card.innerHTML =
        `
        <div class="mainPicture">
            <img src="${imageSrc}" alt="${kampanja.title} picture">
        </div>
        <div class="cardBody">
            <div class="contentType">
                <div class="issueType">
                    <img src="${issueSrc}" alt="${kampanja.descriptionIssue} icon">
                    <h2>${kampanja.descriptionIssue}</h2>
                </div>
                <div class="moneyStatus">
                    <img src="../images/money.png" alt="coins icon">
                    <h2>${kampanja.goalAmount}</h2>
                </div>
                <div class="actionsLocation">
                    <img src="../images/location-pin.png" alt="location Icon">
                    <h2>${kampanja.title}</h2>
                </div>
            </div>
            <div class="cardActivity">
                <a data-href="donation.html" class="buttonMain" data-campaign-id="${kampanja.id}">Pridruži se</a>
            </div>
        </div>
        `
        campaignsGrid.appendChild(card);
        const button = card.querySelector('.actionCard .cardActivity .buttonMain');
        button.addEventListener('click', (e) =>{
            e.preventDefault();
            const campaignId = button.getAttribute('data-campaign-id');
            const card = button.closest('.actionCard');
            const location = card.querySelector('.actionsLocation h2').innerText;
            const issue = card.querySelector('.issueType h2').innerText;
            sessionStorage.setItem('Lokacija', location);
            sessionStorage.setItem('Tip', issue);
            sessionStorage.setItem('CampaignId',campaignId);
            window.location.href = 'donation.html';
        })
}

const actionsGrid = document.querySelector('.actionsGrid');

if (actionsGrid) {
    dohvatiKampanje();
};