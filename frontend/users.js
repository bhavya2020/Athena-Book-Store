function refresh(products)
{
    let productList=$('#products-list');
    productList.empty();
    for (let product of products) {
        let newProduct = $(`
             <div class="card col-3 m-2" style="width: 20rem;">
            <div class="card-body">
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">Price:${product.price}</p>
                <i data-pid="${product.id}" class="fa fa-plus" onclick="add(this)" style="color: blue; float: right;font-size: 4vh"></i>
            </div>
        </div>`
        );
        productList.prepend(newProduct);
    }
}
$(()=>{
    $.get('http://localhost:5656/users',(data)=> {
        refresh(data);
    });
    window.add= function(el)
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
    })
});
