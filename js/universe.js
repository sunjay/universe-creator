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
    var SCREEN_ID_END = /^[:\n]$/;
    var VALID_SCREEN_ID = /^[a-z0-9_\-]+$/i;
    var SCREEN_CONNECTION = /^->([\$ a-z0-9_\/]+)$/i;
    var CONNECTION_ALIAS_SEPARATOR = '/';

    var START_SCREEN_IDS = ['start', '1'];

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

    function UniverseScreen(screen_id, title) {
        this.screen_id = screen_id;
        this.title = title;
        this.text = "";
        this.connections = {};
    }

    UniverseScreen.prototype.has_connections = function() {
        return !!Object.keys(this.connections).length;
    }

    function Universe() {
        this.screens = {};
        this.current_screen = null;
    }
    window.Universe = Universe;

    Universe.prototype.navigateTo = function(navigationCommand) {
        if (!this.current_screen) {
            throw new Error("No screen to navigate from");
        }
        if (!this.current_screen.connections.hasOwnProperty(navigationCommand)) {
            throw new Error("Invalid Option: " + navigationCommand);
        }

        var screen_id = this.current_screen.connections[navigationCommand];

        this.current_screen = this.screens[screen_id];
    };

    Universe.prototype.navigateToStart = function() {
        START_SCREEN_IDS.forEach(function(start_screen_id) {
            if (this.screens.hasOwnProperty(start_screen_id)) {
                this.current_screen = this.screens[start_screen_id];
            }
        }.bind(this));
    };

    Universe.fromText = function(text) {
        var universe = new Universe();
        var scanner = new Scanner();
        scanner.loadText(text);
        
        var screen = null;
        var char, screen_id, screen_title, screen_text;
        while (true) {
            if (scanner.atEOF()) {
                break;
            }

            scanner.ignoreWhitespace();

            char = scanner.getChar();
            if (COMMENT_BEGIN.test(char)) {
                scanner.readUntilMatch(EOL);
                continue;
            }

            if (SCREEN_ID_BEGIN.test(char)) {
                screen_id = scanner.readUntilMatch(SCREEN_ID_END).trim().toLowerCase();
                if (!screen_id || !VALID_SCREEN_ID.test(screen_id)) {
                    throw new Error("Invalid screen id: '" + screen_id + "'");
                }

                screen_title = scanner.readUntilMatch(EOL).trimLeft();
            }
            else {
                throw new Error("Text cannot appear defined before a screen");
            }

            screen = new UniverseScreen(screen_id, screen_title);

            var line, trimmedLine, firstChar;
            var connections = {};
            while (!scanner.atEOF()) {
                var nextChar = scanner.getChar();
                scanner.ungetChar();
                if (SCREEN_ID_BEGIN.test(nextChar)) {
                    break;
                }

                line = scanner.readUntilMatch(EOL);
                trimmedLine = line.trimLeft();
                if (COMMENT_BEGIN.test(trimmedLine[0])) {
                    continue;
                }

                var connection_match = trimmedLine.match(SCREEN_CONNECTION);
                if (connection_match) {
                    var connection_aliases = connection_match[1].split(CONNECTION_ALIAS_SEPARATOR);
                    var connected_to = connection_aliases[0].toLowerCase();
                    connections[connected_to] = connected_to;
                    connection_aliases.slice(1).forEach(function(alias) {
                        connections[alias.toLowerCase()] = connected_to;
                    });
                    continue;
                }
                
                if (!trimmedLine.length) {
                    screen.text += "\n\n"
                }
                else {
                    screen.text += line + " ";
                }
            }
            screen.text = screen.text.trim();
            screen.connections = connections;

            universe.screens[screen_id] = screen;
        }
        
        universe.navigateToStart();

        return universe;
    };
})();
