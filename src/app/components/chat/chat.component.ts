import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ApiAiClient } from "api-ai-javascript";
//import { client } from './../../dialog-flow-client/dialog-flow.client';
import { IMessage } from './../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  client = new ApiAiClient({accessToken: '95dc8bb0e8784a29ba589105c6516542'});
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  quickReplyArray: any = [];
  conversationArray: any = [];
  avatar: string = 'android';
  botName: string = 'Jeff';
  firstQuestion: string = 'Hi';

  //always scroll to the bottom of the chat window
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  //dialogflow api request
  dialogFlowAPIReq(input) {
    var req = this.client.textRequest(input);
    return req;
  }

  //welcome messages from dialogflow
  ngOnInit(): void {
    this.dialogFlowAPIReq(this.firstQuestion).then(result => {
      console.log(result);
      result.result.fulfillment['messages'].forEach(message => {
        var quickreply = 'no';
        var botSpeak = message.speech;
        if (botSpeak === 'Would you like to continue?') {
          this.quickReplyArray = [{
            '0': 'Yes',
            '1': 'No'
          }];
        }
        this.conversationArray.push({
          avatar: this.avatar,
          from: this.botName,
          content: botSpeak,
          quickreply: quickreply
        });
      });
    });
    this.scrollToBottom();
  }

  //scroll to view
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  //responses function
  addMessageFromUser(message) {
    this.conversationArray.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });
    this.dialogFlowAPIReq(message.value).then(result => {
      console.log(result);
      this.quickReplyArray = [];
      //quick replies
      if (result.result.fulfillment['data']) {
        result.result.fulfillment['data'].forEach(value => {
          console.log(value);
          this.quickReplyArray.push(value);
        });
      }
      //messages
      result.result.fulfillment['messages'].forEach(message => {
        var botSpeak = message.speech;
        this.conversationArray.push({
          avatar: this.avatar,
          from: this.botName,
          content: botSpeak
        });
      });
      message.value = '';
    });
  }

  //display a quick reply options
  quickReply(event: any, message) {
    event.preventDefault();
    this.quickReplyArray = [];
    this.dialogFlowAPIReq(message).then(result => {
      console.log(result);
      this.quickReplyArray = [];
      //quick replies
      if (result.result.fulfillment['data']) {
        result.result.fulfillment['data'].forEach(value => {
          console.log(value);
          this.quickReplyArray.push(value);
        });
      }
      //messages
      result.result.fulfillment['messages'].forEach(message => {
        var botSpeak = message.speech;
        this.conversationArray.push({
          avatar: this.avatar,
          from: this.botName,
          content: botSpeak
        });
      });
    });
  }

  //https://stackoverflow.com/questions/39059552/how-to-iterate-through-an-object-attributes-in-angular-2
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }
}
