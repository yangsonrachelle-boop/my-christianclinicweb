const chatbox = document.querySelector('.chatbot');
const chatHeader = chatbox.querySelector('.chat-header');
const chatBody = chatbox.querySelector('.chat-body');
const chatInput = chatbox.querySelector('#chat-input');

let isCollapsed = false;

// Predefined auto-replies
const autoReplies = [
    { keywords: ['hours', 'time'], reply: 'Our clinic is open from 8am to 5pm, Monday to Saturday.' },
    { keywords: ['services'], reply: 'We offer Physical Exams, Lab Tests, X-ray, Ultrasound, ECG, Dental, and Optical services.' },
    { keywords: ['appointment', 'book'], reply: 'You can book an appointment by calling us at +123-456-7890 or via our website.' },
    { keywords: ['location', 'address'], reply: 'We are located at 22B Madison Street, Brgy.Mariana,Quezon City' },
    
    // Price-related keywords
    { keywords: ['xray', 'x-ray'], reply: 'The cost of an X-ray starts from $50, depending on the type of X-ray.' },
    { keywords: ['laboratory', 'lab'], reply: 'Laboratory tests cost between $20 and $200 depending on the test.' },
    { keywords: ['dental'], reply: 'Dental services range from $30 for basic checkups to $500 for more complex procedures.' },
    { keywords: ['optical', 'eye'], reply: 'Optical services start at $25 for eye exams and vary for glasses and lenses.' },
    { keywords: ['ecg', 'electrocardiogram'], reply: 'An ECG costs approximately $40.' },
    { keywords: ['ultrasound', 'sonography'], reply: 'Ultrasound services range from $60 to $150 depending on the type.' },
    { keywords: ['vaccine', 'vaccination'], reply: 'Vaccine costs vary depending on type, ranging from $10 to $100.' },
    
    { keywords: ['price', 'cost'], reply: 'Please specify the service (e.g., X-ray, lab test, dental) so I can give you the price.' },
];

const defaultReplies = [
    'Hello! How can we assist you today?',
    'Thank you for your message! Our staff will respond shortly.',
    'We are here to help you. Please type your question.'
];

// Collapsible chat
chatHeader.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
        chatBody.style.display = 'none';
        chatInput.style.display = 'none';
        chatbox.style.height = '50px';
    } else {
        chatBody.style.display = 'block';
        chatInput.style.display = 'block';
        chatbox.style.height = 'auto';
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});

// Draggable chatbox
let offsetX, offsetY, isDragging = false;

chatHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - chatbox.offsetLeft;
    offsetY = e.clientY - chatbox.offsetTop;
    chatbox.style.transition = 'none';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    chatbox.style.transition = 'all 0.2s';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    chatbox.style.left = `${e.clientX - offsetX}px`;
    chatbox.style.top = `${e.clientY - offsetY}px`;
});

// Fully auto-reply system
function autoReply(message) {
    const msg = message.toLowerCase();
    let replied = false;
    for (let r of autoReplies) {
        if (r.keywords.some(k => msg.includes(k))) {
            addBotMessage(r.reply);
            replied = true;
            break;
        }
    }
    if (!replied) {
        addBotMessage(defaultReplies[Math.floor(Math.random() * defaultReplies.length)]);
    }
}

function addBotMessage(text) {
    const botDiv = document.createElement('div');
    botDiv.classList.add('bot-message');
    botDiv.textContent = text;
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Optional: simulate full auto-reply without user input
function simulateUserMessages(messages, interval = 3000) {
    let index = 0;
    function sendNext() {
        if (index >= messages.length) return;
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('user-message');
        msgDiv.textContent = messages[index];
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            autoReply(messages[index]);
        }, 1000);

        index++;
        setTimeout(sendNext, interval);
    }
    sendNext();
}

// Example auto-simulation (remove or comment out if not needed)
// simulateUserMessages(['What are your hours?', 'Do you offer X-ray?', 'How can I book an appointment?']);

// Optional: reply to real user input
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const userMessage = chatInput.value;
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-message');
        userDiv.textContent = userMessage;
        chatBody.appendChild(userDiv);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            autoReply(userMessage);
        }, 1000);
    }
});

