firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.alert('logged in');
    } else {
      // No user is signed in.
    }
  });

function alogin(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    

    }