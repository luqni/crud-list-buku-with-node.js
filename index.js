//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParse middleware
const bodyParse = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
//create connection
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'buku_db',
	port: '3307'
});

//connect to database
conn.connect((err)=>{
	if(err) throw err;
	console.log('Mysql Tersambung....')
});
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false}));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res)=> {
	let sql = "SELECT * FROM buku";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.render('buku_view',{
			results:results
		});
	});
});

//route for insert data
app.post('/save',(req, res) => {
  let data = {nama: req.body.nama, penerbit: req.body.penerbit};
  let sql = "INSERT INTO buku SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE buku SET nama='"+req.body.nama+"', penerbit='"+req.body.product_price+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM buku WHERE id="+req.body.buku_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
app.listen(8000, ()=>{
	console.log('Server berjalan di port 8000');
});