var express = require("express");
var mysql = require("mysql");
//const { Pool } = require('pg');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));





//database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysql',
    database:'algierscityguide'
});
connection.connect();

// var connection = mysql.createConnection({
//     host     : process.env.RDS_HOSTNAME,
//     user     : process.env.RDS_USERNAME,
//     password : process.env.RDS_PASSWORD,
//     port     : process.env.RDS_PORT,
//     database:'algierscityguide'
// });

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

// connection.end();

// server creation
var port = process.env.PORT || 3000;

var server = app.listen(port,function(){
    var host = server.address().address
    var port = server.address().port

    console.log('Server running .. listening at' + port + '/');
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

app.get('/videos',function(req,res){
    var query = "select * from videos";
    
    connection.query(query,function(error,results){
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

app.get('/nbvideos',function(req,res){
    var query = "select COUNT(*) AS nbr from videos";
    connection.query(query,function(error,results){
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});
