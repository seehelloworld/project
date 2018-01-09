getStudents(1);

function getStudents(page){
    if(page==0){
        return;
    }
    $.get('/students?page=' + page + '', function (res){
        if(page==res[0].pagecount+1){
            return;
        }
        let pages = [];
        for (let i = 1; i <=res[0].pagecount; i++) {
            pages.push(i);
        }
        var data = { totalPage:res[0].pagecount, currentPage:Number(res[0].currentpage), pages: pages }
        console.log(data.currentPage);
        var html = template('page', data);
        $('.page').html(html);
        $('.tabelhead').siblings().remove();
        var show = template('temp', { data: res[1] });
        $('.tabelhead').after(show);
         
    })
}

$('.search').click(function () {
    $.get('/send', function (res) {
        const user = $('.user').val();
        const num = $('.num').val();
        const res1 = res.filter((item, index, arr) => {
            return item.username.includes(user) && item.phone.includes(num);
        })
        console.log(res1);
        $('tbody>tr:eq(0)').siblings().remove();
        var html = template('temp', { data: res1 });
        console.log(html)
        $('.cell>table>tbody').append(html);
    })
})

$('tbody').on('click', '.delete', function () {
    var name = $(this).parent().find('th:eq(0)').html();
    $('.modal-body-one').html('姓名：为- ' + name + ' -的人吗？');
    var del=$(this).parent();
    $('.del').click(function (){
        console.log('删除');
        del.remove();
        $.get('/delete?name=' + name + '', function (res) {   
            console.log(res);
        })
    })
})
$('tbody').on('click', '.editor', function () {
    var name = $(this).parent().find('th:eq(0)').html();
    $.get('/edit?name=' + name + '', function (res) {
        console.log(res);
        location.href = 'edit.html';
    })
})

