{
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
    const favoriteBooks = [];
    const booksListContainer = document.querySelector(select.containerOf.booksList);
    const filters = [];
    const filtersContainer = document.querySelector(select.containerOf.filters);
    const booksImages = document.querySelectorAll(select.all.booksImages);

    function render() {
        for (const book of dataSource.books) {

            book.ratingBgc = determineRatingBgc(book.rating);
            book.ratingWidth = book.rating * 10;
            console.log(book)
            const generatedHTML = templates.booksList(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            booksListContainer.appendChild(element);
            console.log(book.ratingBgc)

        }
    }

    function initActions() {
        booksListContainer.addEventListener('dblclick', function (event) {
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
                    console.log('test10');
                }
            }
        });

        filtersContainer.addEventListener('click', function (event) {
            const element = event.target;
            if (element.tagName == 'INPUT' && element.type == 'checkbox' && element.name == 'filter') {
                if (element.checked) {
                    filters.push(element.value);
                } else {
                    filters.splice(filters.indexOf(element.value), 1);
                }
                console.log(filters);
            }
            filterBooks();

        });


    }

    function filterBooks() {
        for (const book of dataSource.books) {
            let shouldBeHidden = false;

            for (const filter of filters) {
                if (!book.details[filter]) {
                    shouldBeHidden = true;
                    break;
                }
            }
            console.log(shouldBeHidden);
            console.log(book.id)
            const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
            if (shouldBeHidden == true) {
                bookImage.classList.add('hidden');
            } else {
                bookImage.classList.remove('hidden');
            }
        }
    }

    function determineRatingBgc(rating) {
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




    render();
    initActions();

}
