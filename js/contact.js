const config = {
    apiKey: "AIzaSyBc0yJx_vskSCtPTdae93J5yUH5NFSUlcA",
    authDomain: "portfolio-contact-form-9ec3d.firebaseapp.com",
    projectId: "portfolio-contact-form-9ec3d",
    storageBucket: "portfolio-contact-form-9ec3d.appspot.com",
    messagingSenderId: "27538223169",
    appId: "1:27538223169:web:5356007e49ca1ab0b016c0",
    measurementId: "G-7K0CRQK5WQ"
};
firebase.initializeApp(config);

var db = firebase.firestore();







//Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);




//submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');


    //save message

    saveMessage(name, email, message);

    // Show alert
    document.querySelector('.alertForm').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alertForm').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('contactForm').reset();

    console.log(name)


    
}


// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}


// Save message to firebase

async function saveMessage(name, email, message) {

    var currentdate = new Date();

    
    const userRef = db.doc(`messages/${email}`)
    console.log(await userRef.get().then((docSnapshot)=>docSnapshot.exists))

    if (await userRef.get().then((docSnapshot)=>docSnapshot.exists)) {


        await userRef.update({
            message: firebase.firestore.FieldValue.arrayUnion(`${message}`)
        })


    }

    else {


        await userRef.set({
            name,
            email,
            message: firebase.firestore.FieldValue.arrayUnion(`${message}`)



        })
    }


}