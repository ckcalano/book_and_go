const bookslist = document.querySelector('#bookslist');

//get the form from the add form
const form = document.querySelector('#add-books-form');
//get the form from the edit form
const eform = document.querySelector('#edit-books-form');


function renderbook(doc){
    let tr = document.createElement('tr');
    let book_title = document.createElement('td');
    let book_author = document.createElement('td');
    let book_genre = document.createElement('td');
    let book_summary = document.createElement('td');
    

    //Delete Button
    let cross = document.createElement('button');
    var att = document.createAttribute("class");       // Create a "class" attribute
    att.value = "btn btn-danger";                     // Set the value of the class attribute
    cross.setAttributeNode(att); 

    let edit = document.createElement('button');
    var att = document.createAttribute("class");       // Create a "class" attribute
    att.value = "btn btn-success editbtn";             // Set the value of the class attribute
    edit.setAttributeNode(att); 

    //setting the data on created 
    tr.setAttribute('data-id', doc.id);
    book_title.textContent = doc.data().book_title;
    book_author.textContent = doc.data().book_author;
    book_genre.textContent = doc.data().book_genre;
    book_summary.textContent = doc.data().book_summary;
    cross.textContent = 'Delete';
    edit.textContent = 'Edit';

    //setting the data on <tr>
    tr.appendChild(book_title);
    tr.appendChild(book_author);
    tr.appendChild(book_genre);
    tr.appendChild(book_summary);
    tr.appendChild(cross);
    tr.appendChild(edit);
    bookslist.appendChild(tr);
    
    //deleting data
    cross.addEventListener('click', (e) => {
        window.alert("Delete Data");
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('books').doc(id).delete();

    })


    //Retrieving selected data
    edit.addEventListener('click', (e) => {
        $('#edit_modal').modal('show');
        e.target.parentElement.getAttribute('data-id');
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('books').doc(id).get().then((snapshot) =>  {
            $('#book_id').val(id);   
            $('#ebook_title').val(doc.data().book_title);     
            $('#ebook_author').val(doc.data().book_author);   
            $('#ebook_summary').val(doc.data().book_summary); 
            $('#ebook_genre').val(doc.data().book_genre); 
        });
     
    })

}


//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('books').add({
    
    book_title: form.book_title.value,
    book_author: form.book_author.value,
    book_summary: form.book_summary.value
    });
    //clears out the text box
    $('#add_modal').modal('hide');
    form.book_title.value = '';
    form.book_author.value = '';
    form.book_summary.value = '';
    form.book_genre.value = '';
})

//updating data
eform.addEventListener('submit', (e) => {
    e.preventDefault();

    let eid = eform.book_id.value
    db.collection('books').doc(eid).update({

    book_title: eform.ebook_title.value,
    book_author: eform.ebook_author.value,
    book_genre: eform.ebook_genre.value,
    book_summary: eform.ebook_summary.value    

    });
    //clears out the text box
    $('#edit_modal').modal('hide');
    

})



// real-time listener
db.collection('books').onSnapshot(snapshot => {
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