$(document).ready(function () {

    const $form = $('#form');
    const $text = $('#text');
    const $todoList = $('#todoList');

    let todo = [];

    const onFormSubmit = () => {          //Наполняет массив и назначает свойства его элементам
        todo.push({
            id: Math.random(),
            status: false,
            text: $text.val(),
        });

        $text.val('');

        console.log(todo);
    }

    const render = (arr) => {                //Отрисовывает ненумерованный список
        let content = '';

        arr.forEach((item) => {
            content += `<li class="todoList" id="${item.id}"><span>${item.text}</span></li>`
        });

        $todoList.html(content);
    }

    $form.on('submit', function (event) { //обработчик события отправки формы
        event.preventDefault();
        onFormSubmit();
        render(todo);
    })

});