const deleteBtn = document.querySelectorAll('.fa-trash-can')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(deleteBtn).forEach((element) => {
	element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element) => {
	element.addEventListener('click', markComplete)
})

Array.from(itemCompleted).forEach((element) => {
	element.addEventListener('click', markUnComplete)
})

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

async function markComplete() {
	const itemText = document.querySelector('.todoName').innerText
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

async function markUnComplete() {
	const itemText = document.querySelector('.todoName').innerText
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