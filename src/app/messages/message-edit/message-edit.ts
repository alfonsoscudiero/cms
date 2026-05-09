import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Alfonso Scudiero';

  onSendMessage() {

  const subject = this.subjectInput.nativeElement.value;
  const msgText = this.msgTextInput.nativeElement.value;

  const newMessage = new Message(
    '1',
    subject,
    msgText,
    this.currentSender
  );

  this.addMessageEvent.emit(newMessage);

  }

  onClear() {

  this.subjectInput.nativeElement.value = '';
  this.msgTextInput.nativeElement.value = '';

}
}
