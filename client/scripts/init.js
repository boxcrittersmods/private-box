var loaded = false;
var tmp_ticket;
var socket = io(SERVER_URL, {
    autoConnect: false,
    transports: ['websocket']
});

hamster_data.images = ['./media/critters/hamster.png'];

var settings = {
    character: hamster_data,
    roomPath: './media/rooms/'
}

var world = new BoxCritters.World(socket, settings, "stage");

function loginSession(ticket)
{
	world.login(ticket);
}

socket.on("login", function (data) {
	var send_btn = document.getElementById("send");
	var chat_message = document.getElementById("chat-message");
	var chatlog = document.getElementById("chatlog");
	document.getElementById("login").style.display = "none";
	document.getElementById("login").parentNode.removeChild(document.getElementById("login"));
	document.getElementById("game").style.display = "block";
	document.getElementById("client").style.display = "inline-block";
	chatlog.style.display = "inline-block";
	chatlog.value = "";
	send_btn.addEventListener("click", sendMessage);
	chat_message.addEventListener("keydown", function (event) {
		if (event.keyCode == 13)
		{
			sendMessage();
		}
	});

	window.onresize = function () {
		var stage = document.getElementById("stage");
		var parent_bounding = stage.parentElement.getBoundingClientRect();

		stage.width = window.innerWidth > 850 ? 850 : window.innerWidth;
		stage.height = window.innerWidth * 0.54 > 480 ? 480 : window.innerWidth * 0.54;
		world.stage.scaleX = (1 / 850) * stage.width;
		world.stage.scaleY = (1 / 480) * stage.height;
	}
	window.onresize();
});

function sendMessage()
{
	var chat_message = document.getElementById("chat-message");
	if (chat_message.value.length > 0)
	{
		world.sendMessage(chat_message.value);
		chat_message.value = "";
		chat_message.focus();
	} else
	{
		chat_message.focus();
	}
}
