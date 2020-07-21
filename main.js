$(document).ready(function () {
    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todoList');
    const $deleteCompleted = $('#delete-completed');

    const deleteButton = '<button class="delete-button">&#10060;</button>';

    const COMPLETED_CLASS = 'completed-task';

    let todo = [];

    const render = (arr) => {
        let content = '';
        arr.forEach(item => {
            content += `<li id="${item.id}" class="${item.status ? COMPLETED_CLASS : ''}">
            <input type="checkbox" class="checkbox" ${item.status && 'checked'}>
            <span>${item.text}</span>${deleteButton}</li >`;
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

    const onDeleteCompletedClick = () => {
        todo = todo.filter(item => !item.status);
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

    $deleteCompleted.on('click', function () {
        onDeleteCompletedClick();
        render(todo);
    });
})