// creating avariable and assigninf it a selectiion of all elements with a class of 'fa-trash'
const deleteBtn = document.querySelectorAll('.fa-trash');
// creating a variable and assigning it to a selection of any span tag that is inside of any element with a class of 'item'
const item = document.querySelectorAll('.item span');
// creating a variable and assigning it to a selection of any span tag with a class of 'completed' that is inside of any element with a class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed');
// creating an array from aour selecvtion and then start a loop to iterate through it
Array.from(deleteBtn).forEach((element) => {
	// add an event listener to the current element that waits for a click to call a function called 'deleteItem'
	element.addEventListener('click', deleteItem);
	//closing loop
});

Array.from(item).forEach((element) => {
	element.addEventListener('click', markComplete);
});

Array.from(itemCompleted).forEach((element) => {
	element.addEventListener('click', markUnComplete);
});

async function deleteItem() {
	const itemText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch('deleteItem', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				itemFromJS: itemText,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function markComplete() {
	const itemText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch('markComplete', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				itemFromJS: itemText,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function markUnComplete() {
	const itemText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch('markUnComplete', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				itemFromJS: itemText,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}
