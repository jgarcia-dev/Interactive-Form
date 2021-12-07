const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const otherJobInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const colorOptions = document.getElementById('color').options;
const activitiesFieldset = document.getElementById('activities');
const activitiesCostP = document.getElementById('activities-cost');
const creditCard = document.getElementById('credit-card');
const paymentSelect = document.getElementById('payment');
const expMonth = document.getElementById('exp-month');
const expYear = document.getElementById('exp-year');
const ccNumInput = document.getElementById('cc-num');
const zipNumInput = document.getElementById('zip');
const cvvNumInput = document.getElementById('cvv');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const confForm = document.querySelector('form');


// on form load
nameInput.focus();
otherJobInput.hidden = true;
colorSelect.disabled = true;
paymentSelect.selectedIndex = 1;
paypal.hidden = true;
bitcoin.hidden = true;


// HELPER FUNCTIONS
// =========================================================================
function totalSelectedActivities(activities) {
    let total = 0;
    for (activity of activities) {
        if (activity.checked === true) {
        total += parseFloat(activity.getAttribute('data-cost'));
        }
    }
    return total;
}

function enableTimeConflicts(selectedActivity, allActivities) {
    for (activity of allActivities) {
        if (activity.disabled === true) {
            if (activity.getAttribute('data-day-and-time') === selectedActivity.getAttribute('data-day-and-time')) {
                activity.disabled = false;
                activity.parentElement.classList.toggle('disabled');
            }
        }
    }
}

function disableTimeConflicts(selectedActivity, allActivities) {
    for (activity of allActivities) {
        if (activity.checked === false) {
            if (activity.getAttribute('data-day-and-time') === selectedActivity.getAttribute('data-day-and-time')) {
                activity.disabled = true;
                activity.parentElement.classList.toggle('disabled');
            }
        }
    }
}

function showErrors(warnElement, hintElement = undefined, errorMgsArr = []) {
    warnElement.classList.add('not-valid');
    warnElement.classList.remove('valid');
    if (hintElement) {
        hintElement.classList.remove('hint');
    }
    if (errorMgsArr.length > 0) {
        hintElement.innerText = `Errors: ${errorMgsArr.join(', ')}`;
    }
}

function resolveErrors(warnElement, hintElement = undefined) {
    warnElement.classList.remove('not-valid');
    warnElement.classList.add('valid');
    if (hintElement) {
        hintElement.classList.add('hint');
    }
}


// VALIDATION FUNCTIONS
// =========================================================================

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
function isValidNameInput(element) {
    const name = element.value.trim();
    const warningElement = element.parentElement;
    const hintElement = element.nextElementSibling;

    const isValidName = name.length > 0;
    
    if (isValidName) {
        resolveErrors(warningElement, hintElement);
        return true;
    } else {
        showErrors(warningElement, hintElement);
        return false;
    }
}

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
// error messages vary depending on what input is missing
function isValidEmailInput(element) {
    const email = element.value;
    const warningElement = emailInput.parentElement;
    const hintElement = emailInput.nextElementSibling;
    const emailErrors = [];

    const isValidEmailUserName = /^(\w+)/.test(email);
    const isAtSymbolInEmail = /\@/.test(email);
    const isValidEmailDomain = /(\w+)\.(com)$/.test(email);

    if (isValidEmailUserName === false) {
        emailErrors.push('invalid username');
    }

    if (isAtSymbolInEmail === false) {
        emailErrors.push('missing @ symbol');
    }

    if (isValidEmailDomain === false) {
        emailErrors.push('invalid email domain');
    }

    if (emailErrors.length === 0) {
        resolveErrors(warningElement, hintElement);
        return true;
    } else {
        showErrors(warningElement, hintElement, emailErrors);
        return false;
    }
} 

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
function isActivitySelected(element) {
    const warnElement = element;
    const hintElement = element.lastElementChild;
    const activities = element.querySelectorAll('input');

    for (activity of activities) {
        if (activity.checked) {
            resolveErrors(warnElement, hintElement);
            return true;
        }
    }
    
    showErrors(warnElement, hintElement);
    return false;
}

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
function isValidExpSelection(element) {
    const warnElement = element.parentElement;

    if (element.selectedIndex > 0) {
        resolveErrors(warnElement);
        return true;
    } else {
        showErrors(warnElement);
        return false;
    }
}

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
function isValidCreditCardInput(element) {
    const ccNum = element.value;
    const warningElement = element.parentElement;
    const hintElement = element.nextElementSibling;

    const isValidCCNum = /^[0-9]{13,16}$/.test(ccNum);
    
    if (isValidCCNum) {
        resolveErrors(warningElement, hintElement);
        return true;
    } else {
        showErrors(warningElement, hintElement);
        return false;
    }
}

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
function isValidZipCodeInput(element) {
    const zipNum = element.value;
    const warningElement = element.parentElement;
    const hintElement = element.nextElementSibling;

    const isValidZipCode = /^[0-9]{5}$/.test(zipNum);
    
    if (isValidZipCode) {
        resolveErrors(warningElement, hintElement);
        return true;
    } else {
        showErrors(warningElement, hintElement);
        return false;
    }
}

// returns boolean result of validation
// shows errors messages if validation fails, otherwise resolves them
function isValidCvvInput(element) {
    const cvvNum = element.value;
    const warningElement = element.parentElement;
    const hintElement = element.nextElementSibling;

    const isValidCvvNum = /^[0-9]{3}$/.test(cvvNum);
    
    if (isValidCvvNum) {
        resolveErrors(warningElement, hintElement);
        return true;
    } else {
        showErrors(warningElement, hintElement);
        return false;
    }
}

// returns true if correct payment type and its corresponding inputs are valid
function isPaymentInfoCorrect(element) {
    const paymentType = element.value;

    if (paymentType === 'credit-card') {
        const isExpMonthSelected = isValidExpSelection(expMonth),
              isExpYearSelected = isValidExpSelection(expYear),
              isCCNumValid = isValidCreditCardInput(ccNumInput),
              isZipCodeValid = isValidZipCodeInput(zipNumInput),
              isCvvValid = isValidCvvInput(cvvNumInput);

        const isCCPaymentInfoCorrect = isExpMonthSelected && isExpYearSelected && isCCNumValid && isZipCodeValid && isCvvValid;

        if (isCCPaymentInfoCorrect) {
            return true;
        } else {
            return false;
        }
    } else if (paymentType === 'paypal' || paymentType === 'bitcoin') {
        return true
    } else {
        return false;
    }
}


// EVENT LISTENERS
// =========================================================================

// Basic Info section event listeners 
// ===================================
nameInput.addEventListener('keyup', ()=> {
    isValidNameInput(nameInput);
});

nameInput.addEventListener('blur', ()=> {
    isValidNameInput(nameInput);
});

emailInput.addEventListener('keyup', ()=> {
    isValidEmailInput(emailInput);
});

jobRoleSelect.addEventListener('change', () => {

    // show or hide other job based on job role
    if (jobRoleSelect.value === 'other') {
        otherJobInput.hidden = false;
    } else {
        otherJobInput.hidden = true;
    }
});


// T-shirt Info section event listener 
// ===================================
designSelect.addEventListener('change', () => {
    colorSelect.disabled = false;
    const selectedTheme = designSelect.value;

    // change shirt color options based on selected theme
    if (selectedTheme === 'js puns') {
        for (option of colorOptions) {
            if (option.getAttribute('data-theme') === selectedTheme) {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }
        colorSelect.selectedIndex = 1;
    } else if (selectedTheme === 'heart js') {
        for (option of colorOptions) {
            if (option.getAttribute('data-theme') === selectedTheme) {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }
        colorSelect.selectedIndex = 4;
    }
});


// Register for Activities section event listeners
// ===============================================
activitiesFieldset.addEventListener('change', (e) => {
    const currActivity = e.target;
    const allActivities = activitiesFieldset.querySelectorAll('input');

    if (currActivity.checked) {
        disableTimeConflicts(currActivity, allActivities);
    } else {
        enableTimeConflicts(currActivity, allActivities);
    }

    activitiesCostP.innerHTML = `Total: $ ${totalSelectedActivities(allActivities)}`;

    isActivitySelected(activitiesFieldset);
});

activitiesFieldset.addEventListener('focus', (e)=> {
    e.target.parentElement.classList.add('focus');
}, true);

activitiesFieldset.addEventListener('blur', (e)=> {
    e.target.parentElement.classList.remove('focus');
}, true);


// Payment Info section event listeners
// ====================================
paymentSelect.addEventListener('change', () => {
    const paymentElements = [creditCard, paypal, bitcoin]
    const SelectedPaymentType = paymentSelect.value;
    
    // hide payments types not selected
    for (element of paymentElements) {
        if (element.id === SelectedPaymentType) {
            element.hidden = false;
        } else {
            element.hidden = true;
        }
    }
});

expMonth.addEventListener('change', ()=> {
    isValidExpSelection(expMonth);
});

expMonth.addEventListener('blur', ()=> {
    isValidExpSelection(expMonth);
});

expYear.addEventListener('change', ()=> {
    isValidExpSelection(expYear);
});

expYear.addEventListener('blur', ()=> {
    isValidExpSelection(expYear);
})

ccNumInput.addEventListener('keyup', ()=> {
    isValidCreditCardInput(ccNumInput);
});

zipNumInput.addEventListener('keyup', ()=> {
    isValidZipCodeInput(zipNumInput)
});

cvvNumInput.addEventListener('keyup', ()=> {
    isValidCvvInput(cvvNumInput);
});


// Form Validation event listener
// ==============================
confForm.addEventListener('submit', (e)=> {   
    const isFormNameValid = isValidNameInput(nameInput),
          isFormEmailValid = isValidEmailInput(emailInput),
          isFormActivitySelected = isActivitySelected(activitiesFieldset),
          isFormPaymentCorrect = isPaymentInfoCorrect(paymentSelect);

    const isFormValid = isFormNameValid &&
                        isFormEmailValid &&
                        isFormActivitySelected &&
                        isFormPaymentCorrect;

    if (isFormValid) {
        alert('Your form has been submitted');
    } 
    else {   
        // form failed to submit
        e.preventDefault();
    }
});