const questions=[
    {
        question:"Which is the color of Apple?",
        answers:[
            {text:"Blue", correct: false},
            {text:"Orange", correct: false},
            {text:"Red", correct: true},
            {text:"Brown", correct: false},
        ]
    },
    {
        question:"Which is the color of Orange?",
        answers:[
            {text:"Blue", correct: false},
            {text:"Orange", correct: true},
            {text:"Yellow", correct: false},
            {text:"Brown", correct: false},
        ]

    },
    {
        question:"Which is the color of Strawberry?",
        answers:[
            {text:"Brown", correct: false},
            {text:"Orange", correct: false},
            {text:"Red", correct: true},
            {text:"Green", correct: false},
        ]
    },
    {
        question:"Which is the color of Pineapple?",
        answers:[
            {text:"Yellow", correct: true},
            {text:"Purple", correct: false},
            {text:"Red", correct: false},
            {text:"Brown", correct: false},
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuizz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disbled= true;
    });
    nextButton.style.display="block";

}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}




nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuizz();
    }
});

startQuizz();