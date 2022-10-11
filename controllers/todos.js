const Todo = require('../models/Todo')

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todoItems = await Todo.find()
      todoItems.sort((i) => {
        return i.priority ? -1 : 1 // If i.priority is true we move it -1 index towards the beginning of the array, if it is false we move it 1 index towards the end of the array
      })
      const itemsLeft = await Todo.countDocuments({ completed: false })
      console.log(todoItems)
      console.log(itemsLeft)
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
}    