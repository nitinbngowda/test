import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Books } from 'src/models/books';
import { BooksService } from '../services/books.service';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public books: Books;
  searchText = new Subject();

  constructor(private booksService: BooksService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBooks();
    this.getBooksBykey();
  }

  getBooks(searchKey?: string): void {
    this.booksService.getBooks(searchKey).subscribe((result: Books) => {
      if (result.totalItems > 0) {
        this.books = result;
      } else {
        this.showSnackBar('No Books Found');
      }
    }, err => {
      this.showSnackBar(err.error.error.message);
    });
  }

  searchBooks(key: string): void {
    key = key ? key : undefined;
    this.searchText.next(key);
  }

  getBooksBykey(): void {
    this.searchText.pipe(
      debounceTime(600)
    ).subscribe((key: string) => {
      this.getBooks(key);
    });
  }


  showSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 3000
    });
  }

}
