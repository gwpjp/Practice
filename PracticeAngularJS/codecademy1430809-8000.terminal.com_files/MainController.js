app.controller('MainController', ['$scope', function($scope) { 
  $scope.title = 'FlashKey'; 
  $scope.promo = 'Good news!';
  $scope.product = { 
  name: 'The Book of Trees', 
  price: 19,
  pubdate: new Date('2014', '03', '08')
}



}]);


