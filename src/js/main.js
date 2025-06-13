function LayoutManager() {
    this.init = () => {
        this.initMenu();
        this.initDates();
        this.initBackToTop();
        this.initTheme();
    }

    this.initMenu = () => {
        const primaryNav = document.querySelector('.primaryNav');
        const menuButton = document.getElementById('menuButton');
        const navLinks = primaryNav.querySelectorAll('a');

        menuButton.addEventListener('click', () => {
            primaryNav.toggleAttribute('aria-expanded');
            menuButton.toggleAttribute('aria-expanded');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.removeAttribute('aria-expanded');
                menuButton.removeAttribute('aria-expanded');
            });
        });
    }

    this.initDates = () => {
        const yearsExperience = document.querySelectorAll('.years_experience');
        yearsExperience.forEach(span => span.textContent = new Date().getFullYear() - 2015);
        
        const yearsTeacher = document.getElementById('years_teacher');
        yearsTeacher.textContent = new Date().getFullYear() - 2010;
        
        const currentYear = document.getElementById('year_current');
        currentYear.textContent = new Date().getFullYear();
    }
    
    this.initBackToTop = () => {
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
    }

    this.initTheme = () => {
        const theme_button = document.querySelector('.theme_button');
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

        prefersDarkScheme ? this.setTheme('theme-dark') : this.setTheme('theme-light');
        theme_button.addEventListener('click', this.switchTheme);
    }

    this.setTheme = preference => {
        const body = document.body;
        body.classList.remove('theme-light');
        body.classList.remove('theme-dark');

        (preference === 'theme-dark') ? body.classList.add(preference) : body.classList.add('theme-light')
    }

    this.switchTheme = () => {
        const body = document.body;
        body.classList.contains('theme-light') ? this.setTheme('theme-dark') : this.setTheme('theme-light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const layoutManager = new LayoutManager;
    layoutManager.init();
})



