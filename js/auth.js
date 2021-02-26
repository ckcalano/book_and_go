const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['email_field'].value;
    const password = signupForm['password_field'].value;
    
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        window.alert('Succesfully registered!');

    })

})




const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        alert("Logged In!");
		window.location.href="users/home.html";

    })
    

})


