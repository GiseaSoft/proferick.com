function InitAccordions() {
    var _self = this;

    this.id = '';
    this.accordions = document.querySelectorAll('.accordion');

    this.init = function() {
        _self.accordions.forEach(thisAccordion => {
            _self.id = thisAccordion.getAttribute('id');
            const items = thisAccordion.querySelectorAll('.accordion_item');
        
            items.forEach((item, index) => {    
                const itemHead = item.querySelector('.accordion_item-head');
                   
                itemHead.addEventListener('click', () => {
                    _self.activateTab(thisAccordion, item);
                });
            });

            _self.onStart();
        });
    };

    this.activateTab = function(thisAccordion, thisItem, scrollIntoView = false) {
        _self.closeOtherItems(thisAccordion);
        _self.openThisItem(thisAccordion, thisItem, scrollIntoView);
        //_self.updateUrl(thisItem.getAttribute('id'));
    };

    this.openThisItem = function(thisAccordion, thisItem, scrollIntoView) {
        const itemHead = thisItem.querySelector('.accordion_item-head');
        const itemBody = thisItem.querySelector('.accordion_item-body');
        const isActive = itemBody.getAttribute('aria-expanded') === 'true';

        itemHead.setAttribute('aria-selected', !isActive);
        itemBody.setAttribute('aria-expanded', !isActive);

        if (scrollIntoView) {
            thisAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    this.closeOtherItems = function(thisAccordion) {
        const itemHeads = thisAccordion.querySelectorAll('.accordion_item-head');
        const itemBodies = thisAccordion.querySelectorAll('.accordion_item-body');
    
        itemHeads.forEach(itemHead => itemHead.removeAttribute('aria-selected'));
        itemBodies.forEach(itemBody => itemBody.removeAttribute('aria-expanded'));
    };

    this.onStart = function() {
        const urlParams        = new URLSearchParams(window.location.search);
        const targetAccordion  = urlParams.get('tabset');
        const targetTab        = urlParams.get('tab');
        const scrollIntoView   = true;

        const thisAccordion = document.querySelector(`#${targetAccordion}`);
        const thisItem = document.querySelector(`#${targetTab}`);

        if (targetTab && targetAccordion=== _self.id) {
            _self.activateTab(thisAccordion, thisItem, scrollIntoView);
        }
    };

    this.updateUrl = function(targetTab) {
        const url = new URL(window.location);
        url.searchParams.set('tabset', _self.id);
        url.searchParams.set('tab', targetTab);
        history.replaceState(null, '', url);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const initAccordions = new InitAccordions();
    initAccordions.init();
});