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


// validators
// =========================================================================
function isValidName(name) {
    return (name.trim().length > 0);
}

function isValidEmail(email) {
    return /^\w+\@\w+\.com$/.test(email);
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