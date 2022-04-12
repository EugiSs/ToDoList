const main = ((document) => {
	const todoForm = document.querySelector('#todo-form');
	const addInput = todoForm.querySelector('#add-input');
	const todoList = document.querySelector('.todo-list');
	const todoItems = document.querySelectorAll('.todo-item');
	
	// Добавляем на страницу элемент.
	function addTodoItem(event) {
		event.preventDefault();
	
		if (addInput.value === '') return alert('Нужно ввести название задачи');
		let todoItem = createTodoItem(addInput.value);
		todoList.append(todoItem);
		addInput.value = '';
	};
	
	// Создаем элемент с наполнением (задача). Привязываем к нему обработчики событий (bindEvents).
	function createTodoItem(title) {
		let checkbox = createElem('input', { type: 'checkbox', className: 'checkbox' });
		let label = createElem('label', { className: 'title', textContent: title });
		let textfield = createElem('input', { className: 'textfield', type: 'text' });
		let editButton = createElem('button', { className: 'edit', textContent: 'Изменить' });
		let deleteButton = createElem('button', { className: 'delete', textContent: 'Удалить' });
	
		let li = createElem('li', { className: 'todo-item' });
		li.append(checkbox, label, textfield, editButton, deleteButton);
	
		bindEvents(li);
		return li;
	}
	
	// Шаблон создания элементов/
	function createElem(tag, props) {
		let elem = document.createElement(tag);
		Object.keys(props).forEach(key => elem[key] = props[key]);
		return elem;
	};
	
	// Обработчики событий.
	function bindEvents(todoItem) {
		let checkbox = todoItem.querySelector('input.checkbox');
		let editButton = todoItem.querySelector('button.edit');
		let deleteButton = todoItem.querySelector('button.delete');
	
		checkbox.addEventListener('change', function () {
			let todoItem = this.parentElement;
			todoItem.classList.toggle('completed');
		});
	
		editButton.addEventListener('click', function () {
			let todoItem = this.parentElement;
			let todoItemTitle = todoItem.querySelector('.title');
			let editItem = todoItem.querySelector('.textfield');
	
			if (todoItem.classList.contains('editing')) {
				todoItemTitle.textContent = editItem.value;
				this.textContent = 'Изменить';
			} else {
				editItem.value = todoItemTitle.textContent;
				this.textContent = 'Сохранить';
			}
	
			todoItem.classList.toggle('editing');
		});
	
		// let input = todoItem.querySelector('.textfield');
		// input.addEventListener('change', function () {
		// 	let todoItem = this.parentElement;
		// 	let todoItemTitle = todoItem.querySelector('.title');
		// 	let editItem = todoItem.querySelector('.textfield');
	
		// 	if (todoItem.classList.contains('editing')) {
		// 		todoItemTitle.textContent = editItem.value;
		// 		editButton.textContent = 'Изменить';
		// 	} else {
		// 		editItem.value = todoItemTitle.textContent;
		// 		editButton.textContent = 'Сохранить';
		// 	}
	
		// 	todoItem.classList.toggle('editing');
		// })
	
		deleteButton.addEventListener('click', function () {
			this.parentElement.remove();
		})
	};
	
	// Привязка формы к добавленю элемента, привязка обработчиков к существующим элементам.
	function main() {
		todoForm.addEventListener('submit', addTodoItem);
		todoItems.forEach(item => bindEvents(item));
	};
	
	return main();
	
})(document);

main();