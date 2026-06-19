import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})

export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId!: number;

  constructor(private http: HttpClient) {}

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(
        'https://byui-wdd430-cms-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe({
        next: (documents: Document[]) => {
          console.log('Firebase array:',documents);
          this.documents = documents || [];
          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });

    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  
  storeDocuments() {
    const documentsJson = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(
        'https://byui-wdd430-cms-default-rtdb.firebaseio.com/documents.json',
        documentsJson,
        { headers: headers }
      )
      .subscribe({
        next: () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log('Error saving documents:', error);
        },
      });
  }

    addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);

    this.storeDocuments();
  }
}
