const express = require('express') //making it possible to use express methods in this file by declaring an express variable.
const app = express() //renaming the call to express with a name of app
const MongoClient = require('mongodb').MongoClient //makes it possible to use methods with MongoClient and talk to our db. 
const PORT = 2121 //Declaring a constant and assign it it a value of 2121 to define the location where our server will be listening.
require('dotenv').config() //allows us to look for or access variables inside the .env file


let db, //declaring a variable globally so we can use it in multiple places
    dbConnectionStr = process.env.DB_STRING, //Declaring a variable and assigng it a value equal to the DB_STRING variable found in the .env file. 
    dbName = 'todo' //Declaring a variable and assigning it the name of the data base. 

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //Creating a connection to MongoDB, and passing in out connection string. 
    .then(client => { //waiting for the connection and proceeding if it is successful, also passing in all teh client information. 
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName) //Assigning a value to a previously declared db variable that contains
    })

//Middleware

app.set('view engine', 'ejs') // Setting our EJS as our default view engine. 
app.use(express.static('public')) // Sets the location for static assets
app.use(express.urlencoded({ extended: true })) //Tells express to decode and encode URLs where the header matches the content. 
app.use(express.json()) //


app.get('/', async (request, response) => {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({ completed: false })
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({ thing: request.body.todoItem, completed: false })
        .then(result => {
            console.log('Todo Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
        $set: {
            completed: true
        }
    }, {
        sort: { _id: -1 },
        upsert: false
    })
        .then(result => {
            console.log('Marked Complete')
            response.json('Marked Complete')
        })
        .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
        $set: {
            completed: false
        }
    }, {
        sort: { _id: -1 },
        upsert: false
    })
        .then(result => {
            console.log('Marked Complete')
            response.json('Marked Complete')
        })
        .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({ thing: request.body.itemFromJS })
        .then(result => {
            console.log('Todo Deleted')
            response.json('Todo Deleted')
        })
        .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})