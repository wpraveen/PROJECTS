let books = [
    {
        "id": "1",
        "title": "Philosopher's Stone"
    }, {
        "id": "2",
        "title": "Chamber of Secrets"
    }, {
        "id": "3",
        "title": "Prisoner of Azkaban"
    }
];

let idCounter = 100;
export function addBook(title) {
    idCounter++;
    const book = {
        "id": "" + idCounter,
        "title": title
    };

    books.push(book);
    return book;
}

export function deleteBook(id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books.splice(i, 1);
        }
    }
}

export function updateBook({id, title}) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i].title = title;
            return;
        }
    }
}


export function getBook(id){
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books[i];
        }
    }

    return null;
}

export function getBooks(args) {

    if (args && args.query) {
        return books.filter((book) => {
            if (book.title.search(new RegExp(args.query, "i")) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    } else {
        return books;
    }
}
