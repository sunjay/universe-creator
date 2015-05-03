(function() {
    var app = angular.module("universe-creator", ['ui.codemirror', 'story-preview', 'ngStorage']);

    app.directive("universeCreator", ["$http", function($http) {
        return {
            restrict: 'E',
            templateUrl: 'templates/universe-creator.html',
            controller: ["$scope", "$localStorage", function($scope, $localStorage) {
                $scope.$storage = $localStorage;
                $scope.storyEditorOptions = {
                    mode: 'markdown'
                };

                $http.get('stories/default.story').success(function(data) {
                        $scope.$storage.story = data;
                }).success(function() {
                    if (!$scope.$storage.story) {
                        $scope.resetToDefaultStory();
                    }
                });

                
                $scope.resetToDefaultStory = function() {
                                    };
                            }],
            controllerAs: 'universe',
        };
    }]);
})();
