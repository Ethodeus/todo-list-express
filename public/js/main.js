const deleteBtn = document.querySelectorAll('.fa-trash-can')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')
const itemPriority = document.querySelectorAll('.item span.fa-flag')

Array.from(itemPriority).forEach((element) => {
	element.addEventListener('click', (e) => markAsPriority(e))
})

Array.from(deleteBtn).forEach((element) => {
	element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element) => {
	element.addEventListener('click', (e) => markComplete(e))
})

Array.from(itemCompleted).forEach((element) => {
	element.addEventListener('click', (e) => markUnComplete(e))
})

async function markAsPriority(event) {
	// console.log(event)
	const itemText = event.target.parentNode.childNodes[3].innerText
	console.log(itemText)
	try {
		const response = await fetch('markAsPriority', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}

async function deleteItem() {
	const itemText = document.querySelector('.todoName').innerText
	try {
		const response = await fetch('deleteItem', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}

async function markComplete(event) {
	const itemText = event.target.innerText
	console.log(itemText)
	try {
		const response = await fetch('markComplete', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}

async function markUnComplete(event) {
	const itemText = event.target.innerText
	console.log(itemText)
	try {
		const response = await fetch('markUnComplete', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()

	} catch (err) {
		console.log(err)
	}
}