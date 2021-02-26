const userslist = document.querySelector('#userslist');


function renderbook(doc){
    let tr = document.createElement('tr');
    let email = document.createElement('td');
    let full_name = document.createElement('td');
    let birthdate = document.createElement('td');
    let user_type = document.createElement('td');
    

    //setting the data on created 
    tr.setAttribute('data-id', doc.id);
    email.textContent = doc.data().email;
    full_name.textContent = doc.data().fullname;
    birthdate.textContent = doc.data().birthdate;
    user_type.textContent = doc.data().user_type;


    //setting the data on <tr>
    tr.appendChild(email);
    tr.appendChild(full_name);
    tr.appendChild(birthdate);
    tr.appendChild(user_type);
    userslist.appendChild(tr);
    


}



// real-time listener
db.collection('users').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderbook(change.doc);
        } 
        else if (change.type == 'removed'){
            let tr = bookslist.querySelector('[data-id='+change.doc.id + ']');
            bookslist.removeChild(tr); 
        }

    })
});        