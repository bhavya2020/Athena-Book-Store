let author,authorbutton,price,popularity,stock,publisher,publisherbutton,genre,genrebutton;
function refresh(products)
{
    let productList=$('#products-list');
    productList.empty();
    for (let product of products) {
        let newProduct = $(`
    <div class="col s4">
      <div class="card">
        <div class="card-image">
          <img src="images.jpg">
          <span class="card-title">${product.title}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i data-isbn="${product.ISBN}" onclick="add(this)"class="material-icons">add</i></a>
        </div>
        <div class="card-content">
          <p>A book of genre ${product.genre} written by <b>${product.author_name}</b> published by <b>${product.publisher_name}</b> on ${product.year.substr(0,10)} in ${product.country} having popularity rate of <b>${product.popularity_rate}</b>.</p>
        <p>
                    <b>Price: </b> ${product.price}
                    <br>
                    <b>stock: </b> ${product.quantity}
        </div>
      </div>
    </div>
            `
        );
        productList.append(newProduct);
    }

}
$(function(){
    var names;
    $.get('http://localhost:4646/users/findnames',(data)=>{
        names=data;

        console.log(names)
    });
    $('input.autocomplete').autocomplete(
        {
            data: names,
            limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(val) {
                // Callback function when value is autcompleted.
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
    price=$('#price');
    popularity=$('#popularity');
    stock=$('#stock');

    $.get('http://localhost:4646/users',(data)=> {
        console.log(data);
        refresh(data);
    });
    author=$('#author');
    authorbutton=$('#authorbutton');
    authorbutton.click(authorfind);
    publisher=$('#publisher');
    publisherbutton=$('#publisherbutton');
    publisherbutton.click(publisherfind);
    genre=$('#genre');
    genrebutton=$('#genrebutton');
    genrebutton.click(genrefind);
    (price.click(function () {
            $.get('http://localhost:4646/users/price',(data)=> {
                console.log("price", data);
                    refresh(data)
            })

        }));
    (popularity.click(function () {
            $.get('http://localhost:4646/users/popularity',(data)=>{
                refresh(data)
            })
        }));
    (stock.click(function () {
            $.get('http://localhost:4646/users/stock',(data)=>{
                console.log("stock",data);
                refresh(data)
            })
        }));
    window.add=function (el) {
        let isb=$(el).attr('data-isbn');
        console.log(isb);
        var queryString = "?para1=" + isb;
        window.location='/cus.html'+queryString;
    };



});
function authorfind() {
    let valauthor=author.val();

    $.post(`/users/author/${valauthor}`,(data)=>{
        console.log(typeof data)
        if (!data){
            console.log("bye")
            let productList=$('#products-list');
            productList.empty();
            productList.append(`<div>No Book found in store written by ${valauthor}</div>`)
        }
        else{
        refresh(data);}
    })
}
function publisherfind() {
    let valpublisher=publisher.val();

    $.post(`/users/publisher/${valpublisher}`,(data)=>{
        console.log(typeof data)
        if (!data){
            console.log("bye")
            let productList=$('#products-list');
            productList.empty();
            productList.append(`<div>No Book found in store written by ${valpublisher}</div>`)
        }
        else{
            refresh(data);}
    })
}
function genrefind() {
    let valgenre=genre.val();

    $.post(`/users/genre/${valgenre}`,(data)=>{
        console.log(typeof data)
        if (!data){
            console.log("bye")
            let productList=$('#products-list');
            productList.empty();
            productList.append(`<div>No Book found in store written by ${valgenre}</div>`)
        }
        else{
            refresh(data);}
    })
}
