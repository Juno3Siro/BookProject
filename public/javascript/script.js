$(document).ready(function () {
    $('#inputKeyword').change(function () {
        $.get('/api/books', {
            keyword: $('#inputKeyword').val()
        }).then(renderBooks)
    });

});

function renderBooks(books) {
    let template = $('#bookTemplate').html();
    let resultsHTML = books.map(function (book) {
        return template.replace(':bookName:', book.title)
            .replace(':id:', book.id)
    }).join('');
    $('#viewBooks').html(resultsHTML);
}

//
// var delay = function (milisec) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, milisec)
//     })
// };
//
// $(document).ready(function () {
//     var $spinner = $('#spinner');
//
//
// //     $('#inputKeyword').change(function () {
// //         var $this = $(this);
// //         $spinner.removeClass('hidden');
// //         $('#viewBooks').hide();
// //         return delay(1000)
// //             .then(function () {
// //                 return $.get('/api/books',{
// //                     keyword: $this.val(),
// //                 })
// //             })
// //             .then(renderBooks)
// //             .then(function () {
// //                 $spinner.addClass('hidden');
// //                 $('#viewBooks').show();
// //             })
// //             ;
// //     });
// // });
//
// function renderBooks(books) {
//     var template = $('#bookTemplate').html();
//     var resultsHTML = books.map(function (book) {
//         return template.replace(':bookName:', book.title).replace(':id:', book.id)
//     }).join('');
//     $('#viewBooks').html(resultsHTML);
// }