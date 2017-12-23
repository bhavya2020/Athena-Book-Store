// const users=require("usernames");
function refresh(books)
{

    let bookList=$('#books');
    bookList.empty();
    for (let book of books) {
        let newBook = $(`

             <div class="card col s4 m-2" style="width: 20rem;">
            <div class="card-body ">
                <h4 class="card-title mt-2">${book.ISBN}: ${book.title}</h4>
                <p class="card-text">A book of genre ${book.genre} written by ${book.author_name} published by ${book.publisher_name} on ${book.year.substr(0,10)} in ${book.country} having popularity rate of ${book.popularity_rate}.
                </p>
                <p class="card-text">
                <b>Price: </b> ${book.price}
                <br>
                <b>stock: </b> ${book.quantity}
                <div style="float: right">
                <i data-isbn="${book.ISBN}" class="material-icons" onclick="minus(this)" style="color: green; font-size: 4vh">remove</i>
                <i data-isbn="${book.ISBN}" class="material-icons" onclick="plus(this)" style="color: blue; font-size: 4vh">add</i>
                 <i data-isbn="${book.ISBN}" class="material-icons" onclick="del(this)" style="color: red; font-size: 4vh">delete</i>
                 </div>
                 </p>
            </div>
        </div>
`
        );
        bookList.prepend(newBook);
    }
}
$(()=> {
    let purchase=$('#purchase');
    $("#user").click(()=>{
        console.log("user");
        window.location = '/users.html'
    });
    let forgpassemail,forgpassuser;

    $("#forpass").click(function(){
        if($('#forgotpassuser').val()==="a") {

            to = $("#forgotpassemail").val();
            $("#message").text("Sending E-mail...Please wait");
            $.get("http://localhost:4646/send", {touser: to}, function (data) {
                if (data == "sent") {
                    $("#message").empty().html("<p>Email is been sent at " + to + " . Please check inbox !</p>");
                }
            })
        }
    });

    purchase.click(()=>{
        let name=$('#name');
        //date of purchase
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = yyyy+''+mm+''+dd;
        let queryString = decodeURIComponent(window.location.search);
        queryString = queryString.substring(1);
        queryString=queryString.substr(6);

        let isb=queryString;
        let email=$('#email');
        let phone=$('#phone');
        let address=$('#address');
        $.post('http://localhost:4646/users/buybooks',{
            isbn:isb,
            name:name.val(),
            email:email.val(),
            phone:phone.val(),
            address:address.val(),
            date:today
        },()=>{
            alert("you have successfully purchased the book");
            window.location='/users.html';
        })
    })
    $.get('http://localhost:4646/admin',(data)=> {
        console.log(data);
        refresh(data);
    });
    let isbn=$('#isbn');
    let title=$('#title');
    let genre=$('#genre');
    let price=$('#price');
    let quantity=$('#quantity');
    let pub_name=$('#pub_name');
    let pub_address=$('#pub_address');
    let pub_phone=$('#pub_phone');
    let country=$('#country');
    let date=$('#date');
    let auth_name=$('#auth_name');
    let auth_address=$('#auth_address');
    let noOfBooks=$('#noBooks');
    $('#add').click(()=>{
        $.post('http://localhost:4646/admin',{
            isbn:isbn.val(),
            title:title.val(),
            genre:genre.val(),
            price:price.val(),
            quantity:quantity.val(),
            pub_name:pub_name.val(),
            pub_address:pub_address.val(),
            pub_phone:pub_phone.val(),
            country:country.val(),
            date:date.val(),
            auth_name: auth_name.val(),
            auth_address:auth_address.val(),
            noOfBooks:noOfBooks.val()
        },(data)=>{refresh(data)});
        isbn.val('');
        title.val('');
        genre.val('');
        price.val('');
        quantity.val('');
        pub_name.val('');
        pub_address.val('');
        pub_phone.val('');
        country.val('');
        date.val('');
        auth_name.val('');
        auth_address.val('');
        noOfBooks.val('');
    });

    window.del= function(el)
    {
        let isbn=$(el).attr('data-isbn');
        $.post(`/admin/${isbn}`,(data) => {
            refresh(data)
        })
    }
    window.plus= function(el)
    {
        let isbn=$(el).attr('data-isbn');
        $.post(`/admin/plus/${isbn}`,(data) => {
            refresh(data)
        })
    }
    window.minus= function(el)
    {
        let isbn=$(el).attr('data-isbn');
        $.post(`/admin/minus/${isbn}`,(data) => {
            refresh(data)
        })
    }

})