var login_dom = document.getElementById("login-btn");
//var loading_dom = document.getElementById("loading");
var username_dom = document.getElementById("username");

username_dom.addEventListener("keydown", function (event) {
	if (event.keyCode == 13)
	{
		login();
	}
});

login_dom.addEventListener("click", function (event) {
	event.preventDefault();
	login();
});

function login()
{
	var username = username_dom.value;
	var valid = false;

	if (username.length > 3 && username.length < 20)
	{
        loginSession(username);
	} else
	{
		show_error("Invalid username. Usernames must contain more than 3 and less than 20 characters");
	}
}

