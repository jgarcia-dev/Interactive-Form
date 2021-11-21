const nameInput = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const colorOptions = document.getElementById('color').options;
const activities = document.getElementById('activities');
const activitiesCostP = document.getElementById('activities-cost');
const creditCard = document.getElementById('credit-card');
const paymentSelect = document.getElementById('payment');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

let TotalActivitiesCost = 0;


// on form load
nameInput.focus();
otherJobInput.style.display = 'none';
colorSelect.disabled = true;


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