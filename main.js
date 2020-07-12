$(document).ready(function () {

    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todoList');

    let todo = [];

    const render = (arr) => {                //Отрисовывает ненумерованный список
        let content = '';

        arr.forEach(item => {
            content += `<li id="${item.id}"><span>${item.text}</span><button class="delete-button">&#10060;</li>`
        });

        $todoList.html(content);
    }

    const onFormSubmit = () => {          //Наполняет массив, назначает свойства его элементам; рисует список
        todo.push({
            id: Math.random(),
            status: false,
            text: $text.val(),
        });

        $text.val('');

        render(todo);
    }

    $form.on('submit', function (event) {   //обработчик события отправки формы
        event.preventDefault();

        onFormSubmit();
    });

    $todoList.on('click', '.delete-button', function (event) {   //делегированный обработчик события клика на кнопку крестика
        const idChecker = (item => {
            return item.id == $(this).parent().attr('id')
        });

        const arrayIndex = todo.findIndex(idChecker);

        todo.splice(arrayIndex, 1);

        render(todo);
    });
})