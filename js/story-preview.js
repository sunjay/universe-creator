(function() {
    var app = angular.module("story-preview", ["hc.marked"]);

    app.directive("storyPreview", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/story-preview.html',
            scope: {
                story: '='
            },
            controller: ["$scope", function($scope) {
                $scope.universe = Universe.fromText($scope.story);
                $scope.$watch('story', function(data) {
                    $scope.universe = Universe.fromText(data);
                });
            }]
        };
    });
})();
