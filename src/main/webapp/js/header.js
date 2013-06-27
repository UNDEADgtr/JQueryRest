$('#mainMenu span').click(function () {

    if ($('#home').css('display') == 'block') {
        $('#home').slideToggle();
        $('#viewConent').slideToggle();
    }

    if ($('#addConent').css('display') == 'block') {
        $('#addConent').slideToggle();
    }
    if ($('#getConent').css('display') == 'block') {
        $('#getConent').slideToggle();
    }
    if ($('#updateConent').css('display') == 'block') {
        $('#updateConent').slideToggle();
    }
    if ($('#deleteConent').css('display') == 'block') {
        $('#deleteConent').slideToggle();
    }

    switch ($(this).text()) {
        case 'home':
        {
            $('#home').slideToggle();
            $('#viewConent').slideToggle();
            break;
        }
        case 'add':
        {
            $('#addConent').slideToggle();
            break;
        }
        case 'get':
        {
            $('#getConent').slideToggle();
            break;
        }
        case 'update':
        {
            $('#updateConent').slideToggle();
            break;
        }
        case 'delete':
        {
            $('#deleteConent').slideToggle();
            break;
        }
    }
});

$('#home').slideToggle();

