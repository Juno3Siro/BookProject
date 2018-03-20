class BookController {

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    bookFromCreate(request, response, next) {
        request.app.get('publishers.provider').ProviderAll()
            .then(publisher => response.render('createbook.njk', {publishers:publisher}))
            .catch(next)
    }

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    createBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.add(request.book).then(function () {
            response.render('create-book.njk')
        }).catch(function (err) {
            next(err);
        });
    }
    /**
     *
     * @param request
     * @param response
     */
    deleteBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then(function () {
            response.status(200).json({message:'Success'});
        });
    }

    /**
     *
     * @param request
     * @param response
     */
    bookFromEdit(request, response, next) {
        let publisher = request.app.get('publishers.provider').ProviderAll();
        let Book      = request.app.get('book.searcher').search(request.condition);
        Promise.all([Book, publisher])
            .then(result => response.render('edit-book.njk', {books:result[0], publishers:result[1]}))
            .catch(next)

    }
    editBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then(function () {
            response.redirect('/')

        }).catch(next)
    }

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    getAll(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then(books => response.render('list-book.njk',{books:books}))
            .catch(next)
    }

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    detail(request, response, next) {
        request.app.get('book.searcher')
            .search(request.condition)
            .then(books => {
                if (!books.length) {
                    throw new Error('no book');
                }
                response.render('detail.njk', {book: books[0]})
            })
            .catch(next)
    }

}

module.exports = BookController;
