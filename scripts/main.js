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
    <div class="c-list-${index} c-item" data-index="${index}">
        <div class="c-list__item">
            <span class="c-list__title">Title</span>
            <p class="c-list__result">${book.title}</p>
        </div>

        <div class="c-list__item">
            <span class="c-list__title">Author</span>
            <p class="c-list__result">${book.author}</p>
        </div>

        <div class="c-list__item">
            <span class="c-list__title">Pages Number</span>
            <p class="c-list__result">${book.pagesNum}</p>
        </div>

        <div class="c-list__item">
            <span class="c-list__oper">Operations</span>
            <div class="c-list__wrapper">
                <button class="c-list__btn btn c-list__btn--${book.isRead ? "checked" : 'unchecked'} js-btn--check">Read</button>
                <button class="c-list__btn btn js-btn--remove">Remove</button>
            </div>
        </div>

    </div>
    `);
    }).join('');
}

function showForm() {
    popup.classList.add('c-form--active');
    overlay.classList.add('l-overlay--active');
}

function removeForm() {
    popup.classList.remove('c-form--active');
    overlay.classList.remove('l-overlay--active');
}

function removeFormKey(e) {
    if(e.key === "Escape") {
        removeForm();
    }
}

function removeFormClick(e) {
    if (!e.target.matches('section')) return;
    removeForm();
}

function handleBtns(e) {
    console.log(e.target);
    const grandParent = e.target.offsetParent;
    const index = grandParent.dataset.index;
    if (e.target.matches('.js-btn--remove')) {
        console.log(index);
        myLibrary.splice(index, 1);
        populateBooks(myLibrary, bookList);
    }
    if (e.target.matches(`.js-btn--check`)) {
        console.log(index);
        myLibrary[index].isRead = !myLibrary[index].isRead;
        e.target.classList.toggle('c-list__btn--checked');
        e.target.classList.toggle('c-list__btn--unchecked');
    }
}

const myLibrary = [{ title: "An", author: "dud", pagesNum: "23", isRead: false }, { title: "Annn", author: "daaud", pagesNum: "232", isRead: true }];
const bookList = document.querySelector('.c-list__container');

const bookFrom = document.querySelector('.c-form__books');
bookFrom.addEventListener('submit', addBookToLibrary);

const btnAddBook = document.querySelector('.c-addBook');
btnAddBook.addEventListener('click', showForm);

const popup = document.querySelector('.c-form');
const overlay = document.querySelector('.l-overlay');
popup.addEventListener('click', removeFormClick);
populateBooks(myLibrary, bookList);

bookList.addEventListener('click', handleBtns);

document.addEventListener('keydown', removeFormKey);