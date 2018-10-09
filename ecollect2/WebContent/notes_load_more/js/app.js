var app = angular.module("MyApp", []);

app.factory("Item", function($http) {

  var items = [];
  /*for (var i=0; i<50; i++) {
    items.push({ id: i, name: "name "+ i, description: "description " + i });
  }*/

  return {
    /*get: function(offset, limit) {
      return items.slice(offset, offset+limit);
    },*/
	all: function(custnumber){
	  return $http.get('http://localhost:8085/ecollect2/api/status/notes/total/'+ custnumber);
	},
    get: function(custnumber, start, end){
      return $http.get('http://localhost:8085/ecollect2/api/status/notes/'+ custnumber+'/'+ start +'/' + end);
    },
    total: function() {
      return items.length;
    }
  };
});

app.controller("PaginationCtrl", function($scope, Item) {

  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.total = Item.total();
  $scope.totalNotes = 0;
  $scope.initialNotes = 0;
  
  Item.all('0057181').success(function(data){
	  $scope.totalNotes = data[0].TOTALNOTES;
	  $scope.initialNotes = data[0].TOTALNOTES;
  })
  
  Item.get('0057181',$scope.currentPage*$scope.itemsPerPage, $scope.itemsPerPage).success(function(data){
	  console.log('$scope.pagedItems',data);
	  $scope.pagedItems = data;
	  $scope.totalNotes = $scope.initialNotes - $scope.pagedItems.length;
	  console.log('shown notes', $scope.pagedItems.length);
  })
  
  $scope.loadMore = function() {
    $scope.currentPage++;
    Item.get('0057181',$scope.currentPage*$scope.itemsPerPage, $scope.itemsPerPage).success(function(data){
    	var newItems = data;
    	$scope.pagedItems = $scope.pagedItems.concat(newItems);
    	$scope.totalNotes = $scope.initialNotes - $scope.pagedItems.length;
    	console.log('newItems', newItems);
    	console.log('shown notes', $scope.pagedItems.length);
    })
  };

  $scope.nextPageDisabledClass = function() {
    return $scope.currentPage === $scope.pageCount()-1 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

});