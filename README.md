# Interactive-Quiz-
Interactive Quiz Application
A dynamic, web-based multiple-choice quiz designed for engaging self-assessment. This application demonstrates core front-end web development skills by dynamically loading questions, providing instant feedback, and calculating a final score.

🚀 **[Live Demo Available Here!](https://uminteractive.netlify.app/)**


Table of Contents
Features

Technologies Used

How to Run Locally

Project Structure

Future Enhancements

License

Features
Dynamic Question Loading: Fetches quiz questions and answer choices from an external questions.json file.

Multiple-Choice Format: Presents questions with selectable answer buttons.

Answer Validation: Checks user's selected answer against the correct one.

Instant Visual Feedback: Provides immediate visual cues (green for correct, red for incorrect) after each answer submission.

Score Calculation: Automatically tallies the number of correct answers.

Final Score & Feedback: Displays the total score and a personalized performance message upon completion.

Quiz Progression: Seamlessly navigates through questions, with button text changing from "Next" to "Submit Quiz" on the final question.

Restart Functionality: Allows users to easily reset the quiz and play again.

Question Counter: Displays current progress (e.g., "Question 1 of 10").

Code Snippet Display: Renders JavaScript code examples directly within questions for technical assessments.

Technologies Used
HTML5: For structuring the quiz interface and defining content placeholders.

CSS3: For styling the application, ensuring a visually appealing and responsive user interface across various devices.

JavaScript (ES6+): For all core logic, including DOM manipulation, event handling, asynchronous data fetching (Fetch API), answer validation, score calculation, and quiz state management.

How to Run Locally
To run this quiz application on your local machine, follow these steps:

Clone the Repository (if applicable) or Download the Files:
If this project is hosted on a platform like GitHub, clone it:

git clone [repository-url]
cd interactive-quiz-app

Otherwise, ensure you have downloaded all project files (index.html, style.css, script.js, questions.json) into a single folder.

Install a Local Web Server:
Due to browser security restrictions (CORS) when fetching local JSON files, you cannot simply open index.html directly in your browser. You need a local web server.

Recommended: Use the "Live Server" extension for VS Code.

Open the project folder in VS Code.

Right-click on index.html in the Explorer.

Select "Open with Live Server".

Alternatively (Python): If you have Python installed, navigate to your project directory in the terminal and run:

python -m http.server

Then open your browser and go to http://localhost:8000.

Open in Browser:
Once the local server is running, open your web browser and navigate to the address provided by your server (e.g., http://127.0.0.1:5500/index.html if using Live Server, or http://localhost:8000/index.html for Python's http.server).

Project Structure
InteractiveQuiz/
├── index.html          # Main HTML file for the quiz structure
├── style.css           # CSS file for all styling
├── script.js           # JavaScript file for quiz logic and interactivity
└── questions.json      # JSON file containing quiz questions and answers

Future Enhancements
Timer: Implement a countdown timer for each question or for the entire quiz duration.

Hints/Explanations: Display detailed explanations for correct answers after submission.

User Progress Persistence: Utilize localStorage to save user scores or quiz progress.

Category/Difficulty Selection: Allow users to choose quiz categories or difficulty levels.

Review Answers: Add a summary screen at the end to review all questions, user's answers, and correct answers.

Keyboard Navigation: Enhance accessibility by enabling full keyboard control for quiz interaction.

Question Randomization: Implement a shuffling algorithm to pick a random subset of questions from a larger pool for each session.

License
This project is open-source and available under the MIT License.