function initDraggableHorizontal() {
    let draggables = document.querySelectorAll('.draggable-horizontal');
    let isDown = false;
    let startX, scrollLeft, isDragging = false;

    draggables.forEach(draggable => {
        draggable.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            startX = e.pageX - draggable.offsetLeft;
            scrollLeft = draggable.scrollLeft;
        });

        draggable.addEventListener('mouseleave', () => {
            isDown = false;
            draggable.classList.remove('dragging');
        });

        draggable.addEventListener('mouseup', () => {
            isDown = false;
            isDragging = false;
            draggable.classList.remove('dragging');
        });

        draggable.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            isDragging = true;
            draggable.classList.add('dragging');
            const x = e.pageX - draggable.offsetLeft;
            const walk = x - startX;
            draggable.scrollLeft = scrollLeft - walk;
        });
    })
}

initDraggableHorizontal();

function hijackSelfLinks() {
    let links = document.querySelectorAll('a[target="_self"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const param = link.getAttribute('href');
            const url = new URL(window.location);

            url.search = param;

            history.replaceState(null, '', url);
            
            window.dispatchEvent(new Event('url-change'));
        });
    });
}

hijackSelfLinks();

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
let editorInstances = [];

editors.forEach((editor, index) => {
    editor.setAttribute('id', `editor_${index}`);
    const name = editor.getAttribute('editor-name');
    const instance = new CodeEditor(index, name);
    editorInstances.push(instance);
})

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