import database from '@react-native-firebase/database';
import {chat} from '../constants/Constants';
import ApiPath from '../constants/ApiPath';
const SIZE = 10;
const createChatId = (id1, id2) => {
  if (parseInt(id1) > parseInt(id2)) {
    return `${id1}-${id2}`;
  }
  return `${id2}-${id1}`;
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
    const ref = database().ref(`${chat}` + ApiPath.message + this.chatId);
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
    const {time, text, from, media, type = 'text', namePdf} = snapshot.val();
    const createdAt = new Date(time);
    return {
      _id: snapshot.key,
      text,
      createdAt: createdAt,
      from,
      //media key added
      media,
      type,
      namePdf,
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
  async messageLength() {
    this.reference
      .orderByKey()
      .once('value')
      .then(snapshot => {
        this.totalSize = snapshot.numChildren();
      });
  }
  async sendMessage(msg, mediaUrl = null, type = 'text', namePdf = null) {
    const timestampRow = Date.now();
    const referenceDb = database().ref(
      `${chat}` + ApiPath.message + this.chatId + '/' + timestampRow,
    );
    const sendData = {
      text: msg,
      time: timestampRow,
      from: this.user.user_id,
      //msg media
      type: type,
      media: mediaUrl,
      namePdf: namePdf,
    };
    return new Promise((resolve, reject) => {
      referenceDb
        .set(sendData)
        .then(async () => {
          resolve();
          this.updateHistory(msg, timestampRow);
        })
        .catch(e => reject(e));
    });
  }

  loadEarlier(cb) {
    if (this.endReached || this.loading) {
      return;
    }
    this.loading = true;
    cb(true);
    this.reference
      .orderByKey()
      .endAt(
        this.firstKey === undefined ? Date.now().toString() : this.firstKey,
      )
      .limitToLast(SIZE)
      .once('value')
      .then(async snapshot => {
        console.log(snapshot, 'snapshot');
        this.loading = false;
        const ordered = Object.keys(snapshot.val())
          .sort((a, b) => b - a)
          .reduce((obj, key) => {
            obj[key] = snapshot.val()[key];
            return obj;
          }, {});
        const keys = Object.keys(ordered || {});
        const snapValues = Object.values(ordered || {});
        if (snapValues.length < SIZE) {
          this.endReached = true;
        }
        snapValues.map(async (childSnapshot, index) => {
          if (parseInt(keys[index]) < parseInt(this.firstKey)) {
            const {time, text, from,type,media,namePdf} = childSnapshot;
            const createdAt = new Date(time);
            let messageItem = {
              _id: keys[index],
              text,
              createdAt: createdAt,
              from,
              type,
              media,
              namePdf
            };

            this.appendMessage(messageItem);
          }
        });
        cb(false);
        this.firstKey = keys[keys.length - 1];
      });
  }

  async readSingle(msg) {
    if (msg.sender_id === this.sender.user_id && !msg.isRead) {
      await this.readMessage(msg._id.split('-')[0], msg);
      await this.readAll();
    }
  }
  async readMessage() {
    const referenceUser = database().ref(
      `/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`,
    );
    try {
      await referenceUser.update({
        read: 1,
      });
    } catch (e) {
      console.log(e);
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
        read: 0,
      });
      await referenceSender.update({
        read: 1,
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
      message: lastMsg === null ? 'You Shared an Attachment' : lastMsg,
      chat_start: 1,
      time: Date.now(),
      read: 1,
      adminChatTime: Date.now(),
    });
    await referenceSender.update({
      message: lastMsg === null ? 'Shared an Attachment' : lastMsg,
      chat_start: 1,
      time: Date.now(),
      read: 0,
      adminChatTime: Date.now(),
    });
  }
  async readAt(id, setLoading) {
    setLoading(true);
    const rowId = id.split('-')[0];
    const ref = database().ref(
      `${chat}` + ApiPath.message + this.chatId + '/' + rowId,
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
