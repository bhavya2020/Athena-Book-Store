$( ()=> {
    $("#user").click(()=>{
        console.log("user");
        window.location = '/users.html'
    });

    $("#admin").click(()=>{
        console.log("admin");
        window.location = '/admin.html'
    })
});
