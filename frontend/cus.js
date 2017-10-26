$(()=>{
    let purchase=$('#purchase');

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
});