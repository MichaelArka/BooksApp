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
      bookImage: '.book-image',
    },
    filters: '.filters',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class Books{
    constructor(){

      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData(){

      this.data = dataSource.books;
    }

    getElements(){

      this.options = {};
      this.options.favoriteBooks = [];
      this.DOM = {};
      this.DOM.bookContainer = document.querySelector(select.containerOf.booksList);
      this.options.filters = [];
      this.DOM.filtersForm = document.querySelector(select.filters);
    }

    render(){
      const thisBook = this;

      for(const books of dataSource.books){
        const generatedHTML = templates.bookTemplate(books);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        bookContainer.appendChild(thisBook.element);
      }
    }

    initActions(){
      const thisBook = this;

      this.DOM.bookContainer.addEventListener('dbclick', function(event){
        event.preventDefault;
        const element = event.target.offsetParent;

        if (element.classList.contains(select.image.bookImage)){
          element.classList.toggle('favorite');

          const bookId = element.getAttribute('data-id');
          if (!thisBook.options.favoriteBooks.includes(bookId)){
            thisBook.options.favoriteBooks.push(bookId);
          } else {
            thisBook.options.favoriteBooks.splice(thisBook.options.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });

      this.DOM.filtersForm.addEventListener('click', function(event){
        const element = event.target;

        if(element.tagName === 'INPUT' && element.name === 'filter' && element.type === 'checkbox'){

          if(element.checked){
            thisBook.options.filters.push(element.value);

          }else{

            thisBook.options.filters.splice(thisBook.options.filters.indexOf(element.value), 1);
          }
        }
      });
    }
  }
  new Books();
}
