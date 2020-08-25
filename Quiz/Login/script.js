function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Lax;";
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

  let usernameCookie= getCookie("username");
  if(usernameCookie != ""){
    console.log("DOOONE")
    document.getElementById("signUp").style.display = "none";
    if(getCookie("profile-pic")){
      console.log("THIS")
      document.getElementById("login").innerHTML = "<img id='profile-pic' src='"+ getCookie('profile-pic') +"'>"+usernameCookie;
    }else{
      document.getElementById("login").innerHTML = "<img id='profile-pic' src='./user.png'>"+usernameCookie;
    }
    console.log(getCookie("profile-pic"))
    console.log(getCookie("username"))
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
  uname = document.querySelector("#username").value
  passwd = document.querySelector("#password").value
  signInUserEmail(uname,passwd);
  //addUser(value);
  console.log("ENTER")
}

function addUser(value){
  let userUID = firebase.auth().currentUser.uid;
  console.log(userUID)
  //console.log(value)
  console.log(value);
  console.log("he")
  let users = "";
  firebase.database().ref('/users/' + value).once('value').then(function(snapshot) {
    console.log(snapshot.val())
    console.log("what")
    users = snapshot.val()
    console.log(users)
    if(users == null){
      console.log("Set")
      firebase.database().ref("/users/" + value).set({
        "name": displayName,
        "score":0
      });
    }else{
      console.log("Not set")
    }
    // ...
  });
  console.log(users.get);
  console.log(typeof(users) != null)
  
}

function signInUserEmail(uname,passwd){
  firebase.auth().signInWithEmailAndPassword(uname, passwd).then(function(){
    document.getElementById("errorMessageEmail").innerText = "";
    console.log()
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);

    document.getElementById("errorMessageEmail").innerText = errorMessage;
    
    // ...
  });
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


firebase.auth().createUserWithEmailAndPassword("email", "password").catch(function(error) {
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
      window.location.href = "/Quiz/index.html";
  }else if(event == "quiz"){
      localStorage.setItem("rainbow",colorChange);
      window.location.href = "/Quiz/Game/index.html";
  }else if(event == "quizM"){
      localStorage.setItem("rainbow",colorChange);
      window.location.href = "/Quiz/CreateQuiz/index.html";
  }else if(event == "login"){
      localStorage.setItem("rainbow",colorChange);
      window.location.href = "/Quiz/Login/index.html";
  }else if(event == "signUp"){
    localStorage.setItem("rainbow",colorChange);
    window.location.href = "/Quiz/SignUp/index.html";
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


const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => signOut();

function signOut(){
  auth.signOut();
  setCookie("username","");
  location.reload();
}

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const userDetails = document.getElementById('userDetails');
let usebe;

let displayName;
auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        console.log(user)
        displayName = user.displayName;
        if(user.displayName === null){
          usebe = user;
          console.log(user.email);
          console.log(user.email.split("@")[0])
          displayName = user.email.split("@")[0];
        }
        setCookie("username", displayName);
        setCookie("profile-pic",user.photoURL);
        addUser(user.uid);
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${displayName}!</h3>`;
        document.getElementById("signUp").style.display = "none";
        if(user.photoURL){
          document.getElementById("login").innerHTML = "<img id='profile-pic' src='"+user.photoURL+"'>"+displayName;
              }else{
                  document.getElementById("login").innerHTML = "<img id='profile-pic' src='../user.png'>"+displayName;
              }
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        //setCookie("username","");
        //setCookie("profile-pic","");
    }
});

