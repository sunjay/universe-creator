(function() {
    function Scanner() {
        this.text = "";
        this.pos = 0;
    }
    Scanner.EOF = '\0';

    Scanner.prototype.seek = function(pos) {
        this.pos = pos;
    };

    Scanner.prototype.clear = function() {
        this.text = "";
        this.pos = 0;
    };

    Scanner.prototype.loadText = function(text) {
        this.text += text;
    };

    Scanner.prototype.getChar = function() {
        if (this.pos >= this.text.length) {
            this.pos = this.text.length;
            return EOF;
        }
        return this.text[this.pos++];
    };

    Scanner.prototype.ungetChar = function() {
        if ((--this.pos) <= 0) {
            this.pos = 0;
        }
    }

    function UniverseScreen(title, text) {
        this.title = title;
        this.text = text;
        this.connections = [];
    }

    function Universe() {
        this.screens = {};
        this.current_screen = null;
    }
    window.Universe = Universe;

    Universe.navigateTo = function(screen_id) {
        
    };

    Universe.fromText = function(text) {
        var universe = new Universe();

        return universe;
    };
})();
