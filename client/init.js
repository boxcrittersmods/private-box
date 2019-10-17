PlayFab.settings.titleId = "5417";

        var socket = io('https://bcmc-private-box.herokuapp.com', { //wss://boxcritters.org   https://boxcritters.herokuapp.com
            autoConnect: false,
            transports: ['websocket']
        });

        hamster_data.images = ['./media/critters/hamster.png'];

        var settings = {
            character: hamster_data,
            roomPath: './media/rooms/'
        }

        var world = new World(socket, settings, 'stage');

        function loginSession(ticket) {
            world.login(ticket);
        }

        socket.on('login', function(data) {

            $('.login').hide();
            $('.client').show();

            $('.client .chat-btn').click(sendMessage);

            $(document).unbind('keypress');
            $(document).keypress(handleKeypress);

            window.onresize = function() {
                var body = $('#stage').parent();
                $('#stage').width(body.width()).height(body.width() * .54);
            }
            window.onresize();
        });

        function handleKeypress(e) {
            if (e.which == 13) {
                sendMessage();
            }
        }

        function sendMessage() {
            var message = $('#chat-message').val();
            if (message.length > 0) {
                world.sendMessage(message);
                $('#chat-message').val('');
                $('#chat-message').focus();
            } else {
                $('#chat-message').focus();
            }
        }