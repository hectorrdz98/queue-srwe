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

let user2Change = null;

$("#next-btn").click(function () {
    if ($(this).hasClass('is-info')) {
        usersRef.orderByChild("pos").limitToFirst(1).once("value", function(snapshot) {
            user2Change = snapshot.key;  
        });
        usersRef.child(user2Change).set({
            status: 'teacher'
        });
        $(this).removeClass('is-info');
        $(this).addClass('is-success');
        $(this).text('Finish');
    } else {
        deleteUser(user2Change);
        if (username != '' && name != '') {
            $(this).removeClass('is-success');
            $(this).addClass('is-info');
            $(this).text('Next Student');
        }
    }
    
});

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