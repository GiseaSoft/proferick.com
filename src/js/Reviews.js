function ReviewsSlider() {
    const _self = this;
    
    this.repeat = true;
    this.arrows = true;
    this.bullets = true;

    this.container = document.querySelector('.reviews-container');
    this.cards = _self.container.querySelectorAll('.review-card');
    this.totalCards = _self.cards.length - 1;
    this.currentCard = -1;

    /* *************** */
    /* Setup Functions */
    /* *************** */

    this.init = function() {
        _self.initBullets();
        _self.initArrows();
        _self.initStars();
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
    
        _self.cards.forEach((elem, i) => {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet')
            bullet.id = `bullet-index-${i}`
            bullet.addEventListener('click', () => {
                _self.goToIndexcards(i);
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
    
        leftArrow.classList.add('arrows');
        leftArrow.classList.add('arrow-left');
        leftArrow.appendChild(iLeft);
    
        leftArrow.addEventListener('click', () => {
            _self.slideLeft();
        });
    
        const rightArrow = document.createElement('button');
        const iRight = document.createElement('i');
    
        iRight.classList.add('fa');
        iRight.classList.add('fa-arrow-right');
    
        rightArrow.classList.add('arrows');
        rightArrow.classList.add('arrow-right');
        rightArrow.appendChild(iRight);
    
        rightArrow.addEventListener('click', () => {
            _self.slideRight();
        });
    
        _self.container.appendChild(leftArrow);
        _self.container.appendChild(rightArrow);
    }

    this.initStars = function() {
        _self.cards.forEach(card => {
            const starCount = parseInt(card.getAttribute('data-stars'));
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('review-stars');
            
            if (!starCount) return

            for (let i = 0; i < 5; i++) {
                let star = document.createElement('i');
                star.classList.add('fa-star');

                if (i < starCount) {
                    star.classList.add('fa-solid');
                } else {
                    star.classList.add('fa-regular');
                }

                starsContainer.appendChild(star);
            }

            card.querySelector('.review-head').appendChild(starsContainer);
        })
    }

    /* **************** */
    /* Update Functions */
    /* **************** */
    
    this.updateBullet = function() {
        _self.container.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === _self.currentCard) {
                elem.classList.add('active');
            }
        })

        if (!_self.repeat) {
            _self.stopRepeat();
        }
    }
    
    this.stopRepeat = function() {
        if (_self.currentCard === _self.cards.length - 1) {
            _self.cards[0].classList.add('not-visible');
            _self.cards[_self.cards.length - 1].classList.remove('not-visible');
            if (!_self.arrows) {
                _self.container.querySelector('.reviews-right').classList.add('not-visible');
                _self.container.querySelector('.reviews-left').classList.remove('not-visible');
            }
        }
        else if (_self.currentCard === 0) {
            _self.cards[_self.cards.length - 1].classList.add('not-visible');
            _self.cards[0].classList.remove('not-visible');

            if (!_self.arrows) {
                _self.container.querySelector('.reviews-left').classList.add('not-visible');
                _self.container.querySelector('.reviews-right').classList.remove('not-visible');
            }

        } else {
            _self.cards[_self.cards.length - 1].classList.remove('not-visible');
            _self.cards[0].classList.remove('not-visible');

            if (!_self.arrows) {
                _self.container.querySelector('.reviews-left').classList.remove('not-visible');
                _self.container.querySelector('.reviews-right').classList.remove('not-visible');
            }
        }
    }
    
    this.slideRight = function() {
        if (_self.currentCard < _self.totalCards) {
            _self.currentCard++;
        } else {
            _self.currentCard = 0;
        }
    
        if (_self.currentCard > 0) {
            var preactiveCard = _self.cards[_self.currentCard - 1];
        } else {
            var preactiveCard = _self.cards[_self.totalCards];
        }
    
        if (_self.currentCard < _self.totalCards) {
            var proactiveCard = _self.cards[_self.currentCard + 1];
        } else {
            var proactiveCard = _self.cards[0];
    
        }
    
        _self.cards.forEach((elem) => {
            var thisCard = elem;
            if (thisCard.classList.contains('preactivede')) {
                _self.cleanClasses(thisCard);
                thisCard.classList.add('proactivede');
            }
            if (thisCard.classList.contains('preactive')) {
                _self.cleanClasses(thisCard);
                thisCard.classList.add('preactivede');
            }
        });

        _self.updatecardss(preactiveCard, proactiveCard);
    }
    
    this.slideLeft = function() {
        if (_self.currentCard > 0) {
            _self.currentCard--;
        } else {
            _self.currentCard = _self.totalCards;
        }
    
        if (_self.currentCard < _self.totalCards) {
            var proactiveCard = _self.cards[_self.currentCard + 1];
        } else {
            var proactiveCard = _self.cards[0];
        }
    
        if (_self.currentCard > 0) {
            var preactiveCard = _self.cards[_self.currentCard - 1];
        } else {
            var preactiveCard = _self.cards[_self.totalCards];
        }
    
        _self.cards.forEach((elem) => {
            var thisCard = elem;
            
            if (thisCard.classList.contains('proactive')) {
                _self.cleanClasses(thisCard);
                thisCard.classList.add('proactivede');
            }
            if (thisCard.classList.contains('proactivede')) {
                _self.cleanClasses(thisCard);
                thisCard.classList.add('preactivede');
            }
        });
        
        _self.updatecardss(preactiveCard, proactiveCard);
    }

    this.goToIndexcards = function(index) {
        const slideTilYouGetThere = (_self.currentCard > index) ? () => _self.slideRight() : () => _self.slideLeft();
        while (_self.currentCard !== index) {
            slideTilYouGetThere();
        }
    }

    /* **************** */
    /* Helper Functions */
    /* **************** */

    this.updatecardss = function(preactiveCard, proactiveCard) {
        var activeCard = _self.cards[_self.currentCard];

        _self.cleanClasses(preactiveCard);
        preactiveCard.classList.add('preactive');
    
        _self.cleanClasses(activeCard);
        activeCard.classList.add('active');
    
        _self.cleanClasses(proactiveCard);
        proactiveCard.classList.add('proactive');
    
        
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