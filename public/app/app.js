angular.module('app',['ngRoute','ngResource']);

angular.module('app').config(function($routeProvider, $locationProvider){

    var routeRoleChecks = {
        admin: {auth:function(pnAuth) {
            return pnAuth.authorizeCurrentUserForRoute('admin');
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/',{templateUrl:'partials/main/main',controller:'pnMainCtrl'})
        .when('/admin/users',{
            templateUrl:'partials/admin/user-list',
            controller:'pnUserListCtrl',
            resolve: routeRoleChecks.admin
        });
});

angular.module('app').run(function($rootScope,$location){
    $rootScope.$on('$routeChangeError',function(evt,current,previous,rejection){
        if(rejection === 'not authorized'){
            $location.path('/');
        }
    })
})

