import { Component, OnInit } from '@angular/core';
import {ChatserviceService} from '../service/chatservice.service'

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message:string;

  constructor(private chat:ChatserviceService) { }

  handleSubmit(value){
    if(value.keyCode===13){
      this.send()
    }
  }
  
  send(){
    this.chat.sendMessage(this.message)
    this.message=""
  }
  
  ngOnInit(): void {
  }

}
