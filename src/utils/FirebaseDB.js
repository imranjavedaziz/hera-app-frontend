import database from '@react-native-firebase/database';
import {chat} from '../constants/Constants';
const SIZE = 200;
const createChatId = (id1, id2) => {
  if (parseInt(id1) > parseInt(id2)) {
    return `${id1}-${id2}`;
  }
  return `${id2}-${id1}`;
};
const newArr = originalArr => {
  let arr1 = [];
  for (let i = 0; i < originalArr.length; i++) {
    console.log(originalArr[i], 'originalArr[i]');
    if (i > 0) {
      if (
        originalArr[i]?.createdAt?.toString()?.split('T')[0] !=
        originalArr[i - 1]?.createdAt?.toString()?.split('T')[0]
      ) {
        arr1.push({
          date: originalArr[i].createdAt,
          _id: Math.random,
        });
      }
    }
    arr1.push(originalArr[i]);
  }
  console.log(arr1, 'arr1');
  return arr1;
};
export default class FirebaseDB {
  reference;
  chatId = '';
  totalSize = 0;
  messages = [];
  lastIdInSnapshot = '0';
  firstKey;
  lastKey;
  loading = false;
  endReached = false;
  onChildAdd;
  user = {};
  sender = {};

  constructor(user, sender) {
    this.chatId = createChatId(user.user_id, sender.user_id);
    this.user = user;
    this.sender = sender;
    const now = Date.now();
    this.lastIdInSnapshot = now.toString();
    this.firstKey = now.toString();
    this.lastKey = now.toString();
    this.endReached = false;
    this.messages = [];
    this.onChildAdd = null;
    const ref = database().ref(`${chat}` + '/Messages/' + this.chatId);
    this.reference = ref;
  }

  prependMessage(msg) {
    const index = this.messages.findIndex(m => m._id === msg._id);
    if (index === -1) {
      this.messages = [msg, ...this.messages];
    }
  }

  appendMessage(msg) {
    const index = this.messages.findIndex(m => m._id === msg._id);
    if (index === -1) {
      this.messages = [...this.messages, msg];
    }
  }

  parseMessages(snapshot) {
    const {time, text, from} = snapshot.val();
    const createdAt = new Date(time);
    return {
      _id: snapshot.key,
      text,
      createdAt: createdAt,
      from,
    };
  }

  setTotalSize() {
    return new Promise((resolve, reject) => {
      this.reference
        .orderByKey()
        .once('value')
        .then(snapshot => {
          this.totalSize = snapshot.numChildren();
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  async initMessages() {
    this.loading = true;
    console.log('initMessages');
    const snapshot = await this.reference
      .orderByChild('time')
      .limitToLast(SIZE)
      .once('value');
    let keys = Object.keys(snapshot.val() || {});
    this.firstKey = keys[0];
    this.loading = false;
    if (keys.length < SIZE) {
      this.endReached = true;
    }
    snapshot.forEach(async (childSnapshot, index) => {
      const messageItem = this.parseMessages(childSnapshot);
      if ((this.messages.length === 0 && this.firstKey === '') || index === 0) {
        this.firstKey = childSnapshot.key;
      } else if (this.messages.length === SIZE) {
        this.lastKey = childSnapshot.key;
      }
      this.prependMessage(messageItem);
    });
  }

  async sendMessage(msg) {
    const timestampRow = Date.now();
    const referenceDb = database().ref(
      `${chat}` + '/Messages/' + this.chatId + '/' + timestampRow,
    );
    const sendData = {
      text: msg,
      time: timestampRow,
      from: this.user.user_id,
    };
    return new Promise((resolve, reject) => {
      referenceDb
        .set(sendData)
        .then(async () => {
          resolve();
          this.updateHistory(msg);


        })
        .catch(e => reject(e));
    });
  }

  loadEarlier(cb) {
    console.log('hjfdhcj');
    this.loading = true;
    cb(true);
    cb(false);
  }

  async readMessage(id, data) {
    const timestamp = new Date().toString();
    const ref = database().ref(
      `${chat}` + '/Messages/' + this.chatId + '/' + id,
    );
    const snap = await ref.once('value');
    if (snap.val() !== null && data.user_id !== this.user.user_id) {
      ref.update({
        ...data,
        message: data.text,
        isRead: true,
        readAt: timestamp,
      });
    }
  }
  async readSingle(msg) {
    if (msg.sender_id === this.sender.user_id && !msg.isRead) {
      await this.readMessage(msg._id.split('-')[0], msg);
      await this.readAll();
    }
  }
  async readAll() {
    const referenceUser = database().ref(
      `/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`,
    );
    const referenceSender = database().ref(
      `/${chat}/Users/${this.sender.user_id}/Friends/${this.user.user_id}`,
    );
    try {
      await referenceUser.update({
        read: 1,
      });
      await referenceSender.update({
        read: 0,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async updateFeedback(sendFeedback) {
    const referenceUser = database().ref(
      `/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`,
    );
    try {
      await referenceUser.update({
        feedback_status: sendFeedback,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async updateHistory(lastMsg) {
    const referenceUser = database().ref(
      `/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`,
    );
    const referenceSender = database().ref(
      `/${chat}/Users/${this.sender.user_id}/Friends/${this.user.user_id}`,
    );
    await referenceUser.update({
      message: lastMsg,
      chat_start:1
    });
    await referenceSender.update({
      message: lastMsg,
      chat_start:1
    });
  }
  async readAt(id, setLoading) {
    setLoading(true);
    const rowId = id.split('-')[0];
    const ref = database().ref(
      `${chat}` + '/Messages/' + this.chatId + '/' + rowId,
    );
    try {
      const snap = await ref.once('value');
      const msgIndex = this.messages.findIndex(msg => msg._id === id);
      const readMsg = this.parseMessages(snap);
      this.messages[msgIndex] = readMsg;
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
}
