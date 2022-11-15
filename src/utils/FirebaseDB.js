
import database from '@react-native-firebase/database';
import moment from 'moment';
// import sendNotification from './sendNotification';
// import { environment } from '../redux/Constants';

const SIZE = 10;
const createChatId = (id1,id2)=>{
    if(parseInt(id1)>parseInt(id2)){
        return `${id1}-${id2}`;
    }
    return `${id2}-${id1}`;
}
export default class FirebaseDB {
    reference;
    chatId = '';
    totalSize = 0;
    messages = [];
    lastIdInSnapshot='0';
    firstKey;
    lastKey;
    loading = false;
    endReached = false;
    onChildAdd;
    user = {};
    sender = {};

    constructor(user,sender){
        this.chatId = createChatId(user.user_id,sender.user_id);
        this.user = user;
        this.sender = sender;
        const now = Date.now();
        this.lastIdInSnapshot = now.toString();
        this.firstKey = now.toString();
        this.lastKey = now.toString();
        this.endReached = false;
        this.messages = [];
        this.onChildAdd = null;
        const ref = database().ref('local'+'/Messages/'+this.chatId);
        this.reference = ref;
    }

    prependMessage(msg){
        const index = this.messages.findIndex(m=>m._id===msg._id);
        if(index===-1)this.messages = [ msg, ...this.messages ];
    }

    appendMessage(msg){
        const index = this.messages.findIndex(m=>m._id===msg._id);
        if(index===-1)this.messages = [ ...this.messages, msg ];
    }

    parseMessages(snapshot){
        const { time, text, from} = snapshot.val();
        const createdAt = new Date(time)
        return {
            _id: snapshot.key+'-'+1,

            text,
           createdAt: createdAt,
           from,
        };
    }

    setTotalSize(){
        return new Promise((resolve,reject)=>{
            this.reference.orderByKey()
            .once('value')
            .then((snapshot)=>{
                this.totalSize = snapshot.numChildren();
                resolve();
            })
            .catch(e=>{
                reject(e);
            })
        })
    }

    async initMessages(){
        this.loading = true;
        const snapshot = await this.reference.orderByKey().limitToLast(SIZE).once('value');
        var keys = Object.keys(snapshot.val()||{});
        this.firstKey = keys[0];
        this.loading = false;
        if(keys.length<SIZE)this.endReached = true;
        snapshot.forEach(async (childSnapshot,index)=>{
            const messageItem = this.parseMessages(childSnapshot);
            if((this.messages.length===0 && this.firstKey==="")||index===0)this.firstKey = childSnapshot.key;
            else if(this.messages.length===SIZE){
                this.lastKey = childSnapshot.key;
            }
            this.prependMessage(messageItem);
            // await this.readSingle(messageItem);
        });
        // await this.readAll();
    }

    async sendMessage(msg){
        const timestampRow = Date.now();
        const referenceDb = database().ref('local'+'/Messages/'+this.chatId+"/"+timestampRow);
    
        const sendData = {
            text: msg,
            time: timestampRow,
            from: this.user.user_id,
        }
        return new Promise((resolve,reject)=>{
            referenceDb.set(sendData)
            .then(async() => {
                resolve();
                this.updateHistory(msg);
                // if(matches[this.sender.user_id]!==undefined)this.sendMsgNotification(matches[this.sender.user_id],msg);
            })
            .catch(e=>reject(e))
        });
    }

    loadEarlier(cb){
        if(this.endReached || this.loading)return;
        this.loading = true;
        cb(true);
        this.reference.orderByKey().endAt(this.firstKey===undefined?Date.now().toString():this.firstKey).limitToLast(SIZE).once('value')
        .then(async snapshot=>{
            this.loading = false;
            const ordered = Object.keys(snapshot.val()).sort((a,b)=>b-a).reduce(
                (obj, key) => {
                    obj[key] = snapshot.val()[key];
                    return obj;
                },
                {}
            );
            const keys = (Object.keys(ordered||{}));
            const snapValues = (Object.values(ordered||{}));
            if(snapValues.length<SIZE)this.endReached = true;
            snapValues.map(async (childSnapshot,index)=>{
                if(parseInt(keys[index])<parseInt(this.firstKey)){
                    const { time, text, from } = childSnapshot;
                    const createdAt = moment.unix(time, "YYYYMMDD").fromNow();
                    let messageItem = {
                        _id: keys[index],
                         text,
                        createdAt: createdAt,
                        from,
                    };
                    this.appendMessage(messageItem);
                    // await this.readSingle(messageItem);
                }
            })
            cb(false);
            this.firstKey = keys[keys.length-1];
        })
    }

    async readMessage(id,data){
        const timestamp = (new Date()).toString();
        const ref = database().ref('local'+'/Messages/'+this.chatId+'/'+id);
        const snap = await ref.once('value');
        if(snap.val()!==null && data.user_id!==this.user.user_id){
            ref.update({
                ...data,
                message: data.text,
                isRead: true,
                readAt: timestamp,
            })
        }
    }
    async readSingle(msg){
        if(msg.sender_id===this.sender.user_id && !msg.isRead){
            await this.readMessage(msg._id.split('-')[0],msg);
            // await this.readAll()
        }
    }
    // async readAll(){
    //     const referenceUser = database().ref(`${environment}/history/${this.user.user_id}/${this.sender.user_id}`);
    //     const snap = await referenceUser.once('value');
    //     if(snap.val()!==null){
    //         await referenceUser.update({
    //             ...snap.val(),
    //             unread: 0,
    //         });
    //     }
    // }

    async updateHistory(lastMsg){
        const referenceUser = database().ref(`/local/Users/${this.user.user_id}/Friends/${this.sender.user_id}`);
        const referenceSender = database().ref(`/local/Users/${this.sender.user_id}/Friends/${this.user.user_id}`);
        const timestamp = (new Date()).toString();
        const userItem = {
          message:lastMsg,
        }
        const senderItem = {
            message:lastMsg,
        }
     
            await referenceUser.update({
                message:lastMsg,
            });
            await referenceSender.update({
                message:lastMsg,
            });
     
    }

    // sendMsgNotification(tokens,msg){
    //     tokens.fcm_tokens.forEach(async token=>{
    //         await sendNotification(this.user.name,msg,token,{user_id: this.user.user_id,name: this.user.name,image: {uri:this.user.image}, path: 'msg'});
    //     })
    // }

    async readAt(id,setLoading){
        setLoading(true);
        const rowId = id.split('-')[0];
        const ref = database().ref('local'+'/Messages/'+this.chatId+'/'+rowId);
        try{
            const snap = await ref.once('value');
            const msgIndex = this.messages.findIndex((msg)=>msg._id===id);
            const readMsg = this.parseMessages(snap);
            this.messages[msgIndex] = readMsg;
            setLoading(false);
        }
        catch(e){
            setLoading(false);
        }
    }
}
