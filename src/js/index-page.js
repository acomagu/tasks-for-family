import DB from './db.js';

let db = new DB();

ons
.bootstrap() // ons.bootstrap()
.controller('myCtrl', function($scope){
  $scope.userworks = [];
  db
  .getAllActiveWorks()
  .then(function(res){
    $scope.$apply(() => {
      $scope.userworks = res;
    });
  })
  .catch(function(err){
    console.log('error')
  });
});
