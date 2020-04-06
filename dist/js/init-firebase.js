
$(document).ready(function () {
//grab a form
var form = document.querySelector('.form-inquiry');

//grab an input
var inputName = form.querySelector('#inputName').value;
var inputEmail = form.querySelector('#inputEmail').value;
var inputPhoneNumber = form.querySelector('#inputPhone').value;
var inputMessage = form.querySelector('#FormControlTextarea1').value;

//config your firebase push
var firebaseConfig = {
    apiKey: "AIzaSyCBJlYc4U33FmCIMDqs3oI9weHY2jyXgOw",
    authDomain: "dust-to-dazzle.firebaseapp.com",
    databaseURL: "https://dust-to-dazzle.firebaseio.com",
    projectId: "dust-to-dazzle",
    storageBucket: "dust-to-dazzle.appspot.com",
    messagingSenderId: "57657779528",
    appId: "1:57657779528:web:9a6e540463a4e5b2b67f7d",
    measurementId: "G-RJ9MM1RQ2Q"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  //create a functions to push
  function firebasePush(input) {
     


    //push itself
    var contactFormInfo = database.ref('/dustToDazleInquiry').push(
        {
            userName: input.querySelector('#inputName').value,
            userEmail: input.querySelector('#inputEmail').value,
            userPhoneNumber: input.querySelector('#inputPhone').value,
            userMessage: input.querySelector('#FormControlTextarea1').value
        }
    );
    document.getElementById("formInquiry").reset();
}

//push on form submit
if (form) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        firebasePush(form);
        var submitBtn = document.querySelector('.btn-submit');
        var success = document.createElement("h6");
        success.innerText = "You have sucessfully sent the inquiry. We will get back to you as soon as possible."
        success.setAttribute("style", "color:green;");
        //shows alert if everything went well.
       // return alert('Data Successfully Sent to Realtime Database');
       return submitBtn.parentNode.insertBefore(success, submitBtn.nextSibling);
    })
}
});
