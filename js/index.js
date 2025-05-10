/*******************/
/*** Menu Button ***/
/*******************/

const menuButton = document.getElementById('menuButton');
const primaryNav = document.querySelector('.primaryNav');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('menuOpen');
    primaryNav.classList.toggle('menuOpen');
});

/********************/
/*** Current Year ***/
/********************/

const year = document.getElementById('year');

year.innerText = new Date().getFullYear();

/*******************/
/*** Scroll Menu ***/
/*******************/

window.addEventListener('scroll', () => {
    scrollpos = window.scrollY;

    if (scrollpos >= 200) {
        backToTop.classList.remove('invisible');
    } else {
        backToTop.classList.add('invisible');
    }
});

/******************/
/*** Accordions ***/
/******************/

const accorion_tabs = document.querySelectorAll('.accordion_item-head');

accorion_tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const parentAccordion = tab.closest('.accordion');
        const container = tab.closest('.accordion_item');
        const current_item_body = container.querySelector('.accordion_item-body');
        const isExpanded = current_item_body.getAttribute('aria-expanded') === 'true';

        parentAccordion.querySelectorAll('.accordion_item-body[aria-expanded]').forEach(item_body => {
            if (item_body !== current_item_body) {
                item_body.removeAttribute('aria-expanded');
            }
        });

        parentAccordion.querySelectorAll('.accordion_item-head[aria-selected]').forEach(item_head => {
            if (item_head !== tab) {
                item_head.removeAttribute('aria-selected');
            }
        });

        tab.setAttribute('aria-selected', !isExpanded);
        current_item_body.setAttribute('aria-expanded', !isExpanded);
    });
});

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

backToTop.addEventListener('click', () => {
    document.querySelector('#content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});