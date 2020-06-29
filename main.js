$(document).ready(function () {

    const
        $form = $('#form'),
        $text = $('#text'),
        $ul = $('#ul');

    let todo = [];

    const onFormSubmit = () => {    //Наполняет массив и назначает свойства его элементам
        todo.push($text.val());

        todo[todo.length - 1] = {
            id: Math.random(),
            status: false,
            text: $text.val(),
        }

        $text.val('');              //Стирает текст в input-text в после отправки формы

        console.log(todo);
    }

    const onFormRender = () => {    //Отрисовывает ненумерованный список
        $ul.append('<li>' + todo[todo.length - 1].text + '</li>');
    }

    $form.on('submit', function (event) { //обработчик события отправки формы
        event.preventDefault();
        onFormSubmit();
        onFormRender();
    })

});