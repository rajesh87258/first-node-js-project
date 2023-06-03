const express = require('express');
const path=require('path');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));



// // Middleware 1
// app.use(function(req, res, next){
//     req.myName="Rajesh";
//     // console.log('middleware 1 called');
//     next();
// });
// // Middleware 2
// app.use(function(req , res, next){
//     console.log('My Name from mw2', req.myName);
// // console.log('Midleware 2 is called');
// next();
// });



var contactList = [
    {
        name:"Rajesh",
        phone:"8725846421"
    },
    {
        name:"nitin",
        phone:"8725555421"

    },
    {
        name:"prem",
        phone:"8775846421"

    }
]

app.get('/',function(req,res){

    // console.log('from the get route controller', req.myName);
    
   return res.render('home',{
    title:"contact list",
    contact_list:contactList
   });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play with Ejs"
    });
});



app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    contactList.push(req.body);
    return res.redirect('/')
});
// for deleting contact
app.get('/delete-contact/',function(req,res){
    // get the query from url
    // console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex !=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){console.log('Error in running the server', err);}

    console.log("Yup! My Express Server is Running on port:",port);
})
