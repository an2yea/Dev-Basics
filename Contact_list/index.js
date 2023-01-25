const express = require('express')
const path = require('path');
const port = 8000;

const app = express();

//Set Template Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var contactList = [
    {
        name: "Ananya",
        phone: "2950496423"
    }, 
    {
        name: "Yajas",
        phone: "9570647963"
    }
]


app.post('/create-contact', function(req,res){
    return res.redirect('/practice');
})
app.get('/practice', function(req,res){
    // res.send("Server running");
    return res.render('practice', {title: 'My Contact List'});
})

app.get('/', function(req,res){
    return res.render('index', {
        title : 'Contact List', 
        contact_list: contactList
    })
})


app.listen(port, function(err){
    if(err){
        console.log("Error in server fire up", err);
    }
    console.log('Server running on port', port);
})