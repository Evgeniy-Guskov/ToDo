$(document).ready(function () {

    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todoList');

    let todo = [];

    const render = (arr) => {                //Отрисовывает ненумерованный список
        let content = '';

        arr.forEach(item => {
            content += `<li id="${item.id}"><span>${item.text}</span><button class="DeleteButton">Done</li>`
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

    $todoList.on('click', '.DeleteButton', function (event) {   //делегированный обработчик события клика на кнопку Done
        event.preventDefault();

        $(this).parent().remove();

        todo.forEach(item => {
            if (item.id == $(this).parent().attr('id')) {
                todo.splice(todo.indexOf(item), 1);
            }
        });
    })

});