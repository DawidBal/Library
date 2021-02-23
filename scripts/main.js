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
Book.prototype.info = function () {
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
    removeForm();
    this.reset();
}

function populateBooks(library = [], bookList) {
    bookList.innerHTML = library.map((book, index) => {
        return (
            `
    <div class="list__item--${index} item" data-index="${index}">
        <div class="list__item--title list__item">
            <span class="item__title">Title</span>
            <p>${book.title}</p>
        </div>

        <div class="list__item--author list__item">
            <span class="item__author">Author</span>
            <p>${book.author}</p>
        </div>

        <div class="list__item--pages list__item">
            <span class="item__pages">Pages Number</span>
            <p>${book.pagesNum}</p>
        </div>

        <div class="list__item--oper list__item">
            <span class="item__oper">Operations</span>
            <div class="list__item__oper__wrapper">
                <button class="btn btn--${book.isRead ? "checked" : 'unchecked'}">Read</button>
                <button class="item__btn--remove btn">Remove</button>
            </div>
        </div>

    </div>
    `);
    }).join('');
}

function showForm() {
    popup.style.visibility = 'visible';
    popup.querySelector('.form__wrapper').classList.add('form--active');
}

function removeForm(e) {
    if (!e.target.matches('section')) return;
    popup.querySelector('.form__wrapper').classList.remove('form--active');
    popup.style.visibility = 'hidden';
}

function handleBtns(e) {
    const grandParent = e.target.parentNode.parentNode;
    const index = grandParent.dataset.index;
    if (e.target.matches('.item__btn--remove')) {
        myLibrary.splice(index, 1);
        populateBooks(myLibrary, bookList);
    }

    if (e.target.matches(`#item--${index}`)) {
        myLibrary[index].isRead = !myLibrary[index].isRead;
    }
}

const myLibrary = [{ title: "Andrzje", author: "Doda", pagesNum: "256", isRead: false }, { title: "Andrzje", author: "Doda", pagesNum: "256", isRead: true }, { title: "Andrzje", author: "Doda", pagesNum: "256", isRead: false }];
const bookList = document.querySelector('.list__container');

const bookFrom = document.querySelector('.form__books');
bookFrom.addEventListener('submit', addBookToLibrary);

const btnAddBook = document.querySelector('.addBook');
btnAddBook.addEventListener('click', showForm);

const popup = document.querySelector('.form');
const overlay = document.querySelector('.overlay');
popup.addEventListener('click', removeFormClick);
populateBooks(myLibrary, bookList);

bookList.addEventListener('click', handleBtns);

document.addEventListener('keydown', removeFormKey);