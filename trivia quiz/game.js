function elemCreate(a, b) {
    var x = document.createElement(a);
    for (let i = 0; i < b.length; i++) { x.classList.add(b[i]); }
    return x;
  }


const fetcher = async ()=>{
    try{
      const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
        const data = await response.json();
        let quiz = []
        for(let i=0;i<data.results.length;i++){
            let obj = {}
            obj.question = data.results[i].question
            obj.correctAnswer = data.results[i].correct_answer
            let incorrect = data.results[i].incorrect_answers
            incorrect.push( obj.correctAnswer)
            obj.options = incorrect
            quiz.push(obj)
        }
        return quiz;
    }
    catch(e)
    {
       alert("unable to get data ")
      console.log(e)
    }
  };
  
let main = elemCreate("DIV",['container','mt-5'])

let row1 = elemCreate("DIV",['row'])

let col1 = elemCreate("DIV",['col-md-12'])

let row2 = elemCreate("DIV",['row'])

let col2 = elemCreate("DIV",['col-md-6','mt-2'])

let Qh2  = elemCreate("H2",['display-4'])
Qh2.innerHTML = `<h2>Question : </h2>`;
Qh2.id = "progressText"

let prg  = elemCreate("DIV",['progress'])
prg.style.height = "2vw";

let prgb = elemCreate("DIV",["progress-bar", "progress-bar-striped", "progress-bar-animated",'bg-success'])
prgb.setAttribute("role", "progressbar")
prgb.setAttribute("aria-valuenow", "75")
prgb.setAttribute("aria-valuemin", "0")
prgb.setAttribute("aria-valuemax", "100")
prgb.style.width = `0%`
prgb.id = "percent"

let col3 = elemCreate("DIV",['col-md-6','text-center','mt-2'])

let sh2  = elemCreate("H2",['col-md-4','offset-md-8'])
sh2.innerHTML = "Score"
sh2.style.fontWeight = "bold"

let s1h2 = elemCreate("H2",['col-md-4','offset-md-8'])
s1h2.style.fontWeight = "bold"
s1h2.innerHTML = "0"
s1h2.style.color = 'blue'
s1h2.id = "score"

col3.append(sh2,s1h2)
prg.append(prgb)
col2.append(Qh2,prg)    
row2.append(col2,col3)

let row3 = elemCreate("DIV",['row','mt-5'])

let h4 =  elemCreate("H4",'col-12')
h4.style.fontWeight = "bold"
h4.innerHTML = "Question : _"
h4.id = "question"

row3.append(h4)

for(let i = 0; i < 4; i++){
    let opt = elemCreate("BUTTON",["btn", "btn-warning", "btn-lg", "btn-block", "text-left", "mt-3", "choice-text"])
    opt.type = "button"
    opt.innerHTML = "_"
    opt.id = `opt${i}`
    row3.appendChild(opt)
}

let next = elemCreate("button",["btn", "btn-success", "btn-lg", "mt-3", "mb-5", "col-sm-2", "offset-sm-10"])
next.type = "button"
next.innerHTML = "Next"
next.id = "next"
row3.appendChild(next)


  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
  }


  let Score = 0;


  fetcher().then((data) => {
    function makePage(id, Score){
        let q = data[id];
        let s = Score;
        document.getElementById("progressText").innerHTML = `<b>Question : ${id + 1} / 10</b>`
        document.getElementById("percent").style.width = `${id + 1}0%`
        document.getElementById("score").innerHTML = `${s * 10}`
        document.getElementById("question").innerHTML = `<b>Question : </b>${q.question}`
        let options = ["<b>A. </b>", "<b>B. </b>", "<b>C. </b>", "<b>D. </b>"]
        q.options = shuffle(q.options)
        for(let i = 0; i < 4; i++){
            document.getElementById(`opt${i}`).innerHTML = options[i] + q.options[i]
            document.getElementById(`opt${i}`).addEventListener("click", function(){
                for(let i = 0; i < 4; i++){
                    document.getElementById(`opt${i}`).disabled = true;
                }
                if (q.options[i] == q.correctAnswer){
                    document.getElementById(`opt${i}`).classList.remove("btn-warning", "btn-success", "btn-danger")
                    document.getElementById(`opt${i}`).classList.add("btn-success")
                    s += 1;
                    document.getElementById("score").innerHTML = `${s * 10}`
                }
                else{
                    document.getElementById(`opt${i}`).classList.remove("btn-warning", "btn-success", "btn-danger")
                    document.getElementById(`opt${i}`).classList.add("btn-danger")
                }
                for(let i=0; i<4; i++){
                    if (q.options[i] == q.correctAnswer){
                        document.getElementById(`opt${i}`).classList.remove("btn-warning", "btn-success", "btn-danger")
                        document.getElementById(`opt${i}`).classList.add("btn-success")
                    }
                    else{
                        document.getElementById(`opt${i}`).classList.remove("btn-warning", "btn-success", "btn-danger")
                        document.getElementById(`opt${i}`).classList.add("btn-danger")
                    }
                }
            })

        }

        if(id == 9){
            document.getElementById("next").innerHTML = "Finish"
        }
        document.getElementById("next").addEventListener("click", function(){
            for(let i = 0; i < 4; i++){
                document.getElementById(`opt${i}`).classList.remove("btn-warning", "btn-success", "btn-danger")
                    document.getElementById(`opt${i}`).classList.add("btn-warning")
                    document.getElementById(`opt${i}`).disabled = false;
            }
            if(id < 9){
                makePage(id + 1, s)
            }else{
                sessionStorage.setItem("score", s * 10);
                window.open("end.html", "_self")
            }
        })
    }
    makePage(0, 0)
    })

col1.append(row2,row3)
row1.append(col1)
main.append(row1)
document.body.append(main)