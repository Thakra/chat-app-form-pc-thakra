const chatList = document.querySelector(".chat-list")
const newChatForm = document.querySelector(".new-chat")
const newNameForm = document.querySelector('.new-name')
const updateMsg = document.querySelector('.update-msg')

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = newChatForm.message.value.trim()
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset()
    })
    .catch((err) => console.log(err))
})


newNameForm.addEventListener('submit', e => {
    e.preventDefault()
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();

    updateMsg.innerText = `your name updated to ${newName} `
    setTimeout(() => updateMsg.innerText = '', 3000)
})


// check local storage for name 
const username = localStorage.username ? localStorage.username : 'not available';



const chatUI = new ChatUI(chatList)

const chatroom = new Chatroom(username)
// console.log(chatroom)
// chatroom.addChat('hello everyone').then(() => console.log('chat added')).catch(err => console.log(err))
chatroom.getChats((data) => {
  //   console.log(data)
  chatUI.render(data)
})
