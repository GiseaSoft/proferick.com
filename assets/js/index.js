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

const accordions = document.querySelectorAll('.accordion');

accordions.forEach( acc => {
    const acc_item = acc.querySelectorAll('.accordion_item');
    console.log(acc)

    acc_item.forEach(item => {
        const item_head = item.querySelector('.accordion_item-head');
        const item_body = item.querySelector('.accordion_item-body');

        item_head.addEventListener('click', e => {
            item_body.classList.toggle('open')
        })
    })
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