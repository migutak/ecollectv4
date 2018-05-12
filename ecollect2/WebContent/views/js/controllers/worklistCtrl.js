var app = angular.module('RDash');

app.controller('worklistCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                {name:'ACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 150, enableFiltering: false },
							        {name:'CUSTNUMBER',cellClass: cellColor},
							        {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
							        {name:'AROCODE',cellClass: cellColor},
							        {name:'RROCODE',cellClass: cellColor},
							        {name:'DAYSINARR',cellClass: cellColor},
							        {name:'BUCKET',cellClass: cellColor},
							        {name:'OUSTBALANCE',cellClass: cellColor,type:'number',cellFilter: 'number: 2'},
							        {name:'TOTALARREARS',cellClass: cellColor,type:'number',cellFilter: 'number: 2'},
							        {name:'PRINCARREARS',cellClass: cellColor,type:'number',cellFilter: 'number: 2'},
							        {name:'COLOFFICER',cellClass: cellColor},
							        {name:'BRANCHNAME',cellClass: cellColor},
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
	
	 /*$scope.showMe = function(accnumber,custnumber){
		 $("#acc_number").val(accnumber);
	     $("#cust_number").val(custnumber);
	     $("#username").val(username);
	     servletPass();
	     $window.open('topnav2.jsp','_blank');
     };*/
	
	$scope.showMe = function(accnumber,custnumber){
		$("#acc_number").val(accnumber);
		$("#cust_number").val(custnumber);
		$("#username").val(username);
		$window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
	};
     
     function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
    	 var today = new Date();
    	 var dd = today.getDate();
    	 var mm = today.getMonth()+1
    	 var yyyy = today.getFullYear();
    	 
    	 if(dd<10){
    		 dd='0'+dd;
    	 }
    	 if(mm<10){
    		 mm='0'+mm;
    	 }
    	 var todayformatted = dd+'-'+mm+'-'+yyyy;
    	 
         if (row.entity.OVEDUE > 5) {
               return 'red';
         }else if(row.entity.LASTACTIONDATE == todayformatted){
        	 return 'grey'
         }else{
        	 return 'black'
         }
     }
})

//worklistmcoopCtrl
app.controller('worklistmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 {name:'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER)">{{row.entity.LOANACCNUMBER}}</a>'},
	                                 {name:'PHONENUMBER'},
	                                 {name:'CLIENTNAME', field:'CLIENTNAME'},
	                                 {name:'LOAN_TYPE'},
	                                 {name:'GRADE'},
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT', type:'number',cellFilter: 'number: 2'},
	                                 {name:'REPAYMENTAMOUNT', type:'number',cellFilter: 'number: 2'},
	                                 {name:'AMOUNTDISBURSED', type:'number',cellFilter: 'number: 2'},
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
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER'},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor, type:'number',cellFilter: 'number: 2'},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor, type:'number',cellFilter: 'number: 2'},
	                                 {name:'PRINCARREARS',cellClass: cellColor, type:'number',cellFilter: 'number: 2'},
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
	
	 $scope.showMe = function(accnumber,custnumber){
		 $("#acc_number").val(accnumber);
	     $("#cust_number").val(custnumber);
	     $("#username").val(username);
	     servletPass();
	     $window.open('topnav2.jsp','_blank');
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
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
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
	
	 /*$scope.showMe = function(accnumber,custnumber){
		 $("#acc_number").val(accnumber);
	     $("#cust_number").val(custnumber);
	     $("#username").val(username);
	     servletPass();
	     $window.open('topnav2.jsp','_blank');
     };*/
	
	$scope.showMe = function(accnumber,custnumber){
		$("#acc_number").val(accnumber);
		$("#cust_number").val(custnumber);
		$("#username").val(username);
		$window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
	};
})

app.controller('noplansmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 {name: 'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER,row.entity.PHONENUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
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
	
	 $scope.showMe = function(accnumber,custnumber){
		 //StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(custnumber);
	         $("#username").val(username);
	         //servletPass();
	         //$window.open('topnavmcoop.jsp','_blank');
	         $window.open('topnavmcoop.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
		  //})
     };
});

app.controller('todaysworkCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 { name: 'Accnumber',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
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
	
	 $scope.showMe = function(accnumber,custnumber){
		 $("#acc_number").val(accnumber);
	     $("#cust_number").val(custnumber);
	     $("#username").val(username);
	     //servletPass();
	     $window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
     };
})

app.controller('todaysworkmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem('uname');
	//var division  = localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	
	 $scope.showMe = function(accnumber, custnumber){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(custnumber);
	         $("#username").val(username);
	         $window.open('topnavmcoop.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
     };
})

app.controller('overdueplansCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
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
	
	 $scope.showMe = function(accnumber,custnumber){
		 $("#acc_number").val(accnumber);
	     $("#cust_number").val(custnumber);
	     $("#username").val(username);
	     $window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
     };
})

app.controller('overdueplansmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 {name: 'LOANACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER,row.entity.PHONENUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
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
	
	 $scope.showMe = function(accnumber,custnumber){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(custnumber);
	         $("#username").val(username);
	         //servletPass();
	         $window.open('topnavmcoop.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
     };
})

app.controller('allocationsCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 {name:'Accnumber',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER',cellClass: cellColor},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor},
	                                 {name:'AROCODE',cellClass: cellColor},
	                                 {name:'RROCODE',cellClass: cellColor},
	                                 {name:'DAYSINARR',cellClass: cellColor},
	                                 {name:'INTRATEARR',cellClass: cellColor},
	                                 {name:'OUSTBALANCE',cellClass: cellColor,type:'number',cellFilter: 'number: 2'},
	                                 {name:'REVIEWDATE',cellClass: cellColor},
	                                 {name:'TOTALARREARS',cellClass: cellColor,type:'number',cellFilter: 'number: 2'},
	                                 {name:'PRINCARREARS',cellClass: cellColor,type:'number',cellFilter: 'number: 2'},
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
	    	  //console.log('allocationsCtrl data for username => '+username);
	    	  //console.log(data)
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         //alert('Error '+err) 
	      });
	}
	
	function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
   	 var today = new Date();
   	 var dd = today.getDate();
   	 var mm = today.getMonth()+1
   	 var yyyy = today.getFullYear();
   	 
   	 if(dd<10){
   		 dd='0'+dd;
   	 }
   	 if(mm<10){
   		 mm='0'+mm;
   	 }
   	 var todayformatted = dd+'-'+mm+'-'+yyyy;
   	 
        if (row.entity.OVEDUE > 5) {
              return 'red';
        }else if(row.entity.LASTACTIONDATE == todayformatted){
       	 return 'grey'
        }else{
       	 return 'black'
        }
    }
	
     
     $scope.showMe = function(accnumber,custnumber){
 		$("#acc_number").val(accnumber);
 		$("#cust_number").val(custnumber);
 		$("#username").val(username);
 		$window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
 	};
});

app.controller('allocationsmcoopCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 {name:'LOANACCNUMBER',width: 180,cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.LOANACCNUMBER,row.entity.PHONENUMBER)">{{row.entity.LOANACCNUMBER}}</a>' },
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
	
	 $scope.showMe = function(accnumber,custnumber){
		 $("#acc_number").val(accnumber);
	     $("#cust_number").val(custnumber);
	     $("#username").val(username);
	     $window.open('topnavmcoop.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
     };
});

app.controller('teamreviewCtrl', function($scope,$http,StudentDataOp,ServerAddress){
	// var username = localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	
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
 		                                 { name: 'ACCNUMBER', cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 140, enableFiltering: false },
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
 		
 		 $scope.showMe = function(accnumber,custnumber){
 				 $("#acc_number").val(accnumber);
 		         $("#cust_number").val(custnumber);
 		         $("#username").val(username);
 		        $window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
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