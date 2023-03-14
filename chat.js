class Chatroom {
  constructor(username) {
    this.username = username
    this.chats = db.collection("chats")
  }
  async addChat(message) {
    const now = new Date()
    const chat = {
      message,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    }
    // saving
    const response = await this.chats.add(chat)
    return response
  }
  getChats(callback) {
    this.chats
    .orderBy('created_at')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // update the ui
          callback(change.doc.data())
        }
      })
    })
  }
  updateName(username){
    this.username = username;
    localStorage.setItem('username', username)
  }
}
// const chatroom = new Chatroom("shani")
// // console.log(chatroom)
// // chatroom.addChat('hello everyone').then(() => console.log('chat added')).catch(err => console.log(err))
// chatroom.getChats((data) => {
//   console.log(data)
// })
