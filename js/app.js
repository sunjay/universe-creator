(function() {
    var app = angular.module("universe-creator", []);

    app.directive("universeCreator", ["$http", function($http) {
        return {
            restrict: 'E',
            templateUrl: 'templates/universe-creator.html',
            controller: function() {
                this.story = "";

                $http.get('stories/default.story').success(function(data) {
                        this.story = data;
                }.bind(this));
            },
            controllerAs: 'universe'
        };
    }]);
})();
