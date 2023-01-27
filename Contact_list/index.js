const express = require('express')
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app = express();

//Set Template Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

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
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err) {
            console.log("Error creating contact ${err}");
            return res.redirect('back');
        }
        console.log("Contact created", newContact)
        return res.redirect('/')
    })
})
app.get('/practice', function(req,res){
    // res.send("Server running");
    return res.render('practice', {title: 'My Contact List'});
})

app.get('/', function(req,res){
    //What does find change that couldn't be done simply sending the db?
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error finding contacts ${err}");
            return res.redirect('back');
        } 
        return res.render('index',{
            title:"Contact List",
            contact_list: contacts
        })
    })
})

app.get('/delete-contact/', function(req,res){

    let id = req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting contact");
            return;
        }
        return res.redirect('/');
    });
    //Don't reset res after you have sent headers -> gives error although the condition is never reached
    //return res.redirect('back'); //Don't return here
})

app.listen(port, function(err){
    if(err){
        console.log("Error in server fire up", err);
    }
    console.log('Server running on port', port);
})