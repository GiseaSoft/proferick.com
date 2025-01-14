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
})

/****************************/
/*** Code Editor and Tabs ***/
/****************************/

let code_editors = document.querySelectorAll('.editor');

code_editors.forEach(editor => {
    let editorTabset = editor.querySelector('.editor_tabset');
    let editorTabs = editorTabset.querySelectorAll('li');
    let editorDisplay = editor.querySelector('.editor_display');
    let editorLanguages = editorDisplay.querySelectorAll('.editor_display-language');

    console.log(editorLanguages)

    editorTabs.forEach((tab, i) => {
        if (i === 0) {
            tab.setAttribute('aria-selected', 'true');
        } else {
            editorLanguages[i].setAttribute('hidden', '');
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

        editorLanguages.forEach(language => {
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