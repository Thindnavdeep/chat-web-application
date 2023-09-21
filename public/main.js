const socket = io("http://localhost:4000/", {})
const clientTotal = document.getElementById('clients-total');


const messagecontainer = document.getElementById("message-container");
const nameinput = document.getElementById("input-name");
const messageform = document.getElementById("message-form");
const messageinput = document.getElementById("message-input");
const typing = document.getElementById("typing");
const messagetone = new Audio('msg.mp3');

messageform.addEventListener('submit', (e) => {
    e.preventDefault();
    sendmessage();
})
function sendmessage() {
    // console.log(messageinput.value);
    if (messageinput.value === '') return;
    const data = {
        name: nameinput.value,
        message: messageinput.value,
        datetime: new Date()
    }

    socket.emit('message', data);
    addmessagetoUi(true, data);
    messageinput.value = "";
}

//broadcasting........................

socket.on('chat-message', (data) => {
    // console.log(data);
    addmessagetoUi(false, data);
    messagetone.play();
})

//...........to add message to ui..............

function addmessagetoUi(isOwnMessage, data) {
    const element = `
    <li class="${isOwnMessage ? 'message-right' : "message-left"}">
        <p class="message">
            ${data.message}
        </p>
        <span>${data.name}🚀 ${moment(data.datetime).fromNow()}</span>
    </li>`

    messagecontainer.innerHTML += element;
    scrollToBottom();
}

//.............scroll to bottom 

function scrollToBottom() {
    messagecontainer.scrollTo(0, messagecontainer.scrollHeight)
}

///...............feedbacks.........

messageinput.addEventListener('focus', (e) => {
    socket.emit('feedback', {
        feedback: `${nameinput.value} typing...`
    })
})
messageinput.addEventListener('keypress', (e) => {
    socket.emit('feedback', {
        feedback: `${nameinput.value} typing...`
    })
})
messageinput.addEventListener('blur', (e) => {
    socket.emit('feedback', {
        feedback: '---'
    })
})

socket.on('feedback', (data) => {
    element = `
            ${data.feedback}
     `
     typing.innerText = element;

})

socket.on('clients-total', (data) => {
    clientTotal.innerText = `Total Clients :: ${data}`
})

///Payment Reminder App.............