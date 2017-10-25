function refresh(books)
{

    let bookList=$('#books');
    bookList.empty();
    for (let book of books) {
        let newBook = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
            <div class="card-body">
                <h4 class="card-title mt-2">${book.ISBN}: ${book.title}</h4>
                <p class="card-text">A book of genre ${book.genre} written by ${book.author_name} published by ${book.publisher_name} on ${book.year.substr(0,10)} in ${book.country} having popularity rate of ${book.popularity_rate}.
                </p>
                <p class="card-text">
                <b>Price: </b> ${book.price}
                <br>
                <b>stock: </b> ${book.quantity}
                 <i data-pid="${book.ISBN}" class="fa fa-trash del" onclick="del(this)" style="color: red; float: right;font-size: 4vh"></i>
                 </p>
            </div>
        </div>`
        );
        bookList.prepend(newBook);
    }
}
$(()=>{
    $.get('http://localhost:4646/admin',(data)=> {
        refresh(data);
    });
    // let name=$('#name');
    // let price=$('#price');
    // $('#add').click(()=>{
    //     $.post('http://localhost:5656/admin',{
    //         name: name.val(),
    //         price: price.val()
    //     },(data)=>{refresh(data)});
    //     name.val('');
    //     price.val('');
    // });

    // window.del= function(el)
    // {
    //     let pid=$(el).attr('data-pid');
    //     $.post(`/admin/${pid}`,(data) => {
    //         refresh(data)
    //     })
    // }

});



