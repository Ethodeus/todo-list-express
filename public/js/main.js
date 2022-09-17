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


async function deleteItem() { //Declaring a asynchronous function called deleteIte,
	const itemText = this.parentNode.childNodes[1].innerText; // This is grabbing the innertext of the todo <li> .
	try { // Starting a try block
		const response = await fetch('deleteItem', { //Creates a response variable that waits on afetch to get data from the result of deleteItem
			method: 'delete', //Sets the CRUD method for the route. 
			headers: { 'Content-Type': 'application/json' }, //specifying the type of content expected, which is JSON
			body: JSON.stringify({ //Declare the message content being passed, and  turning that content into a string. 
				itemFromJS: itemText, //Setting the content of the body to the innerText of the list item and naming it ItemfromJS
			}), //Closing the body
		}); //Closing the object
		const data = await response.json(); //Waiting for the server to respond with some JSON
		console.log(data); //Log the date to the console
		location.reload(); //reloads the page to update what is displayed
	} catch (err) { //If an error occurs pass an error into the cathc block
		console.log(err); //log the error message to the concsole. 
	} //close the catch block
} //end of function

async function markComplete() { //declaring an async function called markComplete
	const itemText = this.parentNode.childNodes[1].innerText; //This is grabbing the innertext of the todo <li> .
	try { //Starting a try block to do something
		const response = await fetch('markComplete', { //Declaring a response variable that waits on a fetch to get data from the result of the markComplete function
			method: 'put', //Setting the crud method for the route
			headers: { 'Content-Type': 'application/json' }, //specifying the type of content that we are passing
			body: JSON.stringify({ //Setting the content of the body to the innerText of the list item and naming it ItemfromJS
				itemFromJS: itemText, //Setting the content of the body to the innerText of the list item and naming it ItemfromJS
			}),//Closing the body
		});//Closing the object
		const data = await response.json(); //Waiting for the server to respond with some JSON
		console.log(data); //Log the date to the console
		location.reload(); //reloads the page to update what is displayed
	} catch (err) { //If an error occurs pass an error into the cathc block
		console.log(err); //log the error message to the concsole. 
	} //close the catch block
} //end of function

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
