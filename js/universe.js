(function() {
    if (!String.prototype.trimLeft) {
        String.prototype.trimLeft = function() {
           return this.replace(/^\s+/,""); 
        };
    }

    var WHITESPACE = /^\s$/;
    var NOT_WHITESPACE = /^\S$/;
    var EOL = /^\n$/;
    var COMMENT_BEGIN = /^#$/;
    var SCREEN_ID_BEGIN = /^\$$/;
    var SCREEN_ID_END = /^:$/;

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

    Scanner.prototype.atEOF = function() {
        return this.pos >= this.text.length;
    };

    Scanner.prototype.getChar = function() {
        if (this.atEOF()) {
            this.pos = this.text.length;
            return Scanner.EOF;
        }
        return this.text[this.pos++];
    };

    Scanner.prototype.ungetChar = function() {
        if ((--this.pos) <= 0) {
            this.pos = 0;
        }
    };

    Scanner.prototype.readUntilMatch = function(regex) {
        var readData = "";
        var char;
        while (!regex.test(char = this.getChar()) && char !== Scanner.EOF) {
            readData += char;
        }
        return readData;
    };

    Scanner.prototype.ignoreWhitespace = function() {
        var whitespace = this.readUntilMatch(NOT_WHITESPACE);
        this.ungetChar();
        return whitespace;
    };

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
        var scanner = new Scanner();
        scanner.loadText(text);

        scanner.ignoreWhitespace();
        
        var screen = null;
        var char, screen_id, screen_title, screen_text;
        while (true) {
            if (scanner.atEOF()) {
                break;
            }
            var trimmedLine = line.trimLeft();
            if (COMMENT_BEGIN.test(line[0])) {
                continue;
            }

            scanner.ignoreWhitespace();
            char = scanner.getChar();
            if (SCREEN_ID_BEGIN.test(char)) {
                screen_id = scanner.readUntilMatch(SCREEN_ID_END);
                screen_title = scanner.readUntilMatch(EOL);
            }
        }

        return universe;
    };
})();
