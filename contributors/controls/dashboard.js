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
                <hr>
                <p>${books.book_summary}</p>
            
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
        });


        db.collection('reviews').where('book_id', '==' , id).onSnapshot(snapshot => {
            setupReviews(snapshot.docs);
         })  
        
         //list reviews
         const setupReviews = (data) => {
            let html='';    
            data.forEach(doc => {
                const reviews = doc.data();
                const did = doc.id;
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
                
        }



    });
        
}
