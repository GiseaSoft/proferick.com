
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

/********************/
/*** Code Editors ***/
/********************/
let editors = document.querySelectorAll('.editor');

editors.forEach((editor, index) => {
    editor.setAttribute('id', `editor_${index}`);
    const name = editor.getAttribute('editor-name');
    const thisInstance = new CodeEditor(index, name);
    thisInstance.init();
})

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