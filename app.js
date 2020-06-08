const express = require('express');
const session = require('express-session');
const path = require('path');
const url = require('url');
const mysql = require('mysql');
const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
    cb(null, (file.filename = file.originalname));
    }
    });

var upload = multer({ storage: storage });

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("port",process.env.PORT || 3004);
app.set("views", path.join(__dirname,'views'));
app.set("view engine",'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"views")));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var sess;
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"carRental"
});

app.get('/',function(req,res){
  res.render("index"); 
  });

app.get('/sedans',function(req,res){
  var sql="select * from sedan";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
      res.render("sedans",{data:result}); 
    }
  });
  
  });
  app.get('/sports-cars',function(req,res){  
    var sql="select * from sportscars";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
      res.render("sports-cars",{data:result}); 
    }
  }); 
    });
    app.get('/suvs',function(req,res){    
      var sql="select * from suvs";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
      res.render("suvs",{data:result}); 
    }
  }); 
      });
app.post('/login-auth',function(req,res){
    sess = req.session;
    var username=req.body.username;
    var password=req.body.password;
    var sql="select * from admin where username='"+req.body.username+"' and password='"+req.body.password+"'";
    con.query(sql,function(err,result){
     
      if(result!=0)
      {
      var sql1="select * from booking";
      con.query(sql1,function(err1,result1){
        if(err1) throw err;
        if(result1)
        {
          var sql2="select * from contact";
          con.query(sql2,function(err2,result2){
            if(err) throw err;
            if(result2)
            {
            res.render("admin-dashboard",{data:result1,contact:result2});
            }
          });
          
        }
      });
    }
      else
      {
        res.render("login-admin",{data:"Invalid credentials"});
      }
    });

});      
app.get('/login-admin',function(req,res){   
 
    res.render("login-admin"); 
    });

// app.get('/Signup',function(req,res){
  
//   res.render("Signup",{data:""}); 
// }); 
app.post('/Sign-up',function(req,res){
  
  var sql="insert into signup(fullname,email,password,rePassword) values('"+req.body.fullname+"','"+req.body.email+"','"+req.body.password+"','"+req.body.rePassword+"')";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
      res.render("signup",{data:"registered successfully!"});
    }
  }); 
});
app.get('/booking-sedan/:id',function(req,res){
  var sql="select * from sedan where carId='"+req.params.id+"'";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
    res.render('booking-sedan',{data:result});
    }
  });
    
});      
app.post('/booking-final',function(req,res){
  
  console.log(req.body.price+""+req.body.carName);
  var sql="insert into booking(fullName,address,pickupPoint,dropPlace,startDateAndTime,endDateAndTime,carName,price) values('"+req.body.name+"','"+req.body.address+"','"+req.body.pickup+"','"+req.body.drop+"','"+req.body.startDate+"','"+req.body.endDate+"','"+req.body.carName+"','"+req.body.price+"')";
  con.query(sql,function(err,result){
    if(err) throw err;
    else 
    {
      res.render('thanks');
    }
  });
});
app.get('/booking-suv/:id',function(req,res){
  var sql="select * from suvs where carId='"+req.params.id+"'";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
    res.render('booking-suv',{data:result});
    }
  });   
});
app.get('/booking-sports-cars/:id',function(req,res){
  var sql="select * from sportscars where carId='"+req.params.id+"'";
  con.query(sql,function(err,result){
    if(err) throw err;
    if(result)
    {
    res.render('booking-sports-cars',{data:result});
    }
  });   
});
app.get('/logout',(req,res)=>{
  res.redirect('/');
});
app.post('/contact',function(req,res){
  var sql="insert into contact(name,email,subject,message) values('"+req.body.name+"','"+req.body.email+"','"+req.body.subject+"','"+req.body.message+"')";
  con.query(sql,function(err,rows){
    if(rows){
     res.redirect('/')
    }
    else{
      res.redirect('/');
    }
  });
})
http.createServer(app).listen(app.get('port'),function(){
  console.log("Express Server Listening on "+app.get('port'));
}); 
