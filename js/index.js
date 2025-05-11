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



/****************************/
/*** Code Editor and Tabs ***/
/****************************/

let code_editors = document.querySelectorAll('.editor');

code_editors.forEach(editor => {
    const editorTabset  = editor.querySelector('.editor_tabset');
    const editorTabs    = editorTabset.querySelectorAll('li');
    const editorDisplay = editor.querySelector('.editor_display');
    const editorWindows = editorDisplay.querySelectorAll('.editor_window');

    // for dragging the tabs
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    editorTabs.forEach((tab, i) => {
        if (i === 0) {
            tab.setAttribute('aria-selected', 'true');
        } else {
            editorWindows[i].setAttribute('hidden', '');
        }
    });

    editorTabset.addEventListener('click', (e) => {
        if (isDragging) return;

        const clickedLi = e.target.closest('li');
        const clickedTab = clickedLi.querySelector('span');
        const activeLanguage = document.querySelector(clickedTab.getAttribute('data-target'));

        if (!clickedLi) return;

        editorTabs.forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
        })

        editorWindows.forEach(language => {
            language.setAttribute('hidden', '');
        });

        activeLanguage.removeAttribute('hidden');
        clickedLi.setAttribute('aria-selected', 'true');
    });

    editorTabset.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - editorTabset.offsetLeft;
        scrollLeft = editorTabset.scrollLeft;
    });

    editorTabset.addEventListener('mouseleave', () => {
        isDown = false;
        editorTabset.classList.remove('dragging');
    });

    editorTabset.addEventListener('mouseup', () => {
        isDown = false;
        isDragging = false;
        editorTabset.classList.remove('dragging');
    });

    editorTabset.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        editorTabset.classList.add('dragging');
        const x = e.pageX - editorTabset.offsetLeft;
        const walk = x - startX;
        editorTabset.scrollLeft = scrollLeft - walk;
    });

    // Evitar que se activen los links si se está arrastrando
    editorTabset.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (e) => {
            if (isDragging) e.preventDefault();
        });
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