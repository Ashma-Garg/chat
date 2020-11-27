import { Component, OnInit } from '@angular/core';
import {ChatserviceService} from '../service/chatservice.service'
// import {Observable} from 'rxjs/Observable'
import {ChatMessage} from '../models/chat-message.model'
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed:Observable<ChatMessage[][]>;
  // feed:any[][];
  constructor(private chat:ChatserviceService) { }

  ngOnInit(): void {
    // this.feed=this.chat.getMessage();
    this.feed=this.chat.getMessage()
    .valueChanges();
  }
  // ngOnChanges(){
  //   this.feed=this.chat.getMessage();
  // }

}
