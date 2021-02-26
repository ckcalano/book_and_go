auth.onAuthStateChanged(user => {
    if(user){
    window.location.href="admin/dashboard.html";
    }
    else{
    
    }
})