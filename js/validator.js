function formValidator () {
    const self = this;
    
    self.init = function () {
        self.validate();
    }

    self.validatedInputs = {
        firstName: false,
        email: false,
        phone: false,
        comments: false
    }

    self.allTrue = function (obj) {
        for (let key in obj) {
            if(obj.hasOwnProperty(key)){
                if(!obj[key]){
                    return false;
                }
            }
        }
        return true;
    }

    self.validate = function () {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const formInputs = contactForm.querySelectorAll('input:not([type="submit"]), textarea');
        const submitButton = contactForm.querySelector('input[type="submit"]')

        const regExpForms = {
            firstName: /^[\p{L}\p{M}\s]{2,16}$/u,
            lastName: /^[\p{L}\p{M}\s]{2,16}$/u,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^\+?[1-9](?:\d\s?){7,15}$/,
            propertyName: /^[\p{L}\p{M}\s]{5,30}$/u,
            propertyLocation: /^[\p{L}\p{M}\s]{5,30}$/u,
            comments: /^[\p{L}\p{M}\p{N}\p{P}\p{S}\p{Z}\n\r\t]{0,250}$/u,
            captcha: /^[\p{L}\p{M}\p{N}\p{P}\p{S}\p{Z}\n\r\t]{1,30}$/u
        }

        const validateThisInput = function (expression, input, inputName) {
            if ( expression.test(input.value) ) {
                input.removeAttribute('aria-invalid');
                self.validatedInputs[inputName] = true;
                submitButton.removeAttribute('disabled');
            } else {
                input.setAttribute('aria-invalid', 'true');
                self.validatedInputs[inputName] = false;
            }
        }

        // Add event listeners to inputs, if the input has content it will directly evaluate it. Comments area must to be evaluated on input
        formInputs.forEach( function (input) {
            if (input.value.trim() !== "") validateThisInput(regExpForms[input.name], input, input.name);

            if (input.name === 'comments') {
                validateThisInput(regExpForms[input.name], input, input.name);
                input.addEventListener('input', function (e) {validateThisInput(regExpForms[e.target.name], e.target, e.target.name)} );
            }

            input.addEventListener('blur', function (e) {validateThisInput(regExpForms[e.target.name], e.target, e.target.name)} );
            input.addEventListener('wheel', function(e) {e.preventDefault();}); // Prevents from accidentally changing numbers with mouse wheel
        })

        contactForm.addEventListener('submit', function (e) {
            if(self.allTrue(self.validatedInputs)){
                submitButton.removeAttribute('disabled');
            } else {
                e.preventDefault();
                submitButton.setAttribute('disabled', 'true');
            }
        });
    }
}

const myFormValidator = new formValidator();

myFormValidator.init();