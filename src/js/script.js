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
      bookImage: 'book__image',
    },
    filters: '.filters',
    rating: '__rating'
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class Books{
    constructor(){

      this.initData();
      this.getElements();
      this.render(this.data);
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
      this.DOM.booksImage = document.querySelector(select.image.bookImage);
    }

    render(){
      const thisBook = this;

      for(const book of dataSource.books){
        book.ratingBgc = thisBook.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate(book);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        bookContainer.appendChild(thisBook.element);
      }
    }

    initActions(){
      const thisBook = this;

      this.DOM.bookContainer.addEventListener('dblclick', function(event){
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
          } else {
            thisBook.options.filters.splice(thisBook.options.filters.indexOf(element.value), 1);
          }

          thisBook.filterBooks();
        }
      });
    }

    filterBooks(){
      const thisBook = this;
      const booksList = document.querySelector(select.containerOf.booksList);

      for(const book of this.data){
        let shouldBeHidden = false;
        for(const filter of thisBook.options.filters){
          if(!book.details[filter] === false){
            shouldBeHidden = true;
            break;
          }
        }
        const booksImage = booksList.querySelector('.book__image[data-id="' + book.id + '"]');
        if(shouldBeHidden === true){
          booksImage.classList.add('hidden');
        }
        if(shouldBeHidden === false){
          booksImage.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      let ratingBackground = document.querySelector(select.rating);

      if(rating < 6){
        ratingBackground = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        ratingBackground = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9){
        ratingBackground = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9){
        ratingBackground = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingBackground;
    }
  }
  new Books();
}
