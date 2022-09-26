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
	element.addEventListener('click', deleteItem)
})

async function markAsPriority(event) {
	const itemText = event.target.parentNode.childNodes[3].innerText
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

async function unmarkAsPriority(event) {
	const itemText = event.target.parentNode.childNodes[3].innerText
	try {
		const response = await fetch('unmarkAsPriority', {
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

async function isChecked(event) {
	const itemText = event.target.parentNode.parentNode.parentNode.childNodes[3].innerText
	console.log(itemText)

	if (event.target.checked) {
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

	} else {
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
}