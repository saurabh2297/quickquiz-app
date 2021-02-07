function elemCreate(a, b) {
    var x = document.createElement(a);
    for (let i = 0; i < b.length; i++) { x.classList.add(b[i]); }
    return x;
  }

let main = elemCreate('DIV',['container',"text-center",'mt-5'])

let h3 = elemCreate('H3',['display-4'])
h3.style.marginTop = '15%'
h3.innerText = "Quick Quiz"
h3.style.color = 'Blue'
h3.style.fontWeight = 'Bolder'


let btn1 = elemCreate('BUTTON',['btn','btn-warning','btn-block','col-md-6','offset-md-3'])
btn1.innerText = "PLAY"
btn1.id = "play"
btn1.addEventListener('click',function(){window.open("game.html",'_self')})

let btn2 = elemCreate('BUTTON',['btn','btn-info','btn-block','col-md-6','offset-md-3'])
btn2.innerText = "HIGH SCORES"
btn2.id = "highScores"
btn2.addEventListener('click',function(){window.open("scores.html",'_self')})

main.append(h3,btn1,btn2)
document.body.append(main)