const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".playerX"),
selectBtnO = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = document.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button")

window.onload = () => { // once window loaded
    for (let i = 0; i < allBox.length; i++) { // add onclick attribute in all available section's span
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectBtnX.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box when playerX button clicked
        playBoard.classList.add("show"); // show the playboard section when playerX button is clicked

    }
    selectBtnO.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box when playerO button clicked
        playBoard.classList.add("show"); // show the playboard section when playerO button is clicked
        players.setAttribute("class", "players active player"); // adding three class names in player element
    }
}

let playerXIcon = "fa-solid fa-x"; // font awesome cross icon
let playerOIcon = "fa-solid fa-o"; // font awesome circle icon
let playerSign = "X"; // suppose player will be X
let runBot = true;

// user click function
function clickedBox(element) {
    if(players.classList.contains("player")){ // if player element contains .player
        playerSign="O"; // if player will be O then we'll change the sign
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value to O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // calling the winner function
    playBoard.style.pointerEvents = "none"; // once user select then user can't select any other box 
    element.style.pointerEvents = "none"; // once user select any box then that box can't be selected again
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // generating random time delay so bot will delay randomly choosing a box
    setTimeout(() => {
        bot(runBot); // calling bot function
    }, randomDelayTime); // passing random delay time
}

// bot click function
function bot(runBot){
    if(runBot){ // if runbot is true then run the following codes
           // first change the playerSign.. so if user has X value in id then bot will have O
    playerSign = "O"
    let array = []; // creating empty array... we'll store unselected box index in this array
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0) { // if span has no child element
            array.push(i); // inserting unclicked or unselected boxes inside array means that span has no children
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select random unselected box
    if(array.length > 0){
        if(players.classList.contains("player")){ // if player element contains .player
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element
            players.classList.remove("active");
            // if user us O then the bx id value will be X
            playerSign = "X";
            allBox[randomBox].setAttribute("id", playerSign);
        }else {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner(); // calling the winner function
    }
    allBox[randomBox].style.pointerEvents = "none"; // once bot selects any box then user can't click that same box
    playBoard.style.pointerEvents = "auto";
    playerSign = "X"; // passing the x value
    }
}

// winner function
function getClass(idname){ 
    return document.querySelector(".box" + idname).id // returning id name
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){ // if one combination matches then select winner
    if(checkClass(1, 2, 3, playerSign) 
        || checkClass(4, 5, 6, playerSign) 
        || checkClass(7, 8, 9, playerSign) 
        || checkClass(1, 4, 7, playerSign) 
        || checkClass(2, 5, 8, playerSign) 
        || checkClass(3, 6, 9, playerSign) 
        || checkClass(1, 5, 9, playerSign) 
        || checkClass(3, 5, 7, playerSign)){
        // once match won by someone stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(() => { // delay show result box
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
        }, 700); // 700ms delay
        
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else {
        // if its a match
        // first check all id. if all span has id and no one won the game then its draw
        if(getClass(1) != "" 
            && getClass(2) != "" 
            && getClass(3) != "" 
            && getClass(4) != "" 
            && getClass(5) != "" 
            && getClass(6) != "" 
            && getClass(7) != "" 
            && getClass(8) != "" 
            && getClass(9) != ""){
        runBot = false;
        bot(runBot);
        setTimeout(() => { // delay show result box
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
        }, 700); // 700ms delay
        
        wonText.innerHTML = `😯 Its a draw!`;
        }
    }
}

// Restart/Replay
replayBtn.onclick = () => {
    window.location.reload(); // reload game
}