/*
 * @param {string} title 
 * @param {string} author 
 * @param {number} pagesNum 
 * @param {bool}(Optional) isRead 
 */
function Book(title, author, pagesNum, isRead = false) {
    this.title = title,
    this.author = author,
    this.pagesNum = pagesNum,
    this.isRead = isRead;
}
    Book.prototype.info = function() {
        return `${this.title} by ${this.author}, ${this.pagesNum} pages, ${this.isRead ? "readed" : "not read yet"}`;
    }

function addBookToLibrary(e) {
    e.preventDefault();
    const title = this.querySelector('#title').value;
    const author = this.querySelector('#author').value;
    const pagesNum = this.querySelector('#pages').value;
    const isRead = this.querySelector('#readed').checked;
    
    const newBook = new Book(title, author, pagesNum, isRead);
    myLibrary.push(newBook);
    populateBooks(myLibrary, bookList);
    this.reset();
}

function populateBooks(library = [], bookList) {
    bookList.innerHTML = library.map((book, index) => {
    return(
    `
    <div class="list__item-${index}" data-index="${index}">
        <span>${book.title}</span>
        <span>${book.author}</span>
        <span>${book.pagesNum}</span>
        <label for="item-${index}">Readed?</label>
        <input type="checkbox" id="item-${index}" ${book.isRead ? "checked" : ''}>
    </div>
    `);
    }).join('');
}

function showForm() {
    const popup = document.querySelector('.form');
    popup.style.visibility = 'visible';
    popup.querySelector('.form__wrapper').classList.add('show');
}

const myLibrary = [{ title: "Andrzje", author: "Doda", pagesNum: "256", isRead: false }, { title: "Andrzje", author: "Doda", pagesNum: "256", isRead: true }, { title: "Andrzje", author: "Doda", pagesNum: "256", isRead: false }];
const bookList = document.querySelector('.list__container');

const bookFrom = document.querySelector('.books');
bookFrom.addEventListener('submit', addBookToLibrary);

const btnAddBook = document.querySelector('.addBook');
btnAddBook.addEventListener('click', showForm);

populateBooks(myLibrary, bookList);