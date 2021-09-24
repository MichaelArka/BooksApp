/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{

  'use strict';

  const select = {

    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookContainer: '.books-list',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const render = function(){
    const thisBook = this;

    for(const books of dataSource.books){
      const generatedHTML = templates.bookTemplate(books);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.bookContainer);
      bookContainer.appendChild(thisBook.element);
    }
  };
  render();
}
