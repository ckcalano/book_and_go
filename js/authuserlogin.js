auth.onAuthStateChanged(user => {
    if(user){
    window.location.href="users/home.html";
    }
    else{
    
    }
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


