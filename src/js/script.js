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

            const generatedHTML = templates.booksList(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            booksListContainer.appendChild(element);
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




    render();
    initActions();

}
