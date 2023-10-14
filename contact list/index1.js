const express = require('express');
const path=require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


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
// UPDATE
app.get('/', async function(req, res, next) {
    try {
      const contacts = await Contact.find({});
      res.render('home', {
        title: "Contact list",
        contact_list: contacts
      });
    } catch (err) {
      console.log('Error in Fetching Contacts from db:', err);
      next(err); // Pass the error to the error handler middleware
    }
  });
// app.get('/',function(req,res){

//     // console.log('from the get route controller', req.myName);

//     Contact.find({}, function(err,contacts){
//         if(err){
//             console.log('Error in Fetching Contacts from db');
//             return;
//         }
//         return res.render('home',{
//             title:"Contact list",
//             contact_list:contacts
//     });
    
  
//    });
// });

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play with Ejs"
    });
});


// 
app.post('/create-contact', async function (req, res) {
    // storing in ram
    // contactList.push(req.body)
    // we also write this 
    // contactList.push({
    //    name:req.body.name,
    //    phone:req.body.phone
    // })
    // storing contactlist in database
 
    try {
       let newcontact = await Contact.create({
          name: req.body.name,
          phone: req.body.phone
       });
 
       console.log("**", newcontact);
       return res.redirect("/")
 
    }
    catch (error) {
       console.log("error in creating contact")
       return;
 
    }
 
 });
// post('/create-contact',function(req,res){
//     // contactList.push({
//     //     name:req.body.name,
//     //     phone:req.body.phone
//     // });
//     // contactList.push(req.body);
//     // return res.redirect('/')
   
// Contact.create({
//     name: req.body.name,
//     phone: req.body.phone

// }, function(err, newContact){
//     if (err){
//         console.log('err in creating a contact!');
//         return;
//     }
//     console.log('*************', newContact);
//     return res.redirect('back');
// }
// );

// });
// 


// for deleting contact
app.get('/delete-contact/', async function(req, res) {
    try {
      // GET THE ID FROM QUERY IN THE URL
      let id = req.query.id;
      // FIND THE CONTACT IN THE DATABASE USING ID AND DELETE
      await Contact.findByIdAndDelete(id);
      return res.redirect('back');
    } catch (err) {
      console.log('Error in deleting an object from the database:', err);
      return res.status(500).send('Internal Server Error');
    }
  });
/*app.get('/delete-contact/',function(req,res){
    // get the query from url
    // console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex !=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
});
*/
app.listen(port,function(err){
    if(err){console.log('Error in running the server', err);}

    console.log("Yup! My Express Server is Running on port:",port);
})
