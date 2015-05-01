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
                $scope.$watch('story', function(data) {
                    console.log(data);
                });
            }]
        };
    });
})();
