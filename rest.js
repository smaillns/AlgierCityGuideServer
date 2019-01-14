var express = require("express");
var mysql = require("mysql");
//const { Pool } = require('pg');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));





//database connection
var connection = mysql.createConnection({
    host     : '35.224.203.206',
    user     : 'root',
    password : 'smail',
    database:'algierscityguide'
});
connection.connect();


// server creation

var server = app.listen(8088,function(){
    var host = server.address().address
    var port = server.address().port
});
app.use(express.static('public'));
// rest service

app.get('/spots',function(req,res){  
    var query = "select * from spots"; 
    connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});

app.get('/categories',function(req,res){  
    var query = "select * from categories"; 
    connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});


app.get('/categories/:id',function(req,res){  
    var query = "select * from categories where id = "+req.params.id; 
    connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});

app.get('/nbr',function(req,res){  
    var query = "select COUNT(*) AS nbr from spots"; 
    connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});

app.get('/images/:id',function(req,res){  
    var query = "select * from images where id_spot = "+req.params.id; 
    connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});

app.get('/nbrimages/:id',function(req,res){  
    var query = "select COUNT(*) AS nbr_images from images where id_spot = "+req.params.id; 
    connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});