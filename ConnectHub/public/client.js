
const socket=io();

let nm;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message-area');
do{

    nm=prompt("please enter your name: ");

}while(!nm);

const name=nm;

textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter")
    {
        console.log("Enter")
        sendMessage(e.target.value);
    }

});

function sendMessage(message){

    let msg={
        user: name,
        message: message.trim()
    }
    appendMessage(msg,'outgoing');

    socket.emit('message',msg);

    textarea.value="";
}

function appendMessage(msg,type)
{
    let mainDiv=document.createElement('div');
    let className=type;
    
    mainDiv.classList.add(className,'message');

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);

}


socket.on('message',(msg)=>{


    appendMessage(msg,'incoming');

});