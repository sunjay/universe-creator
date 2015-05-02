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
                
                $scope.resetToDefaultStory = function() {
                    $http.get('stories/default.story').success(function(data) {
                            $scope.$storage.story = data;
                    });
                };
                if (!$scope.$storage.story) {
                    $scope.resetToDefaultStory();
                }
            }],
            controllerAs: 'universe',
        };
    }]);
})();
