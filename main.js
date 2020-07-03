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
        $('li.todoList').remove();

        $.each(arr, function (index) {
            $todoList.append(`<li class="todoList" id="${arr[index].id}"><span>${arr[index].text}</span></li>`);
        })
    }
    $form.on('submit', function (event) { //обработчик события отправки формы
        event.preventDefault();
        onFormSubmit();
        render(todo);
    })

});