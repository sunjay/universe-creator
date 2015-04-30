(function() {
    var app = angular.module("universe-creator", []);

    app.directive("universeCreator", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/universe-creator.html'
        };
    });
})();
