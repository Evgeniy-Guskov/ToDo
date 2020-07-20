$(document).ready(function () {
    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todoList');

    const delete_button = `<button class="delete-button">&#10060;</button>`;

    let todo = [];

    const render = (arr) => {
        let content = '';
        arr.forEach(item => {
            content += `<li id="${item.id}" ${item.status && `class="completed-task"`}>
            <input type="checkbox" class="checkbox" ${item.status && `checked`}>
            <span>${item.text}</span>${delete_button}</li >`;
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
        const deletedTuskIndex = todo.findIndex(item => String(item.id) === $(this).parent().attr('id'));
        if (deletedTuskIndex !== -1) {
            todo.splice(deletedTuskIndex, 1);
            render(todo);
        }
    });

    $todoList.on('change', '.checkbox', function () {
        const checkedTuskIndex = todo.findIndex(item => String(item.id) === $(this).parent().attr('id'));
        if (checkedTuskIndex !== -1) {
            todo[checkedTuskIndex].status = $(this).prop("checked");
            render(todo);
        }
    });
})