var questions = [
    {q: 'How do you end a <div> tag?', a1: '</div>', a2: '<divend>', a3: '<!div>', a4: '<end>', ra: '1'},
    {q: 'What is the color of the sky?', a1: 'red', a2: 'green', a3: 'blue', a4: 'purple', ra: '3'},
    {q: 'What do dogs eat?', a1: 'Milk', a2: 'Fish', a3: 'Cats', a4: 'Bones', ra: '4'},
    {q: 'How many dogs do we have?', a1: '1', a2: '2', a3: '3', a4: '4', ra: '3'},
    {q: 'How many cats do we have?', a1: '1', a2: '2', a3: '3', a4: '4', ra: '3'},
    {q: 'How many roomates do we have?', a1: '2', a2: '4', a3: '1', a4: '6', ra: '1'},
    {q: 'What color is the grass?', a1: 'Pink', a2: 'Black', a3: 'Green', a4: 'Blue', ra: '3'},
    {q: 'How long have we been dating', a1: '1', a2: '2', a3: '3', a4: '4', ra: '3'}
];

var score = 0;

var timeLeft = 75;

var userChoice = 0;

// pulls elements from html
var timerEl = document.querySelector('#timer');
var questionEl = document.querySelector('#question');
var ans1El = document.querySelector('#answer1');
var ans2El = document.querySelector('#answer2');
var ans3El = document.querySelector('#answer3');
var ans4El = document.querySelector('#answer4');

var i = 0;

// compares user answers to correct answer
var checkAns = function() {
    console.log("hello");
    if (userChoice === questions[i].ra) {
        //score++;
        
        console.log('Correct Answer');
    }
    else{
        console.log("Incorrect Answer");
        timeLeft = timeLeft - 10;
    }
    
}

// pushes question and answers to webpage 
var displayQuesAns = function() { 
    console.log("In the displayQuesAns function.");
    const once=true;
    userChoice = 0;   
    questionEl.textContent = questions[i].q;
    ans1El.textContent = "1. " + questions[i].a1;
    ans2El.textContent = "2. " + questions[i].a2;
    ans3El.textContent = "3. " + questions[i].a3;
    ans4El.textContent = "4. " + questions[i].a4;

// creates clickable event on button
    ans1El.addEventListener('click', function() {
        userChoice = '1';
        checkAns();
        //i++
        console.log(i + " ans1El");
        displayQuesAns();
    }, once);

    ans2El.addEventListener('click', function() {
        userChoice = '2';
        checkAns();
        //i++
        console.log(i + " ans2El");
        displayQuesAns();
    }, once);

    ans3El.addEventListener('click', function() {
        userChoice = '3';
        checkAns();
        //i++;
        console.log(i + " ans3El");
        displayQuesAns();
    }, once);

    ans4El.addEventListener('click', function() {
        userChoice = '4';
        checkAns();
        //i++;
        console.log(i + " ans4El");
        displayQuesAns();
    }, once);
    i++;
    
    // 
}
// simple timer
var timeInterval = setInterval(function() {
    console.log(i)
    if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds left.';
        timeLeft--
    }
    else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second left.';
        timeLeft--
    }
    else {
        clearInterval(timeInterval);
        timerEl.textContent = 'Time is up!'
    }
}, 1000);

displayQuesAns();
