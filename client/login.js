
// Errors
var errorMessages = {
    nickname: 'Nicknames must be between 3 and 25 characters',
    email: 'Invalid email address',
    password: 'Usernames must be between 6 and 100 characters'
};

$('#loginEmail').focus();


$('.goto-lost').click(function () {
    $('.login').hide();
    $('.lost').show();
    $('.lost .form').show();
    $('.lost .success').hide();
    $('#lostEmail').focus();
});

$('.goto-join').click(function () {
    $('.login').hide();
    $('.join').show();
    $('#joinNickname').focus();
});

$('.goto-login').click(function () {
    $('.lost').hide();
    $('.join').hide();
    $('.login').show();
    $('#loginEmail').focus();
});

$(".login form").submit(function (e) {

    e.preventDefault();

    var username = $('#username').val();

    var isValid = true;

    if (username.length < 4 || username.length > 32) {
        $('#username').feedback(errorMessages.nickname).focus();
        isValid = false;
    } else {
        $('#username').feedback();
    }

    if (isValid) {
		loginSession(username);
    }

});

var handleLogin = function (result, error) {
    if (result !== null) {
        console.log(result);
        //gtag('event', 'login');
        $('.login').hide();
        loginSession(result.data.SessionTicket);
    } else if (error !== null) {
        console.error(error);
        $('.login .form-error').text(error.errorMessage).show();

        if (error.error == 'AccountNotFound') {
            $('#loginEmail').feedback('User not found').focus();
        }

        if (error.error == 'InvalidEmailOrPassword') {
            $('#loginEmail').feedback('Invalid email address').focus();
            $('#loginPassword').feedback('Invalid password');
        }
    }
}


$('.lost form').submit(function (e) {

    e.preventDefault();

    var email = $('#lostEmail').val();
    var isValid = true;

    if (!checkEmail(email)) {
        $('#lostEmail').feedback(errorMessages.email).focus();
        isValid = false;
    } else {
        $('#lostEmail').feedback();
    }

    if (isValid) {
        PlayFabClientSDK.SendAccountRecoveryEmail({
            TitleId: PlayFab.settings.titleId,
            Email: email
        }, handleLostPassord);
    }

});

function handleLostPassord(result, error) {
    if (result !== null) {

        var email = result.Request.Email;
        console.log(result);
        $('.lost .form').hide();
        $('.lost .success').show();
        $('.lost .success .card-text').replaceText('{{email}}', email);

    } else if (error !== null) {
        console.error(error);
        $('.lost .form-error').text(error.errorMessage).show();

        if (error.error == 'AccountNotFound') {
            $('#lostEmail').feedback('User not found').focus();
        }
    }
}


$('.join form').submit(function (e) {

    e.preventDefault();

    var nickname = $('#joinNickname').val();
    var email = $('#joinEmail').val();
    var password = $('#joinPassword').val();

    var isValid = true;

    if (password.length < 6 || password.length > 100) {
        $('#joinPassword').feedback(errorMessages.password).focus();
        isValid = false;
    } else {
        $('#joinPassword').feedback();
    }

    if (!checkEmail(email)) {
        $('#joinEmail').feedback(errorMessages.email).focus();
        isValid = false;
    } else {
        $('#joinEmail').feedback();
    }

    if (nickname.length < 3 || nickname.length > 25) {
        $('#joinNickname').feedback(errorMessages.nickname).focus();
        isValid = false;
    } else {
        $('#joinNickname').feedback();
    }

    if (isValid) {
        PlayFabClientSDK.RegisterPlayFabUser({
            TitleId: PlayFab.settings.titleId,
            DisplayName: nickname,
            Email: email,
            Password: password,
            RequireBothUsernameAndEmail: false
        }, handleJoin);
    }
});

var handleJoin = function (result, error) {

    if (result !== null) {
        console.log(result);
        $('.join').hide();
        loginSession(result.data.SessionTicket);
    } else if (error !== null) {
        console.error(error);

        if (error.error == 'InvalidParams') {
            $('.join .form-error').text(error.errorMessage).show();
            $('#joinPassword').feedback(errorMessages.password).focus();
        }

        if (error.error == 'EmailAddressNotAvailable') {
            $('.join .form-error').text(error.errorMessage).show();
            $('#joinEmail').feedback('Email address is not available').focus();
        } else {
            $('#joinNickname').addClass('is-valid');
        }

        if (error.error == 'NameNotAvailable') {
            $('.join .form-error').text('Nickname is not available').show();
            $('#joinNickname').feedback('Nickname is not available').focus();
        }

    }

}

function checkEmail(email) {

    var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
        return false;
    } else {
        return true;
    }

}