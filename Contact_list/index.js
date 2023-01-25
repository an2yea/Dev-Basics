const express = require('express')
const path = require('path');
const port = 8000;

const app = express();

//Set Template Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

//middleware 1
app.use(function(req,res,next){
    console.log("Middleware1 called");
    next();
})
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
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    })   
    
    contactList.push(req);
    // return res.redirect('/');
    return res.redirect('back');
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