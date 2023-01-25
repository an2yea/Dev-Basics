const express = require('express')
const path = require('path');
const port = 8000;

const app = express();

//Set Template Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req,res){
    // res.send("Server running");
    return res.render('index', {title: 'My Contact List'});
})

app.listen(port, function(err){
    if(err){
        console.log("Error in server fire up", err);
    }
    console.log('Server running on port', port);
})