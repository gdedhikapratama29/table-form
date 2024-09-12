const express  = require('express');
const mysql = require('mysql');
const { title } = require('process');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", "views")


const db = mysql.createConnection({
    host: 'localhost',
    database: 'table_form',
    user: 'root',
    password: ''
});

db.connect((err) => {
    if (err) throw err
    console.log('connected');

    
    app.get("/", (req, res) => {
        const sql = "select * from user"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            console.log("hasil database ->", users)
            res.render("index", {users: users, title: "FORM DATA"});
        })
    })

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO user (nama, email, password, no_hp, tanggal_lahir, jenis_kelamin, upload_file) VALUES('${req.body.nama}', '${req.body.email}', '${req.body.password}', '${req.body.no_hp}', '${req.body.tanggal_lahir}', '${req.body.jenis_kelamin}', '${req.body.upload_file}');`
        db.query(insertSql, (err, result) => {
          if (err) throw err;
          res.redirect("/");
        })
     });

});

app.listen(8000, () => {
    console.log('server running di port 8000');
})