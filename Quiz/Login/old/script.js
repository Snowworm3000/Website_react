function setCookie(cname, cvalue, exdays) {
  if(getCookie("wpcc") == "dismiss"){
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Lax;";
  }
  }
  
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
  
  function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  } 

function signIn(){
    setCookie("user","ethan",300);
    console.log(getCookie("user"));
    console.log(checkCookie());
}

function enterPressed(){
  value = document.querySelector("#txtSearch").value
  addUser(value);
  console.log("ENTER")
}

function addUser(value){
  var users = firebase.database().ref("users/" + value);
  users.set(0);
}






setSignedIn();
function setSignedIn(){
username= getCookie("username");
if(username != ""){
  document.getElementById("signUp").style.display = "none";
    document.getElementById("login").innerHTML = "<img id='profile-pic' src='../user.png'>"+username;
}
}

usersObject = "";
var checkUsers = firebase.database().ref("users")
checkUsers.on('value', function(snapshot){
    user = snapshot.val();
    usersObject = user
    print(user);
})

var theDiv = document.getElementById("users");
usersList = []
function print(user){
    usersList = []
    for(i in user){
    usersList.push(i)
}
//logUserList();
addUsersToPage();
}

function addUsersToPage(){
    userElement = ""

    for(i in usersList){
        console.log(i)
        userElement += ("<li class='left'>" + usersList[i] + " <button id='"+ "d" + "' class='btn red right' onclick='deleteUser(this.id, "+i+")'  >Delete</button> <button id='" + "s" + "' class='btn green right' onclick='deleteUser(this.id, "+i+")' >Select user</button> " + "</li>") 
    }
    theDiv.innerHTML = ""
    theDiv.innerHTML += "<ul>"+ userElement +"</ul>";
}

let userName;
function deleteUser(id, user){
    //let user = document.getElementById(id).className
    //console.log(id)
    console.log(id)
    console.log(user)
    userName = usersList[parseInt(user , 10)]
    //console.log(usersList)
    //console.log(userName)

    if(id == "s"){
        console.log("It's a s");
        signIn(userName);
        setSignedIn();
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
    setCookie("username", signedIn, 300);
    var text = document.getElementById("signedIn");
    if(getCookie("wpcc") == "dismiss"){
      text.innerHTML = 'You are signed in as "' + userName + '"'
    }else{
      text.innerHTML = "You cannot sign in because you don't have our consent to use cookies."

    }
}


firebase.auth().createUserWithEmailAndPassword("ethanburkinshaw@icloud.com", "Password").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorCode);
  console.log(errorMessage);
  
  // ...
});


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
      window.location.href = "/SignIn/index.html";
  }else if(event == "signUp"){
    localStorage.setItem("rainbow",colorChange);
    window.location.href = "/SignIn/index.html";
}
  
}


let colorChange = parseFloat(localStorage.getItem("rainbow"));
function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    if (colorChange < 360){
        colorChange += 0.05;
    }else{
        colorChange = 0;
    }
    document.getElementById("rainbow").style.backgroundColor = "hsl("+colorChange+", 100%, 40%)";
  }

document.body.id = ("rainbow");
gameLoop();
