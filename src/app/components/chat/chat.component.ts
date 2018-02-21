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

  //conversation: IMessage[] = [];
  conversation: any = [];
  avatar: string = 'android';
  botName: string = 'Jeff';

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

  ngOnInit(): void {
    //debug
    //console.log('start chat');
    //console.log(this.client);

    //welcome messages from dialogflow
    this.dialogFlowAPIReq('Hi').then(result => {
      console.log(result);
      result.result.fulfillment['messages'].forEach(message => {
        var botSpeak = message.speech;
        var quickReply;
        if (botSpeak == "Would you like to continue?") {
          quickReply = 'yes-no';
        }
        this.conversation.push({
          avatar: this.avatar,
          from: this.botName,
          content: botSpeak,
          quickReply: quickReply
        });
      });
    });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });
    this.dialogFlowAPIReq(message.value).then(result => {
      console.log(result);
      var action = result.result;
      //var messages = result.result.fulfillment['messages'] || 'I can\'t seem to figure that out!';
      result.result.fulfillment['messages'].forEach(message => {
        this.conversation.push({
          avatar: this.avatar,
          from: this.botName,
          content: message.speech
        });
      });
      message.value = '';
    });
  }

  //display a quick reply options
  quickReply(event: any, message) {
    event.preventDefault();
    console.log(message);
    this.dialogFlowAPIReq(message).then(result => {
      var action = result.result;
      this.conversation.push({
        avatar: this.avatar,
        from: this.botName,
        content: result.result.fulfillment['speech'] || 'I can\'t seem to figure that out!'
      });
    });
  }
}
