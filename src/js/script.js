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
                    console.log('test10')
                }
            }
        });
    }




    render();
    initActions();

}
