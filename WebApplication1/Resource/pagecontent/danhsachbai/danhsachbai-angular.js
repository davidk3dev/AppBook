var myapp = angular.module('myapp', ["ui.router", "ngAnimate"])
myapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("editorwithid", {
            url: "/editor/:id",
            template: '<div id="editor-container" ></div>',
            controller: function ($scope, $stateParams, $rootScope) {
                $scope.pageClass = 'page-editor';
                //loadBaiEditor($stateParams.id, $('#editor-container'));
                switchEditMode('edit');
            }
        })
        .state("editor", {
            url: "/editor",
            template: '<div id="editor-container" ></div>',
            controller: 'editorCtrl'
        })
        .state("display", {
            url: "/display",
            template: '<div id="bai-container"></div>',
            controller: 'displayCtrl'
        })

    $urlRouterProvider.otherwise("/foo");
})

myapp.controller('editorCtrl', function ($scope, $timeout) {
    $scope.pageClass = 'page-editor';
    switchEditMode('edit');
    loadEditor();
});
myapp.controller('displayCtrl', function ($scope) {
    $scope.pageClass = 'page-display';
    switchEditMode('display');
    loaddanhsachbai_trongchuyende();
});

myapp.controller('mainController', function ($scope, $state, $timeout) {
    $scope.taobaimoi = function () {
        //$('#loadingScreen').show();
        //$timeout(function () {
            //$('#loadingScreen').hide();
            $state.go('editor');
        //}, 1000)
    }
    $scope.trovetrangdisplay = function () {
        //$('#loadingScreen').show();
        //$timeout(function () {
            //$('#loadingScreen').hide();
            $state.go('display');
        //}, 1000)
    }
});
function switchEditMode(mode) {
    if (mode === 'edit') {
        $('#btnTroVeTrangDisplay').show();
    }
    else if (mode === 'display') {
        $('#btnTroVeTrangDisplay').hide();
    }
}
