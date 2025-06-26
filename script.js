const questionEl = document.getElementById('question');
const submitBtn = document.getElementById('submit');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const answerEls = document.querySelectorAll('.answer');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');


let currentQuestion = 0;
let score = 0;

const Quizdata = [{
    question: 'What does CPU stand for?',
    a: 'Central Posesing Unit',
    b: 'Central Processing Unit',
    c: 'Center Pointing Unit',
    d: 'Central Prosesing Unity',
    correct: 'b'
},{
    question: 'What does GPU stand for?',
    a: 'Graphical Pocessing Unit',
    b: 'Graphics Procesing Unit',
    c: 'Craph Pointing Unit',
    d: 'Graphic Processing Unit',
    correct: 'd'
},{
    question: 'What does RAM stand for?',
    a: 'Randomise Authoticate Memory',
    b: 'Random Action Memory',
    c: 'Random Access Memory',
    d: 'Random Acting Mind',
    correct: 'c'
},{
    question: 'What does PSU stand for?',
    a: 'Power Supply',
    b: 'Power Supply Unit',
    c: 'Power Serving Unit',
    d: 'Power Service Unit',
    correct: 'b'
},{
    question: 'What does UI stand for?',
    a: 'User Intergration',
    b: 'User Input',
    c: 'User Image',
    d: 'User Interface',
    correct: 'd'
}
]


function loadQuiz(){
    const currentQuizData = Quizdata[currentQuestion];
    questionEl.innerHTML = currentQuizData.question;

   a_text.innerHTML = currentQuizData.a;        
   b_text.innerHTML = currentQuizData.b; 
   c_text.innerHTML = currentQuizData.c; 
   d_text.innerHTML = currentQuizData.d;

   deselectAnswers();
   clearFeedback();
}

function clearFeedback() {
    feedbackEl.innerHTML = '';
    feedbackEl.className = 'feedback';
}

function showFeedback(isCorrect, correctAnswer) {
    if (isCorrect) {
        feedbackEl.innerHTML = '✅ Correct!';
        feedbackEl.className = 'feedback correct';
    } else {
        const correctText = getAnswerText(correctAnswer);
        feedbackEl.innerHTML = `❌ Wrong! The correct answer is: ${correctText}`;
        feedbackEl.className = 'feedback wrong';
    }
}

function getAnswerText(answerId) {
    const currentQuizData = Quizdata[currentQuestion];
    switch(answerId) {
        case 'a': return currentQuizData.a;
        case 'b': return currentQuizData.b;
        case 'c': return currentQuizData.c;
        case 'd': return currentQuizData.d;
        default: return '';
    }
}
function getSelected(){
    let answer = undefined;
    answerEls.forEach((answerEl) =>{
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}
function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer){
        const isCorrect = answer === Quizdata[currentQuestion].correct;
        
        // Show feedback
        showFeedback(isCorrect, Quizdata[currentQuestion].correct);
        
        if (isCorrect){
            score++;
        }
        
        currentQuestion++;
        
        // Wait 2 seconds before moving to next question or showing final score
        setTimeout(() => {
            if (currentQuestion < Quizdata.length){
                loadQuiz();
            } else{
                scoreEl.innerHTML = `Your score: ${score}/${Quizdata.length}`;
                feedbackEl.innerHTML = '';
                
                // Show final message based on score
                let finalMessage = '';
                const percentage = (score / Quizdata.length) * 100;
                if (percentage >= 80) {
                    finalMessage = '🎉 Excellent work!';
                } else if (percentage >= 60) {
                    finalMessage = '👍 Good job!';
                } else {
                    finalMessage = '📚 Keep studying!';
                }
                
                setTimeout(() => {
                    feedbackEl.innerHTML = finalMessage;
                    feedbackEl.className = 'feedback final';
                }, 500);
            }
        }, 2000);
    }
});
loadQuiz();
