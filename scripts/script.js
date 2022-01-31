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

function validate(event) {
    for (let i = 0; i < statusTexts.length; i++) {
        statusTexts[i].textContent = '';
        statusIcons[i].classList = 'status-icon';
    }

    const nameValidation = validateName(),
        emailValidation = validateEmail();
    if (nameValidation && emailValidation) shouldSubmit = true;
    if(!shouldSubmit) event.preventDefault();
}

submitBtn.addEventListener('click', validate);