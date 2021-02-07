function elemCreate(a, b) {
    var x = document.createElement(a);
    for (let i = 0; i < b.length; i++) { x.classList.add(b[i]); }
    return x;
  }


function success() {
    if(document.getElementById("username").value==="") { 
           document.getElementById('saveBtn').disabled = true; 
    } else { 
           document.getElementById('saveBtn').disabled = false;
    }
}


let main = elemCreate("DIV",["container", "mt-5"])

let row1 = elemCreate("DIV",['row'])

let col1 = elemCreate("DIV",["col-12", "text-center", "mt-5"])

let score = elemCreate("DIV",['display4'])
score.innerHTML = `Your Score : ${sessionStorage.getItem("score")}`
score.style.fontSize = "4.5rem"
score.style.color = "brown"

let username = elemCreate("INPUT",["form-control", "col-md-6", "offset-md-3","mt-1"])
username.type = "text"
username.placeholder = "User Name"
username.id = "username"
username.style.height = "40px"
username.onkeyup = function(){success()}

let save = document.createElement("button")
save.type = "button"
save.classList.add("col-md-6", "btn", "btn-warning","btn-block", "mt-3","offset-md-3")
save.id = "saveBtn"
save.innerHTML = "Save"
save.disabled = true
save.onclick = function(){
    localStorage.setItem(document.getElementById("username").value, sessionStorage.getItem("score"))
    document.getElementById("username").disabled = true
    document.getElementById("saveBtn").disabled = true
    sessionStorage.clear()
}

let home = document.createElement("button")
home.type = "button"
home.classList.add("col-md-6","btn", "btn-danger","btn-block", "mt-3","offset-md-3")
home.id = "goHome"
home.innerHTML = "Go Home"
home.onclick = function(){window.open("index.html", "_self")}

let playAgain = document.createElement("button")
playAgain.type = "button"
playAgain.classList.add("col-md-6","btn", "btn-success","btn-block", "mt-3","offset-md-3")
playAgain.id = "playAgain"
playAgain.innerHTML = "Play Again"
playAgain.onclick = function(){window.open("game.html", "_self")}

let btn2 = elemCreate('BUTTON',['btn','btn-info','btn-block','col-md-6','offset-md-3'])
btn2.innerText = "HIGH SCORES"
btn2.id = "highScores"
btn2.addEventListener('click',function(){window.open("scores.html",'_self')})

col1.append(score, username, save, playAgain, home,btn2)
row1.appendChild(col1)
main.appendChild(row1)
document.body.appendChild(main)
