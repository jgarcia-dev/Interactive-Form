const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const otherJobInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const colorOptions = document.getElementById('color').options;
const activities = document.getElementById('activities');
const allActivities = activities.querySelectorAll('input');
const activitiesCostP = document.getElementById('activities-cost');
const creditCard = document.getElementById('credit-card');
const paymentSelect = document.getElementById('payment');
const ccNum = document.getElementById('cc-num');
const zipNum = document.getElementById('zip');
const cvvNum = document.getElementById('cvv');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const confForm = document.querySelector('form');

let selectedActivities = [];

// on form load
nameInput.focus();
otherJobInput.hidden = true;
colorSelect.disabled = true;
paymentSelect.selectedIndex = 1;
paypal.hidden = true;
bitcoin.hidden = true;


// helper functions
// =========================================================================
function totalSelectedActivities() {
    let total = 0;
    selectedActivities.forEach(activity => {
        total += parseFloat(activity.getAttribute('data-cost'));
    });
    return total;
}

function disableConflictingActivities(selectedActivity) {
    allActivities.forEach(activity => {
        if (activity.checked === false && activity.getAttribute('data-day-and-time') === selectedActivity.getAttribute('data-day-and-time')) {
            activity.disabled = true;
            activity.parentElement.classList.toggle('disabled');
        }
    });
}

function enableConflictingActivities(selectedActivity) {
    allActivities.forEach(activity => {
        if (activity.disabled === true && activity.getAttribute('data-day-and-time') === selectedActivity.getAttribute('data-day-and-time')) {
            activity.disabled = false;
            activity.parentElement.classList.toggle('disabled');
        }
    });
}

function showErrors(iconElement, hintElement, errorMgsArr = []) {
    iconElement.classList.add('not-valid');
    iconElement.classList.remove('valid');
    hintElement.classList.remove('hint');
    if (errorMgsArr.length > 0) {
        hintElement.innerText = `Errors: ${errorMgsArr.join(', ')}`;
    }
}

function resolveErrors(iconElement, hintElement) {
    iconElement.classList.remove('not-valid');
    iconElement.classList.add('valid');
    hintElement.classList.add('hint');
}

// validators
// =========================================================================
function isValidName(name) {
    return (name.trim().length > 0);
}

function getEmailErrors(email) {
    const isEmailUserNameValid = /^(\w+)/.test(email);
    const isAtSymbolPresent = /\@/.test(email);
    const isEmailDomainValid = /(\w+)\.(com)$/.test(email);
    const emailErrors = [];

    if (isEmailUserNameValid === false) {
        emailErrors.push('invalid username');
    }

    if (isAtSymbolPresent === false) {
        emailErrors.push('missing @ symbol');
    }

    if (isEmailDomainValid === false) {
        emailErrors.push('invalid email domain');
    }

    return emailErrors;
}

function registeredForActivities(element) {
    const checkboxes = element.getElementsByTagName('input');
    
    for (box of checkboxes) {
        if (box.checked === true) {
            return true;
        }
    }
    return false;
}

function isValidCreditCardNumber(ccNumber) {
    return /^[0-9]{13,16}$/.test(ccNumber);
}

function isValidZipCode(zipNumber) {
    return /^[0-9]{5}$/.test(zipNumber);
}

function isValidCVV(cvvNum) {
    return /^[0-9]{3}/.test(cvvNum);
}

function isValidPaymentInfo(element) {
    if (element.value === 'credit-card' &&
            isValidCreditCardNumber(ccNum.value) &&
            isValidZipCode(zipNum.value) &&
            isValidCVV(cvvNum.value)
    ) {
        return true;
    } else if (element.value === 'paypal' || element.value === 'bitcoin') {
        return true;
    } else {
        return false;
    }
}


// event listeners
// =========================================================================
nameInput.addEventListener('keyup', ()=> {
    const name = nameInput.value;
    const iconElement = nameInput.parentElement;
    const hintElement = nameInput.nextElementSibling;
    
    if (isValidName(name)) {
        resolveErrors(iconElement, hintElement);
    } else {
        showErrors(iconElement, hintElement);
    }
});

emailInput.addEventListener('keyup', ()=> {
    const email = emailInput.value;
    const iconElement = emailInput.parentElement;
    const hintElement = emailInput.nextElementSibling;

    const emailErrors = getEmailErrors(email);

    if (emailErrors.length === 0) {
        resolveErrors(iconElement, hintElement);
    } else {
        showErrors(iconElement, hintElement, emailErrors);
    }
});

// Basic Info section event listener
jobRoleSelect.addEventListener('change', () => {
    if (jobRoleSelect.value === 'other') {
        otherJobInput.hidden = false;
    } else {
        otherJobInput.hidden = true;
    }
});

// T-shirt Info section event listener
designSelect.addEventListener('change', () => {
    colorSelect.disabled = false;
    const selectedTheme = designSelect.value;

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

// Register for Activities section event listener
activities.addEventListener('change', (e) => {
    const activity = e.target;

    if (activity.checked === true) {
        selectedActivities.push(activity);
        disableConflictingActivities(activity);
    } else if (activity.checked === false) {
        const index = selectedActivities.indexOf(activity);
        if (index > -1) {
            selectedActivities.splice(index, 1);
            enableConflictingActivities(activity);
        }
    }
    activitiesCostP.innerHTML = `Total: $ ${totalSelectedActivities()}`;
});

activities.addEventListener('focus', (e)=> {
    e.target.parentElement.classList.add('focus');
}, true);

activities.addEventListener('blur', (e)=> {
    e.target.parentElement.classList.remove('focus');
}, true);

// Payment Info section event listener
paymentSelect.addEventListener('change', () => {
    const paymentTypes = [creditCard, paypal, bitcoin];
    
    for (payment of paymentTypes) {
        if (payment.id === paymentSelect.value) {
            payment.hidden = false;
        } else {
            payment.hidden = true;
        }
    }
});

// Form Validation event listener
confForm.addEventListener('submit', (e)=> {
    
    let isFormValid = isValidName(nameInput.value) &&
        isValidEmail(emailInput.value) &&
        registeredForActivities(activities) &&
        isValidPaymentInfo(paymentSelect);
    
    if (isFormValid) {
        alert('Your form has been submitted');
    } 
    else {   
        e.preventDefault();
        alert('Your form is incomplete')
    }
});