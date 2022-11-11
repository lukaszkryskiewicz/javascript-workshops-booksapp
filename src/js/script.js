{
    'use strict';

    const select = {
        templateOf: {
            bookList: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
            filters: '.filters',
        },
        all: {
            booksImages: '.book__image',
        }

    };

    const classNames = {
        books: {
            favorite: 'favorite',
        }
    };

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
    };

    class BooksList {
        constructor() {
            const thisBooksList = this;


            this.initData();
            this.getElements();
            this.render();
            this.initActions();
        }

        initData() {
            this.data = dataSource.books
        }

        getElements() {
            this.filters = [];
            this.booksListContainer = document.querySelector(select.containerOf.booksList);
            this.filtersContainer = document.querySelector(select.containerOf.filters);
            this.booksImages = document.querySelectorAll(select.all.booksImages);
        }



        render() {
            for (const book of this.data) {

                book.ratingBgc = this.determineRatingBgc(book.rating);
                book.ratingWidth = book.rating * 10;
                const generatedHTML = templates.booksList(book);
                this.element = utils.createDOMFromHTML(generatedHTML);
                this.booksListContainer.appendChild(this.element);

            }
        }

        initActions() {
            const thisBookLists = this
            const favoriteBooks = []

            this.booksListContainer.addEventListener('dblclick', function (event) {
                event.preventDefault();
                if (event.target.offsetParent.classList.contains('book__image')) {
                    const bookImageDataId = event.target.offsetParent.getAttribute('data-id');
                    if (favoriteBooks.indexOf(bookImageDataId) == -1) {
                        event.target.offsetParent.classList.add(classNames.books.favorite);
                        favoriteBooks.push(bookImageDataId);
                    } else {
                        event.target.offsetParent.classList.remove(classNames.books.favorite);
                        const indexOfBookImage = favoriteBooks.indexOf(bookImageDataId);
                        favoriteBooks.splice(indexOfBookImage, 1);
                    }
                }
            });

            this.filtersContainer.addEventListener('click', function (event) {
                const element = event.target;
                if (element.tagName == 'INPUT' && element.type == 'checkbox' && element.name == 'filter') {
                    if (element.checked) {
                        thisBookLists.filters.push(element.value);
                    } else {
                        thisBookLists.filters.splice(thisBookLists.filters.indexOf(element.value), 1);
                    }
                }
                thisBookLists.filterBooks();

            });


        }

        filterBooks() {
            for (const book of this.data) {
                let shouldBeHidden = false;

                for (const filter of this.filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }
                const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
                if (shouldBeHidden == true) {
                    bookImage.classList.add('hidden');
                } else {
                    bookImage.classList.remove('hidden');
                }
            }
        }

        determineRatingBgc(rating) {
            let style = '';
            if (rating < 6) {
                style = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
                style = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
                style = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else {
                style = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
            return style;
        }


    }

    const app = new BooksList();

}
