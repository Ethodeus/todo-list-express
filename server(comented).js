const express = require('express') //making it possible to use express methods in this file by declaring an express variable.
const app = express() //renaming the call to express with a name of app
const MongoClient = require('mongodb').MongoClient //makes it possible to use methods with MongoClient and talk to our db. 
const PORT = 2121 //Declaring a constant and assign it it a value of 2121 to define the location where our server will be listening.
require('dotenv').config() //allows us to look for or access variables inside the .env file


let db, //declaring a variable globally so we can use it in multiple places
    dbConnectionStr = process.env.DB_STRING, //Declaring a variable and assigng it a value equal to the DB_STRING variable found in the .env file. 
    dbName = 'todo' //Declaring a variable and assigning it the name of the data base. 

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })



app.set('view engine', 'ejs') // Setting our EJS as our default view engine. 
app.use(express.static('public')) // Sets the location for static assets
app.use(express.urlencoded({ extended: true })) //Tells express to decode and encode URLs where the header matches the content. 
app.use(express.json()) //Parses JSON content. 


app.get('/', async (request, response) => { //Starts a GET method when the root route is passed in, sets up req and res parameters. 
    const todoItems = await db.collection('todos').find().toArray() //Sets a variable and awaits an array todoItems and stores them in this variable
    const itemsLeft = await db.collection('todos').countDocuments({ completed: false }) //Sets a variable and awaits a number of items that are not completed. 
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) //rendering the ejs file and passing through an object with the db of items and itemsLeft

    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => { //Cstarts a POST method when the add route is passed in, triggered by the form button
    db.collection('todos').insertOne({ thing: request.body.todoItem, completed: false }) //Inserting a new item into the todos collection, using the value passed in through the form and also creating a property of completed in the item with a value of false.
        .then(result => { //Ig insert is successful, do something
            console.log('Todo Added') //Console log action
            response.redirect('/') //Fets rid of the addToDo route and redirects back to the homepage. 
        })
        .catch(error => console.error(error)) //catching errors
}) //ending POST method

app.put('/markComplete', (request, response) => {//Starting a put method when the markComplete route is passed in
    db.collection('todos').updateOne({ thing: request.body.itemFromJS }, { //Look in the data base for one item matching the name of the item pased in from the main.js file that was clicked on. 
        $set: {
            completed: true //set completed status to true
        }
    }, {
        sort: { _id: -1 },
        upsert: false //prevents insertion if item does not already exist
    })
        .then(result => { //If the update is successful
            console.log('Marked Complete') //log successful update
            response.json('Marked Complete') //respond to the main.js request in JSON indicating that the request was done
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
            console.log('Marked Uncomplete')
            response.json('Marked Uncomplete')
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