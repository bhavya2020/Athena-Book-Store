var author,authorbutton,price,popularity,stock,publisher,publisherbutton,genre,genrebutton;
function refresh(products)
{
    let productList=$('#products-list');
    productList.empty();
    for (let product of products) {
        let newProduct = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
            <div class="card-body">
                <h4 class="card-title mt-2">${product.title}</h4>
                <p class="card-text">A book of genre ${product.genre} written by <b>${product.author_name}</b> published by ${product.publisher_name} on ${product.year.substr(0,10)} in ${product.country} having popularity rate of <b>${product.popularity_rate}</b>.
                </p>
                <p class="card-text">
                <b>Price: </b> ${product.price}
                <br>
                <b>stock: </b> ${product.quantity}
                <br><div style="float: right">Add to cart
                 <i data-isbn="${product.ISBN}" class="fa fa-plus-circle add" onclick="del(this)" style="color: navy; float: right;font-size: 4vh"></i>
                 </div></p>
            </div>
        </div>`
        );
        productList.append(newProduct);
    }
}
$(function(){


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
                console.log("popularity",data)
                refresh(data)
            })
        }));
    (stock.click(function () {
            $.get('http://localhost:4646/users/stock',(data)=>{
                console.log("stock",data)
                refresh(data)
            })
        }));

    /*window.add= function(el)
    {
        let pid=$(el).attr('data-pid');
        $.post(`/users/${pid}`,(p) => {
            let pp=localStorage.getItem(`product`+`${p.id}`);
            if(pp==null) {
                let product = [p.id, p.name, p.price,1];
                let Product = product.join(';');
                localStorage.setItem(`product` + `${p.id}`, Product);
            }
            else
            {
                let p1=pp.split(';');
                let product = [p.id, p.name, p.price,parseInt(p1[3])+1];
                let Product = product.join(';');
                localStorage.setItem(`product` + `${p.id}`, Product);
            }
        })
    };
    $('#cart').click(()=>{
        window.location='/cart.html';
    })*/
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
