(function() {
    var app = angular.module("story-preview", []);

    app.directive("storyPreview", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/story-preview.html'
        };
    });
})();
