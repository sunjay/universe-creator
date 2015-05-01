(function() {
    var app = angular.module("universe-creator", ['ui.codemirror', 'story-preview']);

    app.directive("universeCreator", ["$http", function($http) {
        return {
            restrict: 'E',
            templateUrl: 'templates/universe-creator.html',
            controller: function() {
                this.story = "";
                this.storyEditorOptions = {
                    mode: 'markdown'
                };

                $http.get('stories/default.story').success(function(data) {
                        this.story = data;
                }.bind(this));
            },
            controllerAs: 'universe'
        };
    }]);
})();
