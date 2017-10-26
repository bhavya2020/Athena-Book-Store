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
$(()=>{
    $.get('http://localhost:4646/users',(data)=> {
        console.log(data);
        refresh(data);
    })

    var price=$('#price');
    var popularity=$('#popularity');
    var stock=$('#stock');
    (price.click(function () {
            $.get('http://localhost:4646/users/price',(data)=> {
                console.log("price", data),
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
