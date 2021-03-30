const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require("mysql")
const app = express()
const port = 9000

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    console.warn("GET EMAILS")
    const sqlSelect = "SELECT * FROM emails"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get/providers', (req, res) => {
    const sqlSelect = "SELECT DISTINCT provider FROM emails ORDER BY provider"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    const email = req.body.email
    const provider = req.body.provider
    const date = req.body.date

    const sqlInsert = "INSERT INTO emails (email, provider, date) VALUES (?,?,?)"
    db.query(sqlInsert, [email, provider, date], (result) => {
        console.log(result)
    })
})

app.delete('/api/delete/:id', (req, res) => {
    console.warn("DELETE")
    const id = req.params.id
    const sqlDelete =  "DELETE FROM emails WHERE id = ?"
    db.query(sqlDelete, id, (err, result) => {        
        console.warn("DELETED")
        res.send(err)            
    })
})

app.get('/', (req, res) => {
    res.send(`Server running on the port ${port}`);
  });

app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});
