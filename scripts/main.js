/*
 * @param {string} title 
 * @param {string} author 
 * @param {number} pagesNum 
 * @param {bool}(Optional) isRead 
 */
function Book(title, author, pagesNum, description, isRead = false) {
    this.title = title,
        this.author = author,
        this.pagesNum = pagesNum,
        this.isRead = isRead;
        this.description = description;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pagesNum} pages, ${this.isRead ? "readed" : "not read yet"}`;
}

function addBookToLibrary(e) {
    e.preventDefault();
    const title = this.querySelector('#title').value;
    const author = this.querySelector('#author').value;
    const pagesNum = this.querySelector('#pages').value;
    const description = this.querySelector('#description').value;
    const isRead = this.querySelector('#readed').checked;
    

    const newBook = new Book(title, author, pagesNum, description, isRead);
    myLibrary.push(newBook);
    populateBooks(myLibrary, bookList);
    removeForm();
    localStorage.setItem('Books', JSON.stringify(myLibrary));
    this.reset();
}

function populateBooks(library = [], bookList) {
    bookList.innerHTML = library.map((book, index) => {
        return (
            `
    <div class="c-list-${index} c-item l-flexCenterCol l-gap" data-index="${index}">
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
            <span class="c-list__title">Description</span>
            <p class="c-list__result c-list__desc">${book.description}</p>
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
    if (e.key === "Escape") {
        removeForm();
    }
}

function removeFormClick(e) {
    if (!e.target.matches('section')) return;
    removeForm();
}

function handleBtns(e) {
    const grandParent = e.target.offsetParent;
    const index = grandParent.dataset.index;
    if (e.target.matches('.js-btn--remove')) {
        myLibrary.splice(index, 1);
        populateBooks(myLibrary, bookList);
        localStorage.setItem('Books', JSON.stringify(myLibrary));
    }
    if (e.target.matches(`.js-btn--check`)) {
        myLibrary[index].isRead = !myLibrary[index].isRead;
        e.target.classList.toggle('c-list__btn--checked');
        e.target.classList.toggle('c-list__btn--unchecked');
        localStorage.setItem('Books', JSON.stringify(myLibrary));
    }
}

const myLibrary = JSON.parse(localStorage.getItem('Books')) || [];
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