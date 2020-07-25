$(document).ready(function () {
    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todo-list');
    const $deleteCompleted = $('#delete-completed');
    const $submitButton = $('#submit-button');

    const deleteButton = '<button class="delete-button">&#10060;</button>';

    const COMPLETED_CLASS = 'completed-task';
    const VALID_CLASS = 'valid-input';
    const INVALID_CLASS = 'invalid-input';

    let todo = [];
    let validationCheck = false;

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

    const validationChecker = () => {
        if (/^\s*$/.test($text.val())) {
            validationCheck = false;
        } else {
            validationCheck = true;
        }
    }

    const invalidationMarker = () => {
        $text.attr('class', INVALID_CLASS);
        $submitButton.attr('class', INVALID_CLASS);
    }

    const validationMarker = () => {
        $text.attr('class', VALID_CLASS);
        $submitButton.attr('class', VALID_CLASS);
    }

    const resetValidationLogic = () => {
        validationCheck = false;
        $text.removeAttr('class');
        $submitButton.removeAttr('class');
    }

    const onDeleteCompletedClick = () => {
        todo = todo.filter(item => !item.status);
    }

    $form.on('input', function () {
        validationChecker();
        if (validationCheck) {
            validationMarker();
        } else {
            invalidationMarker();
        }
    });

    $text.on('blur', function () {
        if (validationCheck === false) {
            resetValidationLogic();
            $text.val('');
        }
    });

    $form.on('submit', function (event) {
        event.preventDefault();
        if (validationCheck) {
            onFormSubmit();
            resetValidationLogic();
        }
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