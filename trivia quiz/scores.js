function elemCreate(a, b) {
    var x = document.createElement(a);
    for (let i = 0; i < b.length; i++) { x.classList.add(b[i]); }
    return x;
  }


let main = elemCreate("DIV",['container','mt-5'])

let row1 = elemCreate("DIV",["row"])

let col1 = elemCreate("DIV",["col-12","text-center","mt-5"])

let head = document.createElement("div")
head.classList.add("dispaly-4", "mb-3")
head.innerHTML = "High Scores"
head.style.fontSize = "4rem"
head.style.color = "maroon"

let highscores = JSON.stringify(localStorage)
col1.append(head)

let sorted = [];
for (const [key, value] of Object.entries(localStorage)) {
    sorted.push([key, value])
}

sorted.sort((a, b) => {return a[1] - b[1]})
sorted.reverse()

for(let i of sorted){
    let score = document.createElement("div")
    score.classList.add("display-3")
    score.innerHTML = `${i[0]} - ${i[1]}`
    score.style.fontSize = "2.5rem"
    score.style.color = "blue"
    col1.appendChild(score)
}

let home = document.createElement("button")
home.type = "button"
home.classList.add("col-md-6", "btn", "btn-success", "btn-lg", "mt-3", "mb-3")
home.id = "goHome"
home.innerHTML = "Go Home"
home.onclick = function(){window.open("index.html", "_self")}
col1.appendChild(home)

row1.appendChild(col1)
main.appendChild(row1)
document.body.appendChild(main)