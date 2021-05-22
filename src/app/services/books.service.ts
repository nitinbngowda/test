import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Books } from 'src/app/models/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksUrl = environment.booksUrl;
  constructor(private http: HttpClient) { }

  getBooks(books = 'kaplan test prep'): Observable<Books> {
    let params = new HttpParams();
    params = params.append('q', books);
    return this.http.get<Books>(this.booksUrl, { params });
  }
}
