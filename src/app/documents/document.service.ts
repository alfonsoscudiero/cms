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

  private url = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  getDocuments(): Document[] {
    this.http.get<{ message: string; documents: Document[] }>(this.url).subscribe({
      next: (responseData) => {
        this.documents = responseData.documents || [];
        this.sortAndSend();
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find((document) => document.id === id) || null;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    document.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{ message: string; document: Document }>(this.url, document, {
        headers: headers,
      })
      .subscribe({
        next: (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(
      (document) => document.id === originalDocument.id
    );

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(this.url + '/' + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe({
        next: () => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    this.http.delete(this.url + '/' + document.id).subscribe({
      next: () => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private sortAndSend() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
    this.documentListChangedEvent.next(this.documents.slice());
  }
}