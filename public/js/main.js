const deleteBtn = document.querySelectorAll('.fa-trash-can')
const itemPriority = document.querySelectorAll('.item span.fa-flag')
const notItemPriority = document.querySelectorAll('.item span.priority')
const checkbox = document.querySelectorAll('input[type="checkbox"]')

Array.from(checkbox).forEach((element) => {
	element.addEventListener('click', (e) => isChecked(e))
})

Array.from(itemPriority).forEach((element) => {
	element.addEventListener('click', (e) => markAsPriority(e))
})

Array.from(notItemPriority).forEach((element) => {
	element.addEventListener('click', (e) => unmarkAsPriority(e))
})

Array.from(deleteBtn).forEach((element) => {
	element.addEventListener('click', (e) => deleteItem(e))
})

async function markAsPriority(event) {
	const itemId = event.target.parentNode.dataset.id

	if (!event.target.classList.contains('priority')) {
		try {
			const response = await fetch('todos/markAsPriority', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'todoIdFromJSFile': itemId
				})
			})
			const data = await response.json()
			console.log(data)
			location.reload()

		} catch (err) {
			console.log(err)
		}
	} else {
		try {
			const response = await fetch('todos/unmarkAsPriority', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'todoIdFromJSFile': itemId
				})
			})
			const data = await response.json()
			console.log(data)
			location.reload()

		} catch (err) {
			console.log(err)
		}
	}

}

// async function unmarkAsPriority(event) {
// 	const itemText = event.target.parentNode.childNodes[3].innerText
// 	try {
// 		const response = await fetch('unmarkAsPriority', {
// 			method: 'put',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				'itemFromJS': itemText
// 			})
// 		})
// 		const data = await response.json()
// 		console.log(data)
// 		location.reload()

// 	} catch (err) {
// 		console.log(err)
// 	}
// }

async function deleteItem(event) {
	const itemId = event.target.parentNode.dataset.id
	console.log(itemId)
	try {
		const response = await fetch('todos/deleteTodo', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'todoIdFromJSFile': itemId
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}

async function isChecked(event) {
	const itemText = event.target.parentNode.parentNode.parentNode.dataset.id
	console.log(itemText)

	if (event.target.checked) {
		try {
			const response = await fetch('todos/markComplete', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'todoIdFromJSFile': itemText
				})
			})
			const data = await response.json()
			console.log(data)
			location.reload()

		} catch (err) {
			console.log(err)
		}

	} else {
		try {
			const response = await fetch('todos/markIncomplete', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'todoIdFromJSFile': itemText
				})
			})
			const data = await response.json()
			console.log(data)
			location.reload()

		} catch (err) {
			console.log(err)
		}
	}
}