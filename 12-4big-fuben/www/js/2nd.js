$('form').submit(function(event){
    event.preventDefault();
    const value=$(this).serialize();
    $.post('/addform',value,function(res){
        if(res.success==0){
            alert(res.message);
            $('input[type!=submit]').val('');
        }
        else{
            location.href='index.html';
            $('input[type!=submit]').val('');
        }
    })
})

//console.log( $('input[name=username]'))