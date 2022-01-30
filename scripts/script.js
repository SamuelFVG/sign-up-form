const inputs = document.querySelectorAll('input');
const statusTexts = document.querySelectorAll('div.status');
const statusIcons = document.querySelectorAll('i.status-icon')
const submitBtn = document.querySelector('button');

let shouldSubmit = false;

function validateName() {
    for (let i = 0; i <= 3; i += 3){
        inputs[i].value = inputs[i].value.trim();
        if (inputs[i].value === '') {
            statusTexts[i].textContent = 'Name should not be empty!';
            statusIcons[i].classList.add('invalid');    
        }
        else if (inputs[i].value.includes(' ')) {
            statusTexts[i].textContent = 'Type only one name';
            statusIcons[i].classList.add('invalid');
        }
        else {
            statusTexts[i].textContent = '';
            statusIcons[i].classList.add('valid');            
        }
    }
    if (statusTexts[0].textContent != '' || statusTexts[1].textContent != '') return false;
    else return true;
}

function validate(event) {
    for (let i = 0; i < statusTexts.length; i++) {
        statusTexts[i].textContent = '';
        statusIcons[i].classList = 'status-icon';
    }

    shouldSubmit = validateName();    
    if(!shouldSubmit) event.preventDefault();
}

submitBtn.addEventListener('click', validate);