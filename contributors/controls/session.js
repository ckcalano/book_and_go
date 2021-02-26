

auth.onAuthStateChanged(user => {
    auth.onAuthStateChanged(user => {
        if(user){
            
        }
        else{
            window.location.href="../index.html";
        }
    })
})


const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            alert('User Sign Out!');
            window.location.href="../index.html";
        } )
    })