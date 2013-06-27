$(':radio[name=jsonDataType]').click(function () {
    var type = $(':radio[name=jsonDataType]').filter(":checked").val();

    $.getJSON('data.json', function (data) {
        var items = [];
        switch (type) {
            case 'simpleList':
            {
                $.each(data, function (key, val) {
                    $.each(val, function (key1, val1) {
                        items.push(key1 + ": " + val1 + '\n');
                    });
                    items.push('\n')
                });

                break;
            }
            case 'json':
            {
                var n, v, json = [], arr = (data  && data.constructor == Array);
                for (n in data) {
                    v = data[n];
                    t = typeof(v);
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null) {
                        v = JSON.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v) + '\n');
                }
                items.push((arr ? "[" : "{") + '\n' + String(json) + (arr ? "]" : "}"));
                break;
            }
            case 'another':
            {
                break;
            }
        }
        $('#viewData').html('');
        $('#viewData').append(items.join(''));
    });
});



$('#checkView').click(function () {
    if ($("#checkView").attr("checked")) {
        $('#viewRadio [type=radio]').attr('disabled', '');
        $('#viewData').fadeIn();
    } else {
        $('#viewRadio [type=radio]').attr('disabled', 'true');
        $('#viewData').fadeOut();
    }
});

$(':radio[value=simpleList]').click();

//$('#divCost [type=text]').poshytip({
//    className: 'tip-skyblue',
//    showOn: 'focus',
//    alignTo: 'target',
//    alignX: 'center',
//    alignY: 'bottom',
//    offsetX: 0,
//    offsetY: 5,
//    showTimeout: 100
//});

$('#addForm').bind('submit', function (event) {
    $('#divModel [type=text]').each(function () {
        if (!$(this).val().length) {
            event.preventDefault();
            $(this).css('border', '2px solid red');
        } else {
            $(this).css('border', '1px solid black');
        }
    });
    alert("Now this Save not work. It use only for validation!")
});

$('#divColor [type=text]').blur(function () {
    if ($(this).val().length == 0) {
        $(this).after('<span class="error">Please, enter color</span>')
    }
});

$('#divColor [type=text]').focus(function () {
    $(this)
        .next('span')
        .remove()
});


$('#fetchButton').click(function () {
    var model = $('#modelValue').val();
    $.getJSON('data.json', {}, function (data) {
        var items = [];
        $.each(data, function (key, val) {
            var obj = val.model;
            if (obj == model) {
                $.each(val, function (key1, val1) {
                    items.push(key1 + ": " + val1 + '\n');
                });
            }
        });
        $('#fetchedCar').html('');
        $('#fetchedCar').append(items.join(''));
    });
});
