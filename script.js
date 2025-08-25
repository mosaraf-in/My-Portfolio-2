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

// Initialize EmailJS
emailjs.init("cNq2-Zipj3Y57uMns");

const form = document.getElementById('contact-form');
const submit = document.getElementById("submit");
const msg = document.getElementById("msg");

const fullName = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const subject = document.querySelector('#subject');
const mess = document.querySelector('#message');

function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (email.value.trim() === "") {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        return false;
    } else if (!emailRegex.test(email.value.trim())){
        email.classList.add("error");
        email.parentElement.classList.add("error");
        return false;
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        return true;
    }
}

function checkInputs(){
    const items = [fullName,email,phone,subject,mess];
    let isValid = true;

    items.forEach(item =>{
        if (item.value.trim() === ""){
            item.classList.add('error');
            item.parentElement.classList.add('error');
            isValid = false;
        } else {
            item.classList.remove('error');
            item.parentElement.classList.remove('error');
        }
    });

    if (!checkEmail()) isValid = false;
    return isValid;
}

async function sendEmailJS(){
    try {
        await emailjs.sendForm("service_l9fcpdq", "template_4lscnv4", form);

        msg.className = "success";
        form.reset();

        // ✅ Popup Message
        showPopup("✅ Message sent successfully!");
    } catch (err) {
        msg.className = "error";
        msg.textContent = "❌ Failed to send. Please try again.";
        console.error(err);

        // ❌ Popup Error
        showPopup("❌ Failed to send. Please try again.");
    } finally {
        msg.classList.remove("hidden");
        submit.disabled = false;
        submit.textContent = "Send Message";
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();

    // bot check (honeypot filled => ignore)
    if (form._honey.value) return;

    submit.disabled = true;
    submit.textContent = "Sending...";

    if (checkInputs()){
        sendEmailJS();
    } else {
        submit.disabled = false;
        submit.textContent = "Send Message";
    }
});

// ---------- Real-time Error Handling ----------

// অন্যান্য input ফিল্ড (type করলে error clear হবে)
[fullName, phone, subject, mess].forEach(item =>{
    item.addEventListener('keyup', ()=>{
        if (item.value.trim() !== ""){
            item.classList.remove('error');
            item.parentElement.classList.remove('error');
        }
    });
});

// Email ফিল্ড (valid না হওয়া পর্যন্ত error থাকবে)
email.addEventListener('keyup', ()=>{
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (!emailRegex.test(email.value.trim())){
        email.classList.add("error");
        email.parentElement.classList.add("error");
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
});

// ---------- Popup Function ----------
function showPopup(message){
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.className = "popup-message"; // সব style CSS থেকে আসবে

    document.body.appendChild(popup);

    // fade in
    setTimeout(()=>{ popup.classList.add("show"); }, 50);

    // fade out + remove
    setTimeout(()=>{
        popup.classList.remove("show");
        setTimeout(()=> popup.remove(), 400);
    }, 3000);
}