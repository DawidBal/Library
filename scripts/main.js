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
    <li class="list__item-${index}" data-index="${index}">
        <p>${book.title}</p>
    </li>
    `);
    }).join('');
}

function showForm() {
    const popup = document.querySelector('.popupForm');
    popup.style.visibility = 'visible';
}

const myLibrary = [];
const bookList = document.querySelector('.list__container');

const bookFrom = document.querySelector('.books');
bookFrom.addEventListener('submit', addBookToLibrary);

const btnAddBook = document.querySelector('.addBook');
btnAddBook.addEventListener('click', showForm);

