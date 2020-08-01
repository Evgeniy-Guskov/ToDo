$(document).ready(function () {
    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todo-list');
    const $deleteCompleted = $('#delete-completed');
    const $submitButton = $('#submit-button');

    const deleteButton = '<button class="delete-button">&#10060;</button>';

    const COMPLETED_CLASS = "completed-task";
    const DEFAULT_CLASS = "default-input";
    const VALID_CLASS = "valid-input";
    const INVALID_CLASS = "invalid-input";

    let todo = [];
    let inputState = false;

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

    const checkInputState = () => {
        return !/^\s*$/.test($text.val());
    }

    const toggleFormStyles = () => {
        $text.toggleClass(`${VALID_CLASS} ${INVALID_CLASS}`);
        $submitButton.toggleClass(`${VALID_CLASS} ${INVALID_CLASS}`);
        inputState = !inputState;
    }

    const oneFormInput = () => {
        if (checkInputState()) {
            $text.toggleClass(`${VALID_CLASS} ${DEFAULT_CLASS}`);
            $submitButton.toggleClass(`${VALID_CLASS} ${DEFAULT_CLASS}`);
        } else {
            $text.toggleClass(`${INVALID_CLASS} ${DEFAULT_CLASS}`);
            $submitButton.toggleClass(`${INVALID_CLASS} ${DEFAULT_CLASS}`);
        }
    }

    $form.one('input', function () {
        oneFormInput();
    });

    $form.on('input', function () {
        if (inputState !== checkInputState()) {
            toggleFormStyles();
        }
    });

    $form.on('submit', function (event) {
        event.preventDefault();
        if (inputState) {
            onFormSubmit();
            toggleFormStyles();
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