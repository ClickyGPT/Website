// script.js

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage(message, 'user-message');
    userInput.value = '';

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{role: 'user', content: message}]
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.choices[0].message.content;
        appendMessage(botMessage, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Sorry, there was an error. Please try again.', 'bot-message');
    });
}

function appendMessage(message, className) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
