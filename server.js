const express = require('express')
const app = express()
const connectDB = require('./config/db')
const homeRoutes = require('')

require('dotenv').config({ path: './config/.env' })

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// app.get('/', async (request, response) => {
//     const todoItems = await db.collection('todos').find().toArray()
//     const sortedTodoItems = todoItems.sort((i) => {
//         return i.priority ? -1 : 1 // If i.priority is true we move it -1 index towards the beginning of the array, if it is false we move it 1 index towards the end of the array
//     })
//     const itemsLeft = await db.collection('todos').countDocuments({ completed: false })
//     response.render('index.ejs', { items: todoItems, left: itemsLeft })
// })

// app.post('/addTodo', (request, response) => {
//     db.collection('todos').insertOne({ thing: request.body.todoItem.trim(), completed: false, priority: false })
//         .then(result => {
//             console.log(request.body.todoItem.trim())
//             console.log('Todo Added')
//             response.redirect('/')
//         })
//         .catch(error => console.error(error))
// })

// app.put('/markComplete', (request, response) => {
//     db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
//         $set: {
//             completed: true
//         }
//     }, {
//         sort: { _id: -1 },
//         upsert: false
//     })
//         .then(result => {
//             console.log('Marked Complete')
//             response.json('Marked Complete')
//         })
//         .catch(error => console.error(error))

// })

// app.put('/markUnComplete', (request, response) => {
//     db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
//         $set: {
//             completed: false
//         }
//     }, {
//         sort: { _id: -1 },
//         upsert: false
//     })
//         .then(result => {
//             console.log('Marked Uncomplete')
//             response.json('Marked Uncomplete')
//         })
//         .catch(error => console.error(error))

// })

// app.put('/markAsPriority', (request, response) => {
//     db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
//         $set: {
//             priority: true
//         }
//     }, {
//         sort: { _id: -1 },
//         upsert: false
//     })
//         .then(result => {
//             console.log('Marked as priority')
//             response.json('Marked as priority')
//         })
//         .catch(error => console.error(error))

// })

// app.put('/unmarkAsPriority', (request, response) => {
//     db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
//         $set: {
//             priority: false
//         }
//     }, {
//         sort: { _id: -1 },
//         upsert: false
//     })
//         .then(result => {
//             console.log('Unarked as priority')
//             response.json('Unarked as priority')
//         })
//         .catch(error => console.error(error))
// })

// app.delete('/deleteItem', (request, response) => {
//     db.collection('todos').deleteOne({ thing: request.body.itemFromJS })
//         .then(result => {
//             console.log('Todo Deleted')
//             response.json('Todo Deleted')
//         })
//         .catch(error => console.error(error))

// })

app.listen(process.env.PORT, () => {
    console.log('Server is running, you better catch it!')
})   