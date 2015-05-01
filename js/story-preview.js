(function() {
    var app = angular.module("story-preview", []);

    app.directive("storyPreview", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/story-preview.html',
            scope: {
                story: '='
            },
            controller: ["$scope", function($scope) {
                this.universe = Universe.fromText($scope.story);
                $scope.$watch('story', function(data) {
                    this.universe = Universe.fromText(data);
                });
            }]
        };
    });
})();
