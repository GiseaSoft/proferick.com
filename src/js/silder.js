function ReviewsSlider() {
    const _self = this;
    
    this.repeat = true;
    this.arrows = true;
    this.bullets = true;

    this.container = document.querySelector('.slider-container');
    this.slide = _self.container.querySelectorAll('.slider-single');
    this.slideTotal = _self.slide.length - 1;
    this.slideCurrent = -1;

    /* *************** */
    /* Setup Functions */
    /* *************** */

    this.init = function() {
        _self.initBullets();
        _self.initArrows();
        setTimeout(function () {
            _self.slideRight();
        }, 500);
    }

    this.initBullets = function() {
        if (!_self.bullets) {
            return;
        }
    
        const bulletContainer = document.createElement('div');
        bulletContainer.classList.add('bullet-container');
    
        _self.slide.forEach((elem, i) => {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet')
            bullet.id = `bullet-index-${i}`
            bullet.addEventListener('click', () => {
                _self.goToIndexSlide(i);
            })
            bulletContainer.appendChild(bullet);
            elem.classList.add('proactivede');
        });
    
        _self.container.appendChild(bulletContainer);
    }
    
    this.initArrows = function() {
        if (!_self.arrows) {
            return;
        }
    
        const leftArrow = document.createElement('button');
        const iLeft = document.createElement('i');
    
        iLeft.classList.add('fa');
        iLeft.classList.add('fa-arrow-left');
    
        leftArrow.classList.add('slider-left');
        leftArrow.appendChild(iLeft);
    
        leftArrow.addEventListener('click', () => {
            _self.slideLeft();
        });
    
        const rightArrow = document.createElement('button');
        const iRight = document.createElement('i');
    
        iRight.classList.add('fa');
        iRight.classList.add('fa-arrow-right');
    
        rightArrow.classList.add('slider-right');
        rightArrow.appendChild(iRight);
    
        rightArrow.addEventListener('click', () => {
            _self.slideRight();
        });
    
        _self.container.appendChild(leftArrow);
        _self.container.appendChild(rightArrow);
    }

    /* **************** */
    /* Update Functions */
    /* **************** */
    
    this.updateBullet = function() {
        _self.container.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === _self.slideCurrent) {
                elem.classList.add('active');
            }
        })

        if (!_self.repeat) {
            _self.stopRepeat();
        }
    }
    
    this.stopRepeat = function() {
        if (_self.slideCurrent === _self.slide.length - 1) {
            _self.slide[0].classList.add('not-visible');
            _self.slide[_self.slide.length - 1].classList.remove('not-visible');
            if (!_self.arrows) {
                _self.container.querySelector('.slider-right').classList.add('not-visible');
                _self.container.querySelector('.slider-left').classList.remove('not-visible');
            }
        }
        else if (_self.slideCurrent === 0) {
            _self.slide[_self.slide.length - 1].classList.add('not-visible');
            _self.slide[0].classList.remove('not-visible');

            if (!_self.arrows) {
                _self.container.querySelector('.slider-left').classList.add('not-visible');
                _self.container.querySelector('.slider-right').classList.remove('not-visible');
            }

        } else {
            _self.slide[_self.slide.length - 1].classList.remove('not-visible');
            _self.slide[0].classList.remove('not-visible');

            if (!_self.arrows) {
                _self.container.querySelector('.slider-left').classList.remove('not-visible');
                _self.container.querySelector('.slider-right').classList.remove('not-visible');
            }
        }
    }
    
    this.slideRight = function() {
        if (_self.slideCurrent < _self.slideTotal) {
            _self.slideCurrent++;
        } else {
            _self.slideCurrent = 0;
        }
    
        if (_self.slideCurrent > 0) {
            var preactiveSlide = _self.slide[_self.slideCurrent - 1];
        } else {
            var preactiveSlide = _self.slide[_self.slideTotal];
        }
    
        if (_self.slideCurrent < _self.slideTotal) {
            var proactiveSlide = _self.slide[_self.slideCurrent + 1];
        } else {
            var proactiveSlide = _self.slide[0];
    
        }
    
        _self.slide.forEach((elem) => {
            var thisSlide = elem;
            if (thisSlide.classList.contains('preactivede')) {
                _self.cleanClasses(thisSlide);
                thisSlide.classList.add('proactivede');
            }
            if (thisSlide.classList.contains('preactive')) {
                _self.cleanClasses(thisSlide);
                thisSlide.classList.add('preactivede');
            }
        });

        _self.updateSlides(preactiveSlide, proactiveSlide);
    }
    
    this.slideLeft = function() {
        if (_self.slideCurrent > 0) {
            _self.slideCurrent--;
        } else {
            _self.slideCurrent = _self.slideTotal;
        }
    
        if (_self.slideCurrent < _self.slideTotal) {
            var proactiveSlide = _self.slide[_self.slideCurrent + 1];
        } else {
            var proactiveSlide = _self.slide[0];
        }
    
        if (_self.slideCurrent > 0) {
            var preactiveSlide = _self.slide[_self.slideCurrent - 1];
        } else {
            var preactiveSlide = _self.slide[_self.slideTotal];
        }
    
        _self.slide.forEach((elem) => {
            var thisSlide = elem;
            
            if (thisSlide.classList.contains('proactive')) {
                _self.cleanClasses(thisSlide);
                thisSlide.classList.add('proactivede');
            }
            if (thisSlide.classList.contains('proactivede')) {
                _self.cleanClasses(thisSlide);
                thisSlide.classList.add('preactivede');
            }
        });
        
        
        _self.updateSlides(preactiveSlide, proactiveSlide);
    }

    this.goToIndexSlide = function(index) {
        const sliding = (_self.slideCurrent > index) ? () => _self.slideRight() : () => _self.slideLeft();
        while (_self.slideCurrent !== index) {
            sliding();
        }
    }

    /* **************** */
    /* Helper Functions */
    /* **************** */

    this.updateSlides = function(preactiveSlide, proactiveSlide) {
        var activeSlide = _self.slide[_self.slideCurrent];

        _self.cleanClasses(preactiveSlide);
        preactiveSlide.classList.add('preactive');
    
        _self.cleanClasses(activeSlide);
        activeSlide.classList.add('active');
    
        _self.cleanClasses(proactiveSlide);
        proactiveSlide.classList.add('proactive');
    
        
        if (_self.bullets) {
            _self.updateBullet();
        }
    }

    this.cleanClasses = function(elem) {
        elem.classList.remove('preactivede');
        elem.classList.remove('preactive');
        elem.classList.remove('active');
        elem.classList.remove('proactive');
        elem.classList.remove('proactivede');
    }
}

const reviewsSlider = new ReviewsSlider();
reviewsSlider.init();