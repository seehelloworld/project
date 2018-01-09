
    $.get('/alter',function(res){
    console.log(res);
    $('input[name=username]').val(res.username);
    console.log(res.username);
    $('select[name=age]').val(res.age);
    $('input[name=phone]').val(res.phone);
    $('input[name=email]').val(res.email);
    $('textarea').val(res.introduce);
    $('.sec').text('和你');
    })
    
    $('form').submit(function(event){
        event.preventDefault();
        const value=$(this).serialize();

        $.post('/editform',value,function(res){
            console.log(res);
          location.href='index.html';
        })
        
    })
    
