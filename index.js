const express = require('express')
const app = express()
const bodyParser = require("body-parser")


//Mongo Connection
const MongoClient = require("mongodb").MongoClient
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'Blog';
let db
MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Database: ${url}`);
    console.log(`Database : ${dbName}`);
});

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    db.collection('data').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('home.ejs', { data: result })
    })
    // res.render('home.ejs')

})
//Add
app.get('/Create', (req, res) => {
    res.render('add.ejs')
})

// var authorid;
// var author;
// var title;
// var content;
// app.post('/AddData',(req,res)=>{
//     authorid = req.body.authorid;
//     author =req.body.author;
//     title = req.body.title;
//     content =req.body.content;
  
//     var d = {
//         "authorid": authorid,
//         "author":author,
//         "title":title,
//         "content":content
//     }
//     db.collection('data').insertOne(d,function(err, collection){
//         if (err) throw err;
//         console.log("Record inserted Successfully");
              
//     });
          
//     return res.redirect('/');
// })


app.listen(3000, () => {
    console.log('listening on 3000')
});