/*******************/
/*** Menu Button ***/
/*******************/

const primaryNav = document.querySelector('.primaryNav');
const menuButton = document.getElementById('menuButton');

menuButton.addEventListener('click', () => {
    primaryNav.toggleAttribute('aria-expanded');
    menuButton.toggleAttribute('aria-expanded');
});

/*************/
/*** Dates ***/
/*************/

const yearsExperience = document.querySelectorAll('.years_experience');
yearsExperience.forEach(span => span.textContent = new Date().getFullYear() - 2015);

const yearsTeacher = document.getElementById('years_teacher');
yearsTeacher.textContent = new Date().getFullYear() - 2010;

const currentYear = document.getElementById('year_current');
currentYear.textContent = new Date().getFullYear();

/*******************/
/*** Back To Top ***/
/*******************/

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    let scrollpos = window.scrollY;

    if (scrollpos >= 200) {
        backToTop.setAttribute('aria-hidden', 'false');
    } else {
        backToTop.setAttribute('aria-hidden', 'true');
    }
});

backToTop.addEventListener('click', () => {
    document.querySelector('#content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});