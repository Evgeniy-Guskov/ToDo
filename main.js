$(document).ready(function () {
    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todoList');

    const delete_button = `<button class="delete-button">&#10060;</button>`;
    
    let todo = [];

    const render = (arr) => {
        let content = '';
        arr.forEach(item => {
            content += `<li id="${item.id}"><span>${item.text}</span>${delete_button}</li>`
        });
        $todoList.html(content);
    }

    const onFormSubmit = () => {
        todo.push({
            id: Math.random(),
            status: false,
            text: $text.val(),
        });
        $text.val('');
        render(todo);
    }

    $form.on('submit', function (event) {
        event.preventDefault();
        onFormSubmit();
    });

    $todoList.on('click', '.delete-button', function () {
        const arrayIndex = todo.findIndex(item => String(item.id) === $(this).parent().attr('id'));
        if (arrayIndex !== -1) {
            todo.splice(arrayIndex, 1);
            render(todo);
        }
    });
})