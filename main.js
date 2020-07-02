$(document).ready(function () {

    const
        $form = $('#form'),
        $text = $('#text'),
        $todoList = $('#todoList');

    let todo = [];

    const onFormSubmit = () => {    //Наполняет массив и назначает свойства его элементам
        todo.push({
            id: Math.random(),
            status: false,
            text: $text.val(),
        });

        $text.val('');

        console.log(todo);
    }

    $form.on('submit', function (event) { //обработчик события отправки формы
        event.preventDefault();
        onFormSubmit();
    })

});