// ========================== toggle icon navbar ================================

let menuIcon = document.getElementById("menu-icon");
let navbar = document.getElementById("navbar");

menuIcon.addEventListener('click',() => {
    menuIcon.classList.toggle('fa-xmark');
    menuIcon.classList.toggle('fa-bars');
    navbar.classList.toggle('active');
});
// ================================ toggle mode ============================================
const toggle = document.getElementById('toggle');
const body = document.querySelector('body');
toggle.addEventListener('click', ()=>{
    toggle.classList.toggle('light');
    body.classList.toggle('light');
})
// ========================== scroll section active link ================================

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () =>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' +id+']').classList.add('active');
            });
        };
    });

    //=============================== sticky navbar =====================================
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY >100);
     //=============================== remove toggle icon and navbar =====================================
     menuIcon.classList.remove('fa-xmark');
     menuIcon.classList.add('fa-bars');
     navbar.classList.remove('active');

});
// ========================================== scroll reveal ====================================================
ScrollReveal({
    distance:'80px',
    duration: 2000,
    delay:200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .project-box, .contact form', { origin: 'bottum' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right'});

// ========================================== typed js ===============================================
const typed = new Typed('.multiple-text',{
    strings: ['Software Engineer', 'Full Stack Developer','Youtuber','Teacher'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay:1000,
    loop : true,
});

// ===================================== contact me ================================================

const form =document.querySelector('form');
const fullName =document.querySelector('#name');
const email =document.querySelector('#email');
const phone =document.querySelector('#phone');
const subject =document.querySelector('#subject');
const mess =document.querySelector('#message');

function checkInputs(){
    const items = document.querySelectorAll('.item');

    for(const item of items){
        if (item.value == ""){
            item.classList.add('error');
            item.parentElement.classList.add('error');
        }
        if (items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () =>{
            checkEmail();
        })

        item.addEventListener('keyup', ()=>{
            if (item.value != ""){
                item.classList.remove('error');
                item.parentElement.classList.remove('error');
            }
            else{
                item.classList.add('error');
                item.parentElement.classList.add('error');
            }
        });
    }
}

function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");
    }else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
   
    checkInputs();
    const isValid = checkInputs();
    if(isValid){
        sendEmail();
    }
});