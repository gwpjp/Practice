app.controller('MainController', ['$scope', function($scope) { 
  $scope.title = 'FlashKey'; 
  $scope.promo = 'Good news!';
  $scope.products = [ 
  { 
    name: 'The Book of Trees', 
    price: 19, 
    pubdate: new Date('2014', '03', '08'), 
    cover: 'img/the-book-of-trees.jpg',
    likes: 0,
    dislikes: 0
  }, 
  { 
    name: 'Program or be Programmed', 
    price: 8, 
    pubdate: new Date('2013', '08', '01'), 
    cover: 'img/program-or-be-programmed.jpg',
    likes: 0 ,
    dislikes: 0
  } ,
    {
      name: 'To Kill a Mockingbird',
      price: 6,
      pubdate: new Date('1950', '05', '01'),
      cover: 'http://ecx.images-amazon.com/images/I/51grMGCKivL._SY344_BO1,204,203,200_.jpg',
    likes: 0,
    dislikes: 0
    },
    {
      name: 'Of Mice and Men',
      price: 6,
      pubdate: new Date('1930', '05', '01'),
      cover: 'http://ecx.images-amazon.com/images/I/51wuHv30-ML._SY344_BO1,204,203,200_.jpg',
    likes: 0,
    dislikes: 0
    }
]
	$scope.plusOne = function(index) { 
  $scope.products[index].likes += 1; 
};

  $scope.minusOne = function(index) { 
  $scope.products[index].dislikes += 1; 
};







}]);


