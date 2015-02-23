angular.module('app').value('pnToastr',toastr);

angular.module('app').factory('pnNotifier',function(pnToastr){
    return{
        notify:function(msg){
            pnToastr.success(msg);
            console.log('[toastr]' + msg);
        }
    }
});