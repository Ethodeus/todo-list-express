const Todo = require('../models/Todo')

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todoItems = await Todo.find()
      todoItems.sort((i) => {
        return i.priority ? -1 : 1 // If i.priority is true we move it -1 index towards the beginning of the array, if it is false we move it 1 index towards the end of the array
      })
      const itemsLeft = await Todo.countDocuments({ completed: false })
      // console.log(todoItems[0]._id)
      res.render('todos.ejs', { items: todoItems, left: itemsLeft })
    } catch (err) {
      console.log(err)
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({ todo: req.body.todoItem, completed: false })
      console.log('Todo has been added!')
      res.redirect('/todos')
    } catch (err) {
      console.log(err)
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: true
      })
      console.log('Marked Complete')
      res.json('Marked Complete')
    } catch (err) {
      console.log(err)
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: false
      })
      console.log('Marked Incomplete')
      res.json('Marked Incomplete')
    } catch (err) {
      console.log(err)
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
      console.log('Deleted Todo')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  },
  markAsPriority: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        priority: true
      })
      console.log('Marked as Priority')
      res.json('Marked as Priority')
    } catch (err) {
      console.log(err)
    }
  },
  unmarkAsPriority: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        priority: false
      })
      console.log('Unmarked as Priority')
      res.json('Unmarked as Priority')
    } catch (err) {
      console.log(err)
    }
  },
}    