const inputs = document.querySelectorAll('input');
const statusTexts = document.querySelectorAll('div.status');
const statusIcons = document.querySelectorAll('i.status-icon')
const submitBtn = document.querySelector('button');

let shouldSubmit = false;

function checkEmptiness(i) {
    if (inputs[i].value === '') {
        statusTexts[i].textContent = 'Should not be empty!';
        statusIcons[i].classList.add('invalid');    
        return true;
    } 

    return false;
}


function validateName() {
    for (let i = 0; i <= 3; i += 3){
        inputs[i].value = inputs[i].value.trim();
        
        if (checkEmptiness(i)){
            continue;
        }
        else if (inputs[i].value.includes(' ')) {
            statusTexts[i].textContent = 'Type only one name';
            statusIcons[i].classList.add('invalid');
        }
        else {
            statusIcons[i].classList.add('valid');            
        }
    }

    if (statusTexts[0].textContent != '' || statusTexts[3].textContent != '') return false;
    else return true;
}
function validateEmail() {
    const matchingString = inputs[1].value.match(/(\w(\.|\-)?)*\w@\w(\w*)+\.+\w(\w*)+(\.?\w)*/gi);
    
    if (!checkEmptiness(1)) {
        if (!matchingString) {
            statusTexts[1].textContent = 'Invalid email address';
            statusIcons[1].classList.add('invalid');
        }
        else{
            if (matchingString[0] == inputs[1].value) {
                statusIcons[1].classList.add('valid');            
            } else {
                statusTexts[1].textContent = 'Invalid email address';
                statusIcons[1].classList.add('invalid');
            }
        }
    }
    if (statusTexts[1].textContent != '') return false;
    else return true;
}

function validatePassword() {
    if (!checkEmptiness(2)) {
        const hasUpperCase = inputs[2].value.match(/[A-Z]/g);
        const hasLowerCase = inputs[2].value.match(/[a-z]/g);
        const hasNumber = inputs[2].value.match(/[0-9]/g);
        const isGreaterThan6 = inputs[2].value.length >= 6;

        if (!isGreaterThan6) {
            statusTexts[2].textContent = 'Should have at least six characters';
            statusIcons[2].classList.add('invalid');
        }
        else if (!hasLowerCase) {
            statusTexts[2].textContent = 'Should have at least one lower case letter';
            statusIcons[2].classList.add('invalid');
        }
        else if (!hasNumber) {
            statusTexts[2].textContent = 'Should have at least one number';
            statusIcons[2].classList.add('invalid');
        }
        else if (!hasUpperCase) {
            statusTexts[2].textContent = 'Should have at least one upper case letter';
            statusIcons[2].classList.add('invalid');
        } 
        else {
            statusIcons[2].classList.add('valid');
        }
    }

    if (statusTexts[2].textContent != '') return false;
    else return true;
}

function validateConfirmedPassword() {
    if(!checkEmptiness(5)) {   
        if (statusTexts[2].textContent != '' || inputs[2].value == '') {
            statusTexts[5].textContent = "Invalid password";
            statusIcons[5].classList.add('invalid');
        }
        if (inputs[5].value != inputs[2].value) {
            statusTexts[5].textContent = "Passwords don't match";
            statusIcons[5].classList.add('invalid');
        } else {
            statusIcons[5].classList.add('valid');
        }
    }
    if (statusTexts[5].textContent != '') return false;
    else return true;
}

function validateNumber() {
    if (!checkEmptiness(4)) {
        const hasOnlyNumbers = inputs[4].value.match(/[0-9]*/gi);
        if (hasOnlyNumbers[0] != inputs[4].value) {
            statusTexts[4].textContent = "Should have only numbers";
            statusIcons[4].classList.add('invalid');
        } else if(inputs[4].value.length != 9){
            statusTexts[4].textContent = "Should have 9 digits";
            statusIcons[4].classList.add('invalid');
        }
        else {
            statusIcons[4].classList.add('valid');
        }
    }
    if (statusTexts[4].textContent != '') return false;
    else return true;
}

function validate(event) {
    for (let i = 0; i < statusTexts.length; i++) {
        statusTexts[i].textContent = '';
        statusIcons[i].classList = 'status-icon';
    }

    const nameValidation = validateName(),
        emailValidation = validateEmail(), 
        passwordValidation = validatePassword(),
        passwordConfirmValidation = validateConfirmedPassword(),
        numberValidation = validateNumber();

    if (nameValidation && emailValidation && passwordValidation && passwordConfirmValidation && numberValidation) shouldSubmit = true;
    if(!shouldSubmit) event.preventDefault();
}

submitBtn.addEventListener('click', validate);