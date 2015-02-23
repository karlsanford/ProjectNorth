var controllerId = 'pnMainCtrl';

angular.module('app').controller(controllerId,pnMainCtrl)

function pnMainCtrl($scope){
    $scope.courses = [
        {name: 'C# for sociopaths', featured: true, published: new Date(2015,6,13)},
        {name: 'C# for non sociopaths', featured: true, published: new Date(1981,7,13)},
        {name: 'Course 3', featured: true, published: new Date(2015,7,13)},
        {name: 'Course 4', featured: false, published: new Date(2015,5,13)},
        {name: 'Course 5', featured: false, published: new Date(2015,7,13)},
        {name: 'Course 6', featured: true, published: new Date(2015,4,13)}
    ];
}