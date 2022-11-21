
import database from '@react-native-firebase/database';
import { chat } from '../constants/Constants';
const SIZE = 200;
const createChatId = (id1, id2) => {
    if (parseInt(id1) > parseInt(id2)) {
        return `${id1}-${id2}`;
    }
    return `${id2}-${id1}`;
}
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
        if (index === -1) this.messages = [msg, ...this.messages];
    }

    appendMessage(msg) {
        const index = this.messages.findIndex(m => m._id === msg._id);
        console.log(index, 'indexappendMessage')
        if (index === -1) this.messages = [...this.messages, msg];
    }

    parseMessages(snapshot) {
        const { time, text, from } = snapshot.val();
        const createdAt = new Date(time)
        return {
            _id: snapshot.key,
            text,
            createdAt: createdAt,
            from,
        };
    }

    setTotalSize() {
        return new Promise((resolve, reject) => {
            this.reference.orderByKey()
                .once('value')
                .then((snapshot) => {
                    this.totalSize = snapshot.numChildren();
                    resolve();
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    async initMessages() {
        this.loading = true;
        console.log('initMessages')
        const snapshot = await this.reference.orderByChild('time').limitToLast(SIZE).once('value');
        let keys = Object.keys(snapshot.val() || {});
        this.firstKey = keys[0];
        this.loading = false;
        if (keys.length < SIZE) this.endReached = true;
        snapshot.forEach(async (childSnapshot, index) => {
            const messageItem = this.parseMessages(childSnapshot);
            if ((this.messages.length === 0 && this.firstKey === "") || index === 0) this.firstKey = childSnapshot.key;
            else if (this.messages.length === SIZE) {
                this.lastKey = childSnapshot.key;
            }
            this.prependMessage(messageItem);
            // await this.readSingle(messageItem);
        });
        // await this.readAll();
    }

    async sendMessage(msg) {
        const timestampRow = Date.now();
        const referenceDb = database().ref(`${chat}` + '/Messages/' + this.chatId + "/" + timestampRow);
        const sendData = {
            text: msg,
            time: timestampRow,
            from: this.user.user_id,
        }
        return new Promise((resolve, reject) => {
            referenceDb.set(sendData)
                .then(async () => {
                    resolve();
                    this.updateHistory(msg);
                    // if(matches[this.sender.user_id]!==undefined)this.sendMsgNotification(matches[this.sender.user_id],msg);
                })
                .catch(e => reject(e))
        });
    }

    loadEarlier(cb) {
        this.loading = true;
        cb(true);
        // this.reference.endAt(this.firstKey===undefined?this.messages[this.messages.length-1]._id:this.firstKey).limitToLast(SIZE).once('value')
        this.reference.orderByChild('time').limitToLast(SIZE).endAt('1668778382413').once('value').then(async snapshot => {
            // alert('hi')
            console.log(snapshot.val(), 'snapshotmload earlier')
            this.firstKey = Object.keys(snapshot.val())[0]
            console.log(this.firstKey, ' this.firstKey')
            this.loading = false;
            const keys = (Object.keys(snapshot.val() || {}));
            if (snapshot.length < SIZE) this.endReached = true;
            // Object.values(snapshot.val()).map(async (childSnapshot,index)=>{
            //     // console.log(childSnapshot,'childSnapshot')
            //     // if(parseInt(keys[index])<parseInt(this.firstKey)){
            //         const { time, text, from } = childSnapshot;
            //         const createdAt = new Date(time)
            //         console.log(keys[index],'keys[index]')
            //         let messageItem = {
            //             _id: keys[index],
            //              text,
            //             createdAt: createdAt,
            //             from,
            //         };
            //         console.log(messageItem,'messageItem earlier')
            //         this.appendMessage(messageItem);
            //         // await this.readSingle(messageItem);
            //     // }
            // })
            // this.firstKey = this.messages[this.messages.length-1]._id
            cb(false);
        })
    }

    async readMessage(id, data) {
        const timestamp = (new Date()).toString();
        const ref = database().ref(`${chat}` + '/Messages/' + this.chatId + '/' + id);
        const snap = await ref.once('value');
        if (snap.val() !== null && data.user_id !== this.user.user_id) {
            ref.update({
                ...data,
                message: data.text,
                isRead: true,
                readAt: timestamp,
            })
        }
    }
    async readSingle(msg) {
        if (msg.sender_id === this.sender.user_id && !msg.isRead) {
            await this.readMessage(msg._id.split('-')[0], msg);
            await this.readAll()
        }
    }
    async readAll() {
        const referenceUser = database().ref(`/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`);
        const referenceSender = database().ref(`/${chat}/Users/${this.sender.user_id}/Friends/${this.user.user_id}`);
        try {
            await referenceUser.update({
                read: 1,
            });
            await referenceSender.update({
                message: 0,
            });
        } catch (e) {
            console.log(e,)
        }
    }
    async updateFeedback() {
        const referenceUser = database().ref(`/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`);
        const referenceSender = database().ref(`/${chat}/Users/${this.sender.user_id}/Friends/${this.user.user_id}`);
        try {
            await referenceUser.update({
                feedback_status: 1,
            });
        } catch (e) {
            console.log(e,)
        }
    }
    async updateHistory(lastMsg) {
        const referenceUser = database().ref(`/${chat}/Users/${this.user.user_id}/Friends/${this.sender.user_id}`);
        const referenceSender = database().ref(`/${chat}/Users/${this.sender.user_id}/Friends/${this.user.user_id}`);
        await referenceUser.update({
            message: lastMsg,
        });
        await referenceSender.update({
            message: lastMsg,
        });
    }
    async readAt(id, setLoading) {
        setLoading(true);
        const rowId = id.split('-')[0];
        const ref = database().ref(`${chat}` + '/Messages/' + this.chatId + '/' + rowId);
        try {
            const snap = await ref.once('value');
            const msgIndex = this.messages.findIndex((msg) => msg._id === id);
            const readMsg = this.parseMessages(snap);
            this.messages[msgIndex] = readMsg;
            setLoading(false);
        }
        catch (e) {
            setLoading(false);
        }
    }
}
