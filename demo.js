    function sendMessage() {
        const userMessage = document.getElementById('userMessage').value.trim();
        document.getElementById('userMessage').value = '';
        if (!userMessage) return;
        const userDiv = document.createElement('div');
        userDiv.classList.add('chat-message', 'user');
        userDiv.textContent = userMessage;
        document.getElementById('messages').appendChild(userDiv);
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            const botDiv = document.createElement('div');
            botDiv.classList.add('chat-message', 'bot');
            botDiv.textContent = data.response;
            document.getElementById('messages').appendChild(botDiv);
            document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
        })
        .catch(error => console.error('Error:', error));
    }
