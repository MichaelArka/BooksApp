/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{

  'use strict';

  const select = {

    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    image: {
      bookImage: '.book-image'
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const render = function(){
    const thisBook = this;

    for(const books of dataSource.books){
      const generatedHTML = templates.bookTemplate(books);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(thisBook.element);
    }
  };
  render();

  const initActions = function(){
    const thisBook = this;

    const bookContainer = document.querySelector(select.containerOf.booksList);
    bookContainer.addEventListener('dblclick', function (event){
      event.preventDefault;
      const element = event.target.offsetParent;

      if (element.classList.contains(select.containerOf.booksList)){
        element.classList.toggle('favorite');

        const bookId = element.getAttribute('data-id');
        if (!thisBook.options.favoriteBooks.includes(bookId)){
          thisBook.options.favoriteBooks.push(bookId);
        } else {
          thisBook.options.favoriteBooks.splice(thisBook.options.favoriteBooks.indexOf(bookId), 1);
        }
      }
    });
  };
  initActions();
}
