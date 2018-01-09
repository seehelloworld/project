const http = require('http');
const fs   = require('fs');
const url  = require('url');
const querystring = require('querystring');
const server = http.createServer();
server.on('request',(req,res)=>{
    const regex =/(.js|.css|.html|\/$)|(fonts+)/;
    if(regex.test(req.url)){
        const r=fs.createReadStream('www'+(req.url=='/'?'/index.html':req.url));
        r.pipe(res);
    }
    const urls=url.parse(req.url,true);
    if(urls.pathname=='/send'){
        res.setHeader('Content-Type','Application/json');
        const  aa= fs.createReadStream('users.json');
        aa.pipe(res);
    }
    if(urls.pathname=='/students'){
        show(req,res);
       
       }
    if(req.url=='/addform'){
        formsub(req,res);
    }
    if(req.url=='/editform'){
        formsub1(req,res);
    }
    if(urls.pathname=='/delete'){     
        move(req,res)  
    }
    if(req.url=='/alter'){
    res.setHeader('Content-Type','Application/json');
    fs.readFile('edit.json',(err,data)=>{
        res.end(data);
        return;  
    }) 
    }
    if(urls.pathname=='/edit'){
     edit(req,res)
    }

})

server.listen(3000);

function formsub(req,res){
    res.setHeader('Content-Type','Application/json');
    var total='';
    req.on('data',(data)=>{
        total+=data;
    })
    req.on('end',()=>{
        const arr=querystring.parse(total);
        console.log("提交");
        const username=arr.username;
        const age=arr.age;
        const phone=arr.phone;
        const email=arr.email;
        const introduce=arr.introduce;
        fs.readFile('users.json',(err,data)=>{
            const userArr=JSON.parse(data);
            for(let i=0;i<userArr.length;i++){
                if(userArr[i].username==username){
                    return res.end(JSON.stringify({success:0,message:'用户名重复，请重新添加'})); 
                }         
            }
            userArr.push({username,age,phone,email,introduce});         
            fs.writeFile('users.json',JSON.stringify(userArr),(err)=>{
                return res.end(JSON.stringify("已成功删除"));
            })
        })
    })
}

function formsub1(req,res){
    res.setHeader('Content-Type','Application/json');
    var total='';
    req.on('data',(data)=>{
        total+=data;
    })
    req.on('end',()=>{
        const arr=querystring.parse(total);
        console.log("编辑提交");
        const username=arr.username;
        const age=arr.age;
        const phone=arr.phone;
        const email=arr.email;
        const introduce=arr.introduce;
        fs.readFile('users.json',(err,data)=>{
            const userArr2=JSON.parse(data);
            for(let i=0;i<userArr2.length;i++){
                if(userArr2[i].username==username){
                    userArr2[i].age=age;
                    userArr2[i].phone=phone;
                    userArr2[i].email=email;
                    userArr2[i].introduce=introduce;
                }         
            }     
            fs.writeFile('users.json',JSON.stringify(userArr2),(err)=>{
                res.end(JSON.stringify('成功了'));
            })
        })
    })
}

function edit(req,res){
    const urls=url.parse(req.url,true);
    res.setHeader('Content-Type','Application/json');
    const name =urls.query.name;
    console.log(name);
    fs.readFile('users.json',(err,data)=>{
        const arr1=JSON.parse(data);
        for(let i=0;i<arr1.length;i++){
            if(name==arr1[i].username){
                const username=arr1[i].username;
                const age=arr1[i].age;
                const phone=arr1[i].phone;
                const email=arr1[i].email;
                const introduce=arr1[i].introduce;
                useData=({username,age,phone,email,introduce});
                fs.writeFile('edit.json',JSON.stringify(useData));
                res.end(JSON.stringify('大海'));
                return;
            }
        }
    })
}

function move(req,res){
    const urls=url.parse(req.url,true);
    res.setHeader('Content-Type','Application/json');
    const name =urls.query.name;
    console.log(name);
    fs.readFile('users.json',(err,data)=>{
        const arr1=JSON.parse(data);
        for(let i=0;i<arr1.length;i++){
            if(name==arr1[i].username){
            arr1.splice(i,1);
            fs.writeFile('users.json',JSON.stringify(arr1),(err)=>{
                return res.end(JSON.stringify(arr1));
            });
            
            }
        }
    })
}

function show(req,res){
    const urls=url.parse(req.url,true);
    var page =urls.query.page;
    console.log(page);
    res.setHeader('Content-Type','Application/json');
    fs.readFile('users.json',(err,data)=>{
        var arr=JSON.parse(data);
        var count=arr.length;
        var pagesize=3;
        var pagecount=Math.ceil(count/pagesize);
        var currentpage=page;
        var a=[];
        var obj=arr.slice((currentpage-1)*pagesize,currentpage*pagesize);
        //console.log(obj)
        a.push({pagecount,currentpage});
        a.push(obj);
        console.log(a);
        res.end(JSON.stringify(a));
    })
}