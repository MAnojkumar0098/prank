const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs"); 

app.listen(8089,function(){ console.log('hey! server started.')})

var v='';
var items=[];
var names=[];
app.get('/sendNames', function (req, res) {
    res.render('output', { names: names });
});
app.get('/home',function(req,res){
 
    res.render('task',{newtask:items,newname:names});
})
app.get('/personal',function(req,res){
    res.send("<h1 style=color:green;>HEY! its your personal portal yet to create</H1>")
})

app.get('/search',function(req,res){ 
    console.log(req.query);
    res.send();
})
// to access the query strings
app.get('/home/:v',function(req,res){
    const {v} = req.params;
    res.send(`browsing ${v}`);
})

app.get('/home/109/:v',function(req,res){
    const {v} = req.params;
    res.send(`browsing ${v}`);
})
//particular response to particular route.
//identifing the pattern and getting that extra random route into var and respond particularly. 

app.get('*',function(req,res){
    res.send("<h2>i dont know that path</h2>")
})


// response to any all other routes.

app.post('/home',function(req,res){
    items.push(req.body.addtask);
    names.push(req.body.addname);
    console.log(names);
    //res.write(`<h1 style="color:white">${items}</h1>`);
    //res.send();
    //res.render('task',{newtask:v});
    res.redirect('/home');
})

