var app = angular.module('RDash');

app.controller('worklistCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'ACCNUMBER',
							       	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 150, enableFiltering: false },
							        {name:'CUSTNUMBER',cellClass: cellColor},
							        {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
							        {name:'AROCODE',cellClass: cellColor},
							        {name:'DAYSINARR',cellClass: cellColor},
							        {name:'BUCKET',cellClass: cellColor},
							        {name:'OUSTBALANCE',cellClass: cellColor,cellFilter: 'number: 2'},
							        {name:'TOTALARREARS',cellClass: cellColor,cellFilter: 'number: 2'},
							        {name:'PRINCARREARS',cellClass: cellColor,cellFilter: 'number: 2'},
							        {name:'COLOFFICER',cellClass: cellColor},
							        {name:'BRANCHNAME',cellClass: cellColor},
							        {name:'REGIONNAME',cellClass: cellColor},
							        {name:'REVIEWDATE',cellClass: cellColor},
							        {name:'OVEDUE',visible: false}
	                               ];
		loadgridData('worklist/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         // 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
     };
     
     function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
         if (row.entity.OVEDUE > 5) {
               return 'red';
             }
     }
})

//worklistmcoopCtrl
app.controller('worklistmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
						$scope.gridOptions.columnDefs = [
	                                 {name:'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
	                                 {name:'PHONENUMBER'},
	                                 {name:'CLIENTNAME', field:'CLIENTNAME'},
	                                 {name:'LOAN_TYPE'},
	                                 {name:'GRADE'},
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT'},
	                                 {name:'REPAYMENTAMOUNT'},
	                                 {name:'AMOUNTDISBURSED'},
	                                 {name:'COLOFFICER'},
	                                 {name:'ARREARS_CATEGORY'},
	                                 {name:'EMPLOYER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('worklistmcoop/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].PHONENUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
})

app.controller('worklistccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'Accnumber',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER'},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor},
	                                 {name:'PRINCARREARS',cellClass: cellColor},
	                                 {name:'COLOFFICER',cellClass: cellColor},
	                                 {name:'BRANCHNAME',cellClass: cellColor},
	                                 {name:'OVEDUE',visible: false}
	                               ];
		loadgridData('worklistcc/' + username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
     };
     
     function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
         if (row.entity.OVEDUE > 5) {
               return 'red';
             }
     }
 	
 	function cellColor2(grid, row, col, rowRenderIndex, colRenderIndex) {
         if (grid.getCellValue(row,col) > 30) {
           return 'red';
         }
       }
})

app.controller('noplansCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'Accnumber',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER',cellClass: cellColor},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor},
	                                 {name:'PRINCARREARS',cellClass: cellColor},
	                                 {name:'COLOFFICER',cellClass: cellColor},
	                                 {name:'BRANCHNAME',cellClass: cellColor},
	                                 {name:'OVEDUE',visible: false}
	                               ];
		loadgridData('noplans/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
        if (row.entity.OVEDUE > 5) {
              return 'red';
            }
    }
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
     };
})

app.controller('noplansmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 {name: 'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
	                                 {name:'PHONENUMBER'},
	                                 {name:'CLIENTNAME', field:'CLIENTNAME'},
	                                 {name:'LOAN_TYPE'},
	                                 {name:'GRADE'},
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT'},
	                                 {name:'REPAYMENTAMOUNT'},
	                                 {name:'AMOUNTDISBURSED'},
	                                 {name:'COLOFFICER'},
	                                 {name:'ARREARS_CATEGORY'},
	                                 {name:'EMPLOYER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('noplansmcoop/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
});

app.controller('todaysworkCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'Accnumber',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER',cellClass: cellColor},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor},
	                                 {name:'PRINCARREARS',cellClass: cellColor},
	                                 {name:'COLOFFICER',cellClass: cellColor},
	                                 {name:'BRANCHNAME',cellClass: cellColor},
	                                 {name:'OVEDUE',visible: false}
	                               ];
		loadgridData('todayswork/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
        if (row.entity.OVEDUE > 5) {
              return 'red';
            }
    }
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
     };
})

app.controller('todaysworkmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 {name: 'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
	                                 {name:'PHONENUMBER'},
	                                 {name:'CLIENTNAME', field:'CLIENTNAME'},
	                                 {name:'LOAN_TYPE'},
	                                 {name:'GRADE'},
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT'},
	                                 {name:'REPAYMENTAMOUNT'},
	                                 {name:'AMOUNTDISBURSED'},
	                                 {name:'COLOFFICER'},
	                                 {name:'ARREARS_CATEGORY'},
	                                 {name:'EMPLOYER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('todaysworkmcoop/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].PHONENUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
})

app.controller('overdueplansCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'Accnumber',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER',cellClass: cellColor},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor},
	                                 {name:'PRINCARREARS',cellClass: cellColor},
	                                 {name:'COLOFFICER',cellClass: cellColor},
	                                 {name:'BRANCHNAME',cellClass: cellColor},
	                                 {name:'OVEDUE',visible: false}
	                               ];
		loadgridData('overdueplans/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
        if (row.entity.OVEDUE > 5) {
              return 'red';
            }
    }
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
     };
})

app.controller('overdueplansmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 {name: 'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
	                                 {name:'PHONENUMBER'},
	                                 {name:'CLIENTNAME', field:'CLIENTNAME'},
	                                 {name:'LOAN_TYPE'},
	                                 {name:'GRADE'},
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT'},
	                                 {name:'REPAYMENTAMOUNT'},
	                                 {name:'AMOUNTDISBURSED'},
	                                 {name:'COLOFFICER'},
	                                 {name:'ARREARS_CATEGORY'},
	                                 {name:'EMPLOYER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('overdueplansmcoop/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].PHONENUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
})

app.controller('allocationsCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'Accnumber',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER',cellClass: cellColor},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor},
	                                 {name:'PRINCARREARS',cellClass: cellColor},
	                                 {name:'COLOFFICER',cellClass: cellColor},
	                                 {name:'BRANCHNAME',cellClass: cellColor},
	                                 {name:'OVEDUE',visible: false}
	                               ];
		loadgridData('division/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
        if (row.entity.OVEDUE > 5) {
              return 'red';
            }
    }
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
     };
});

app.controller('allocationsmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 {name:'LOANACCNUMBER',width: 180,cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
	                                 {name:'PHONENUMBER'},
	                                 {name:'CLIENTNAME', field:'CLIENTNAME',width: 250},
	                                 {name:'LOAN_TYPE'},
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT'},
	                                 {name:'REPAYMENTAMOUNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'ARREARS_CATEGORY'},
	                                 {name:'EMPLOYER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('myallocationsmcoop/'+username);
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/status/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].PHONENUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
});

app.controller('teamreviewCtrl', function($scope,$http,StudentDataOp,ServerAddress){
	var username = localStorage.getItem("uname");
	
 	   var inUrl = ServerAddress.address+'/api/v2/reviewerdata/'+username;
 	   //dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
 	   
 		$scope.gridOptions = {  
 			    enableFiltering: true,
 			    flatEntityAccess: true,
 			    showGridFooter: true,
 			    showColumnFooter: true,
 			    enableGridMenu: true,
 			    enableSelectAll: true,
 			    exporterCsvFilename: 'writeoff.csv',
 			    fastWatch: true,
 			    onRegisterApi: function(gridApi){
 			      $scope.gridApi = gridApi;
 			    }
 		};
 		
 								$scope.gridOptions.columnDefs = [
 		                                 { name: 'ACCNUMBER', cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 140, enableFiltering: false },
 		                                 {name:'CUSTNUMBER'},
 		                                 {name:'Client Name', field:'CLIENT_NAME', minWidth: 200},
 		                                 {name:'AROCODE'},
 		                                 {name:'DAYSINARR'},
 		                                 {name:'BUCKET'},
 		                                 {name:'OUSTBALANCE',cellFilter: 'number: 2'},
 		                                 {name:'TOTALARREARS',cellFilter: 'number: 2'},
 		                                 {name:'PRINCARREARS',cellFilter: 'number: 2'},
 		                                 {name:'COLOFFICER'},
 		                                 {name:'BRANCHNAME'},
 		                                 {name:'REGIONNAME'},
 		                                 {name:'REVIEWDATE'},
 		                                 {name:'OVEDUE',visible: false}
 		                        ];

 		loadgridData(inUrl);
 		
 		function loadgridData(inparams){
 			$http({
 		        method: 'get',
 		        url: inparams,
 		        headers: {'Content-Type': 'application/json'}
 		      }).success(function (data) {
 		    	  $scope.gridOptions.data = data;
 		      }).error(function (err) {
 		         alert('Error '+ err) 
 		      });
 		}
 		
 		 $scope.showMe = function(accnumber){
 			 StudentDataOp.getAccount(accnumber).success(function(data){
 				 $("#acc_number").val(accnumber);
 		         $("#cust_number").val(data[0].CUSTNUMBER);
 		         $("#username").val(username);
 		         servletPass();
 		         $window.open('topnav2.jsp','_blank');
 			  })
 	     };
})

app.controller('predeliqCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
	
})

app.controller('creditwatchCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
	
})

app.controller('nocreditwatchCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
		
})

app.controller('paynoalertCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
		
})