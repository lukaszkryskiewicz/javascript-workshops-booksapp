{
    const select = {
        templateOf: {
            bookList: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
        },
        all: {
            booksImages: '.book__image',
        }
    }

    const classNames = {
        books: {
            favorite: 'favorite',
        }
    }

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
    }
    const favoriteBooks = [];

    function render() {
        for (book of dataSource.books) {

            const generatedHTML = templates.booksList(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            const booksListContainer = document.querySelector(select.containerOf.booksList);
            booksListContainer.appendChild(element);
        }
    }

    function initActions() {
        const booksImagesDom = document.querySelectorAll(select.all.booksImages);
        for (const bookImage of booksImagesDom) {
            bookImage.addEventListener('dblclick', function (event) {
                event.preventDefault();
                const bookImageDataId = bookImage.getAttribute('data-id');
                if (favoriteBooks.indexOf(bookImageDataId) == -1) {
                    bookImage.classList.add(classNames.books.favorite);
                    favoriteBooks.push(bookImageDataId);
                } else {
                    bookImage.classList.remove(classNames.books.favorite);
                    const indexOfBookImage = favoriteBooks.indexOf(bookImageDataId);
                    favoriteBooks.splice(indexOfBookImage, 1);
                }
            });
        }
    }


    render();
    initActions();



}