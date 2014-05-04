var app = {};

app.fakeResponses = {
    "red": {
        "alt": "This is a red image",
        "description": "Red is a pretty cool color.",
        "name": "R3D",
        "url": "img/red.png"
    },
    
    "green": {
        "alt": "Greeeeeeeeen",
        "description": "Does this make me look jealous?",
        "name": "GrE3E3E3|\|",
        "url": "img/green.png"
    },
    
    "blue": {
        "alt": "Awwwww",
        "description": "No reason to be blue.. get it?",
        "name": "BLUE",
        "url": "img/blue.png"
    }
};

$(function() {
    app.Product = Backbone.Model.extend({
        "defaults": app.fakeResponses.red
    });
    
    app.productToDisplay = new app.Product();
    
    app.ProductHTML = Backbone.View.extend({
        "el": "#productDisplay",
        "model": app.productToDisplay,
        "template": _.template($("#colorDisplay").html()),
        
        "initialize": function() {
            _.bindAll(this, 'render');
            
            this.listenTo(app.productToDisplay, "change", this.render);
            this.render();
        },
        
        "render": function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
    app.colorDisplay = new app.ProductHTML();
    
    app.Variants = Backbone.View.extend({
        "el": "#variants",
        
        "events": {
            "click a": "variantSelected"
        },
        
        "variantSelected": function (event) {
            var colorSelected = $(event.target).data("color");
            
            var response = app.fakeResponses[colorSelected];
            
            app.productToDisplay.set(response);
        }
    });
    app.colorChoices = new app.Variants();
});