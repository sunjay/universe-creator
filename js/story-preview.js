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
                $scope.navigationCommand = "";
                $scope.universe = Universe.fromText($scope.story);
                $scope.universeError = "";
                $scope.navigationError = "";

                $scope.$watch('story', function(data) {
                    $scope.universeError = "";
                    try {
                        $scope.universe = Universe.fromText(data);
                    }
                    catch (error) {
                        $scope.universeError = error.message;
                    }
                });

                $scope.processCommand = function() {
                    $scope.navigationError = "";
                    try {
                        $scope.universe.navigateTo(this.navigationCommand);
                        this.navigationCommand = "";
                    }
                    catch (error) {
                        $scope.navigationError = error.message;
                    }
                };
            }]
        };
    });
})();
