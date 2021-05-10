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

var timeLeft = 750;

var userChoice = 0;

// pulls elements from html
var timerEl = document.querySelector('#timer');
var questionEl = document.querySelector('#question');
var ans1El = document.querySelector('#answer1');
var ans2El = document.querySelector('#answer2');
var ans3El = document.querySelector('#answer3');
var ans4El = document.querySelector('#answer4');
var scoreEl = document.querySelector('#score');
var statusEl = document.querySelector('#displayStatus'); 
var textAreaEl = document.querySelector('#text-area');
var formEl = document.querySelector('#initials');
var listEl = document.querySelector('#listScore');

 var i = 0;

 //clears the screens of questions and answers
var clearScreen = function() {
    questionEl.textContent = "Congratulations! Your score is: " + score;
    var removeElement = function(elementId) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    };
    //removes buttons from screen
    removeElement('answer1');
    removeElement('answer2');
    removeElement('answer3');
    removeElement('answer4');
    removeElement('score')
}

// compares user answers to correct answer
var checkAns = function() {
    if (i <= 9) {
        
        if (userChoice === questions[i].ra && i != 7) {
            score++;
            i++
            questionEl.textContent = questions[i].q;
            ans1El.textContent = "1. " + questions[i].a1;
            ans2El.textContent = "2. " + questions[i].a2;
            ans3El.textContent = "3. " + questions[i].a3;
            ans4El.textContent = "4. " + questions[i].a4;
            scoreEl.textContent = "Score: " + score;
            statusEl.textContent = "Correct!";
        }
        else if (i != 7) {
            timeLeft = timeLeft - 10;
            i++
            questionEl.textContent = questions[i].q;
            ans1El.textContent = "1. " + questions[i].a1;
            ans2El.textContent = "2. " + questions[i].a2;
            ans3El.textContent = "3. " + questions[i].a3;
            ans4El.textContent = "4. " + questions[i].a4;
            scoreEl.textContent = "Score: " + score;
            statusEl.textContent = "Incorrect."
        }
        else if (i === 7 && userChoice === questions[i].ra) {
            score++;
            clearScreen();
            clearInterval(timeInterval);
            timerEl.textContent = ''
            scoreSub();
        }
        else {
            clearScreen();
            clearInterval(timeInterval);
            timerEl.textContent = ''
            scoreSub();
        }
        console.log(i)
    }    
    
}

// pushes question and answers to webpage 
userChoice = 0;   
questionEl.textContent = questions[i].q;
ans1El.textContent = "1. " + questions[i].a1;
ans2El.textContent = "2. " + questions[i].a2;
ans3El.textContent = "3. " + questions[i].a3;
ans4El.textContent = "4. " + questions[i].a4;
scoreEl.textContent = "Score: " + score;

// creates clickable event on button
ans1El.addEventListener('click', function() {
    userChoice = '1';
    //i++;
    checkAns();
});

ans2El.addEventListener('click', function() {
    userChoice = '2';
    //i++;
    checkAns();
});

ans3El.addEventListener('click', function() {
    userChoice = '3';
    //i++;
    checkAns();
});

ans4El.addEventListener('click', function() {
    userChoice = '4';
    //i++;
    checkAns();
});

// simple timer
var timeInterval = setInterval(function() {
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
        clearScreen();
    }
}, 1000);

var scoreSub = function() {
    var removeElement = function(elementId) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    };
    textAreaEl.textContent = "Please enter your initials: ";
    var initialBox = document.createElement("textarea");
    initialBox.classList.add("score-box")
    textAreaEl.appendChild(initialBox);
    var btn = document.createElement("BUTTON");
    btn.classList.add("score-button");
    btn.innerHTML = "Submit score!";
    formEl.appendChild(btn);
    document.querySelector('.score-button').addEventListener('click', function() {
        var userIni = initialBox.value;
        var obj = {init: userIni, userScore: score};
        var savedScores = localStorage.getItem("scores");
        if (!savedScores) {
            var scoreList = []
        }
        else {
            var savedScoresList = localStorage.getItem("scores");
            savedScores = JSON.parse(savedScoresList);
            scoreList = savedScores;
        }
        scoreList.push(obj);
        localStorage.setItem("scores", JSON.stringify(scoreList));
        removeElement("initials");
        for (var x = 0; x < scoreList.length; x++) {
            var inScore = document.createElement('li');
            inScore.textContent = scoreList[x].init + ":  " + scoreList[x].userScore;
            listEl.append(inScore);
        }
    });
    
};
