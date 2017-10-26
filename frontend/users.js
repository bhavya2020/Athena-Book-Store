var author,authorbutton,price,popularity,stock,publisher,publisherbutton,genre,genrebutton;
function refresh(products)
{
    let productList=$('#products-list');
    productList.empty();
    for (let product of products) {
        console.log(product.ISBN);
        let newProduct = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
                <div class="card-body">
                    <h4 class="card-title mt-2">${product.title}</h4>
                    <p class="card-text">A book of genre ${product.genre} written by <b>${product.author_name}</b> published by <b>${product.publisher_name}</b> on ${product.year.substr(0,10)} in ${product.country} having popularity rate of <b>${product.popularity_rate}</b>.
                    </p>
                    <p class="card-text">
                    <b>Price: </b> ${product.price}
                    <br>
                    <b>stock: </b> ${product.quantity}
                    <br><div style="float: right">Add to cart
                     <i class="fa fa-plus-circle add" data-toggle="modal" data-target="#${product.ISBN}" ></i>
                     </div></p>
                </div>
                  <div class="modal fade" id="${product.ISBN}" role="dialog">
                    <div class="modal-dialog">
                    
                      <!-- Modal content-->
                      <div class="modal-content" >
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">Customer Details</h4>
                        </div>
                        <div class="modal-body">
                          <input type="text" placeholder="Name" id="namecust">
                          <input type="text" placeholder="Email" id="emailcust">
                          <input type="number" placeholder="Phonenum" id="phonecust">
                          <input type="text" placeholder="Address" id="addresscust">
                          
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default"  id="submitcust" data-isbn="${product.ISBN}" onclick="add(this)" data-dismiss="modal">Submit</button>
                        </div>
                      
                      
                    </div>
                    </div>
                  </div>
                </div>
              
            `
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
    window.add=function (el) {
        let isb=$(el).attr('data-isbn');
        var name=$('#namecust');
        //date of purchase
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = yyyy+''+mm+''+dd;

        var email=$('#emailcust');
        var phone=$('#phonecust');
        var address=$('#addresscust');
        var submitcust=$('#submitcust');
            $.post('http://localhost:4646/users/buybooks',{
                isbn:isb,
                name:name.val(),
                email:email.val(),
                phone:phone.val(),
                address:address.val(),
                date:today
            },(data)=>{refresh(data);alert("you have successfully purchased the book")})
        // $(el).setAttribute({'data-dismiss':'modal'})

        

    }
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
