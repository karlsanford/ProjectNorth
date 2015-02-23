angular.module('app').controller('pnUserListCtrl',function($scope,pnUser){
    $scope.users = pnUser.query();
})