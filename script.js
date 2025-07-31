//---Question Bank ----
const quizData1 = [
    {
        question: `What will be the output of the following code snippet?
                   <code id='question-code'>const obj1 = { first:20, second: 30,
                    first: 50};
                                                         console.log(obj1);
                    </code>`,
        choices: ["{first: 20, second: 30}", "{first: 50, second: 30}", "{first: 20, second: 30, first: 50}", "Syntax Error"],
        correctAnswer: 1,
        correctansExplanation: "{first: 50, second: 30} - Duplicate keys in object literals overwrite earlier ones"
    },
    {
        question: "Which of the following is NOT JavaScript data type?",
        choices: ["String", "Boolean", "Float", "Undefined"],
        correctAnswer: 2,
        correctansExplanation: "Float - it's 'number' in JS, which covers floats."
    },
    {
        question: "What does 'DOM' stand for in web development?",
        choices: ["Document Object Model", "Data Object Modle", "Dynamic Order Management", "Document Oriented Markup"],
        correctAnswer: 0
    },
    {
        question: "which keyword is used to declare a constant variable in JavaScript?",
        choices: ["var", "let", "const", "static"],
        correctAnswer: 2
    },
    {
        question: "What is the purpose of `localStorage` in web browsers?",
        choices: ["To store tempporary session data", "To store data that persists even after the browser is closed", "To server-side scripts", "To manage network requests"],
        correctAnswer: 1
    }   
];


//---Global Variables to manage quiz state---
let quizData = []; // Will be populated from local JSON file
let currentQuestionIndex = 0; //Tracks the current question being displayed.
let score = 0;  //Stores the user's score
let selectedAnswerIndex = null; //Stores the index of the user's currently selected answer (0-indexed)


// ---- Get DOM Elements (references to HTML elements) ----
const questionCounter = document.getElementById('question-counter');
const currentQuestionText = document.getElementById('current-question-text');
const questionCode = document.getElementById('question-code');
const answerChoices = document.getElementById('answer-choices');
const submitBtn = document.getElementById('submit-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreArea = document.getElementById('score-area');
const finalScoreDispaly = document.getElementById('final-score');
const feedbackMessageDisplay = document.getElementById('feedback-message');
const restartBtn = document.getElementById('restart-btn');
const errorStatus = document.getElementById('error');

//--- Functions -----
// Function to fetch quiz data from local JSOn file
function getRandomSubset(arr, num){
    //Create a shalo copy of the array to avoid modifying the original 
    const shuffled = [...arr] //Or arr.slice()
    let i = arr.length;
    let temp;
    let randomIndex;
    //while there remain elements to shuffle....
    while(i > 0) {
        //Pick a remaining elements....
        randomIndex = Math.floor(Math.random() * i);
        i--
        // And swap it with the current element.
        temp = shuffled[i];
        shuffled[i] = shuffled[randomIndex];
        shuffled[randomIndex] = temp;
    }
    //Return the first 'num' elements of the shuffled array
    return shuffled.slice(0, num);
}


//Make sure numberOfQuestionsToSelect is defined globally or passed around
const numberOfQuestionsToSelect = 10;

async function fetchQuizData(){
    try {
        // Show loading indicator
        questionCounter.textContent = "Loading quiz....";
        currentQuestionText.textContent = "Fetching questions, please wait..."
        answerChoices.innerHTML = '';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Loading....';

        const response = await fetch('./quizData.json');  //Path to your loacl JSON File
         if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const fullQuizData = await response.json(); //Store the full data temporarily

         //Now, get 10 random questions from the full set.
         quizData = getRandomSubset(fullQuizData, numberOfQuestionsToSelect); // To get 10 uniq random question each and every time
         console.log("Quiz data fetched successfully:", quizData);

         // Reset quiz state for a fresh start with new questions
         currentQuestionIndex = 0;
         score = 0;
         selectedAnswerIndex = null; //Fix: should be null initially

         //Now that data is loaded, start the quiz
         loadQuestion();
    }catch(e) {
        console.error("Could not fetch quiz data:", e);
        //Display an error message to the user
        quizContainer.innerHTML = '<p style="color red; text-align: center;"> Failed to load quizContainer. Please check if questions. json exists and is ValidityState. </p>';
        submitBtn.style.display = 'none'; //Hide button if quiz can't load
    }
}

function loadQuestion() {

    //Ensure quizData is loaded and not empty
    console.log("current quizData length:",quizData.length);
    if(quizData.length === 0){
        console.warn("Quiz data is empty or not loaded yet. Attempting to re-fetch.");
        fetchQuizData(); //Attempt to re-fetch if not loaded
        scoreArea.style.display = 'none'; //Hide score area
        return;   
    }

    //Hide score area and show quiz container if restarting
    quizContainer.style.display = 'flex'; //Ensure quiz is visible
    scoreArea.style.display = 'none'; //Hide score area
    

    //Get the current question data 
    const currentQuiz = quizData[currentQuestionIndex];
    

    // Update question counter
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    

    // Update question text. We need to check if there's code or just plain text.
    // Assuming questions with code will have <code id='question-code'> within their question string
    if(currentQuiz.question.includes('<code id=\'question-code\'>')){
        currentQuestionText.innerHTML = currentQuiz.question.split('<code')[0].trim(); //Get text before code
        questionCode.innerHTML = currentQuiz.question.match(/<code[^>]*>([\s\S]*?)<\/code>/)[1]; //Extract code content
        questionCode.style.display = 'block'; //Show code block
    } else {
        currentQuestionText.textContent  = currentQuiz.question;
        questionCode.innerHTML = ''; //Clear any previous code
        questionCode.style.display = 'none'; //Hide code block
    }

    //Clear previous answer choices
        answerChoices.innerHTML = '';
        selectedAnswerIndex = null; //Reset selection for new question

    //Disable submit button untill an answer is selected
        submitBtn.disabled = true;

    // Create buttons for each answer choice
        currentQuiz.choices.forEach((choices, index) => {
        const button = document.createElement('button');
        button.classList.add('btn-choice')
        button.textContent = choices;
        button.dataset.index = index; // Store the index of the choice
            
        //Add click listener to each choice button
        button.addEventListener('click', () => selectedAnswer(index,button));
        answerChoices.appendChild(button);
    
    });
    
    //Update submit button text for the last question
    if(currentQuestionIndex === quizData.length - 1){
        submitBtn.textContent = "Submit";
    }else {
        submitBtn.textContent = "Next";
    }
}

function selectedAnswer(index, clickedButton) {
    //Reomve 'selected' class from previously selected button (if any)
    const previouslySelected = document.querySelector('.btn-choice.selected');
    if(previouslySelected){
        previouslySelected.classList.remove('selected');
    }
    // Add 'selected' class to the newly clicked button
    clickedButton.classList.add('selected');

    //Store the  index of the selected answer
        selectedAnswerIndex = index;

    //Enable the submit button once an answer is selected
        submitBtn.disabled = false;
}

function checkAnswer() {
    // If no answer is selected, do nothing or show an alert(optional)
    if(selectedAnswerIndex === null){
        // alert("Please select an answer before proceeding!");
        errorStatus.style.display = 'block';
        return;
    }
    const currentQuiz = quizData[currentQuestionIndex];
    
    //Add correct/incorrect visual feedback
    const choiceButtons = answerChoices.querySelectorAll('.btn-choice');
    choiceButtons.forEach((button, index) =>{
        // Disable all choice buttons after an answer is submitted
        button.disabled = true;
        button.style.pointerEvents = 'none'; //Make the non-clickable
        if(index === currentQuiz.correctAnswer) {
            button.classList.add('correct'); //Mark the correct answer
        }else if(index === selectedAnswerIndex){
            button.classList.add('incorrect'); //Mark the user's incorrect choice
        }

        //Remove 'selected' class after feedback is shown
        button.classList.remove('selceted');
    });

    //Update score if correct
    if(selectedAnswerIndex === currentQuiz.correctAnswer) {
        score++;
    }

    //Delay before moving to the next question or showing results
    //This allows the user to see the correct/incorrect feedback
    setTimeout(() => {
        currentQuestionIndex++; //Move to the next question

        if(currentQuestionIndex < quizData.length){
            loadQuestion();
        }else {
            showResults(); //Quiz Finished
        }
    }, 1500) // 1.5 seconds delay
}

function showResults() {
    quizContainer.style.display = 'none' //HIde the quiz
    scoreArea.style.display = 'block'; //Show the score area

    finalScoreDispaly.textContent = `Your scored ${score} out of ${quizData.length} questions are correct!`;
    //Provide feedback based on score
    let feedback = "";
    const percentage = (score / quizData.length) * 100;

    if(percentage === 100) {
        feedback = "Outstanding! perfect score!";
    }else if(percentage >= 80){
        feedback = "Excellent job! You did great.";
    }else if(percentage >= 50) {
        feedback = "Good effort! Keep practicing to improve.";
    }else {
        feedback = "Need more practice. Don't give up!";

    }
    feedbackMessageDisplay.textContent = feedback;
}


function restartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswerIndex = null;  //userAnswers = []; //If you were tracking detailed user answer, clear this  too
    submitBtn.textContent = 'Next';
    loadQuestion(); //Start the quiz over  
}
// ----Event Listeners ----
document.addEventListener('DOMContentLoaded', loadQuestion); //Load first question when page loads.
submitBtn.addEventListener('click', checkAnswer); //Handle submit/next button click
restartBtn.addEventListener('click', restartQuiz);