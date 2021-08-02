$(document).ready(function () {

    let edit = false;

    $('#task_result').hide();
    list_tasks();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task_search.php',
                type: 'post',
                data: { search },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                        ${task.name}
                    </li>`
                    });
                    $('#container').html(template);
                    $('#task_result').show();
                }
            });
        }
    });

    $('#task_form').submit(function (e) {
        const post_data = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#task_id').val(),
        }

        let url = edit === false ? 'task_add.php' : 'task_edit.php';

        $.post(url, post_data, function (response) {
            $('#task_form').trigger('reset');
            list_tasks();
        });
        e.preventDefault();
    });

    function list_tasks() {
        $.ajax({
            url: 'task_list.php',
            method: 'get',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `<tr task_id = "${task.id}">
                        <td>
                            <a href="#" class="task_item">${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="btn btn-danger task-delete">
                                Delete
                            </button>
                        </td>
                    </tr>`
                });
                $('#tasks').html(template);
            }
        });
    }

    $(document).on('click', '.task-delete', function () {
        if (confirm('Are you sure you want to delete this task?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('task_id');
            $.post('task_delete.php', { id }, function (response) {
                list_tasks();
            });
        }
    });

    $(document).on('click', '.task_item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('task_id');

        $.post('task_single.php', { id }, function (response) {
            let task = JSON.parse(response);
            $('#task_id').val(task.id);
            $('#name').val(task.name);
            $('#description').val(task.description);
            edit = true;
        });
    });
});