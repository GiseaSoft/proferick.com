/*******************/
/*** Menu Button ***/
/*******************/

const primaryNav = document.querySelector('.primaryNav');
const menuButton = document.getElementById('menuButton');

menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuButton.classList.toggle('open');
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



/****************************/
/*** Code Editor and Tabs ***/
/****************************/

let code_editors = document.querySelectorAll('.editor');

code_editors.forEach(editor => {
    let editorTabset  = editor.querySelector('.editor_tabset');
    let editorTabs    = editorTabset.querySelectorAll('li');
    let editorDisplay = editor.querySelector('.editor_display');
    let editorWindows = editorDisplay.querySelectorAll('.editor_window');

    editorTabs.forEach((tab, i) => {
        if (i === 0) {
            tab.setAttribute('aria-selected', 'true');
        } else {
            editorWindows[i].setAttribute('hidden', '');
        }
    });

    editorTabset.addEventListener('click', (e) => {
        e.preventDefault();
        let clickedLi = e.target.closest('li');
        if (!clickedLi) return;

        let clickedTab = clickedLi.querySelector('a');
        let activeLanguage = document.querySelector(clickedTab.getAttribute('href'));

        editorTabs.forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
        })

        editorWindows.forEach(language => {
            language.setAttribute('hidden', '');
        });

        activeLanguage.removeAttribute('hidden');
        clickedLi.setAttribute('aria-selected', 'true');
    });
});


/*******************/
/*** Back To Top ***/
/*******************/

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    scrollpos = window.scrollY;

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