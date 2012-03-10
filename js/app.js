/**
 * Created by JetBrains WebStorm.
 * User: bjorn
 * Date: 3/4/12
 * Time: 10:59 PM
 */

(function ($) {
    var books = [{title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"},
        {title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript Programming"},
        {title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala Programming"},
        {title:"American Psyco", author:"John Doe", releaseDate:"2012", keywords:"Novel Slasher"},
        {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"}];

    var Book = Backbone.Model.extend({
        defaults:{
            coverImage:"img/placeholder.png"/*,
             title:"Some title",
             author:"John Doe",
             releaseDate:"2012",
             keywords:"JavaScript Programming"*/
        }
    });

    var Library = Backbone.Collection.extend({
        model:Book
    });

    var BookView = Backbone.View.extend({
        tagName:"div",
        className:"bookContainer",
        template:$("#bookTemplate").html(),

        render:function () {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html

            this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            return this;
        }
    });

    var LibraryView = Backbone.View.extend({
        el:$("#books"),

        initialize:function(){
            this.collection = new Library(books);
            this.render();
        },

        render: function(){
            var that = this;
            _.each(this.collection.models, function(item){
                that.renderBook(item);
            });
        },

        renderBook:function(item){
            var bookView = new BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        }
    });

    var libraryView = new LibraryView();

    /*
    var book = new Book({
        title:"Some title",
        author:"John Doe",
        releaseDate:"2012",
        keywords:"JavaScript Programming"
    });

    bookView = new BookView({
        model: book
    });

    $("#books").html(bookView.render().el);
    */
})(jQuery);