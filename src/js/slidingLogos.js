function SlidingLogos() {
    var _self = this;

    this.root = document.documentElement;
    this.slidingLogosElementsDisplayed = getComputedStyle(_self.root).getPropertyValue("--sliding-logos-elements-displayed");
    this.slidingLogosContent = document.querySelector("ul.sliding-logos-content");

    this.init = function() {
        _self.root.style.setProperty("--sliding-logos-elements", _self.slidingLogosContent.children.length);

        for(let i=0; i<_self.slidingLogosElementsDisplayed; i++) {
            _self.slidingLogosContent.appendChild(_self.slidingLogosContent.children[i].cloneNode(true));
        }
    }
}

const slidingLogos = new SlidingLogos();

slidingLogos.init();