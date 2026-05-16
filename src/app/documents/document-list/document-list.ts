import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentList {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [

    new Document(
      '1',
      'WDD130 - Web Fundamentals',
      'Introduction to HTML and CSS web development.',
      'https://www.byui.edu/',
      []
    ),

    new Document(
      '2',
      'WDD230 - Web Frontend Development I',
      'Learn responsive frontend web development.',
      'https://www.byui.edu/',
      []
    ),

    new Document(
      '3',
      'WDD330 - Web Frontend Development II',
      'Advanced JavaScript and frontend application development.',
      'https://www.byui.edu/',
      []
    ),

    new Document(
      '4',
      'WDD430 - Web Full-Stack Development',
      'Learn full-stack web application development with Angular.',
      'https://www.byui.edu/',
      []
    )

  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
