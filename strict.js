const socket = io();

// DOM Elements
const chatForm = document.getElementById('chatForm');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const chatArea = document.getElementById('chatArea');

// Event Listener for form submission
chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    const chatData = { username, message };

    // Emit message to the server
    socket.emit('sendMessage', chatData);

    // Display the message locally
    displayMessage('You', message);

    // Clear the message input field
    messageInput.value = '';
  }
});

// Listen for incoming messages from the server
socket.on('receiveMessage', (data) => {
  displayMessage(data.username, data.message);
});

// Function to display a message
function displayMessage(sender, messageContent) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${messageContent}`;
  chatArea.appendChild(messageElement);

  // Auto-scroll to the latest message
  chatArea.scrollTop = chatArea.scrollHeight;
}