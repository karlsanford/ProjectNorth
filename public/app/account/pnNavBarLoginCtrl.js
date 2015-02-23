var controllerId = 'pnNavBarLoginCtrl';

angular.module('app').controller(controllerId,['$location','pnAuth','pnIdentity','pnNotifier','$scope',pnNavBarLoginCtrl]);

function pnNavBarLoginCtrl($location,pnAuth,pnIdentity,pnNotifier,$scope){
    $scope.identity = pnIdentity;
    $scope.localSignIn = function(username,password){
        pnAuth.authenticateUser(username,password).then(function(success){
            if(success){
                pnNotifier.notify('You have successfully signed in!');
            } else {
                pnNotifier.notify('Username/password combination incorrect');
            }
        })
    }
    $scope.signout = function(){
        pnAuth.logoutUser().then(function(){
            $scope.username="";
            $scope.password="";
            pnNotifier.notify("You have been logged out!");
            $location.path('/');

        });
    }
}