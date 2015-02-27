angular
    .module('app')
    .controller('ProjectController', ['$scope', '$state', 'Project', function($scope, $state, Project) {
        $scope.projects = $scope.projects || [];
        $scope.regionalData = $scope.regionalData || [];
        $scope.project = $scope.project || {};

        $scope.getProjects = function() {
            Project
                .find()
                .$promise
                .then(function(results) {
                    $scope.projects = results;
                });
        };

        $scope.getProjectById = function(item) {
            Project
                .findById(item)
                .$promise
                .then(function(result) {
                    $scope.project = result;
                });
        };

        $scope.addProject = function() {
            Project
                .create($scope.newProject)
                .$promise
                .then(function(project) {
                    $scope.newProject = '';
                    $scope.projectForm.Name.$setPristine();
                    $('.focus').focus();
                    getProjects();
                });
        };

        $scope.updateProject = function() {
            Project
                .updateById($scope.project)
                .$promise
                .then(function(project) {
                    $scope.project = project;
                });
        };

        $scope.removeProject = function(item) {
            Project
                .deleteById(item)
                .$promise
                .then(function() {
                    getProjects();
                });
        };

        $scope.getProjectRegionalData = function(item) {
            Project
                .regionalData(item)
                .$promise
                .then(function(results) {
                    $scope.regionalData = results;
                });
        };

        if($state.params.projectId) {
            $scope.getProjectById({id: $state.params.projectId});
            //$state.transitionTo('project.projectFields');
            $scope.getProjectRegionalData({id: $state.params.projectId});
        }
        else {
            $scope.getProjects();
        }
        console.log("State: ");
        console.log($state.is('project.details'));

    }]);
