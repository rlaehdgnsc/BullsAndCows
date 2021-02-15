var docBody = document.body;
var result = document.createElement('h2');
var state = document.createElement('h2');
var form = document.createElement('form');
var input = document.createElement('input');
var submit = document.createElement('button');

let array_candidate;
let array_number;
let temp = [0,0,0,0];
let chance = 0;

function doc_init() {
    submit.textContent = "check";
    input.type = 'number';

    form.append(input);
    form.append(submit);
    docBody.append(result);
    docBody.append(state);
    docBody.append(form);
}

function init_answer() {
    array_candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array_number = [];

    for (let i = 0; i < 4; i += 1) {
        array_number.push(array_candidate.splice(Math.floor(Math.random() * (8 - i)), 1)[0]);
    }
}

function main() {
    init_answer();
    doc_init();
}

main();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let strike = 0, ball = 0;
    let myAnswer = input.value;
    let cAnswer = array_number.join('');

    if (myAnswer.length !== 4) {
        alert('length of answer must be 4');
    } else {
        if (myAnswer === cAnswer) {
            alert('HomeRun');
            location.reload();
        } else {
            if (chance === 4) {
                result.textContent = `You failed. The answer is ${cAnswer}. Try again`;
                chance = 0;
                init_answer();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (cAnswer.includes(myAnswer[i])) {
                        if (cAnswer.indexOf(myAnswer[i]) === i) {
                            strike += 1;
                            temp[i] = myAnswer[i];
                            
                        } else {
                            ball += 1;
                        }
                    }
                }
                result.textContent = `Strike : ${strike}, Ball : ${ball}, life :` + (4 - chance);
                state.textContent = temp.join('');
                chance += 1;
            }
            temp.fill(0);
        }
    }
    input.value = '';
    input.focus();
});