var myapp = angular.module('myapp', ["ui.router", "ngAnimate"])
myapp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("editorwithid", {
            url: "/editor/:id",
            templateUrl: 'partial/editor.html',
            controller: function ($scope, $stateParams) {
                $scope.pageClass = 'page-editor';
                loadBaiEditor($stateParams.id, $('#editor-container'));
                switchEditMode('edit');
            }
        })
        .state("editor", {
            url: "/editor",
            templateUrl: 'partial/editor.html',
            controller: function ($scope) {
                $scope.pageClass = 'page-editor';
                CreateBai($('#editor-container'));
                switchEditMode('edit');
            }
        })
        .state("display", {
            url: "/display",
            templateUrl: 'partial/display.html',
            controller: function ($scope) {
                $scope.pageClass = 'page-display';
                loadDsBai($('#bai-container'));
                switchEditMode('display');
            }
        })

    $urlRouterProvider.otherwise("/foo");
})
myapp.controller('mainController', function($scope, $state) {
    $scope.taobaimoi = function () {
        //console.log($state);
        $state.go('editor');

    }
    $scope.trovetrangdisplay = function () {
        $state.go('display');

    }
});

function switchEditMode(mode) {
    if(mode === 'edit'){
        $('#btnTroVeTrangDisplay').show();
    }
    else if(mode === 'display'){
        $('#btnTroVeTrangDisplay').hide();
    }
}
