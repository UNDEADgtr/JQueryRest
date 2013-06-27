$("#showModel").button();

//$("#jsonModel").fadeOut;

$('#showModel').click(function () {
    if ($('#jsonModel').css('display') == 'none') {
        $.getJSON('model.json', {}, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                $.each(val, function (key1, val1) {
                    items.push(key1 + ": " + val1 + '\n');
                });
                items.push('\n')
            });
            $('#jsonModel').html('');
            $('#jsonModel').append(items.join(''));
        });
    }
    $('#jsonModel').fadeToggle();
});