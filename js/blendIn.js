// Generate a random ID for the user
//let userID = Math.random().toString(36).substr(2,99);
let userID = "4qz1g60ajw4";
checkCookie();
if(getCookie() != "") {
    userID = getCookie();
}
console.log("User is " + userID);


// Check if user is in an existing game
let gameID = window.location.href.split('=')[window.location.href.split('=').length-1];
console.log("gameID is "+gameID);
if (gameID.length === 4) {
    var docRef = db.collection("games").doc(gameID);
    var playerRef = db.collection("users").where("game", "==", gameID);
    //db.collection("players").where("game", "==", gameID)
}
else {
    gameID = "";
}

// Globals
var gameData = {};
var playerData = {};
let userFound = false;
let topics = [];
let cards = document.querySelectorAll('.card');
let players = document.querySelectorAll('.player');
let playerIcons = document.querySelectorAll('.player-icon-text');
let playerNames = document.querySelectorAll('.player-name');
let playerVotes = document.querySelectorAll('.player-voteFor');
let playerVotesFor = document.querySelectorAll('.player-votesFor');


// Add user if doesn't already exist 
function addUser() {
    for (let i = 0; i < playerData.length; i++) {
        if (playerData.id === userID) {
            userFound = true;
            console.log("User already in game");
            break
        }
        else {}
    }
    if (userFound === false) {
        console.log("Adding user to game");
        db.collection("users").doc(userID).set({
            name: "Hamish",
            votes: 0,
            role: "",
            votedFor: "",
            game: gameID,
            id: userID
        });

    }
    else {}
}



// Check if the game exists
//function retrieveGamedata() {
    docRef.onSnapshot(function(doc) {
        if (doc.exists) {
            document.getElementById('room').textContent = "Room code is "+gameID;
            gameData = doc.data();
            console.log(gameData); 
            addUser();
            if (gameData.votesSubmitted >= playerData.length) {
                console.log("Time to reveal the winner");
            }
        }
        else {
            console.log("Game does not exist");
            document.getElementById('room').textContent = "Game does not exist";
        }
    });
//}
// function retrieveUserData() {
    let i = 0;
    db.collection("users").where("game", "==", gameID)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (i>7) {}
            else {
                playerData = doc.data();
                //console.log("Current data: ", doc.data());
                players[i].style.display= "flex";
                players[i].setAttribute("uid",playerData.id);
                playerVotes[i].setAttribute("id",playerData.id);
                playerNames[i].textContent = playerData.name;
                playerIcons[i].textContent = playerData.name[0];
                playerVotes[i].onclick = function() {voteFor(playerData.id)};
                playerVotesFor[i].textContent = playerData.votes;
                if (playerData.id === userID) {
                    players[i].setAttribute("class","player self");
                    playerVotes[i].style.display = "none";
                }
                i++;
                }
                //console.log(i);
        });
        i=0;
    })
    //.catch(function(error) {
    //    console.log("Error getting documents: ", error);
    //});
// };
//retrieveGamedata();
//retrieveUserData();

// Function for new game IDs
function generateNewGameID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 4 characters
    // after the decimal.
    return "ABCD";
    //return '' + Math.random().toString(36).substr(2, 4).toUpperCase();
};

// Create a new lobby
function newGame() {
    gameID = generateNewGameID();
    window.history.pushState("object or string", "", "?="+gameID);
    document.getElementById('room').textContent = "Room code is " + gameID;
    var docRef = db.collection("games").doc(gameID);
    retrieveGamedata();
}

// Game board should always be present, but only has values once set in Firebase (so changes synced between players)
function generateNewBoard() {
    let topicIndex = Math.ceil(Math.random()*allTopics.length)-1;
    topics = allTopics[topicIndex].split(',');
    console.log(topics);
    for (let i = 0; i < cards.length; i++) {
        cards[i].textContent = topics[i];
    }
};
function assignBlender() {

};

// Start game
function startRound() {
    generateNewBoard();
    assignBlender();
};

function voteFor(id) {
    console.log("Voted for "+id);
    db.collection("users").doc(id).update({
        "votes": firebase.firestore.FieldValue.increment(1)
        })
    db.collection("games").doc(gameID).update({
        "votesSubmitted": firebase.firestore.FieldValue.increment(1)
        })
    console.log(id);
    db.collection("users").doc(userID).update({
        "votedFor": id  
        })
    };

document.querySelectorAll('.player-voteFor').forEach(item => {
    item.addEventListener("mouseup", function(event) {
        item.textContent = "Voted!";
        item.disabled = true;
        voteFor(item.getAttribute("id"));        
    }
    );
});