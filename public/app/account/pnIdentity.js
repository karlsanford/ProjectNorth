angular.module('app').factory('pnIdentity',function($window, pnUser){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = new pnUser();
        angular.extend(currentUser,$window.bootstrappedUserObject);
    }
    return{
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(){
            return !!this.currentUser && this.currentUser.roles.indexOf(role)> -1;
        }
    }
});

