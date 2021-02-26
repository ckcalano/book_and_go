const reviewform = document.querySelector('#add-review-form');

db.collection('books').get().then(snapshot => {
    setupBooks(snapshot.docs);
 })  



const booklist = document.querySelector('.row');
const reviewlist = document.querySelector('.review-lists');

const setupBooks = (data) => {
    let html='';    
    data.forEach(doc => {
        const books = doc.data();
        const did = doc.id;
        const li = `
        <div class="col-md-4 pt-2" id="holder">
        <div class="card-content">
            <div class="card-img">
                <img src="../images/cover-signup.jpg" alt="">
                <span><h4>${books.book_genre}</h4></span>
            </div>
            <div class="card-desc">
                <h3>${books.book_title}</h3>
                <p>${books.book_author}</p>
                <a href="#" id="book-modal" data-id="${did}" class="btn btn-info book-modal" data-toggle="modal" data-target="#book_modal" >Read</a>    
                <a href="#" id="book-follow" data-id="${did}" class="btn btn-info book-follow">Follow</a>   
            </div>
        </div>
        </div>
        `;  
        
        html += li

})
    
    booklist.innerHTML = html;

    $('.book-modal').click(function () {
    
       let id = $(this).attr('data-id');

       db.collection('books').doc(id).get().then((doc) =>  {  
        $('#book_id').val(id);     
        $('#book-title').text(doc.data().book_title);     
        $('#book-author').text(doc.data().book_author);   
        $('#book-summary').text(doc.data().book_summary); 
        $('#book-genre').text(doc.data().book_genre); 
        });


        db.collection('reviews').where('book_id', '==' , id).onSnapshot(snapshot => {
            setupReviews(snapshot.docs);
         })  
        
         //list reviews
         const setupReviews = (data) => {
            auth.onAuthStateChanged(user => {
            let html='';    
            data.forEach(doc => {
                const reviews = doc.data();
                const did = doc.id;
                let userid = user.email;
                const li = `
                <div class="pt-3">
                        <h5>Rating: ${reviews.user_rating}</h5>
                        <h5>${reviews.reviewer}</h5>
                        <span>${reviews.user_review}</span>
                      </div>
                `;  
                
                html += li
        })
            reviewlist.innerHTML = html; 
        })
        }

    });

    $('.book-follow').click(function () {


        auth.onAuthStateChanged(user => {
            if(user){
                let bookid = $(this).attr('data-id'); 
                let userid = user.uid;
    
                db.collection('books').doc(bookid).get().then((doc) =>  {     
                let fbook_title = doc.data().book_title;     
                let fbook_author= doc.data().book_author;   
                let fbook_summary = doc.data().book_summary; 
                let fbook_genre = doc.data().book_genre; 
                    
    
                db.collection('following').add({
                    book_id: bookid,
                    user_id: userid,
                    time_stamp:firebase.firestore.FieldValue.serverTimestamp(),
                    book_title: fbook_title,
                    book_author: fbook_author,
                    book_genre: fbook_genre ,
                    book_summary: fbook_summary
                    });
                });
    
                }
    
                alert('followed!');
    
                })


    });
    
        
}





//save review
reviewform.addEventListener('submit', (e) => {
    auth.onAuthStateChanged(user => {
    e.preventDefault();
    db.collection('reviews').add({
    reviewer: user.email,
    user_review: reviewform.user_review.value,
    book_id: reviewform.book_id.value,
    created_at:firebase.firestore.FieldValue.serverTimestamp(),
    user_rating: reviewform.user_rating.value
    });
    //clears out the text box
    reviewform.user_review.value = '';
})

})


