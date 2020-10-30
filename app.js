var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
//this array will shown on the preadd item on the page
var items = ["Buy Food","Cook Food", "Eat Food"];
var workitem = [];
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
//use the static file as like css and others
app.use(express.static("public"));

app.get("/", function(req, res){
    //all the down script for the date
var today = new Date();
var option = {
    weekday : "long",
    day : "numeric",
    month : "long",
    year : "numeric"
};
var day = today.toLocaleDateString("hi-IN", option);

//here we render the data to the ejs  
res.render("list",{ListTitle:day, newlistitem:items});
});
app.post("/", function(req,res){
    
    //get the submit data here
   var list = req.body.newitem;
   //now push the all input data to the list
   if( req.body.list === "Work List"){
       workitem.push(list);
       res.redirect("/work");
   }else{
    items.push(list);
    res.redirect("/");
   }
  
});

app.get("/work", function(req,res){
    res.render("list",{ListTitle:"Work List", newlistitem:workitem});
});


app.listen(3000, function(){
    console.log("The server is running on the port 3000");
})