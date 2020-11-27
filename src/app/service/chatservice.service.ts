import { Injectable } from '@angular/core';
// FIrebaseListObservable is ont included 
//in updated versions of angularfire2. 
//So instead of FirebaseListObservable we can use
// AngularListObservable
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from'rxjs';
import {AuthService} from '../service/auth.service'
import * as firebase from 'firebase/app';

import {ChatMessage} from '../models/chat-message.model'

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  user:any;
  // <ChatMessages[]> and <ChatMessages>
  // Difference is: former will create an array in a array
  // and latter will create a single array
  //For Exxample: former: arr=[[{name:"",id:"",rollno:""},{name:"",id:"",rollno:""}],[{name:"",id:"",rollno:""},{name:"",id:"",rollno:""}]]
  // Latter: arr[{name:"",id:"",rollno:""},{name:"",id:"",rollno:""}]
  chatMessages: AngularFireList<ChatMessage>;
  // retrivedMesssage:AngularFireList<ChatMessage[]>
  chatMessage:ChatMessage;
  userName:Observable<string>;

  constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(auth=>{
      if(auth!==undefined && auth!==null){
        this.user=auth
      }
    })
   }

  sendMessage(message:string){
    const timeStamp=this.getTimeStamp();
    // const email=this.user.email;
    const email="abc@gmail.com";
    this.chatMessages=this.getMessages();
    console.log(this.chatMessages);
    this.chatMessages.push(
        {

          email:email,
          userName:"ABC",
          timeSent:timeStamp as unknown as Date,
          // userName: this.username,
          message:message
        }
    )
  }

  getTimeStamp(){
    var now=new Date();
    var date=now.getUTCFullYear() + '/' + 
             (now.getUTCMonth() + 1) + '/' +
             now.getUTCDate();
    var time=now.getUTCHours() + ':' +
             now.getUTCMinutes() + ':' +
             now.getUTCSeconds();

    return (date + ' ' + time)
  }
  getMessage():AngularFireList<ChatMessage[]>{
    
    return this.db.list('/messages',ref=>{
      return ref.limitToLast(25).orderByKey();
    });
  }
  getMessages():AngularFireList<ChatMessage>{
    
    return this.db.list('/messages',ref=>{
      return ref.limitToLast(25).orderByKey();
    });
  }
}
