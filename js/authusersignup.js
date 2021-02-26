const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['email_field'].value;
    const password = signupForm['password_field'].value;
    
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            fullname: signupForm['fullname_field'].value,
            birthdate: signupForm['bdate_field'].value,
            email: email,
            user_type: 'user' 
        });
        
    }).then(() => {
        window.alert('Succesfully registered!');
        window.location.href="../login-user.html";

    })

})



