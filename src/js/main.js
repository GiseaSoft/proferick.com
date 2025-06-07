
/* JavaScript */
/*function setThemePreference() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Dark pleaseeee!!!!');
        return;
    }

    console.log('Lighter pleaseeeeee!!');
}
setThemePreference();*/

/*******************/
/*** Menu Button ***/
/*******************/
const primaryNav = document.querySelector('.primaryNav');
const menuButton = document.getElementById('menuButton');

menuButton.addEventListener('click', () => {
    primaryNav.toggleAttribute('aria-expanded');
    menuButton.toggleAttribute('aria-expanded');
});

/* Years Experience */
const yearsExperience = document.querySelectorAll('.years_experience');
yearsExperience.forEach(span => span.textContent = new Date().getFullYear() - 2015);

const yearsTeacher = document.getElementById('years_teacher');
yearsTeacher.textContent = new Date().getFullYear() - 2010;

const currentYear = document.getElementById('year_current');
currentYear.textContent = new Date().getFullYear();

/******************/
/*** Accordions ***/
/******************/
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion_item');

    items.forEach(item => {
        const itemHead = item.querySelector('.accordion_item-head');
        const itemBody = item.querySelector('.accordion_item-body');

        itemHead.addEventListener('click', () => {
            const isActive = itemBody.getAttribute('aria-expanded') === 'true';
            closeItemsInAccordion(accordion);
            itemHead.setAttribute('aria-selected', !isActive);
            itemBody.setAttribute('aria-expanded', !isActive);
        });
    });
});

const closeItemsInAccordion = (thisAccordion) => {
    const itemHeads = thisAccordion.querySelectorAll('.accordion_item-head');
    const itemBodies = thisAccordion.querySelectorAll('.accordion_item-body');

    itemHeads.forEach(item => item.removeAttribute('aria-selected'));
    itemBodies.forEach(item => item.removeAttribute('aria-expanded'));
};

/* Carousel Stack */
const root = document.documentElement;
const carouselTechElementsDisplayed = getComputedStyle(root).getPropertyValue("--carouselTech-elements-displayed");
const carouselTechContent = document.querySelector("ul.carouselTech-content");

root.style.setProperty("--carouselTech-elements", carouselTechContent.children.length);

for(let i=0; i<carouselTechElementsDisplayed; i++) {
  carouselTechContent.appendChild(carouselTechContent.children[i].cloneNode(true));
}

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