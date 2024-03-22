let data;
let homeFrame=document.getElementById("homeFrame")
let frame=document.getElementById("frame")
let scoreFrame=document.getElementById("scoreFrame")
let que = document.getElementById("que")
let ans = document.getElementsByClassName("ans")
let next = document.getElementById("next")
let scorebtn = document.getElementById("scorebtn")
let page = document.getElementById("count")
let score = document.getElementById("score")
let question = 0;
let myScore = 0;
let corr = 0;
let pageCount = 0;
let correct;
let incorrect;
let colorStatus;
let length = 0;
let subject;
fetch('./Quiz.json').then((response) => {
    return response.json()
}).then((res) => {
    data = res;
})
function getSubject(sub) {
    subject = sub
    homeFrame.style.left = "100%"
   frame.style.left="35%"
   getStart()
}
function getStart() {
    pageCount++
    que.innerHTML = data[subject][0][question][0]
    for (let index = 0; index < data[subject][0][question][1].length; index++) {
        ans[index].value = data[subject][0][question][1][index]
        ans[index].disabled = false;
    }
    next.style.visibility = "hidden";
    page.innerHTML = `${pageCount}/${data[subject][0].length}`
}
function getAns(option, i) {
    if (data[subject][1][corr] == option) {
        // console.log(data[subject][1][corr]);
        myScore++
        ans[i].style.backgroundColor = "rgba(51, 213, 51, 0.51)"
        correct = i;
        colorStatus = true
    }
    else {
        ans[i].style.backgroundColor = "rgba(255, 0, 0, 0.48)"
        incorrect = i;
        colorStatus = false
    }
    nextbtnVisibility()
    for (const index of ans) {
        index.disabled = true;
    }
}
function nextbtnVisibility() {
    if (length == data[subject][0].length - 1) {
        next.style.visibility = "hidden";
        scorebtn.style.visibility = "visible";
    }
    else {
        next.style.visibility = "visible";
    }
    length++;
}
function getNext() {
    question++
    corr++
    getStart();
    ansColor();
}

function getScore() {
    score.innerHTML = `your score ${myScore} out of ${data[subject][0].length}`
    scoreFrame.style.left = "35%";
    frame.style.left = "100%"
    scorebtn.style.visibility = "hidden";

}
function getBack() {
    question = 0;
    corr = 0;
    myScore = 0;
    pageCount = 0;
    length = 0;
    ansColor()
    homeFrame.style.left = "35%" 
    scoreFrame.style.left="100%"  
}
function getRestart() {
    question = 0;
    corr = 0;
    myScore = 0;
    pageCount = 0;
    length = 0;
    getStart()
    ansColor()
    scoreFrame.style.left = "100%";
    frame.style.left = "35%"
}
function ansColor() {
    colorStatus === true ? ans[correct].style.backgroundColor = "unset" : ans[incorrect].style.backgroundColor = "unset"
}