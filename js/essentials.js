const booklist = document.querySelector('#book-list');
//get the form from the add form
const form = document.querySelector('#add-books-form');

function renderbook(doc){
    let li = document.createElement('li');
    let book_title = document.createElement('span');
    let book_author = document.createElement('span');
    //deleting data
    let cross = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    book_title.textContent = doc.data().book_title;
    book_author.textContent = doc.data().book_author;
    //deleting data
    cross.textContent = 'x';
    
    li.appendChild(book_title);
    li.appendChild(book_author);
    li.appendChild(cross);

    booklist.appendChild(li);
    
    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('books').doc(id).delete();

    })


        }

//getting specific part of data
//db.collection('books').where('book_author', '==' , 'Yuki').get().then((snapshot) =>  {

//getting by order
//db.collection('books').orderBy('book_author').get().then((snapshot) =>  {

//getting data
//db.collection('books').get().then((snapshot) =>  {
//    snapshot.docs.forEach(doc => {
        //displays the function
//        renderbook(doc);
//    })
//});


//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('books').add({
    
    book_title: form.book_title.value,
    book_author: form.book_author.value
    });
    //clears out the text box
    form.book_title.value = '';
    form.book_author.value = '';
})


// real-time listener
db.collection('books').orderBy('book_title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderbook(change.doc);
        } else if (change.type == 'removed'){
            let li = booklist.querySelector('[data-id='+change.doc.id + ']');
            booklist.removeChild(li); 
        }

    })
});