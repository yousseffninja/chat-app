const socket = io();

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
}

socket.on('chatMessage', (message) => {
    console.log(message);
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message');
    document.getElementById('messages').appendChild(messageElement);
});
