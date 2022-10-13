const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')

router.get('/', todosController.getTodos)
router.post('/createTodo', todosController.createTodo)
router.put('/markComplete', todosController.markComplete)
router.put('/markIncomplete', todosController.markIncomplete)
router.put('/markAsPriority', todosController.markAsPriority)
router.put('/unmarkAsPriority', todosController.unmarkAsPriority)
router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router