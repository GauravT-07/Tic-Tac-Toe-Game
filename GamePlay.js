const box = document.querySelectorAll(".box")
const container = document.querySelector(".container")
const boxtext = document.querySelectorAll(".boxtext")
const turninfo = document.querySelector(".info")
console.log(boxtext);
console.log(box)
var turn = "X"
let isgameover = false;
container.addEventListener('click', function (e) {
    let audio = document.createElement("audio");
    console.log(e.target)
    audio.src = 'ting.mp3'
    audio.autoplay = true;
    container.appendChild(audio);
});

const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            document.getElementsByClassName("info")[0].style.backgroundColor = 'yellow'
            isgameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}


//Function to handle turn
function handleText(e) {
    var span = e.currentTarget.querySelector('.boxtext');
    console.log(span)
    
    if(span.innerText == "") {
        span.innerText = turn;
        Socket.emit("playing", {turn:turn,id:e.id,name:name})
        (turn=='X')?turn='O':turn="X";
         turninfo.innerText= `Turn for ${turn}`
    }
    checkWin();
   if (!isgameover){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    } 
};

box.forEach(function (div) {
    div.addEventListener('click', handleText);
});

reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})