const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const questionOwner = document.getElementById("questionOwner")
const correctMessage = document.getElementById("correct-message")
const leaderboardDiv = document.getElementById("shift-left");

let shuffledQuestions, currentQuestionIndex
let answered = false
let correctAnswerCounter = 0;
let totalQuestions


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

let userName = "";
checkSignIn();
function checkSignIn(){
    if(getCookie("username") != ""){
        userName = getCookie("username");
        document.getElementById("signedIn").innerHTML = "";
        signIn();
    }else if(firebase.auth().currentUser != null){
        displayName = firebase.auth().currentUser;
        if(displayName.displayName === null){
          displayName = displayName.email.split("@")[0];
        }
        userName= displayName.displayName
        document.getElementById("signedIn").innerHTML = "";
        signIn();
    }
    else{
        document.getElementById("signedIn").innerHTML = "<p>You are not signed in so your scores will not be saved on the leaderboard. Create an account or sign in by clicking <a href='../SignUp/index.html' class='link'>here</a>. Enabling cookies by pressing got it on the login/sign up page may result in faster login speeds.</p>"
    }
}

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    console.log(typeof(question) != "undefined")
    console.log(question)
    if(typeof(question) != "undefined"){
        console.log("Started")
        startButton.classList.add("hide")
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionContainerElement.classList.remove("hide")
        document.getElementById("leaderboard-con").classList.add("hide");
        document.body.id = ("rainbow");
        gameLoop();
        setNextQuestion();
    }
}

function setNextQuestion() {
    answered = false;
    document.body.id = ("rainbow");
    gameLoop();
    correctMessage.classList.add("hide")
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
} 

function showQuestion(question){
    console.log(question)
    document.getElementById("topStart").classList.add("hide")
    questionOwner.innerText = question.owner + " made this question!"
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    if(answered == false){
        answered = true
        const selectedButton = e.target
        if(selectedButton.dataset.correct){ //Gets if selected button was correct or not.
            console.log("Correct")
            correctMessage.innerText = "Correct!"
            correctAnswerCounter++
        }else{
            console.log("Wrong")
            correctMessage.innerText = "Incorrect!"
        }
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove("hide")
            correctMessage.classList.remove("hide")
        } else {
            questionContainerElement.classList.add("hide")
            startButton.innerText = "Restart"
            startButton.classList.remove("hide")
            correctMessage.classList.remove("hide")
            percentScore = Math.round(correctAnswerCounter/totalQuestions * 100)
            correctMessage.innerText = "You got " + correctAnswerCounter + "/"+ totalQuestions + " which is " + percentScore + "%"
            correctAnswerCounter = 0
            document.getElementById("questionOwner").classList.add("hide")
            document.getElementById("leaderboard-con").classList.remove("hide");
            document.body.id = ("rainbow");
            gameLoop();
            if (userName){
            uploadScore(percentScore);
            }
        }
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        document.body.id = "none";
        document.body.style.backgroundColor = "";
        element.classList.add("correct")
    } else{
        document.body.id = "none";
        document.body.style.backgroundColor = "";
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = []

/*
function displayQuestions(questionsDatabase){
    div = document.getElementById("displayQuestions")
    console.log(questionsDatabase)
    div.innerHTML = "<p>"+ JSON.stringify(questionsDatabase) +"</p>"
}
*/

var checkQuestions = firebase.database().ref("questions")
checkQuestions.on('value', function(snapshot){
    question = snapshot.val();
    let edited = Object.values(question)
    console.log(question)
    console.log(edited)
    for(i in edited){
        questions.push(edited[i]);
    }
    totalQuestions = edited.length
    console.log(totalQuestions + " UAA")
    //displayQuestions(questions);
})

let savedScores;
let getUserScores = firebase.database().ref("users")
getUserScores.on('value', function(snapshot){
    savedScores = snapshot.val();
    console.log(savedScores)
})

usersObject = "";
var checkUsers = firebase.database().ref("users")
checkUsers.on('value', function(snapshot){
    user = snapshot.val();
    usersObject = user
    print(user);
    leaderboardArray(user);
})

usersList = []
function print(user){
    usersList = []
    for(i in user){
    usersList.push(i)
}
//logUserList();
}


function deleteUser(id, user){
    //let user = document.getElementById(id).className
    //console.log(id)
    console.log(id)
    userName = usersList[parseInt(user , 10)]
    //console.log(usersList)
    //console.log(userName)

    if(id == "s"){
        console.log("It's a s")
        signIn(userName)
    }

    if(id == "d"){
        ok = confirm('Are you sure you would like to delete the user "' + userName  + '"')
        if (ok) {
            toDelete = firebase.database().ref('users/' + userName)
            toDelete.set(null);
        }
    }
}

signedIn = ""
function signIn(userValue){
    signedIn = userName
    var text = document.getElementById("signedIn");
    text.innerHTML = 'You are signed in as "' + userName + '"'
}

if(getCookie("username") != ""){
    userName = getCookie("username");
    signIn();
}else{
    document.getElementById("signedIn").innerHTML = "<p>You are not signed in so your scores will not be saved on the leaderboard. Create an account or sign in by clicking <a href='../SignIn/index.html' class='link'>here</a>.</p>"
}



function uploadScore(scorePercent){
    console.log(usersObject[userName])
    console.log(scorePercent)
    console.log(usersObject[userName] < scorePercent)
    if (usersObject[userName] < scorePercent){
        databaseScore = firebase.database().ref('users/' + userName)
        databaseScore.set(scorePercent)
    }
}

function leaderboardArray(users){
    console.log(users)
    leaderboard = []
    for(i in users){
        console.log("i")
        leaderboard.push(
            {
                name: i,
                score: users[i]
            }
        )
    }
    console.log(leaderboard)
    sortedLeaderboard = leaderboard.sort((a,b) => b.score - a.score)
    console.log(sortedLeaderboard)
    displayLeaderboard(sortedLeaderboard)
}

function displayLeaderboard(leaderboard){
    leaderboardDiv.innerHTML = ""
    leaderboardToDiv = ""
    leaderboardToDiv = "<ol class='tabs'>"
    for(i = 0; i< leaderboard.length ; i++){
        console.log(leaderboard[i].score)
        leaderboardToDiv += "<li>"+ leaderboard[i].score + "% : " + leaderboard[i].name + "</li>"
        console.log("hi")
    }
    leaderboardToDiv += "</ol>"
    leaderboardDiv.innerHTML = leaderboardToDiv
    console.log(leaderboardDiv.innerHTML)
    console.log(leaderboardToDiv)
}

function anchor(event){
    if(event == "home"){
        localStorage.setItem("rainbow",colorChange);
        window.location.href = "/index.html";
    }else if(event == "quiz"){
        localStorage.setItem("rainbow",colorChange);
        window.location.href = "/Quiz/index.html";
    }else if(event == "quizM"){
        localStorage.setItem("rainbow",colorChange);
        window.location.href = "/CreateQuiz/index.html";
    }else if(event == "login"){
        localStorage.setItem("rainbow",colorChange);
        window.location.href = "/Login/index.html";
    }else if(event == "signUp"){
      localStorage.setItem("rainbow",colorChange);
      window.location.href = "/SignUp/index.html";
  }
    
  }

  let colorChange = parseFloat(localStorage.getItem("rainbow"));
  function gameLoop(){
      window.requestAnimationFrame(gameLoop);
      if (colorChange < 360){
          colorChange += 1;
      }else{
          colorChange = 0;
      }
      document.getElementById("rainbow").style.backgroundImage = "linear-gradient(-45deg , hsl("+colorChange+", 100%, 40%), hsl("+(colorChange + 70)+", 100%, 40%)";
    }
  
  document.body.id = ("rainbow");
  gameLoop();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // signed in
        displayName = user.displayName;
        if(user.displayName === null){
          displayName = user.email.split("@")[0];
        }
        userName = displayName;
        checkSignIn();
        document.getElementById("signUp").style.display = "none";
    document.getElementById("login").innerHTML = "<img id='profile-pic' src='../user.png'>"+userName;
    }
});