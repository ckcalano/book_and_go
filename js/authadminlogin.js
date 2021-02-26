auth.onAuthStateChanged(user => {
    if(user){
    window.location.href="admin/dashboard.html";
    }
    else{
    
    }
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const email = loginForm['admin-email'].value;
    const password = loginForm['admin-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        alert("Logged In!");
		window.location.href="admin/dashboard.html";

    })
    

})