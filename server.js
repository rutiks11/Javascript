const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./dbconnect');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Create (POST METHOD)
app.post('/items',(req,res) => {
    const {id, name, qty, price } = req.body;
    connection.query('insert into products (id, name, qty , price) values (? ,? ,?,?)',[id, name , qty,price], (err, result)=>{
        if(err){
            return res.status(500).send("Error inserting data");
        }
        res.status(201).send(req.body);
    });
});

app.get('/items',(req,res)=> {
    connection.query('select * from products', (err, results) =>
    {
        if(err){
            return res.status(500).send("Error while fetching the data");
        }
        res.send(results);
    });
});

app.get('/items/:id',(req,res)=>{
    const id = req.params.id;
    connection.query('select * from products where id =?',[id],(err,results)=>{
        if(err){
            return res.status(500).send("Error while fetching the data");
        }
        if(results.length === 0){
            return res.status(404).send({message: 'Item not found'});
        }
        res.send(results[0]);
    })
})


app.put('/items/:id',(req,res)=> {
    const id = req.params.id;
    const {name, qty, price} = req.body;
    connection.query('update products set name= ?, qty =?, price=? where id=?', [name, qty, price, id], (err,result)=>{
        if(err){
            return res.status(500).send('Error updating data');
        }
        if(result.affectedRows===0)
        {
            return res.status(404).send({message: 'Items not found'});
        }
        res.send(req.body);
    });
});

app.delete('/items/:id',(req,res)=> {
    const id = req.params.id;
    connection.query('delete from products where id = ? ',[id],(err,result)=>{
        if(err){
            return res.status(500).send('Error while deleting data');
        }
        if(result.affectedRows===0)
        {
            return res.status(400).send({message : 'Item not found'});
        }
        res.status(204).send();
    })
})

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});