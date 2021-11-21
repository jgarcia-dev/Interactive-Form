const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const otherJobInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const colorOptions = document.getElementById('color').options;
const activities = document.getElementById('activities');
const activitiesCostP = document.getElementById('activities-cost');
const creditCard = document.getElementById('credit-card');
const paymentSelect = document.getElementById('payment');
const ccNum = document.getElementById('cc-num');
const zipNum = document.getElementById('zip');
const cvvNum = document.getElementById('cvv');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const confForm = document.querySelector('form');

let TotalActivitiesCost = 0;


// on form load
nameInput.focus();
otherJobInput.style.display = 'none';
colorSelect.disabled = true;
paymentSelect.selectedIndex = 1;
paypal.hidden = true;
bitcoin.hidden = true;

// validators
function isValidName(name) {
    return (name.length > 0);
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
jobRoleSelect.addEventListener('change', () => {
    if (jobRoleSelect.value === 'other') {
        otherJobInput.style.display = 'inherit';
    } else {
        otherJobInput.style.display = 'none';
    }
});

designSelect.addEventListener('change', () => {
    colorSelect.disabled = false;
    colorSelect.selectedIndex = 0;
    colorSelect[0].innerHTML = 'Select a color below';

    if (designSelect.value === 'js puns') {
        for (option of colorOptions) {
            if (option.getAttribute('data-theme') === 'js puns') {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }
    } else if (designSelect.value === 'heart js') {
        for (option of colorOptions) {
            if (option.getAttribute('data-theme') === 'heart js') {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        }
    }
});

activities.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT') {
        if (e.target.checked === true) {
            TotalActivitiesCost += parseFloat(e.target.getAttribute('data-cost'));
        } else {
            TotalActivitiesCost -= parseFloat(e.target.getAttribute('data-cost'));
        }
    }
    activitiesCostP.innerHTML = `Total: $ ${TotalActivitiesCost}`;
});

paymentSelect.addEventListener('change', () => {
    if (paymentSelect.value === 'credit-card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if (paymentSelect.value === 'paypal') {
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else if (paymentSelect.value === 'bitcoin') {
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }
});

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