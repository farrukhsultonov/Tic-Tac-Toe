const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".playerX"),
selectBtnO = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players");

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

// user click function
function clickedBox(element) {
    console.log(element);
    if(players.classList.contains("player")){ // if player element contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element
        players.classList.add("active");
    }else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element
        players.classList.add("active");
    }
    element.style.pointerEvents = "none"; // once user select any box then that box can't be selected again
}

// bot click function
function bot(){
    let array = []; // creating empty array... we'll store unselected box index in this array
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0) { // if span has no child element
            array.push(i); // inserting unclicked or unselected boxes inside array means that span has no children
            console.log(i + " ", "has no children");
        }
    }
    console.log(array);
}