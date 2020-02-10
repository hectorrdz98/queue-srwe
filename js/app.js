// Start Firebase
        
const firebaseConfig = {
    apiKey: "AIzaSyBjdyLLi4tPcOWij19eDNjb_jyPMaQBaFg",
    authDomain: "queuesrwe.firebaseapp.com",
    databaseURL: "https://queuesrwe.firebaseio.com",
    projectId: "queuesrwe",
    storageBucket: "queuesrwe.appspot.com",
    messagingSenderId: "1038845790944",
    appId: "1:1038845790944:web:4cb6364d21d6d4e868de85",
    measurementId: "G-H01HWZQJ13"
  };
firebase.initializeApp(firebaseConfig);

const mainDB = firebase.database().ref();
var usersRef = firebase.database().ref("users");

let queueOLTeacher = $("#queueOL-teacher");
let queueOLWaiting = $("#queueOL-waiting");

let nextPos = 1;

$("#queue-btn").click(function () {
    if ($(this).hasClass('is-info')) {
        let username = $("#username").val();
        let name = $("#name").val();
        if (username != '' && name != '') {
            usersRef.child(username).set({
                name: name,
                pos: nextPos + 1,
                status: 'queue'
            });
        }
        $(this).removeClass('is-info');
        $(this).addClass('is-danger');
        $(this).addClass('is-light');
        $(this).text('Leave');
    } else {
        let username = $("#username").val();
        let name = $("#name").val();
        if (username != '' && name != '') {
        usersRef.child(username).remove();
            $(this).removeClass('is-danger');
            $(this).removeClass('is-light');
            $(this).addClass('is-info');
            $(this).text('Queue');
        }
    }
    
});

/*usersRef.once("value")
    .then(function(snapshot) {
        let users = snapshot.val();
        for (const [username, user] of Object.entries(users)) {
            queueOL.append(`<li>` + user.name + `</li>`);
        }
    });*/

usersRef.orderByChild('pos').on('child_added', function(snapshot) {
    createUser(snapshot.key, snapshot.val());
});

usersRef.on('child_changed', function(snapshot) {
    updateUser(snapshot.key, snapshot.val());
});

usersRef.on('child_removed', function(snapshot) {
    deleteUser(snapshot.key);
});



function createUser(username, user) {
    if (user.status == 'queue')
        queueOLWaiting.append(`<li id="user-` + username + `">` + user.name + `</li>`);
    else
        queueOLTeacher.append(`<li id="user-` + username + `">` + user.name + `</li>`);
}

function deleteUser(username) {
    let userElem = $("#user-" + username);
    if (userElem) userElem.remove();
}

function updateUser(username, user) {
    deleteUser(username);
    createUser(username, user);
}

//

// Set h1 text
/*
const mainH1 = document.getElementById("main");
const dbRef = firebase.database().ref().child("text");
dbRef.on("value", snap => mainH1.innerText = snap.val());

// Set input event realtime-webapps-1

function writeNew() {
    mainDB.update({
        text: $("#mainInput").val()
    });
}
*/