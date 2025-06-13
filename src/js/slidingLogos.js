function SlidingLogos() {
    const root = document.documentElement;
    const ElementsDisplayed = getComputedStyle(_self.root).getPropertyValue("--sliding-logos-elements-displayed");
    const content = document.querySelector("ul.sliding-logos-content");

    this.start = () => {
        root.style.setProperty("--sliding-logos-elements", content.children.length);

        for(let i = 0; i < ElementsDisplayed; i++) {
            content.appendChild(content.children[i].cloneNode(true));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slidingLogos = new SlidingLogos();
    slidingLogos.start();
});