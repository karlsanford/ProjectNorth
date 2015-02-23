var factoryId = 'pnAuth';

angular.module('app').factory(factoryId,['$http','$q','pnIdentity','pnUser', pnAuth]);

function pnAuth($http, $q, pnIdentity, pnUser){
    return{
        authenticateUser:function(username, password){
            var dfd = $q.defer();
            console.log('Crtl: username:' + username);
            $http.post('/login',{username:username,password:password}).then(function(response){
                if(response.data.success){
                    var user = new pnUser()
                    angular.extend(user,response.data.user);
                    pnIdentity.currentUser = user;
                    dfd.resolve(true);
                }else{
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser:function(){
            var dfd = $q.defer();
            $http.post('/logout',{logout:true}).then(function(){
                pnIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute:function(role){
            if(pnIdentity.isAuthorized(role)){
                return true;
            }else{
                return $q.reject('not authorized');
            }
        }
    }
}