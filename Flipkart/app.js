let express = require('express');
let app = express();
let port = 9500;
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let mongoUrl =  "mongodb://localhost:27017";
let db;


//Middleware 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.get('/',(req,res) => {
    res.send('<h1>Hii From Express</h1>');
})

app.get('/category',(req,res) => {
    db.collection('categories').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/product',(req,res) => {
    db.collection('product').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/product',(req,res) =>{
    let categoriesId = Number(req.query.categoriesId);
    let color = req.query.color;
    let brand = req.query.brand;
    let query = {}
    if(categoriesId && color){
        query = {category_id:categoriesId,color:color}
    }else if(categoriesId && brand){
        query = {category_id:categoriesId,brand:brand}
    }
    else if(categoriesId){
        query = {category_id:categoriesId}
    }
    db.collection('product').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})



//Filters - 2nd page
app.get('/product/:categoryId',(req,res) => {
    let query = {};
    let categoryId = Number(req.params.categoryId);
    let productId = Number(req.params.productId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1};
    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(categoryId){
        query={
            category_id:categoryId,
            product_id:productId
        }
    }else if(lcost && hcost){
        query={
            category_id:categoryId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    db.collection('product').find(query).sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Page - 3 Details of product 

app.get('/details/:productId',(req,res) => {
    let id  = Number(req.params.productId);
    db.collection('product').find({product_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/order/:productId',(req,res) => {
    let id = Number(req.params.productId)
    db.collection('menu').find({category_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//Product selected by user -:
app.post('/orderItem',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('orderItem').find({product_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})

//Place order -: 
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) =>{
        if(err) throw err;
        res.send('order Placed')
    })
})

//View Order -: 
app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query={email:email}
    }else{
        query={}
    }
    db.collection('orders').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


//Update order -: 
app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

//Delete order -:
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})


//connect with mongodb 
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) =>{
    if(err) console.log("Error while connecting");
    db = dc.db('flipkart');
    app.listen(port,() => {
        console.log(`server is running on port ${port}`)
    })
})