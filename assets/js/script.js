var startQuiz = function() {
    
    var questions = [
        {q: 'How do you end a <div> tag?', a1: '</div>', a2: '<divend>', a3: '<!div>', a4: '<end>', ra: '1'},
        {q: 'Commonly used data types do not include: ', a1: 'strings', a2: 'booleans', a3: 'alerts', a4: 'numbers', ra: '3'},
        {q: 'The condition in a if/else statement is enclosed in: ', a1: 'brackets', a2: 'quotations', a3: 'curly brackets', a4: 'parenthesis', ra: '4'},
        {q: 'What tool can you use to debug your code?', a1: 'for loops', a2: 'if statements', a3: 'console log', a4: 'terminal/bash', ra: '3'},
        {q: 'What data types can be stored in an array?', a1: 'numbers', a2: 'strings', a3: 'lists', a4: 'all of the above', ra: '4'},
        {q: 'What will console.log(2+2) print out?', a1: '2', a2: '4', a3: '6', a4: 'nothing', ra: '1'},
        {q: 'What do you use to comment out a single line of Javascript?', a1: '/*', a2: '<!--', a3: '//', a4: '#comment', ra: '3'},
        {q: 'How would you create a variable name "userChoice"?', a1: 'variable userChoice =', a2: 'userChoice =', a3: 'var userChoice =', a4: 'set variable userChoice =', ra: '3'}
    ];

    var score = 0;

    var timeLeft = 29;

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
        removeElement('score');
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
        checkAns();
    });

    ans2El.addEventListener('click', function() {
        userChoice = '2';
        checkAns();
    });

    ans3El.addEventListener('click', function() {
        userChoice = '3';
        checkAns();
    });

    ans4El.addEventListener('click', function() {
        userChoice = '4';
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
            scoreSub();
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
};
startQuiz();
