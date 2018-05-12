/**
 * Master Controller
 */

angular.module('RDash')

.controller('MasterCtrl', MasterCtrl)
//.controller('viewallCtrl', dataLoading_all_fnc)
.controller('viewallportCtrl', dataLoading_port_fnc)
.controller('viewallCtrlbranch', dataLoading_branch_fnc)
.controller('viewallccCtrl', dataLoading_all_fnc_cc)
.controller('teamreviewCtrlxx', dataLoading_all_fnc_trw)
.controller('duelettersCtrl', dataLoading_all_fnc_due)
.controller('teamreviewccCtrl', dataLoading_cc_fnc_trw)
.controller('portfolioCtrl', dataLoading_port_fnc)
//.controller('allocationsCtrl', dataLoading_to_my_fnc)
.controller('allocationsCtrlport', dataLoading_to_port_fnc)
.controller('allocationsccCtrl', dataLoading_to_my_fnc_cc)
//.controller('worklistCtrl', dataLoading_to_wlist_fnc)
.controller('worklistCtrlport', dataLoading_to_wlistport_fnc)
//.controller('worklistccCtrl', dataLoading_to_wlist_fnc_cc)
.controller('closedCtrl', dataLoading_all_fnc_closed)
.controller('newCtrl', dataLoading_to_new_fnc)
.controller('fundsCtrl', dataLoading_withfunds)
.controller('viewall2Ctrl', function($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var username = localStorage.getItem('uname');
	//console.log('-->viewall2Ctrl ' + $stateParams.from);
	var _from = $stateParams.from;
	var division  = localStorage.getItem("division");
	
	
	$scope.section = division
	$scope.region = "ALL"
	$scope.divisionselect = [];
	$scope.regionselect = [];
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'viewall.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
	};
	
	                               $scope.gridOptions.columnDefs = [
	                                 { name: 'ACCNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 150, enableFiltering: false },
	                                 {name:'CUSTNUMBER',cellClass: cellColor},
	                                 {name:'Client Name', field:'CLIENT_NAME',cellClass: cellColor, minWidth: 250},
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

		loadgridData('divall/' + division);
		//$scope.gridApi.saveState.restore( $scope, $scope.state );
	
	function loadgridData(inparams){
    $scope.curGrid = true;
		$http({
	        method: 'get',
	        //url : 'http://localhost:7001/ecollect_3/api/status/hometest',
	        url: ServerAddress.address + '/api/v2/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         alert('Error '+ err) 
	      });
	}
	
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
	
	 $scope.state = {};
	 
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getAccount(accnumber).success(function(data){
		 	//console.log(data[0]);
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  })
		//localStorage.setItem("acc", accnumber);
		//$scope.state = $scope.gridApi.saveState.save();
    //$state.go('action.action',{'id':accnumber});
    //
     };

     $scope.$watch("region", function(newval){
     	//console.log('Region ' + newval);
     	if(newval === 'ALL'){
     		loadgridData('divall/' + division);
     	}else{
     		loadgridData('regional/'+ division +'/'+ newval);
     	}
     })
     
     $scope.$watch("section", function (newval) {
    	 //console.log('Section changed');
         switch (newval) {
           case 'CORPORATE':
        	   loadgridData('divall/CORPORATE');
               break;
           case 'ASSETFINANCE':
        	   loadgridData('divall/ASSETFINANCE');
               break;
           case 'SACCO':
        	   loadgridData('divall/SACCO');
               break;
           case 'AGRI':
        	   loadgridData('divall/AGRI');
               break;
           case 'MORTGAGE':
        	   loadgridData('divall/MORTGAGE');
               break;
           case 'SME':
        	   loadgridData('divall/SME');
               break;
           case 'MICROCREDIT':
        	   loadgridData('divall/MICROCREDIT');
               break;
           case 'PBBSCHEME':
        	   loadgridData('divall/PBBSCHEME');
               break;
           case 'PBBSCORED':
        	   loadgridData('divall/PBBSCORED');
               break;
           case 'CMDR':
        	   loadgridData('divall/CMD');
               break;
           case 'PORTFOLIO':
        	   loadgridData('divall/PORTFOLIO');
               break;
           case 'IPF':
        	   loadgridData('divall/IPF');
               break;
           case 'Invalid':
             
               break;
       }
         }, true);
     
     $scope.deptclick = function(dept){
    	 //console.log('dept clicked');
    	 $scope.section = dept;
    	 loadgridData('divall/' + dept);
     }
     
     $scope.spinner = 'fa fa-spinner';
 	
 	//construct multiselect query
 	
 	$scope.refreshViewall = function(){
 		$scope.spinner = 'fa fa-spinner fa-spin fa-2x fa-fw';
 		$scope.regionselect = $("#regionselect").multipleSelect("getSelects", "text");
 		$scope.divisionselect = $("#divisionselect").multipleSelect("getSelects", "text");
 		
 		if($scope.regionselect.length>0){
 			var sql = "";
 			var sqlouter = "";
 			
 			for(var i = 0; i< $scope.regionselect.length;i++){
 				sql +=" region LIKE '%"+$scope.regionselect[i]+"%' OR";
 			}
 			
 			for(var x = 0; x< $scope.divisionselect.length;x++){
 				sqlouter +=" section LIKE '%"+$scope.divisionselect[x]+"%' OR";
 			}
 			
 			var sqlinner = sql.substring(0, sql.length-2);
 			var sqlouterfinal = sqlouter.substring(0, sqlouter.length-2);
 			
 			$http({
 		        method: 'get',
 		        url : ServerAddress.address+'/api/status/multiplediv',
 		        params:{'sqlinner' : sqlinner,'sqlouterfinal' : sqlouterfinal},
 		        headers: {'Content-Type': 'application/json'}
 		      }).success(function (data) {
 		    	  //console.log(data);
		       	  $scope.spinner = 'fa fa-spinner';
 		    	  $scope.gridOptions.data = data;
 		      }).error(function (err) {
 		         alert('Error '+ err) 
 		      });
 			
 			/*$.ajax({
 		       	  url : ServerAddress.address+'/api/status/multiplediv',
 		       	  type: "get", 
 		       	  data:{'sqlinner' : sqlinner,'sqlouterfinal' : sqlouterfinal},
 		       	  success: function(response) {
 		       		console.log(response);
 		       		$scope.spinner = 'fa fa-spinner';
 		       	  },
 		       	  error: function(xhr) {
 		       	    console.log('Error');
 		       	  }
 		       	});*/
 		}else{
 			alert('Select region(s)');
 			$scope.spinner = 'fa fa-spinner';
 		}
 	}
     
     $scope.mySearchname = function(keyEvent) {
  		  if (keyEvent.which === 13){
  			  $scope.searchbyarocode = undefined;
  			  $scope.searchbycustnumber = undefined;
          $scope.mysearchempcode = undefined;
          $scope.searchbyaccnumber = undefined;
  			  
  			  if($scope.searchbyname !== undefined){
  				  console.log('____ name ' + $scope.searchbyname);
  				  loadgridData('searchbyname/'+$scope.searchbyname);
  			  }
  			  //console.log('no search key detected');	
  		  }
  	}

    $scope.mySearchaccnumber = function(keyEvent) {
        if (keyEvent.which === 13){
          $scope.searchbyarocode = undefined;
          $scope.searchbycustnumber = undefined;
          $scope.mysearchempcode = undefined;
          $scope.searchbyname = undefined;
          
          if($scope.searchbyaccnumber !== undefined){
            //console.log('____ name ' + $scope.searchbyaccnumber);
            $state.go('searchaccnumber',{'acc':$scope.searchbyaccnumber});
          }
          //console.log('no search key detected');  
        }
    }

    $scope.mySearchempcode = function(keyEvent) {
        if (keyEvent.which === 13){
          $scope.searchbyarocode = undefined;
          $scope.searchbycustnumber = undefined;
          $scope.searchbyaccnumber = undefined;
          $scope.searchbyname = undefined;
          
          if($scope.mysearchempcode !== undefined || $scope.mysearchempcode === ''){
            $state.go('searchempcode',{'empcode':$scope.mysearchempcode});
          }
          //console.log('no search key detected');  
        }
    }
     
     $scope.mySearcharocode = function(keyEvent) {
  		  if (keyEvent.which === 13){
  			  $scope.searchbycustnumber = undefined;
  			  $scope.searchbyname = undefined;
          $scope.searchbyaccnumber = undefined;
          $scope.mysearchempcode = undefined;
  			  
  			  if($scope.searchbyarocode !== undefined){
  				  console.log('searching by arocode '+ $scope.searchbyarocode);
  				  loadgridData('searchbyarocode/' + $scope.searchbyarocode);
  			  }
  			  console.log('no search key detected');	
  		  }
  	}
     
     $scope.mySearchcustnumber = function(keyEvent) {
		  if (keyEvent.which === 13){
  			  $scope.searchbyarocode = undefined;
  			  $scope.searchbyname = undefined;
          $scope.searchbyaccnumber = undefined;
          $scope.mysearchempcode = undefined;
			  
			  if($scope.searchbycustnumber !== undefined){
				  //console.log('searching by custnumber '+ $scope.searchbycustnumber);
				  loadgridData('searchbycustnumber/'+$scope.searchbycustnumber);
			  }
			  //console.log('no search key detected');	
		  }
	}
	
})

.controller('dashCtrl', function($scope,$http,StudentDataOp,ServerAddress){
	var username= localStorage.getItem("uname");
	$scope.buckets = [];
	console.log('dashCtrl --> '+username);
	
	//start buckets controller
    $http({
        method: 'get',
        url: ServerAddress.address + '/api/v2/buckets',
        headers: {'Content-Type': 'application/json'}
      }).success(function (data) {
    	  $scope.buckets = data;
      }).error(function (err) {
         alert('Error '+err) 
      });
  //End buckets controller

    //start portfolio value/volume controller
   /* $http({
        method: 'get',
        url: ServerAddress.address + '/api/v2/portfoliosummary',
        headers: {'Content-Type': 'application/json'}
      }).success(function (data) {
    	  $scope.PORTFOLIO_VALUE = data[0].PORTFOLIO_VALUE;
    	  $scope.PORTFOLIO_VOLUME = data[0].PORTFOLIO_VOLUME;
      }).error(function (err) {
         alert('Error '+err) 
      });
    */
    //chart
    $scope.dsregion = {
    	    "chart": {
    	        "caption": "Portfolio per Region",
    	        "subcaption": "Bucket Distribution",
    	        "xaxisname": "Region",
    	        "yaxisname": "Amount (Ksh)",
    	        "numberprefix": "",
    	        "theme": "fint"
    	    },
    	    "categories": [
    	        {
    	            "category": [
    	                {
    	                    "label": "Nairobi East"
    	                },
    	                {
    	                    "label": "Coast"
    	                },
    	                {
    	                    "label": "Central"
    	                },
    	                {
    	                    "label": "Rift valley"
    	                },
    	                {
    	                    "label": "Nairobi west"
    	                },
    	                {
    	                    "label": "Western"
    	                },
    	                {
    	                    "label": "Coop Hse and Mall"
    	                },
    	                {
    	                    "label": "Parliament rd & Mall"
    	                },
    	                {
    	                    "label": "Diaspora"
    	                }
    	            ]
    	        }
    	    ],
    	    "dataset": [
    	        {
    	            "seriesname": "30 Days",
    	            "data": [
    	                {
    	                    "value": "16000"
    	                },
    	                {
    	                    "value": "20000"
    	                },
    	                {
    	                    "value": "18000"
    	                },
    	                {
    	                    "value": "19000"
    	                },
    	                {
    	                    "value": "15000"
    	                },
    	                {
    	                    "value": "21000"
    	                },
    	                {
    	                    "value": "16000"
    	                },
    	                {
    	                    "value": "20000"
    	                },
    	                {
    	                    "value": "17000"
    	                }
    	            ]
    	        },
    	        {
    	            "seriesname": "60 Days",
    	            "data": [
    	                {
    	                    "value": "15000"
    	                },
    	                {
    	                    "value": "16000"
    	                },
    	                {
    	                    "value": "17000"
    	                },
    	                {
    	                    "value": "18000"
    	                },
    	                {
    	                    "value": "19000"
    	                },
    	                {
    	                    "value": "19000"
    	                },
    	                {
    	                    "value": "19000"
    	                },
    	                {
    	                    "value": "19000"
    	                },
    	                {
    	                    "value": "20000"
    	                }
    	            ]
    	        },
    	        {
    	            "seriesname": "90 Days",
    	            "data": [
    	                {
    	                    "value": "4000"
    	                },
    	                {
    	                    "value": "5000"
    	                },
    	                {
    	                    "value": "3000"
    	                },
    	                {
    	                    "value": "4000"
    	                },
    	                {
    	                    "value": "1000"
    	                },
    	                {
    	                    "value": "7000"
    	                },
    	                {
    	                    "value": "1000"
    	                },
    	                {
    	                    "value": "4000"
    	                },
    	                {
    	                    "value": "1000"
    	                }
    	            ]
    	        },
    	        {
    	            "seriesname": "91+ Days",
    	            "data": [
    	                {
    	                    "value": "4000"
    	                },
    	                {
    	                    "value": "5000"
    	                },
    	                {
    	                    "value": "3000"
    	                },
    	                {
    	                    "value": "4000"
    	                },
    	                {
    	                    "value": "1000"
    	                },
    	                {
    	                    "value": "7000"
    	                },
    	                {
    	                    "value": "1000"
    	                },
    	                {
    	                    "value": "4000"
    	                },
    	                {
    	                    "value": "1000"
    	                }
    	            ]
    	        }
    	    ]
    	}
    //end chart
    
})

.controller('dashccCtrl', function($scope,$http,StudentDataOp,ServerAddress){
	var username= localStorage.getItem("uname");
	
    
})

.controller('accplansCtrl', function($scope,$state,StudentDataOp,ServerAddress){
	
	var username = localStorage.getItem('uname');
	
	$scope.Activitycodes = [];
	$scope.includedactivities = [];
	$scope.dataIn = [];
	$scope.dataIn_stp2 = [];
	$scope.temps = [];
	$scope.plans = [];
	$scope.showsubmit = false;
	
	getactcodes();
	getaccplans();
	
	function getactcodes(){
		StudentDataOp.getactcodes().success(function(data){
			$scope.Activitycodes = data;
		})
	}
	
	function gettempplans(){
		StudentDataOp.gettempplans(username).success(function(data){
			$scope.temps = data;
		})
	}
	
	function getaccplans(){
		StudentDataOp.getaccplans().success(function(data){
			$scope.plans = data;
		})
	}
	
	
	$scope.deletePlan = function(pcode){
		//console.log('delete plan '+ pcode);
		$.ajax({
			  url: ServerAddress.address + '/api/deleteplans',
		   	  type: "post", 
		   	  data:{'pcode' : pcode},
		   	  success: function(response) {
		   		alert("plan deleted");
		   		getaccplans();
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error');
		   	  }
		   	});
	}
	
	$scope.addPlanactivity = function(){
		$.ajax({
			  url: ServerAddress.address + '/api/addtempplans',
		   	  type: "post", 
		   	  data:{'activcode': $scope.dataIn_stp2.activcode, 'aowner' : username, 'pcode' : $scope.dataIn.pcode, 
		   	  		'startdate' : document.getElementById('startdate').value},//$scope.dataIn_stp2.startdate
		   	  success: function(response) {
		   		alert("activity added");
		   		gettempplans();
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error');
		   	  }
		   	});
	}
	
	$scope.removetemp = function(activcode){
		$.ajax({
			  url: ServerAddress.address + '/api/removetempplans',
		   	  type: "post", 
		   	  data:{'activcode': activcode, 'aowner' : username},
		   	  success: function(response) {
		   		gettempplans();
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error');
		   	  }
		   	});
	}
	
	
	$scope.createPlan = function(){
		console.log($scope.temps);
		console.log($scope.temps.length);
		
		if($scope.showsubmit === true){
				$.ajax({
				  url: ServerAddress.address + '/api/addplan',
			   	  type: "post", 
			   	  data:{'pname': $scope.dataIn.pname, 'powner' : username, 'pcode' : $scope.dataIn.pcode, 'pfreq' : $scope.dataIn.pfrequency},
			   	  success: function(response) {
			   		alert("Plan added");
			   	  },
			   	  error: function(xhr) {
			   	    alert('Error');
			   	  }
			   	});
			
		for(var i=0; i<$scope.temps.length; i++){
				console.log($scope.temps[i].ACTIVCODE);
				$.ajax({
					  url: ServerAddress.address + '/api/addaccplans',
				   	  type: "post", 
				   	  data:{'activcode': $scope.temps[i].ACTIVCODE, 'aowner' : username, 'pcode' : $scope.dataIn.pcode, 'startdate' : $scope.temps[i].STARTDATE},
				   	  success: function(response) {
				   		//alert("Plan created");
				   		$state.go('accplans');
				   	  },
				   	  error: function(xhr) {
				   	    alert('Error');
				   	  }
				  });
			}
		}
	}
	
	$scope.$watch("dataIn.code", function (newval) {
		$scope.dataIn_stp2.activcode = newval;
    }, true);
	
	$scope.$watch("dataIn.acceptTerms", function (newval) {
		if(newval === true){
			$scope.showsubmit = true;
		}else{
			$scope.showsubmit = false;
		}
    }, true);
	
})

.controller('bankregionsCtrl', function($scope,$state,$timeout,$mdDialog,$stateParams,ServerAddress,StudentDataOp){
	$scope.Bankregions = [];
	$scope.Regions = [];
	$scope.newregion = [];
	$scope.newbranchregion = [];
	$scope.Branches = [];

	getbranchregion();
	getregion();
	get_rem_branch();

	function getbranchregion(){
		StudentDataOp.getbranchregion().success(function(data){
			$scope.Bankregions = data;
		})
	}

	function getregion(){
		StudentDataOp.getregion().success(function(data){
			$scope.Regions = data;
		})
	}

	function get_rem_branch(){
		StudentDataOp.get_rem_branch().success(function(data){
			$scope.Branches = data;
		})
	}
	
	$scope.deletebankregion = function(region,branchcode){
		console.log('delete '+region+' and branch '+branchcode);
	}

	$scope.deleteregion = function(regionname){
		console.log('---> deleteregion '+regionname);
		var confirm = $mdDialog.confirm()
          .title('Confirm delete')
          .textContent('Would you like to delete region '+regionname)
          .ok('OK do it!')
          .cancel('NO Cancel');
		    $mdDialog.show(confirm).then(function() {
		      $.ajax({
				  url: ServerAddress.address + '/api/deleteregion',
			   	  type: "post", 
			   	  data:{'regionname': regionname},
			   	  success: function(response) {
							alert('Region deleted!');
					    	getregion();
					    	$scope.newregion = [];
			   	  },
			   	  error: function(xhr) {
			   	    alert('Error deleting region');
			   	  }
			   	});
		    }, function() {
		      console.log('delete cancelled');
		    });
	}//

	$scope.addregion = function(){
		$scope.Loading = true;
			$.ajax({
			  url: ServerAddress.address + '/api/addregion',
		   	  type: "post", 
		   	  data:{'regionname':$scope.newregion.regionname},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('Region successfully added.')
				        .ok('OK')
				    ).then(function(){
				    	getregion();
				    	$scope.Loading = false;
				    	$scope.newregion = [];
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error region');
		   	  }
		   	});
	}

	$scope.addbranchregion = function(){
		$scope.Loading = true;
			$.ajax({
			  url: ServerAddress.address + '/api/addbranchregion',
		   	  type: "post", 
		   	  data:{'regionname':$scope.newbranchregion.regionname,'branchcode':$scope.newbranchregion.branchcode,'branchname':$scope.newbranchregion.branchname},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('Branch successfully added.')
				        .ok('OK')
				    ).then(function(){
				    	getbranchregion();
				    	get_rem_branch();
				    	$scope.Loading = false;
				    	$scope.newbranchregion = [];
				    	$state.go('bankregions');
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error region');
		   	  }
		   	});
	}
})

.controller('editsptypeCtrl', function($scope,$state,$timeout,$mdDialog,$stateParams,ServerAddress,StudentDataOp){
	var spcode = $stateParams.spcode;
	var sptitle = $stateParams.sptitle;

	$scope.dataIn = [];
	$scope.Providers = [];

	
		StudentDataOp.get_sp_provider(spcode,sptitle).success(function(data){
			$scope.dataIn.startdate = data[0].STARTDATE
			$scope.dataIn.sptype = data[0].SPCODE
			$scope.dataIn.spname = data[0].SPTITLE
			$scope.dataIn.contactperson = data[0].CONTACTPERSON
			$scope.dataIn.tel = data[0].TELEPHONE
			$scope.dataIn.email = data[0].EMAIL
			$scope.dataIn.address = data[0].ADDRESS
			$scope.dataIn.accnumber = data[0].ACCNUMBER
			$scope.dataIn.coverage = data[0].COVERAGE
			$scope.dataIn.endofindemnity = data[0].ENDOFINDEMNITY
		})

	$scope.updatesptype = function(){
		//console.log('Update data ',$scope.dataIn);
		$scope.Loading = true;
		$.ajax({
			  url: ServerAddress.address + '/api/editsptype',
		   	  type: "post", 
		   	  data:{'sptype':$scope.dataIn.sptype,'spname' : $scope.dataIn.spname,'contactperson' : $scope.dataIn.contactperson,'endofindemnity' : $scope.dataIn.endofindemnity,'startdate' : $scope.dataIn.startdate
		   	  ,'accnumber' : $scope.dataIn.accnumber,'address' : $scope.dataIn.address,'tel' : $scope.dataIn.tel,'email' : $scope.dataIn.email,'coverage' : $scope.dataIn.coverage},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('Service provider type successfully updated.')
				        .ok('OK')
				    ).then(function(){
				    	$scope.Loading = false;
				    	$state.go('sptype');
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error sptype');
		   	  }
		   	});
	}
})

.controller('sptypeCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	$scope.dataIn = [];
	$scope.Providers = [];
	$scope.dataIn.sp = "ALL PROVIDERS";
	
	function getproviders(){
		StudentDataOp.getproviders().success(function(data){
			$scope.Providers = data;
		})
	}
	
	function get_a_provider(sptype){
		StudentDataOp.get_a_provider(sptype).success(function(data){
			$scope.Providers = data;
		})
	}
	
	$scope.$watch("dataIn.sp", function (newval) {
		if(newval === 'ALL PROVIDERS'){
			getproviders();
		}else{
			get_a_provider(newval);
		}
    }, true);
	
	$scope.addsptype = function(){
		$scope.Loading = true;
		$.ajax({
			  url: ServerAddress.address + '/api/addsptype',
		   	  type: "post", 
		   	  data:{'sptype':$scope.dataIn.sptype,'spname' : $scope.dataIn.spname,'contactperson' : $scope.dataIn.contactperson,'endofindemnity' : $scope.dataIn.endofindemnity,'startdate' : $scope.dataIn.startdate
		   	  ,'accnumber' : $scope.dataIn.accnumber,'address' : $scope.dataIn.address,'tel' : $scope.dataIn.tel,'email' : $scope.dataIn.email,'coverage' : $scope.dataIn.coverage},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('Service provider type successfully added.')
				        .ok('OK')
				    ).then(function(){
				    	$scope.Loading = false;
				    	$state.go('sptype');
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error sptype');
		   	  }
		   	});
	}

	$scope.deleteSptype = function(spcode,sptitle){
		//console.log('deleteing '+spcode+sptitle);
	    var confirm = $mdDialog.confirm()
	          .title('Would you like to delete')
	          .textContent('Would you like to delete ' + sptitle)
	          .ok('OK Delete!')
	          .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	      	$.ajax({
			  url: ServerAddress.address + '/api/deletesptype',
		   	  type: "post", 
		   	  data:{'sptype':spcode,'spname' : sptitle},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('Service provider removed')
				        .ok('OK')
				    ).then(function(){
				    	$scope.Loading = false;
				    	$state.go('sptype');
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error sptype');
		   	  }
		   	});
	    }, function() {
	      	console.log('delete cancelled');
	    });
	}
})

.controller('editactcodesCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	$scope.dataIn = [];
	$scope.dataIn.activcode = $stateParams.actcode;
	
	$scope.editaroactcode = function(){
		$scope.Loading = true;
    	$.ajax({
			  url: ServerAddress.address + '/api/editactcode',
		   	  type: "post", 
		   	  data:{'activcode':$scope.dataIn.activcode, 'activtitle' : $scope.dataIn.activtitle},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('Activity code successfully updated.')
				        .ok('OK')
				    ).then(function(){
				    	$scope.Loading = false;
				    	$state.go('actcodes');
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error editactcode');
		   	  }
		   	});
	}
})

.controller('actcodesCtrl', function($scope,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	$scope.dataIn = [];
	$scope.actcode = [];
	
	getactcodes();
	
	function getactcodes(){
		StudentDataOp.getactcodes().success(function(data){
			$scope.Activitycodes = data;
		})
	}
	
	
	$scope.aroactcode = function(){
		$scope.Loading = true;
        	$.ajax({
  			  url: ServerAddress.address + '/api/addactcode',
  		   	  type: "post", 
  		   	  data:{'activcode':$scope.dataIn.activcode, 'activtitle' : $scope.dataIn.activtitle},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Activity code successfully updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.Loading = false;
  				    	$scope.dataIn = [];
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
	}
	
	$scope.lookupactcode = function(){
		console.log('searching actvcode');
	}
	
	$scope.deleteactcode = function(actcode){
		$mdDialog.show(
			    $mdDialog.confirm()
			        .title('Confirm')
			        .textContent('Would you like to delete activity ' + actcode)
			        .ok('Delete')
			        .cancel('Cancel')
			    ).then(function(){
			    	$.ajax({
			  			  url: ServerAddress.address + '/api/deleteactcode',
			  		   	  type: "post", 
			  		   	  data:{'activcode':actcode},
			  		   	  success: function(response) {
			  		   		getactcodes();
			  		   	  }
			  		   	});
			    },function(){
			    	console.log('delete cancelled')
			    });
	}
})

//

.controller('allocateflagsCtrl', function($scope,$scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
  
  $scope.gridOptions = {  
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        showColumnFooter: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'viewall.csv',
        fastWatch: true,
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        }
  };
  
  $scope.gridOptions.columnDefs = [
                                   { name: 'ACCNUMBER',
                                     cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
                                   {name:'CUSTNUMBER'},
                                   {name:'CLIENTNAME', field:'CLIENT_NAME'},
                                   {name:'AROCODE'},
                                   {name:'BRANCHCODE'},
                                   {name:'DEPTCODE'},
                                   {name:'EMPLOYER'},
                                   {name:'TELNUMBER'},
                                   {name:'OUSTBALANCE'},
                                   {name:'REPAYMENTAMOUNT'},
                                   {name:'REPAYMENTDATE'},
                                   {name:'SETTLEACCBAL', field:'SETTLEACCNO'},
                                   {name:'SETTLEACCNO', field:'SETTLEACCBAL'}
                                 ];
  loadgridData();
  
  function loadgridData(){
    $http({
          method: 'get',
          url: ServerAddress.address + '/api/status/allocateflags',
          headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
          $scope.gridOptions.data = data;
        }).error(function (err) {
           alert('Error '+err) 
        });
  }
   
   $scope.showMe = function(accnumber){
     $state.go('assignallocateflags',{'acc':accnumber});
   };
})

//

.controller('assignallocateflagsCtrl', function($scope,$scope,$stateParams,$mdDialog,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
  var acc = $stateParams.acc;
  $scope.acc = $stateParams.acc;
  $scope.schemecolofficers = [];
  $scope.dataIn = [];
  $scope.dataIn.acc = acc;
  //get collectors

    StudentDataOp.getSchemecolofficers().success(function(data){
      $scope.schemecolofficers = data;
    })

  //allocate function
  $scope.reallocatefunct = function(){
    console.log('allocate predelq accounts');
    var confirm = $mdDialog.confirm()
        .title('Confirm')
        .textContent('Would you like to allocate this pre delinquent account')
        .ok('OK Confirmed!')
        .cancel('No Cancel');
      $mdDialog.show(confirm).then(function() {
        $.ajax({
          url: ServerAddress.address + '/api/allocatepredelq',
              type: "post", 
              data:{'acc':acc, 'newcolofficer':$scope.dataIn.newcolofficer},
              success: function(response) {
              $mdDialog.show(
                  $mdDialog.alert()
                    .title('Success')
                    .textContent(acc +' successfully allocated '+ $scope.dataIn.newcolofficer)
                    .ariaLabel('Success')
                    .ok('OK')
                ).then(function(){
                  $state.go('allocateflags');
                });
              },
              error: function(xhr) {
                alert('Error allocating pre-delq');
                console.log(xhr);
              }
            });
      }, function() {
        console.log('allocation cancelled');
      }); 
  }

})

.controller('searchaccnumberCtrl', function($scope,$scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
  var acc = $stateParams.acc;
  $scope.acc = $stateParams.acc;
  
  $scope.gridOptions = {  
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        showColumnFooter: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'viewall.csv',
        fastWatch: true,
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        }
  };
  
  $scope.gridOptions.columnDefs = [
                                   { name: 'ACCNUMBER',
                                     cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
                                   {name:'CUSTNUMBER'},
                                   {name:'CLIENTNAME', field:'CLIENT_NAME'},
                                   {name:'AROCODE'},
                                   {name:'BRANCHCODE'},
                                   {name:'DEPTCODE'},
                                   {name:'EMPLOYER'},
                                   {name:'TELNUMBER'},
                                   {name:'OUSTBALANCE'},
                                   {name:'REPAYMENTAMOUNT'},
                                   {name:'REPAYMENTDATE'},
                                   {name:'SETTLEACCBAL', field:'SETTLEACCNO'},
                                   {name:'SETTLEACCNO', field:'SETTLEACCBAL'},
                                   {name:'COLOFFICER'}
                                 ];
  loadgridData(acc);
  
  function loadgridData(acc){
    $http({
          method: 'get',
          url: ServerAddress.address + '/api/v2/searchaccnumber/' + acc,
          headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
          $scope.gridOptions.data = data;
        }).error(function (err) {
           alert('Error getgriddata'+ err) 
        });
  }
   
   $scope.showMe = function(accnumber){
     StudentDataOp.getAccount2(accnumber).success(function(data){
           $("#acc_number").val(accnumber);
           $("#cust_number").val(data[0].CUSTNUMBER);
           $("#username").val(username);
           servletPass();
           $window.open('topnav2.jsp','_blank');
      })
     };
})

//

.controller('predelinqCtrl', function($scope,$scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
  var username = localStorage.getItem("uname");
  
  $scope.gridOptions = {  
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        showColumnFooter: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'viewall.csv',
        fastWatch: true,
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        }
      };
  
  $scope.gridOptions.columnDefs = [
                                   { name: 'ACCNUMBER',
                                     cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
                                   {name:'CUSTNUMBER'},
                                   {name:'CLIENTNAME', field:'CLIENT_NAME'},
                                   {name:'AROCODE'},
                                   {name:'BRANCHCODE'},
                                   {name:'DEPTCODE'},
                                   {name:'EMPLOYER'},
                                   {name:'TELNUMBER'},
                                   {name:'OUSTBALANCE'},
                                   {name:'SETTLEACCBAL', field:'SETTLEACCNO'},
                                   {name:'SETTLEACCNO', field:'SETTLEACCBAL'}
                                 ];
  loadgridData(username);
  
  function loadgridData(username){
    $http({
          method: 'get',
          url: ServerAddress.address + '/api/status/predelinqmyallocations/' + username,
          headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
          $scope.gridOptions.data = data;
        }).error(function (err) {
           alert('Error '+err) 
        });
  }
   
   $scope.showMe = function(accnumber){
     StudentDataOp.getAccount2(accnumber).success(function(data){
        //console.log(data);
           $("#acc_number").val(accnumber);
           $("#cust_number").val(data[0].CUSTNUMBER);
           $("#username").val(username);
           servletPass();
           $window.open('topnav2.jsp','_blank');
      })
     };
})

.controller('searchempcodeCtrl', function($scope,$scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
  var empcode = $stateParams.empcode;
  var username = localStorage.getItem("uname");
  $scope.empcode = $stateParams.empcode;
  
  $scope.gridOptions = {  
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        showColumnFooter: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'viewall.csv',
        fastWatch: true,
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        }
      };
  
  $scope.gridOptions.columnDefs = [
                                   { name: 'ACCNUMBER',
                                     cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
                                   {name:'CUSTNUMBER'},
                                   {name:'CLIENTNAME', field:'CLIENT_NAME'},
                                   {name:'AROCODE'},
                                   {name:'BRANCHCODE'},
                                   {name:'DEPTCODE'},
                                   {name:'EMPLOYER'},
                                   {name:'TELNUMBER'},
                                   {name:'OUSTBALANCE'},
                                   {name:'REPAYMENTAMOUNT'},
                                   {name:'REPAYMENTDATE'},
                                   {name:'SETTLEACCBAL', field:'SETTLEACCNO'},
                                   {name:'SETTLEACCNO', field:'SETTLEACCBAL'},
                                   {name:'COLOFFICER'}
                                 ];
  loadgridData(empcode);
  
  function loadgridData(empcode){
    $http({
          method: 'get',
          url: ServerAddress.address + '/api/v2/searchdeptcode/'+empcode,
          headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
          $scope.gridOptions.data = data;
        }).error(function (err) {
           alert('Error '+err) 
        });
  }
   
   $scope.showMe = function(accnumber){
     StudentDataOp.getAccount2(accnumber).success(function(data){
           console.log(data);
           $("#acc_number").val(accnumber);
           $("#cust_number").val(data[0].CUSTNUMBER);
           $("#username").val(username);
           servletPass();
           $window.open('topnavpredelq.jsp','_blank');
      })
     };
})

.controller('searchbycustnumberCtrl', function($scope,$scope,$stateParams,$http,ServerAddress,$stateParams, $state, uiGridConstants){
	var custnumber = $stateParams.custnumber;
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'viewall.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
		  };
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'Accnumber',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	                                 {name:'CUSTNUMBER'},
	                                 {name:'Client Name', field:'CLIENT_NAME'},
	                                 {name:'AROCODE'},
	                                 {name:'DAYSINARR',
	                                	 cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
	                                       if (grid.getCellValue(row,col) > 30) {
	                                         return 'blue';
	                                       }
	                                     }},
	                                 {name:'INTRATEARR'},
	                                 {name:'OUSTBALANCE'},
	                                 {name:'REVIEWDATE'},
	                                 {name:'TOTALARREARS'},
	                                 {name:'PRINCARREARS'},
	                                 {name:'COLOFFICER'},
	                                 {name:'BRANCHNAME'}
	                               ];
	loadgridData();
	
	function loadgridData(section){
		$http({
	        method: 'get',
	        //url : 'http://localhost:8080/ecollect_3/api/status/hometest',
	        url: ServerAddress.address+'/api/v2/divall/'+section,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  //console.log(data);
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         alert('Error '+err) 
	      });
	}
	
	 $scope.state = {};
	 
	 $scope.showMe = function(accnumber){
		localStorage.setItem("acc", accnumber);
		$scope.state = $scope.gridApi.saveState.save();
        $state.go('action.action',{'id':accnumber});
     };
	
	$scope.mySearchname = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbycustnumber = undefined;
			  
			  if($scope.searchbyname !== undefined){
				  console.log('searching by name '+ $scope.searchbyname);
				  $state.go('searchbyname',{'name':$scope.searchbyname});
			  }
			  console.log('no search key detected');	
		  }
	}
   
   $scope.mySearcharocode = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbycustnumber = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbyarocode !== undefined){
				  console.log('searching by arocode '+ $scope.searchbyarocode);
				  $state.go('searchbyarocode',{'arocode':$scope.searchbyarocode});
			  }
			  console.log('no search key detected');	
		  }
	}
   
   $scope.mySearchcustnumber = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbycustnumber !== undefined){
				  console.log('searching by custnumber '+ $scope.searchbycustnumber);
				  $state.go('searchbycustnumber',{'custnumber':$scope.searchbycustnumber});
			  }
			  console.log('no search key detected');	
		  }
	}
})

.controller('searchbynameCtrl', function($scope,$scope,$http,$stateParams,ServerAddress,$stateParams, $state, uiGridConstants){
	var name = $stateParams.name;
	console.log('--> searchbynameCtrl ... '+name);
	
	$scope.mySearchname = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbycustnumber = undefined;
			  
			  if($scope.searchbyname !== undefined){
				  console.log('searching by name '+ $scope.searchbyname);
				  $state.go('searchbyname',{'name':$scope.searchbyname});
			  }
			  console.log('no search key detected');	
		  }
	}
   
   $scope.mySearcharocode = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbycustnumber = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbyarocode !== undefined){
				  console.log('searching by arocode '+ $scope.searchbyarocode);
				  $state.go('searchbyarocode',{'arocode':$scope.searchbyarocode});
			  }
			  console.log('no search key detected');	
		  }
	}
   
   $scope.mySearchcustnumber = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbycustnumber !== undefined){
				  console.log('searching by custnumber '+ $scope.searchbycustnumber);
				  $state.go('searchbycustnumber',{'custnumber':$scope.searchbycustnumber});
			  }
			  console.log('no search key detected');	
		  }
	}
})

.controller('searchbyarocodeCtrl', function($scope,$scope,$http,$stateParams,ServerAddress,$stateParams, $state, uiGridConstants){
	var arocode = $stateParams.arocode;
	console.log('--> searchbyarocodeCtrl ... '+ arocode);
	
	$scope.mySearchname = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbycustnumber = undefined;
			  
			  if($scope.searchbyname !== undefined){
				  console.log('searching by name '+ $scope.searchbyname);
				  $state.go('searchbyname',{'name':$scope.searchbyname});
			  }
			  console.log('no search key detected');	
		  }
	}
   
   $scope.mySearcharocode = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbycustnumber = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbyarocode !== undefined){
				  console.log('searching by arocode '+ $scope.searchbyarocode);
				  $state.go('searchbyarocode',{'arocode':$scope.searchbyarocode});
			  }
			  console.log('no search key detected');	
		  }
	}
   
   $scope.mySearchcustnumber = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbycustnumber !== undefined){
				  console.log('searching by custnumber '+ $scope.searchbycustnumber);
				  $state.go('searchbycustnumber',{'custnumber':$scope.searchbycustnumber});
			  }
			  console.log('no search key detected');	
		  }
	}
})

.controller('assigninvestigatorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  $scope.newinvestigator = [];
  $scope.investigators = [];
  
  StudentDataOp.get_a_provider("INVESTIGATORS").success(function (data) {
      $scope.investigators = data;
  })
  
  
    StudentDataOp.getinvintructions(id).success(function (data) {
      //$scope.newinvestigator = data;
      $scope.newinvestigator.id = data[0].ID;
      $scope.newinvestigator.cust = data[0].CUSTNUMBER;
      $scope.newinvestigator.acc = data[0].ACCNUMBER;
      $scope.newinvestigator.dateinst = moment().format('DD-MMM-YYYY');
      $scope.newinvestigator.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
    
    $scope.newinvestigatorfunc = function(){
      $scope.Loading = true;
          $timeout(function() {
            $.ajax({
            url: ServerAddress.address + '/api/addinvestigatelogs',
              type: "post", 
              data:{'id' : $stateParams.id,'dateinst' : $scope.newinvestigator.dateinst,
                  'duedate' : $scope.newinvestigator.duedate,'serviceprovider' : $scope.newinvestigator.investigator,'owner' : username
                  ,'acc': data[0].ACCNUMBER,'cust': data[0].CUSTNUMBER
                },
              success: function(response) {
                //$('#myModal').modal('hide');
                alert(data[0].CUSTNUMBER + ' successfully assigned to '+$scope.newinvestigator.investigator);
                //getinstructions(id);
                $scope.newinvestigator = [];
                $scope.Loading = false;
                $state.go('investigators')
              },error: function(xhr) {
                alert('Error');
              }
            });
          }, 1500);
    }
    })

  //due date  
  $scope.duedatefunc = function(){
    $scope.newinvestigator.duedate = moment($scope.newinvestigator.dateinst,"DD-MMM-YYYY").add(45, 'd').format("DD-MMM-YYYY");
  }

})

.controller('updateinvestigatorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  var username= localStorage.getItem("uname");

  $scope.newstatus=[];

  StudentDataOp.getinvintructions2(id).success(function (data) {
      //console.log(data);
      $scope.newstatus.statusid = data[0].ID;
      $scope.newstatus.statuspname = data[0].SERVICEPROVIDER;
      $scope.newstatus.status = data[0].STATUS;   
      $scope.newstatus.receiptdate = data[0].RECEIPTDATE;  

  $scope.statusfunc = function(){
    var statusid = document.getElementById('statusid').value;
    var statuspname = document.getElementById('statuspname').value;
    $scope.Loading = true;
          $.ajax({
          url: ServerAddress.address + '/api/investigatestatus',
            type: "post", 
            data:{'id' : $stateParams.id,'receiptdate' : $scope.newstatus.receiptdate,
            'status' : $scope.newstatus.status,'serviceprovider' : statuspname,'cust' : data[0].CUSTNUMBER
          ,'owner' : username},
            success: function(response) {
            $timeout(function() {
              $mdDialog.show(
                  $mdDialog.alert()
                    .title('Success')
                    .textContent('status updated.')
                    .ok('OK')
                ).then(function(){
                  $scope.newstatus = [];
                    $scope.Loading = false;
                    $state.go('investigators');
                });
            }, 1500);
            },
            error: function(xhr) {
              alert('Error');
            }
          });
  }
})

})

.controller('investigatorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username= localStorage.getItem("uname");
	var rights= localStorage.getItem("rights");
	
	
	$scope.instructions = [];
	
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];
	
		var $table = $('#table'), $button = $('#button');

		$table.on('check.bs.table', function (e, row) {
			$scope.detailsfunc();
	    });
		
		$scope.showassign = false;
		
		StudentDataOp.get_a_provider("INVESTIGATORS").success(function (data) {
				$scope.investigators = data;
		})

	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        document.getElementById('acc').value = d[0].ACCNUMBER;
        document.getElementById('cust').value = d[0].CUSTNUMBER;
        getinstructions(d[0].ID);
        $scope.newinvestigator = [];
        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getinvintructions(id).success(function (data) {
        //console.log(data);
				$scope.instructions = data;
			})
		}
		
	
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/investigatefeenote',
  		   	  type: "post", 
  		   	  data:{'id' : feenoteid,'feenote' : $scope.newfeenote.feenote,'datefeenote' : $scope.newfeenote.datefeenote,'serviceprovider' : spname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('fee note updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(feenoteid);
  				    	$scope.newfeenote = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.extendfunc = function(){
		var extendid = document.getElementById('extendid').value;
		var extendspname = document.getElementById('extendspname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/investigatextend',
  		   	  type: "post", 
  		   	  data:{'id' : extendid,'extdate' : $scope.extend.extdate,'extduedate' : $scope.extend.extduedate,'serviceprovider' : extendspname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Period extended')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(extendid);
  				    	$scope.extend = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}

  

	//charts	
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_investigators().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}		

	$scope.myDataSource = {
		    chart: {
		        caption: "Co-operative Bank of Kenya",
		        subCaption: "Investigators",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "COLLECTION AFRICA LTD",
		        value: "88"
		    },
		    {
		        label: "QUEST HOLDINGS",
		        value: "73"
		    },
		    {
		        label: "LEAKEY'S STORAGE LTD",
		        value: "59"
		    },
		    {
		        label: "KYEVALUKI YARD",
		        value: "52"
		    }]
		};

		//$scope.updateMyChartData();
})

.controller('updateauctioneersCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
	var id = $stateParams.id;
	$scope.newstatus = [];

		StudentDataOp.getauctintructions2(id).success(function (data) {
			//console.log(data);
			$scope.newstatus.statusid = data[0].ID;
			$scope.newstatus.statuspname = data[0].SERVICEPROVIDER;
			$scope.newstatus.dateauction = data[0].DATEAUCTION;
			$scope.newstatus.auctionamount = data[0].AUCTIONAMOUNT;
			$scope.newstatus.offeramount = data[0].OFFERAMOUNT;
			$scope.newstatus.status = data[0].STATUS;
			$scope.newstatus.remarks = data[0].REMARKS;

      $scope.statusfunc = function(){
        var statusid = document.getElementById('statusid').value;
        var statuspname = document.getElementById('statuspname').value;
        $scope.Loading = true;
            $timeout(function() {
              $.ajax({
              url: ServerAddress.address + '/api/auctioneerstatus',
                type: "post", 
                data:
                {
                  'id' : statusid,'status' : $scope.newstatus.status,'serviceprovider' : statuspname,
                  'auctionamount' : $scope.newstatus.auctionamount,'offeramount' : $scope.newstatus.offeramount,
                  'dateauction' : $scope.newstatus.dateauction,'remarks' : $scope.newstatus.remarks,
                  'cust' : data[0].CUSTNUMBER
                },
                success: function(response) {
                  alert('Status updated.');
                  $scope.Loading = false;
                  $state.go('auctioneers');
                },
                error: function(xhr) {
                  alert('Error');
                }
              });
            }, 1500);
      }
		})	
})

.controller('assignauctioneerCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
	var username= localStorage.getItem("uname");
	var id = $stateParams.id;
	$scope.newauctioneer = [];

    StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
      $scope.auctioneers = data;
    })
	
	
		StudentDataOp.getauctintructions(id).success(function (data) {
			//console.log(data);
			document.getElementById("id").value = data[0].ID;
			document.getElementById("cust").value = data[0].CUSTNUMBER;
			document.getElementById("acc").value = data[0].ACCNUMBER;
			document.getElementById("dateinst").value = moment().format('DD-MMM-YYYY'); 

      $scope.newauctioneerfunc = function(){
          $scope.Loading = true;
              $timeout(function() {
                $.ajax({
                url: ServerAddress.address + '/api/addauctioneerlogs',
                  type: "post", 
                  data:{'id' : data[0].ID,'dateinst' : document.getElementById("dateinst").value ,'duedate' : document.getElementById("duedate").value,
                  'serviceprovider' : $scope.newauctioneer.auctioneer,'owner' : username
                  ,'acc':data[0].ACCNUMBER,'cust' : data[0].CUSTNUMBER},
                  success: function(response) {
                    //$('#myModal').modal('hide');
                    $scope.Loading = false;
                    alert(data[0].ACCNUMBER + ' successfully allocated to '+ $scope.newauctioneer.auctioneer);
                    $state.go('auctioneers');
                  },
                  error: function(xhr) {
                    alert('Error');
                  }
                });
              }, 1500);
        }
		})
})

.controller('auctioneersCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username= localStorage.getItem("uname");
	var rights= localStorage.getItem("rights");

  $scope.total = 0;
  $scope.showcancel = true;
	
	$scope.auctioneers = [];
	$scope.instructions = [];
	$scope.newfeenote = [];
	$scope.extend = [];
	$scope.server = ServerAddress.address;
	
	var $table = $('#table'), $button = $('#button');
	
	$table.on('check.bs.table', function (e, row) {
		$scope.detailsfunc();
    });

  $table.on('click-row.bs.table', function (e, row) {
    //console.log(row);
  });
		
		$scope.showassign = false;
		
		
		
	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        //document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        //document.getElementById('acc').value = d[0].ACCNUMBER;
        //document.getElementById('cust').value = d[0].CUSTNUMBER;
        getinstructions(d[0].ID);
        $scope.newauctioneer = [];

        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getauctintructions(id).success(function (data) {
        $scope.total = data.length;
				$scope.instructions = data;
			})
		}
		
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/auctioneerfeenote',
  		   	  type: "post", 
  		   	  data:{'id' : feenoteid,'feenote' : $scope.newfeenote.feenote,'datefeenote' : $scope.newfeenote.datefeenote,'serviceprovider' : spname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('fee note updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(feenoteid);
  				    	$scope.newfeenote = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.extendfunc = function(){
		var extendid = document.getElementById('extendid').value;
		var extendspname = document.getElementById('extendspname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/auctioneerextend',
  		   	  type: "post", 
  		   	  data:{'id' : extendid,'extdate' : $scope.extend.extdate,'extduedate' : $scope.extend.extduedate,'serviceprovider' : extendspname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Period extended')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(extendid);
  				    	$scope.extend = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	//charts
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_auctioneers().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

  //due date  
  $scope.duedatefunc = function(){
    $scope.newinvestigator.duedate = moment($scope.newinvestigator.dateinst,"DD-MMM-YYYY").add(45, 'd').format("DD-MMM-YYYY");
  }		

	$scope.myDataSource = {
		    chart: {
		        caption: "Co-operative Bank of Kenya",
		        subCaption: "Auctioneers",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "COLLECTION AFRICA LTD",
		        value: "88"
		    },
		    {
		        label: "QUEST HOLDINGS",
		        value: "73"
		    },
		    {
		        label: "LEAKEY'S STORAGE LTD",
		        value: "59"
		    },
		    {
		        label: "KYEVALUKI YARD",
		        value: "52"
		    },
		    {
		        label: "UPSTATE KENYA AUCTIONEERS",
		        value: "33"
		    }]
		};

	//$scope.updateMyChartData();
})

.controller('assignrepossessorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
  var username= localStorage.getItem("uname");
  var id = $stateParams.id;
  $scope.repossessors = [];
  $scope.newrepossessor = [];
  $scope.yards = [];
  
  StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
        $scope.repossessors = data;
    })
    
    StudentDataOp.get_a_provider("STORAGE YARDS").success(function (data) {
        $scope.yards = data;
    })
  
  getinstructions(id);
  
  function getinstructions(id){
    StudentDataOp.getrepointructions(id).success(function (data) {
      //$scope.newrepossessor = data;
      $scope.newrepossessor.id = data[0].ID;
      $scope.newrepossessor.cust = data[0].CUSTNUMBER;
      $scope.newrepossessor.acc = data[0].ACCNUMBER;
      $scope.newrepossessor.dateinst = moment().format('DD-MMM-YYYY');
      $scope.newrepossessor.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
    })
  }

  $scope.newrepofunc = function(){
    $scope.Loading = true;
        $timeout(function() {
          $.ajax({
          url: ServerAddress.address + '/api/addrepologs',
            type: "post", 
            data:{'id' : $stateParams.id,'dateinst' : $scope.newrepossessor.dateinst,'duedate' : $scope.newrepossessor.duedate,'serviceprovider' : $scope.newrepossessor.repossessor,'owner' : username,
          'acc': $scope.newrepossessor.acc,'cust' : $scope.newrepossessor.cust,'uniq' : makeid()},
            success: function(response) {
            alert(document.getElementById('acc').value +' successfully assigned to '+$scope.newrepossessor.repossessor)
              $scope.newinvestigator = [];
               $scope.Loading = false;
               $state.go('repossessors');
            },error: function(xhr) {
              alert('Error');
            }
          });
        }, 1500);
  }

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }

  //due date  
  $scope.duedatefunc = function(){
    $scope.newrepossessor.duedate = moment($scope.newrepossessor.dateinst,"DD-MMM-YYYY").add(30, 'd').format("DD-MMM-YYYY");
  }

})

.controller('updaterepossessorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  var username= localStorage.getItem("uname");
  $scope.newstatus=[];


   StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
        $scope.repossessors = data;
    })
    
    StudentDataOp.get_a_provider("STORAGE YARDS").success(function (data) {
        $scope.yards = data;
    })

  StudentDataOp.getrepointructions(id).success(function (data) {
      //console.log(data);
      $scope.newstatus.statusid = data[0].ID;
      $scope.newstatus.cust = data[0].CUSTNUMBER;
      $scope.newstatus.statusuniq = data[0].UNIQ;
      $scope.newstatus.statuspname = data[0].SERVICEPROVIDER;
      $scope.newstatus.daterepo = data[0].DATEREPO;
      $scope.newstatus.dateofstorage = data[0].DATEOFSTORAGE;
      $scope.newstatus.repoby = data[0].REPOBY;
      $scope.newstatus.yard = data[0].YARD;
      $scope.newstatus.status = data[0].STATUS;

    $scope.statusfunc = function(){
        //var statusid = document.getElementById('statusid').value;
        //var statuspname = document.getElementById('statuspname').value;
        var statusuniq = document.getElementById('statusuniq').value;
        $scope.Loading = true;
            $timeout(function() {
              $.ajax({
              url: ServerAddress.address + '/api/repostatus',
                type: "post", 
                data:{
                'id' : $stateParams.id,'uniq' : statusuniq,'status' : $scope.newstatus.status,
                'dateofstorage' : $scope.newstatus.dateofstorage,'daterepo' : $scope.newstatus.daterepo,
                'repoby' : $scope.newstatus.repoby,'yard' : $scope.newstatus.yard,'cust':data[0].CUSTNUMBER,
                'owner':username
              },
                success : function(response) {
                  alert('Status successfully updated');
                    $scope.newstatus = [];
                    $scope.Loading = false;
                    $state.go('repossessors');
                },
                error: function(xhr) {
                  alert('Error');
                }
              });
            }, 1500);
      }
    })
})

.controller('repossessorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username= localStorage.getItem("uname");
	var rights= localStorage.getItem("rights");
	
	$scope.repossessors = [];
	$scope.instructions = [];
	$scope.newrepossessor = [];
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];
	$scope.urladdress = ServerAddress.address;
	
		var $table = $('#table'),$button = $('#button');
		
		$table.on('check.bs.table', function (e, row) {
			$scope.detailsfunc();
	   });
		
		$scope.showassign = false;
		
		StudentDataOp.get_a_provider("REPOSSESSORS").success(function (data) {
				$scope.repossessors = data;
		})
		
		StudentDataOp.get_a_provider("STORAGE YARDS").success(function (data) {
				$scope.yards = data;
		})
		
	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        document.getElementById('acc').value = d[0].ACCNUMBER;
        document.getElementById('cust').value = d[0].CUSTNUMBER;
        getinstructions(d[0].ID);
        $scope.newrepossessor = [];
        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getrepointructions(id).success(function (data) {
        $scope.total = data.length;
				$scope.instructions = data;
			})
		}
	
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/repofeenote',
  		   	  type: "post", 
  		   	  data:{'id' : feenoteid,'feenote' : $scope.newfeenote.feenote,'datefeenote' : $scope.newfeenote.datefeenote,'serviceprovider' : spname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('fee note updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(feenoteid);
  				    	$scope.newfeenote = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.extendfunc = function(){
		var extendid = document.getElementById('extendid').value;
		var extendspname = document.getElementById('extendspname').value;

		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/repoextend',
  		   	  type: "post", 
  		   	  data:{'id' : extendid,'extdate' : $scope.extend.extdate,'extduedate' : $scope.extend.extduedate,'serviceprovider' : extendspname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Period extended')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(extendid);
  				    	$scope.extend = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}

  

	//charts
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_repossessors().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

	$scope.myDataSource = {
		    chart: {
		        Caption: "Co-operative Bank of Kenya",
		        subCaption: "Repossessors",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "COLLECTION AFRICA LTD",
		        value: "88"
		    },
		    {
		        label: "QUEST HOLDINGS",
		        value: "73"
		    },
		    {
		        label: "LEAKEY'S STORAGE LTD",
		        value: "59"
		    },
		    {
		        label: "KYEVALUKI YARD",
		        value: "52"
		    },
		    {
		        label: "UPSTATE KENYA AUCTIONEERS",
		        value: "33"
		    }]
		};

		//$scope.updateMyChartData();
})

.controller('ammendinvoicesCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,ServerAddress,StudentDataOp){
  var username = localStorage.getItem("uname");
  var rights = localStorage.getItem("rights");

  var id = $stateParams.id;

  $scope.dataIn = [];

  StudentDataOp.getinvoice(id).success(function (data) {
    //console.log(data)
    $scope.dataIn = data[0];
  })

          $scope.deleteinvoicefunc = function(){
            $scope.Loading = true;
            $.ajax({
              url: ServerAddress.address + '/api/deleteinvoice',
              type: "post", 
              data:{
              'id' : $stateParams.id
              },
              success: function(response) {
                alert('Deleted!!!!!');
                $state.go('invoices');
                $scope.Loading = false;
              }, error: function(xhr) {
                alert('Error');
                $scope.Loading = false;
              }
            });
          }

          $scope.payinvoicefunc = function(){
            $scope.Loading = true;
            $.ajax({
              url: ServerAddress.address + '/api/payinvoice',
              type: "post", 
              data:{
              'id' : $stateParams.id
              },
              success: function(response) {
                alert('invoice payment confirmed');
                $scope.Loading = false;
                $state.go('invoices');
              }, error: function(xhr) {
                alert('Error');
                $scope.Loading = false;
              }
            });
          }

          $scope.ammendinvoicefunc = function(){
          $scope.Loading = true;
          $timeout(function() {
                $.ajax({
                url: ServerAddress.address + '/api/updateinvoice',
                  type: "post", 
                  data:{
                  'id' : $stateParams.id,'custname' : document.getElementById('custname').value,'spaccount' : $scope.dataIn.SPACCOUNT,
                  'datefeenote' : document.getElementById('feenotedate').value,'custnumber' : document.getElementById('custnumber').value,'dateinput' : document.getElementById('dateinput').value,
                  'feenoteamnt' : $scope.dataIn.FEENOTEAMNT,'sptitle' : document.getElementById('sptitle').value,'accnumber' : document.getElementById('accnumber').value,
                  'approvedamnt' : $scope.dataIn.APPROVEDAMNT,'paymentmethod' : $scope.dataIn.METHOD,
                  'owner' : username,'arocode' : document.getElementById('arocode').value
                  },
                  success: function(response) {
                  $timeout(function() {
                      $mdDialog.show(
                        $mdDialog.alert()
                          .title('Success')
                          .textContent('Invoice ammended')
                          .ok('OK')
                          ).then(function(){
                          $scope.Loading = false;
                          $state.go('invoices');
                          });
                  }, 1500);
                  }, error: function(xhr) {
                    alert('Error');
                    $scope.Loading = false;
                  }
                });
              }, 1500);
    };
})

.controller('invoicesCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username = localStorage.getItem("uname");
	var rights = localStorage.getItem("rights");

	$scope.dataIn = [];
  $scope.allsptitle = [];
  $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY');

    StudentDataOp.get_all_providers().success(function (data) {
        $scope.allsptitle = data;
    })

		$scope.addinvoicefunc = function(){
			$scope.Loading = true;
			$timeout(function() {
	        	$.ajax({
	  			  url: ServerAddress.address + '/api/addinvoice',
	  		   	  type: "post", 
	  		   	  data:{
              'custname' : document.getElementById('custname').value,'spaccount' : $scope.dataIn.spaccount,
	  		   		'datefeenote' : document.getElementById('feenotedate').value,'custnumber' : document.getElementById('custnumber').value,'dateinput' : document.getElementById('dateinput').value,
	  		   	  'feenoteamnt' : document.getElementById('feenoteamnt').value,'sptitle' : document.getElementById('sptitle').value,'accnumber' : document.getElementById('accnumber').value,
	  		   	  'approvedamnt' : $scope.dataIn.approvedamnt,'paymentmethod' : $scope.dataIn.paymentmethod,
	  		   	  'owner' : username,'arocode' : document.getElementById('arocode').value
	  		   	  },
	  		   	  success: function(response) {
	  		   		$timeout(function() {
  	  					  $mdDialog.show(
  	  				      $mdDialog.alert()
  	  				        .title('Success')
  	  				        .textContent('Processed Complete.')
  	  				        .ok('OK')
  	  				    ).then(function(){
  	  			        	$scope.Loading = false;
  	  			        	$state.go('invoices');
  	  				    });
	  		   		}, 1500);
	  		   	  }, error: function(xhr) {
	  		   	    alert('Error');
	  		   	  }
	  		   	});
	        }, 1500);
		};

    //
    $scope.custaccounts = [];
    $scope.lookupdetails = function(custnumber){
      StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
        if(data.length > 0){
          //$scope.custaccounts = data;
          $scope.dataIn.arocode = data[0].AROCODE
          $scope.dataIn.custname = data[0].FIRSTNAME
          $scope.dataIn.fileno = data[0].FILENO
        }else{
          //alert('account info not found');
        }
      })

      StudentDataOp.getcmdacc(custnumber).success(function (data) {
        if(data.length > 0){
          $scope.custaccounts = data;
        }else{
          //alert('account info not found');
        }
      })
    }	

    $scope.lookspaccount = function(sptitle){
      StudentDataOp.getspaccount(sptitle).success(function (data) {
        if(data.length > 0){
          $scope.dataIn.spaccount = data[0].ACCNUMBER
        }else{
          //alert('account info not found');
        }
      })
    }
})

.controller('paymentsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username = localStorage.getItem("uname");
	var rights = localStorage.getItem("rights");

	$scope.processinvoice = [];

	var $table = $('#table'), $button = $('#button');
		$table.on('check.bs.table', function (e, row) {
			$scope.detailsfunc();
	    });

	    $scope.detailsfunc = function(){
			var d = $table.bootstrapTable('getSelections');
			//console.log(d[0]);
	        //$scope.processinvoice.id = d[0].ID;
	        document.getElementById("process_id").value = d[0].ID;
	        document.getElementById("process_amount").value = d[0].APPROVEDAMNT;
	        document.getElementById("process_sptitle").value = d[0].SPTITLE;
		}	

		$scope.confirmpayfunc = function(){
			$scope.Loading = true;
			$timeout(function() {
	        	$.ajax({
	  			  url: ServerAddress.address + '/api/confirmpayments',
	  		   	  type: "post", 
	  		   	  data:{'id' : document.getElementById("process_id").value,'status' : $scope.processinvoice.confirm},
	  		   	  success: function(response) {
	  		   		$timeout(function() {
	  					$mdDialog.show(
	  				      $mdDialog.alert()
	  				        .title('Success')
	  				        .textContent('Payment Confirmed!')
	  				        .ok('OK')
	  				    ).then(function(){
	  				    	$scope.processinvoice = [];
	  				    	document.getElementById("process_id").value = "";
	  				        document.getElementById("process_amount").value = "";
	  				        document.getElementById("process_sptitle").value = "";
	  			        	$scope.Loading = false;
	  			        	$state.reload();
	  				    });
	  		   		}, 1500);
	  		   	  }, error: function(xhr) {
	  		   	    alert('Error Confirmpayfunc()');
	  		   	  }
	  		   	});
	        }, 1500);
		}	
})

.controller('assignmarketorCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var id = $stateParams.id;
	
	$scope.newmarketor = [];
	$scope.marketors = [];
	
	StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
		$scope.marketors = data;
	})
	
	
		StudentDataOp.getmktintructions2(id).success(function (data) {
			//$scope.newmarketor = data;
			$scope.newmarketor.id = data[0].ID;
			$scope.newmarketor.cust = data[0].CUSTNUMBER;
			$scope.newmarketor.acc = data[0].ACCNUMBER;
			$scope.newmarketor.omv = data[0].OPENMARKETVALUE;
			$scope.newmarketor.fsv = data[0].FORCEDSALEVALUE;
			
			$scope.newmarketor.dateinst = moment().format('DD-MMM-YYYY');
			$scope.newmarketor.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');

      $scope.newmarketorfunc = function(){
        $scope.Loading = true;
        var id = $stateParams.id;
            $timeout(function() {
              $.ajax({
              url: ServerAddress.address + '/api/addmarketorlogs',
                type: "post", 
                data:{'id' : id,'dateinst' : $scope.newmarketor.dateinst,
                    'duedate' : $scope.newmarketor.duedate,'serviceprovider' : $scope.newmarketor.marketor,'omv' : $scope.newmarketor.omv,
                    'fsv' : $scope.newmarketor.fsv,'owner' : username,
                    'acc': data[0].ACCNUMBER,'cust' : data[0].CUSTNUMBER},
                success: function(response) {
                //close modal
                //$('#myModal').modal('hide');
                alert($scope.newmarketor.acc + ' successfully assigned to '+$scope.newmarketor.marketor);
                //getinstructions(id);
                $scope.newmarketor = [];
                $scope.Loading = false;
                $state.go('marketors');
                },
                error: function(xhr) {
                  alert('Error');
                }
              });
            }, 1500);
      }
		})	
})

.controller('updatemarketorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
	var id = $stateParams.id;
  var username = localStorage.getItem("uname");

	$scope.newstatus=[];
	
	
		StudentDataOp.getmktintructions(id).success(function (data) {
      //console.log(id);
			//console.log('Marketor to update',data);
			$scope.newstatus.statusid = data[0].ID;
			$scope.newstatus.statuspname = data[0].SERVICEPROVIDER;
			$scope.newstatus.offeramount = data[0].OFFERAMOUNT;
			$scope.newstatus.omv = data[0].OPENMARKETVALUE;
			$scope.newstatus.fsv = data[0].FORCEDSALEVALUE;
			$scope.newstatus.offerdate = data[0].OFFERDATE;
			$scope.newstatus.auctionstatus = data[0].AUCTIONSTATUS;
			$scope.newstatus.remarks = data[0].REMARKS;
			$scope.newstatus.cust = data[0].CUSTNUMBER;
			
      // check offer amount against fsv
			
			$scope.check = function(){
				var offeramount = $scope.newstatus.offeramount;
				var fsv = $scope.newstatus.fsv;
				
			if(offeramount >= fsv){
					document.getElementById('auctionstatus').value = 'READY';
				}else if(offeramount < fsv){
					document.getElementById('auctionstatus').value = 'LOW OFFER';
				}else{
					document.getElementById('auctionstatus').value = 'NO OFFER';
				}
			}
			
			$scope.check();
			
		})
		
		$scope.statusfunc = function(){
			var statusid = document.getElementById('statusid').value;
			var statuspname = document.getElementById('statuspname').value;

			$scope.Loading = true;
	        $timeout(function() {
	        	$.ajax({
	  			  url: ServerAddress.address + '/api/marketorstatus',
	  		   	  type: "post", 
	  		   	  data:
              {'id' : statusid,'status' : $scope.newstatus.status,'serviceprovider' : statuspname,'offerdate' : $scope.newstatus.offerdate
  	  		   		,'offeramount' : $scope.newstatus.offeramount,'auctionstatus' : $scope.newstatus.auctionstatus,
                'remarks' : $scope.newstatus.remarks, 'cust' : $scope.newstatus.cust, 'owner' : username
              },
	  		   	  success: function(response) {
	  		   		  		alert('status updated');
	  				    	$scope.newstatus = [];
	  			        	$scope.Loading = false;
	  			        	$state.go('marketors');
	  		   	  },
	  		   	  error: function(xhr) {
	  		   	    alert('Error');
	  		   	  }
	  		   	});
	        }, 1500);
		}

})

.controller('marketorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username = localStorage.getItem("uname");
	var rights = localStorage.getItem("rights");
	
	$scope.marketors = [];
	$scope.instructions = [];
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];
	
		var $table = $('#table'),
	    $button = $('#button');
		
		$table.on('check.bs.table', function (e, row) {
			//$scope.detailsfunc();
	    });
		
		$scope.showassign = false;
		
		StudentDataOp.get_a_provider("MARKETORS").success(function (data) {
				$scope.marketors = data;
		})
		
	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        $scope.newmarketor.acc = d[0].ACCNUMBER;
        $scope.newmarketor.cust = d[0].CUSTNUMBER;
        getinstructions(d[0].ID);
        $scope.newinvestigator = [];
        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getmktintructions(id).success(function (data) {
				$scope.totol = data.length;
				$scope.instructions = data;
			})
		}
		
	
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/marketorfeenote',
  		   	  type: "post", 
  		   	  data:{'id' : feenoteid,'feenote' : $scope.newfeenote.feenote,'datefeenote' : $scope.newfeenote.datefeenote,'serviceprovider' : spname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('fee note updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(feenoteid);
  				    	$scope.newfeenote = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.extendfunc = function(){
		var extendid = document.getElementById('extendid').value;
		var extendspname = document.getElementById('extendspname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/marketorextend',
  		   	  type: "post", 
  		   	  data:{'id' : extendid,'extdate' : $scope.extend.extdate,'extduedate' : $scope.extend.extduedate,'serviceprovider' : extendspname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Period extended')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(extendid);
  				    	$scope.extend = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	//due date 	
	$scope.duedatefunc = function(){
		$scope.newmarketor.duedate = moment($scope.newmarketor.dateinst,"DD-MMM-YYYY").add(30, 'd').format("DD-MMM-YYYY");
	}
	
	//charts
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_marketors().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

	$scope.myDataSource = {
		    chart: {
		        caption: "Co-operative Bank of Kenya",
		        subCaption: "Marketors",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "KEYSIAN AUCTIONEERS",
		        value: "88"
		    },
		    {
		        label: "JOSRICK MERCHANT AUCTIONEERS",
		        value: "73"
		    },
		    {
		        label: "DALALI TRADERS",
		        value: "59"
		    },
		    {
		        label: "BASE AUCTIONEERS",
		        value: "52"
		    },
		    {
		        label: "UPSTATE KENYA AUCTIONEERS",
		        value: "33"
		    }]
		};

		$scope.updateMyChartData();
})
.controller('assigndebtcollectorsCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  var username = localStorage.getItem("uname");
  
  $scope.newdebtcollector = [];
  $scope.debtcollectors = [];
  
  StudentDataOp.get_a_provider("DEBT COLLECTORS").success(function (data) {
        $scope.debtcollectors = data;
  })
  
  getinstructions(id);
  
  function getinstructions(id){
    StudentDataOp.getdebtintructions(id).success(function (data) {
      //$scope.newmarketor = data;
      $scope.newdebtcollector.id = data[0].ID;
      $scope.newdebtcollector.cust = data[0].CUSTNUMBER;
      $scope.newdebtcollector.acc = data[0].ACCNUMBER;
      $scope.newdebtcollector.dateinst = moment().format('DD-MMM-YYYY');
      $scope.newdebtcollector.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
    })
  }

  $scope.newdebtcollectorfunc = function(){
    $scope.Loading = true;
        $timeout(function() {
          $.ajax({
          url: ServerAddress.address + '/api/adddebtcollectorlogs',
            type: "post", 
            data:{'id' : $stateParams.id,'dateinst' : $scope.newdebtcollector.dateinst,'duedate' : $scope.newdebtcollector.duedate,'serviceprovider' : $scope.newdebtcollector.debtcollector,'owner' : username
            ,'acc':$scope.newdebtcollector.acc,'cust' : $scope.newdebtcollector.cust},
            success: function(response) {
            //$('#myModal').modal('hide');
              alert('account successfully allocated to '+ $scope.newdebtcollector.debtcollector)
             // getinstructions(id);
                $scope.newdebtcollector = [];
                  $scope.Loading = false; 
                  $state.go('debtcollectors')   
            },
            error: function(xhr) {
              alert('Error');
            }
          });
        }, 1500);
  }

})
.controller('updatedebtcollectorsCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  var username = localStorage.getItem("uname");

  $scope.newstatus=[];
  
  StudentDataOp.getdebtintructions2(id).success(function (data) {
      //console.log(data);
      $scope.newstatus.statusid = data[0].ID;
      $scope.newstatus.statuspname = data[0].SERVICEPROVIDER;
      $scope.newstatus.status = data[0].STATUS;
      $scope.newstatus.remarks = data[0].REMARKS;
      $scope.newstatus.daterecalled = data[0].DATERECALLED;

      $scope.statusfunc = function(){
        var statusid = document.getElementById('statusid').value;
        var statuspname = document.getElementById('statuspname').value;
        $scope.Loading = true;
            $timeout(function() {
              $.ajax({
              url: ServerAddress.address + '/api/debtcollectorstatus',
                type: "post", 
                data:
                {
                'id' : $stateParams.id,'status' : $scope.newstatus.status,'serviceprovider' : statuspname,
                'remarks' : $scope.newstatus.remarks, 'owner':username, 'cust':data[0].CUSTNUMBER,
                'daterecalled' : $scope.newstatus.daterecalled
                },
                success: function(response) {
                  alert('Status updated.')
                    $scope.newstatus = [];
                      $scope.Loading = false;
                      $state.go('debtcollectors');
                },
                error: function(xhr) {
                  alert('Error');
                }
              });
            }, 1500);
      }   
    })
})

.controller('debtcollectorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
	var username = localStorage.getItem("uname");
	var rights = localStorage.getItem("rights");

  $scope.total = 0;
	
	
	$scope.instructions = [];
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];
	
		var $table = $('#table'),
	    $button = $('#button');
		
		$table.on('check.bs.table', function (e, row) {
			$scope.detailsfunc();
	    });
		
		$scope.showassign = false;
		
		StudentDataOp.get_a_provider("DEBT COLLECTORS").success(function (data) {
				$scope.debtcollectors = data;
		})
		
	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        document.getElementById('acc').value = d[0].ACCNUMBER;
        document.getElementById('cust').value = d[0].CUSTNUMBER;
        getinstructions(d[0].ID);
        $scope.newdebtcollector = [];
        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getdebtintructions(id).success(function (data) {
        $scope.total = data.length;
				$scope.instructions = data;
			})
		}
	
  //due date  
  $scope.duedatefunc = function(){
    $scope.newmarketor.duedate = moment($scope.newmarketor.dateinst,"DD-MMM-YYYY").add(30, 'd').format("DD-MMM-YYYY");
  }
	//charts
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_debtcollectors().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

	$scope.myDataSource = {
		    chart: {
		        caption: "Co-operative Bank of Kenya",
		        subCaption: "Debt Collectors",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "COLLECTION AFRICA LTD",
		        value: "88"
		    },
		    {
		        label: "QUEST HOLDINGS",
		        value: "73"
		    },
		    {
		        label: "DALALI TRADERS",
		        value: "59"
		    },
		    {
		        label: "BASE AUCTIONEERS",
		        value: "52"
		    },
		    {
		        label: "UPSTATE KENYA AUCTIONEERS",
		        value: "33"
		    }]
		};

		$scope.updateMyChartData();
})//

.controller('yardsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username = localStorage.getItem("uname");
	var rights = localStorage.getItem("rights");
	
	$scope.yards = [];
	$scope.instructions = [];
	$scope.newyard = [];
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];
	
		var $table = $('#table'), $button = $('#button');
		
		$table.on('check.bs.table', function (e, row) {
			$scope.detailsfunc();
	    });
		
		$scope.showassign = false;
		
		StudentDataOp.get_a_provider("STORAGE YARDS").success(function (data) {
			$scope.yards = data;
		})
		
	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        getinstructions(d[0].ID);
        $scope.newinvestigator = [];
        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getyardsintructions(id).success(function (data) {
				$scope.instructions = data;
			})
		}
	
	$scope.newyardfunc = function(){
		$scope.Loading = true;
		var id = document.getElementById('id').value;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addyardlogs',
  		   	  type: "post", 
  		   	  data:{'id' : id,'dateinst' : $scope.newyard.dateinst,'duedate' : $scope.newyard.duedate,'serviceprovider' : $scope.newyard.serviceprovider,
  		   	  'dateauction' : $scope.newyard.dateauction,'datebooked' : $scope.newyard.datebooked,'dailyfees' : $scope.newyard.dailyfees,'remarks' : $scope.newyard.remarks
  		   	  ,'owner' : username},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account successfully allocated to '+$scope.newyard.serviceprovider)
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(id);
  				    	$scope.newvaluer = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	
	$scope.statusfunc = function(){
		var statusid = document.getElementById('statusid').value;
		var statuspname = document.getElementById('statuspname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/valuersstatus',
  		   	  type: "post", 
  		   	  data:{'id' : statusid,'status' : $scope.newstatus.status,'serviceprovider' : statuspname,'remarks' : $scope.newstatus.remarks,
  		   		  'improvementvalue' : $scope.newstatus.improvementvalue,'insurableamount' : $scope.newstatus.insurableamount
  		   		,'forcedsalevalue' : $scope.newstatus.fsv,'openmarketvalue' : $scope.newstatus.omv,'receiptdate' : $scope.newstatus.receiptdate},
  		   	  success: function(response) {
  		   		  alert('Status updated !');
  				    	getinstructions(statusid);
  				    	$scope.newstatus = [];
  			        	$scope.Loading = false;
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error updating valuer status');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/valuersfeenote',
  		   	  type: "post", 
  		   	  data:{'id' : feenoteid,'feenote' : $scope.newfeenote.feenote,'datefeenote' : $scope.newfeenote.datefeenote,'serviceprovider' : spname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('fee note updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(feenoteid);
  				    	$scope.newfeenote = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.extendfunc = function(){
		var extendid = document.getElementById('extendid').value;
		var extendspname = document.getElementById('extendspname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/valuersextend',
  		   	  type: "post", 
  		   	  data:{'id' : extendid,'extdate' : $scope.extend.extdate,'extduedate' : $scope.extend.extduedate,'serviceprovider' : extendspname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Period extended')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(extendid);
  				    	$scope.extend = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}

	//charts
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_yards().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

	$scope.myDataSource = {
		    chart: {
		        caption: "Co-operative Bank of Kenya",
		        subCaption: "Storage yards",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "COLLECTION AFRICA LTD",
		        value: "88"
		    },
		    {
		        label: "QUEST HOLDINGS",
		        value: "73"
		    },
		    {
		        label: "LEAKEY'S STORAGE LTD",
		        value: "59"
		    },
		    {
		        label: "KYEVALUKI YARD",
		        value: "52"
		    },
		    {
		        label: "UPSTATE KENYA AUCTIONEERS",
		        value: "33"
		    }]
		};

		//$scope.updateMyChartData();
})

.controller('assignvaluersCtrl', function($scope,$stateParams,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  $scope.valuers = [];
  $scope.newvaluer = [];

    StudentDataOp.get_a_provider("VALUERS").success(function (data) {
        $scope.valuers = data;
    })

    
    StudentDataOp.getvaluerintructions(id).success(function (data) {
      //$scope.newvaluer = data;
      $scope.newvaluer.id = data[0].ID;
      $scope.newvaluer.cust = data[0].CUSTNUMBER;
      $scope.newvaluer.acc = data[0].ACCNUMBER;
      $scope.newvaluer.dateinst = moment().format('DD-MMM-YYYY');
      $scope.newvaluer.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');

      $scope.newvaluersfunc = function(){
        $scope.Loading = true;
            $timeout(function() {
              $.ajax({
              url: ServerAddress.address + '/api/addvaluerslogs',
                type: "post", 
                data:{'id' : $stateParams.id,'dateinst' : $scope.newvaluer.dateinst,'duedate' : $scope.newvaluer.duedate,'serviceprovider' : $scope.newvaluer.valuer,'owner' : username
                ,'acc':data[0].CUSTNUMBER,'cust' : data[0].CUSTNUMBER},
                success: function(response) {
                   //$('#myModal').modal('hide');
                    alert(data[0].CUSTNUMBER + ' successfully allocated to '+$scope.newvaluer.valuer)
                    //getinstructions(id);
                    $scope.newvaluer = [];
                      $scope.Loading = false;
                      $state.go('valuers');
                },
                error: function(xhr) {
                  alert('Error');
                }
              });
            }, 1500);
      }
    })
      //due date  
  $scope.duedatefunc = function(){
    $scope.newvaluer.duedate = moment($scope.newvaluer.dateinst,"DD-MMM-YYYY").add(30, 'd').format("DD-MMM-YYYY");
  }

})

.controller('updatevaluersCtrl', function($scope,$stateParams,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
  var username = localStorage.getItem("uname");
  var id = $stateParams.id;
  var valuer = $stateParams.valuer;

  $scope.newstatus=[];  
  
    StudentDataOp.getvaluerintructions2(id).success(function (data) {
      //console.log(data);
      $scope.newstatus.statusid = data[0].ID;
      $scope.newstatus.statuspname = data[0].SERVICEPROVIDER;
      $scope.newstatus.offeramount = data[0].OFFERAMOUNT;
      $scope.newstatus.omv = data[0].OPENMARKETVALUE;
      $scope.newstatus.fsv = data[0].FORCEDSALEVALUE;
      $scope.newstatus.receiptdate = data[0].RECEIPTDATE;
      $scope.newstatus.insurableamount = data[0].INSURABLEAMOUNT;
      $scope.newstatus.improvementvalue = data[0].IMPROVEMENTVALUE;
      $scope.newstatus.status = data[0].STATUS;
      $scope.newstatus.remarks = data[0].REMARKS;

      $scope.statusfunc = function(){
        var statusid = document.getElementById('statusid').value;
        var statuspname = document.getElementById('statuspname').value;
        $scope.Loading = true;
            $timeout(function() {
              $.ajax({
              url: ServerAddress.address + '/api/valuersstatus',
                type: "post", 
                data:{
                  'id' : $stateParams.id,'status' : $scope.newstatus.status,'serviceprovider' : statuspname,'remarks' : $scope.newstatus.remarks,
                  'improvementvalue' : $scope.newstatus.improvementvalue,'insurableamount' : $scope.newstatus.insurableamount
                ,'forcedsalevalue' : $scope.newstatus.fsv,'openmarketvalue' : $scope.newstatus.omv,
                'receiptdate' : $scope.newstatus.receiptdate,'owner':username, 'cust':data[0].CUSTNUMBER},
                success: function(response) {
                  alert('Status updated !');
                    //getinstructions(statusid);
                    $scope.newstatus = [];
                    $scope.Loading = false;
                    $state.go('valuers');
                },
                error: function(xhr) {
                  alert('Error updating valuer status');
                }
              });
            }, 1500);
      }
      
    })

  

})

.controller('valuersCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	var username = localStorage.getItem("uname");
	var rights = localStorage.getItem("rights");

  $scope.total = 0;
	
	$scope.valuers = [];
	$scope.instructions = [];
	$scope.newvaluer = [];
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];
	
		var $table = $('#table'), $button = $('#button');
		
		$table.on('check.bs.table', function (e, row) {
			$scope.detailsfunc();
	    });
		
		$scope.showassign = false;
		
		StudentDataOp.get_a_provider("VALUERS").success(function (data) {
				$scope.valuers = data;
		})
		
	$scope.detailsfunc = function(){
		var d = $table.bootstrapTable('getSelections');
        document.getElementById('id').value = d[0].ID;
        $scope.name = d[0].CUSTNAME;
        document.getElementById('acc').value = d[0].ACCNUMBER;
        document.getElementById('cust').value = d[0].CUSTNUMBER;
        getinstructions(d[0].ID);
        $scope.newinvestigator = [];

        if(rights === 'Admin'){
        	$scope.showassign = true;
        }else{
        	$scope.showassign = false;
        }
	}
	
		function getinstructions(id){
			StudentDataOp.getvaluerintructions(id).success(function (data) {
        $scope.total = data.length;
				$scope.instructions = data;
			})
		}
	
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/valuersfeenote',
  		   	  type: "post", 
  		   	  data:{'id' : feenoteid,'feenote' : $scope.newfeenote.feenote,'datefeenote' : $scope.newfeenote.datefeenote,'serviceprovider' : spname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('fee note updated.')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(feenoteid);
  				    	$scope.newfeenote = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.extendfunc = function(){
		var extendid = document.getElementById('extendid').value;
		var extendspname = document.getElementById('extendspname').value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/valuersextend',
  		   	  type: "post", 
  		   	  data:{'id' : extendid,'extdate' : $scope.extend.extdate,'extduedate' : $scope.extend.extduedate,'serviceprovider' : extendspname},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('Period extended')
  				        .ok('OK')
  				    ).then(function(){
  				    	getinstructions(extendid);
  				    	$scope.extend = [];
  			        	$scope.Loading = false;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}

	//charts
	$scope.updateMyChartData = function() {
		StudentDataOp.chart_valuers().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
			    $scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

	$scope.myDataSource = {
		    chart: {
		        caption: "Co-operative Bank of Kenya",
		        subCaption: "Valuers",
		        xAxisName: "Name",
		        yAxisName: "No of instructions",
		        numberPrefix: "",
		        theme: "fint"
		    },
		    data:[{
		        label: "COLLECTION AFRICA LTD",
		        value: "88"
		    },
		    {
		        label: "QUEST HOLDINGS",
		        value: "73"
		    },
		    {
		        label: "LEAKEY'S STORAGE LTD",
		        value: "59"
		    },
		    {
		        label: "KYEVALUKI YARD",
		        value: "52"
		    },
		    {
		        label: "UPSTATE KENYA AUCTIONEERS",
		        value: "33"
		    }]
		};

		$scope.updateMyChartData();
})

.controller('newyardCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	console.log('--> newyardCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
	var username= localStorage.getItem("uname");
	
	$scope.newyard = function(){
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addyard',
  		   	  type: "post", 
  		   	  data:{'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'vehicleregno' : $scope.dataIn.vehicleregno,'vehiclemake' : $scope.dataIn.vehiclemake,'dateinput' : document.getElementById('dateinput').value,
  		   		  	'owner' : username},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account submitted.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
  			        	$scope.Loading = false;
  			        	$scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	$scope.custaccounts = [];
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
				//$scope.custaccounts = data;
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
			}else{
				//alert('account info not found')
			}
		})

    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
      }else{
        //alert('account info not found')
      }
    })
	}
})

.controller('newinvestigateCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//console.log('--> newinvestigateCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
  $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 

	var username= localStorage.getItem("uname");
	
	$scope.newinvestigate = function(){
		//console.log($scope.dataIn);
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addinvestigate',
  		   	  type: "post", 
  		   	  data:{
                'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'propertyno' : $scope.dataIn.propertyno,'reasonforinv' : $scope.dataIn.reasonforinv,'region' : $scope.dataIn.region,'dateinput' : $scope.dataIn.dateinput,
  		   		  	'owner' : username
              },
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent($scope.dataIn.custnumber+' submitted for investigation.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
                $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 
  			        $scope.Loading = false;
  			        $scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	$scope.custaccounts = [];
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
				//$scope.custaccounts = data;
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
			}else{
				console.log('account info not found');
			}
		})

    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
      }else{
        console.log('account info not found');
      }
    })
	}
})
.controller('newmarketorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//console.log('--> newmarketorsCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
	$scope.dataIn.dateinput = new moment().format('DD-MMM-YYYY');
	var username= localStorage.getItem("uname");
	
	$scope.newmarketor = function(){
		//console.log($scope.dataIn);
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addmarketor',
  		   	  type: "post", 
  		   	  data:{'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'propertyno' : $scope.dataIn.propertyno,'ownership' : $scope.dataIn.ownership,'dateinput' : $scope.dataIn.dateinput,
  		   		  	'owner' : username,'fsv' : $scope.dataIn.fsv,'omv' : $scope.dataIn.omv},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account submitted for marketing.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
                $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 
  			        $scope.Loading = false;
  			        $scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	$scope.custaccounts = [];
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
				//$scope.custaccounts = data;
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
			}else{
				//alert('account info not found')
			}
		})

    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
      }else{
        //alert('account info not found')
      }
    })
	}
})
.controller('newauctioneersCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	$scope.showcancel = true;
	$scope.dataIn = [];
	var username= localStorage.getItem("uname");
	$scope.dataIn.dateinput = moment().format('DD-MMM-YYYY');
	//console.log($scope.dataIn.dateinst);
	//document.getElementById("dateinput").value = moment().format('DD-MMM-YYYY'); 
	//document.getElementById("dateinst2").value = moment().format('DD-MMM-YYYY'); 
	
	$scope.newautioneer = function(){
		//console.log($scope.dataIn);
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addauctioneer',
  		   	  type: "post", 
  		   	  data:{'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'propertyno' : $scope.dataIn.propertyno,'ownership' : document.getElementById("ownership").value,'vehiclemake' : $scope.dataIn.vehiclemake,'dateinput' : $scope.dataIn.dateinput,
  		   		  	'owner' : username},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account submitted for auction.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
                $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY');
  			        $scope.Loading = false;
  			        $scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	$scope.custaccounts = [];
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
				//$scope.custaccounts = data;
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
			}else{
				//alert('account info not found')
			}
		})

    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
      }else{
        //alert('account info not found')
      }
    })
	}
	
	$scope.$watch("dataIn.typeofproperty", function (newval) {
		//console.log(newval);
		if(newval === 'VEHICLE'){
			$scope.showvehicleForm = true;
		}else{
			$scope.showvehicleForm = false;
		};
     }, true);
	
})//

.controller('newdebtcollectorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//console.log('--> newdebtcollectorsCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
	var username= localStorage.getItem("uname");
  $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY');
	
	$scope.newdebtcollector = function(){
		//console.log($scope.dataIn);
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/adddebtcollector',
  		   	  type: "post", 
  		   	  data:{'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'propertyno' : $scope.dataIn.propertyno,'address' : $scope.dataIn.address,'town' : $scope.dataIn.town,'dateinput' : $scope.dataIn.dateinput,
  		   		  	'owner' : username},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account submitted for debt collection.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
                $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 
  			        $scope.Loading = false;
  			        $scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	$scope.custaccounts = [];
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
        console.log(data[0]);
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.address = data[0].ADDRESSLINE1
				$scope.dataIn.town = data[0].TOWN
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
				
			}else{
				//alert('account info not found')
			}
		})

    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
        
      }else{
        //alert('account info not found') 0728 935379
      }
    })
	}
})

.controller('newvaluerCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//console.log('--> newvaluerCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
	$scope.yards = [];
  $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY');
  $scope.dataIn.typeofproperty = 'PROPERTY';

	var username= localStorage.getItem("uname");
	
		StudentDataOp.get_a_provider('STORAGE YARDS').success(function(data){
			$scope.yards = data;
		})
	
	$scope.newvaluer = function(){
		//console.log($scope.dataIn);
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addvaluer',
  		   	  type: "post", 
  		   	  data:{'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'propertyno' : $scope.dataIn.propertyno,'vehiclemake' : $scope.dataIn.vehiclemake,'dateinput' : $scope.dataIn.dateinput,
  		   		  	'yard' : $scope.dataIn.yard,'regowner' : $scope.dataIn.regowner,'ownership' : $scope.dataIn.ownership,'owner' : username},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account submitted for valuation.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
                $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 
  			        $scope.Loading = false;
  			        $scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	
	$scope.custaccounts = [];
	
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
				//$scope.custaccounts = data;
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
			}else{
				//alert('account info not found')
			}
		})

    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
      }else{
        //alert('account info not found')
      }
    })
	}

  $scope.$watch("dataIn.typeofproperty", function (newval) {
    //console.log(newval);
    if(newval == 'PROPERTY'){
      $scope.showPropertyForm = true;
      /*document.getElementById("vehiclemake").disabled = true;
      document.getElementById("yard").disabled = true;
      document.getElementById("vehiclemake").value = "";
      document.getElementById("yard").value = "";*/
    } else {
      $scope.showPropertyForm = false;
      /*document.getElementById("vehiclemake").disabled = false;
      document.getElementById("yard").disabled = false;
      document.getElementById("vehiclemake").value = "";
      document.getElementById("yard").value = "";*/
    }
  }, true);

})

.controller('newrepoCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//console.log('--> newinvestigateCtrl'); 0704-450564
	$scope.showcancel = true;
	$scope.dataIn = [];
	var username= localStorage.getItem("uname");
  $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY');
	
	$scope.newrepo = function(){
		//console.log($scope.dataIn);
		$scope.Loading = true;
		$scope.showcancel = false;
        $timeout(function() {
        	$.ajax({
  			  url: ServerAddress.address + '/api/addrepo',
  		   	  type: "post", 
  		   	  data:{'custnumber' : $scope.dataIn.custnumber,'accnumber' : $scope.dataIn.accnumber,'custname' : $scope.dataIn.custname,'arocode' : $scope.dataIn.arocode,'fileno' : $scope.dataIn.fileno,
  		   		  	'accbalance' : $scope.dataIn.accbalance,'vehicleregno' : $scope.dataIn.vehicleregno,'vehiclemake' : $scope.dataIn.vehiclemake,'dateinput' : $scope.dataIn.dateinput,
  		   		  	'owner' : username},
  		   	  success: function(response) {
  		   		$timeout(function() {
  					$mdDialog.show(
  				      $mdDialog.alert()
  				        .title('Success')
  				        .textContent('account submitted for repossession.')
  				        .ok('OK')
  				    ).then(function(){
  				    	$scope.dataIn = [];
                $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 
  			        $scope.Loading = false;
  			        $scope.showcancel = true;
  				    });
  		   		}, 1500);
  		   	  },
  		   	  error: function(xhr) {
  		   	    alert('Error');
  		   	  }
  		   	});
        }, 1500);
	}
	$scope.custaccounts = [];
	$scope.lookupdetails = function(custnumber){
		StudentDataOp.getcmdaccinfo(custnumber).success(function (data) {
			if(data.length > 0){
				//$scope.custaccounts = data;
				$scope.dataIn.arocode = data[0].AROCODE
				$scope.dataIn.custname = data[0].FIRSTNAME
				$scope.dataIn.fileno = data[0].FILENO
				$scope.dataIn.accnumber = data[0].ACCNUMBER
				$scope.dataIn.accbalance = data[0].OUSTBALANCE
			}else{
				//alert('account info not found')
			}
		})
    StudentDataOp.getcmdacc(custnumber).success(function (data) {
      if(data.length > 0){
        $scope.custaccounts = data;
      }else{
        //alert('account info not found')
      }
    })
	}
})

.controller('branchRegionCtrl', function($scope, $http, StudentDataOp, ServerAddress){
	$scope.AttData = [];
	$scope.dataIn = {};
	$scope.submitHeader = "Submit";
	$scope.mySwitch = false;
	
	var Region = localStorage.getItem('section');
	
	$scope.witch = false;
	
	StudentDataOp.getManagers().success(function (data) {
        $scope.AttData = data;
        $scope.dataIn.section = localStorage.getItem('section');

        $scope.updateRegion = function() {    
            $scope.submitHeader = "Submitting data .....";
            $scope.mySwitch = true;
          $http({
            method: 'POST',
            url: ServerAddress.address+'/updateBrachRegion',
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
        	  alert('Data Successfully Updated');
              $scope.message = "Data Successfully Updated";
              $scope.mySwitch = false;
              $scope.submitHeader = "Submit";
            }).error(function () {
              alert("Error Updating data");
              $scope.mySwitch = false;
              $scope.submitHeader = "Submit";
            });
        };  
    }).error(function (error) {
        $scope.status = 'Unable to load regions: ' + error.message;
    });
})

.controller('managersCtrl', function($scope, $http, StudentDataOp, ServerAddress){
	$scope.AttData = [];
	$scope.Managers= [];
	$scope.dataIn = {};
	$scope.submitHeader = "Submit";
	$scope.mySwitch = false;
	var Region = localStorage.getItem('section');
	
	$scope.witch = false;
	
	getBranch();
	//$scope.refreshRegion = getRegion();
	
	function getBranch(){
		StudentDataOp.getManagers().success(function (data) {
			$scope.Managers = data;
		}).error(function (error) {
	        alert('Master-ctrl line 130:Error retrieving Branch Managers');
	    });
	};

        $scope.updateRegion = function() {    
            $scope.submitHeader = "Submitting data .....";
            $scope.mySwitch = true;
          $http({
            method: 'POST',
            url: ServerAddress.address+'/updateBrachRegion',
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
        	  alert('Data Successfully Updated');
              $scope.message = "Data Successfully Updated";
              $scope.mySwitch = false;
              $scope.submitHeader = "Submit";
            }).error(function () {
              alert("Error Updating data");
              $scope.mySwitch = false;
              $scope.submitHeader = "Submit";
            });
        };  
	

})

.controller('editmanagerCtrl', function($scope, $http, StudentDataOp, ServerAddress,$stateParams,$state){
	$scope.branchid = $stateParams.branchid;
	$scope.dataIn = {};
	$scope.Branch_to_Edit = {};
	$scope.users = [];
	
	getBranchId();
	
	function getBranchId(){
		StudentDataOp.getBranch($scope.branchid).success(function (data) {
			//console.log(data[0]);
			$scope.Branch_to_Edit = data[0];
			$scope.dataIn.branchid = $scope.Branch_to_Edit.BRANCHCODE;
			$scope.dataIn.branchname = $scope.Branch_to_Edit.BRANCHNAME;
			$scope.dataIn.manager = $scope.Branch_to_Edit.MANAGER;
			
			$scope.dataIn.mcu = $scope.Branch_to_Edit.REGMICROCREDIT;
			$scope.dataIn.sme = $scope.Branch_to_Edit.REGSME;
			$scope.dataIn.portfolio = $scope.Branch_to_Edit.REGPORTFOLIO;
			$scope.dataIn.assetfinance = $scope.Branch_to_Edit.REGASSETFINANCE;
			
		}).error(function (error) {
	        alert('Master-ctrl line 160:Error retrieving Branch to Edit');
	    });
	};
	
	StudentDataOp.Users().success(function (data) {
		//console.log(data);
		$scope.users = data;
		
	}).error(function (error) {
        alert('Master-ctrl line 170:Error retrieving Users');
    });
	
	$scope.editManager = function(){
		//console.log($scope.dataIn);
		$http({
            method: 'POST',
            url: ServerAddress.address+'/updateManager',
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
        	  alert('Manager Updated');
              $state.go('managers');
            }).error(function () {
              alert("Error Updating data");
              $state.go('managers');
            });
	}
	
	$scope.editBranch = function(){
		//console.log($scope.dataIn);
		$http({
            method: 'POST',
            url: ServerAddress.address+'/updatebr',
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
        	  alert('Collector Updated');
              $state.go('branch');
            }).error(function () {
              alert("Error Updating data");
              $state.go('branch');
            });
	}
})


.controller('confirmletterCtrl', function($scope,$cookieStore, $http, StudentDataOp, ServerAddress,$stateParams,$state){
	$scope.branchid = $stateParams.letterid;
	$scope.dataIn = {};
	$scope.Letter_to_Confirm = {};
	$scope.dest = "";
	
	getLetterId();
	
	function getLetterId(){
		StudentDataOp.getLetter($scope.branchid).success(function (data) {
			//console.log(data[0]);
			$scope.Letter_to_Confirm = data[0];
			$scope.dataIn.cust = $scope.Letter_to_Confirm.CUSTNUMBER;
			$scope.dataIn.doctype = $scope.Letter_to_Confirm.DOCTYPE;
			$scope.dataIn.docdesc = $scope.Letter_to_Confirm.DOCDESC;
			
			$scope.dataIn.destpath = $scope.Letter_to_Confirm.DESTPATH;
			$scope.dataIn.colofficer = $scope.Letter_to_Confirm.COLOFFICER;
			$scope.dataIn.acc = $scope.Letter_to_Confirm.ACCNUMBER;
			$scope.dataIn.confirmation = $scope.Letter_to_Confirm.CONFIMATION;
			$scope.dest = $scope.Letter_to_Confirm.DESTPATH;
			
		}).error(function (error) {
	        alert('Master-ctrl line 232:Error retrieving Letter Details');
	    });
	};
	
	$scope.confLetterfnc = function(){
		$scope.dataIn.username = $cookieStore.get('username');
		$http({
            method: 'POST',
            url: ServerAddress.address+'/letterConf',
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
        	  alert('Letter Confirmed');
              $state.go('demands');
            }).error(function () {
              alert("Error Updating data");
              $state.go('demands');
            });
	}
})


.controller('RegionCtrl', function($scope,$http, StudentDataOp, ServerAddress){
	$scope.AttData = [];
	$scope.Col = [];
	$scope.dataIn = {};
	$scope.submitHeader = "Submit";
	$scope.mySwitch = false;
	$scope.dataIn.section = localStorage.getItem('section');
	var Region = localStorage.getItem('section');
	
	refreshList();
	
	$scope.witch = false;
	$scope.witchupdate = false;
	
	StudentDataOp.Colofficer(Region).success(function (data) {
		$scope.Col = data;
		
	}).error(function (error) {
        alert('Error retrieving collectors');
    });
	
	function refreshList(){
		var Region = localStorage.getItem('section');
		StudentDataOp.Regions(Region).success(function (data) {
	        $scope.AttData = data;
	        $scope.dataIn.username = localStorage.getItem('username');
	    }).error(function (error) {
	        $scope.status = 'Unable to load regions: ' + error.message;
	    });
	}
	
	
	$scope.addRegion = function() {    
        $scope.submitHeader = "Submitting data .....";
        $scope.mySwitch = true;
      $http({
        method: 'POST',
        url: ServerAddress.address+'/addRegion',
        headers: {'Content-Type': 'application/json'},
        data : $scope.dataIn
      }).success(function (data) {
          alert('Region Added');
          $scope.message = "Successfully Processed";
          $scope.submitHeader = "Submit";
          $scope.dataIn={};
          refreshList();
          $scope.mySwitch = false;
        }).error(function () {
          alert("Error Adding data");
          $scope.submitHeader = "Submit";
          $scope.dataIn={};
        });
    }; 

        
	
  $scope.update = function(){
		$scope.witch = true;
		$scope.witchupdate = false;
		$scope.witchdelete = false;
	};
	
	$scope.add = function(){
		$scope.witch = false;
		$scope.witchupdate = true;
		$scope.witchdelete = false;
	};
	
	$scope.deleteme = function(){
		$scope.witch = false;
		$scope.witchupdate = false;
		$scope.witchdelete = true;
	};
	
	$scope.updateRegion = function() {    
	        $scope.submitHeader = "Submitting data .....";
	        $scope.mySwitch = true;
	      $http({
	        method: 'POST',
	        url: ServerAddress.address+'/updateRegion',
	        headers: {'Content-Type': 'application/json'},
	        data : $scope.dataIn
	      }).success(function (data) {
	          alert('Region Updated');
	          $scope.message = "Data Successfully Updated";
	          $scope.mySwitch = false;
	          $scope.submitHeader = "Submit";
	          refreshList();
	        }).error(function () {
	          alert("Error Updating data");
	          $scope.mySwitch = false;
	          $scope.submitHeader = "Submit";
	        });
	    };  
	    
	    $scope.deleteRegion = function() {    
	        $scope.submitHeader = "Submitting data .....";
	        $scope.mySwitch = true;
	      $http({
	        method: 'POST',
	        url: ServerAddress.address+'/deleteRegion',
	        headers: {'Content-Type': 'application/json'},
	        data : $scope.dataIn
	      }).success(function (data) {
	          $scope.message = "Region Deleted";
	          $scope.mySwitch = false;
	          $scope.submitHeader = "Submit";
	          refreshList();
	        }).error(function () {
	          alert("Error Deleting Region ");
	          $scope.mySwitch = false;
	          $scope.submitHeader = "Submit";
	        });
	    }; 
})

.controller('allocateCtrl', function($scope,$http,Upload, StudentDataOp,ServerAddress){
	$scope.AttData = [];
	$scope.dataIn = {};
	$scope.submitHeader = "Submit";
	$scope.mySwitch = false;
	$scope.Col = [];

	var Region = localStorage.getItem('section');
	
	$scope.witch = false;

	StudentDataOp.Users().success(function (data) {
        $scope.Col = data;
    })
	
	 // upload later on form submit or something similar
	    $scope.submit = function() {
	    	//console.log('uploading file ....')
	      if ($scope.form.file.$valid && $scope.file) {
	        $scope.upload($scope.file);
	      }
	    };
	    
	 // upload on file select or drop
	    $scope.upload = function (file) {
	        Upload.upload({
	            url: ServerAddress.upload,//'http://localhost:3000/upload',
	            data: {file: file, 'username': $scope.username}
	        }).then(function (resp) {
	            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });
	    };

	
	StudentDataOp.Colofficer(Region).success(function (data) {
        $scope.AttData = data;
        $scope.dataIn.section = Region;

        $scope.updateBulk = function() {    
            $scope.Loading = true
	          $http({
	            method: 'POST',
	            url: ServerAddress.address+'/bulkAllocation',
	            headers: {'Content-Type': 'application/json'},
	            data : $scope.dataIn
	          }).success(function (data) {
	              $scope.Loading = false;
	              alert('Successfully allocated');
	          }).error(function () {
	              alert("Error Reallocating Account");
	          });
        };  
    }).error(function (error) {
        $scope.status = 'Unable to load regions: ' + error.message;
    });
	
  $scope.update = function(){
		$scope.witch = true;
	};
	$scope.dataexcell = {};
	$scope.excel = function(){
		console.log('excel file '+$scope.dataexcell.filepath);
	};
										
	$scope.showuploadAuctioneers = false;
	$scope.showuploadValuers = false;
	$scope.showuploadDebtcollectors = false;
	$scope.showuploadInvestigators = false;
	$scope.showuploadMarketors = false;
	$scope.showuploadYards = false;
	$scope.showuploadRepossessors = false;

	//spaccountsupload
	$scope.$watch("dataIn.sptitle", function (newval) {
         switch (newval) {
           case 'AUCTIONEERS':
        	   	$scope.showuploadAuctioneers = true;
				$scope.showuploadValuers = false;
				$scope.showuploadDebtcollectors = false;
				$scope.showuploadInvestigators = false;
				$scope.showuploadMarketors = false;
				$scope.showuploadYards = false;
				$scope.showuploadRepossessors = false;
               break;
           case 'INVESTIGATORS':
        	   $scope.showuploadAuctioneers = false;
				$scope.showuploadValuers = false;
				$scope.showuploadDebtcollectors = false;
				$scope.showuploadInvestigators = true;
				$scope.showuploadMarketors = false;
				$scope.showuploadYards = false;
				$scope.showuploadRepossessors = false;
               break;
           case 'VALUERS':
        	   $scope.showuploadAuctioneers = false;
				$scope.showuploadValuers = true;
				$scope.showuploadDebtcollectors = false;
				$scope.showuploadInvestigators = false;
				$scope.showuploadMarketors = false;
				$scope.showuploadYards = false;
				$scope.showuploadRepossessors = false;
               break;
           case 'DEBT COLLECTORS':
        	   	$scope.showuploadAuctioneers = false;
				$scope.showuploadValuers = false;
				$scope.showuploadDebtcollectors = true;
				$scope.showuploadInvestigators = false;
				$scope.showuploadMarketors = false;
				$scope.showuploadYards = false;
				$scope.showuploadRepossessors = false;
               break;
           case 'MARKETORS':
        	   	$scope.showuploadAuctioneers = false;
				$scope.showuploadValuers = false;
				$scope.showuploadDebtcollectors = false;
				$scope.showuploadInvestigators = false;
				$scope.showuploadMarketors = true;
				$scope.showuploadYards = false;
				$scope.showuploadRepossessors = false;
               break;
           case 'STORAGE YARDS':
        	   	$scope.showuploadAuctioneers = false;
				$scope.showuploadValuers = false;
				$scope.showuploadDebtcollectors = false;
				$scope.showuploadInvestigators = false;
				$scope.showuploadMarketors = false;
				$scope.showuploadYards = true;
				$scope.showuploadRepossessors = false;
               break;
           case 'REPOSSESSORS':
        	   	$scope.showuploadAuctioneers = false;
				$scope.showuploadValuers = false;
				$scope.showuploadDebtcollectors = false;
				$scope.showuploadInvestigators = false;
				$scope.showuploadMarketors = false;
				$scope.showuploadYards = false;
				$scope.showuploadRepossessors = true;
               break;
       } }, true);

})

.controller('memoCtrl', function($scope,$http, StudentDataOp, ServerAddress){
	var division = localStorage.getItem('section');
	$scope.dataIn ={};
	$scope.Memos =[];
	$scope.dataIn.section = localStorage.getItem('section');
	$scope.witch = false;
	$scope.witch2 = false;
	$scope.submitHeader = "Submit";
	
	$scope.showadd = function(){
		$scope.witch = true;
		$scope.witch2 = false;
	}; 
	$scope.showupdate = function(){
		$scope.witch = false;
		$scope.witch2 = true;
	}; 
	
	StudentDataOp.getMemo(division).success(function(data){
		$scope.Memos = data;
	}).error(function(err){
		alert('Unable to retrieve Memo groups');
	});
	
	StudentDataOp.Colofficer(division).success(function (data) {
		$scope.Col = data;
	}).error(function (error) {
        alert('Error retrieving collectors');
    });
	
	$scope.memoadd = function(){
		$scope.submitHeader = "Submitting data .....";
        $scope.mySwitch = true;
      $http({
        method: 'POST',
        url: ServerAddress.address+'/addMemo',
        headers: {'Content-Type': 'application/json'},
        data : $scope.dataIn
      }).success(function (data) {
    	  console.log($scope.dataIn);
          $scope._message = "Memo Created";
          alert('Memo Created');
          $scope.mySwitch = false;
          $scope.submitHeader = "Submit";
        }).error(function () {
          alert("Error Creating Memo");
          $scope.mySwitch = false;
          $scope.submitHeader = "Submit";
        });
	}; 
	$scope.memoupdate = function(){
		$scope.submitHeader = "Submitting data .....";
        $scope.mySwitch = true;
      $http({
        method: 'POST',
        url: ServerAddress.address+'/UpdateMemo',
        headers: {'Content-Type': 'application/json'},
        data : $scope.dataIn
      }).success(function (data) {
          $scope._message = "Memo Updated";
          alert('Memo Updated');
          $scope.mySwitch = false;
          $scope.submitHeader = "Submit";
        }).error(function () {
          alert("Error Updating Memo");
          $scope.mySwitch = false;
          $scope.submitHeader = "Submit";
        });
	};
})

.controller('slaCtrl',function($scope,$state,$mdDialog,$timeout, StudentDataOp,ServerAddress){
	$scope.slas = [];
	
	getSla();
	
	$scope.saveNotificationSla = function(){
		$scope.Loading = true;
		$.ajax({
			  url: ServerAddress.address + '/api/addsla',
		   	  type: "post", 
		   	  data:{'newsla' : $scope.slas.newsla},
		   	  success: function(response) {
		   		$timeout(function() {
					$mdDialog.show(
				      $mdDialog.alert()
				        .title('Success')
				        .textContent('SLA successfully updated.')
				        .ok('OK')
				    ).then(function(){
				    	$scope.Loading = false;
				    	getSla();
				    });
		   		}, 1500);
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error');
		   	  }
		   	});
	}
	
	function getSla(){
		StudentDataOp.getSla().success(function(data){
			$scope.slas = data[0];
		}).error(function(err){
			alert('Unable to slas');
		});
	}
	
})

.controller('aroCtrl', function($scope,$http,$state,$mdDialog, StudentDataOp, ServerAddress){
	 var division = localStorage.getItem("section");
	 console.log('division '+division);
	
	$scope.dataIn ={};
	$scope.Memos =[];
	$scope.depart =[];
	$scope.dataIn.section = division;
	
	getAro();
	
	function getAro(division){
		StudentDataOp.getAro(division).success(function(data){
			$scope.Aros = data;
		}).error(function(err){
			alert('Unable to retrieve ARO Codes');
		});
	}
	
	
	StudentDataOp.Users().success(function (data) {
		$scope.Col = data;
	}).error(function (error) {
		console.log('Error retrieving collectors');
    });
	
	StudentDataOp.departments().success(function (data) {
		$scope.depart = data;
	}).error(function (error) {
        console.log('Error retrieving departments');
    });
	
	$scope.deptclick = function(dep){
		//console.log(dep);
		StudentDataOp.getdeptAro(dep).success(function(data){
			$scope.Aros = data;
		}).error(function(err){
			console.log('Unable to retrieve ARO Codes');
		});
	}
	
	$scope.aroadd = function(){
      $http({
        method: 'POST',
        url: ServerAddress.address+'/addAro',
        headers: {'Content-Type': 'application/json'},
        data : $scope.dataIn
      }).success(function (data) {
    	  //console.log($scope.dataIn);
          alert('AROCode Created');
          $state.go('aro');
          getAro();
        }).error(function () {
          alert("Error Creating AROCode");
          $state.go('aro');
          getAro();
        });
	};
	
	$scope.lookuparo = function(){
		//console.log($scope.dataIn.m_arocode);
		StudentDataOp.arocodeInfo($scope.dataIn.m_arocode).success(function(data){
			
			if(data.length>0){
				alert('AROCODE Already Existing');
				$scope.dataIn={};
			}
			
		}).error(function(err){
			alert('Error retrieving user');
		});
	};
	
	$scope.deleteAro = function(arocode){
		var confirm = $mdDialog.confirm()
        .title('Delete arocode '+arocode)
        .textContent('Would you like to delete arocode '+arocode)
        .ok('Please delete')
        .cancel('No Cancel');
		  $mdDialog.show(confirm).then(function() {
			  $scope.deleteAro = function(){
			      $http({
			        method: 'POST',
			        url: ServerAddress.address+'/deleteAro',
			        headers: {'Content-Type': 'application/json'},
			        data : {'arocode':arocode}
			      }).success(function (data) {
			    	  getAro();
			        }).error(function () {
			          console.log("Error Deleting arocode");
			        });
				};
		  }, function() {
		    console.log('delete cancelled')
		  });
	}
	
})

.controller('arodeleteCtrl', function($scope,$http,$stateParams,$state,StudentDataOp,ServerAddress){
	$scope.dataIn = {}
	$scope.dataIn.arocode = $stateParams.arocode;
	$scope.deleteAro = function(){
	      $http({
	        method: 'POST',
	        url: ServerAddress.address+'/deleteAro',
	        headers: {'Content-Type': 'application/json'},
	        data : $scope.dataIn
	      }).success(function (data) {
	          alert('arocode deleted');
	          $state.go('aro');
	        }).error(function () {
	          alert("Error Deleting arocode");
	          $state.go('aro');
	        });
		};
})

.controller('aroupdateCtrl', function($scope,$http,$stateParams,$state,StudentDataOp,ServerAddress){
	$scope.dataIn = {}
	$scope.Col = [];
	$scope.dataIn.arocode = $stateParams.arocode;
	
	StudentDataOp.arocodeInfo($scope.dataIn.arocode).success(function(data){
		
		console.log('arocode details ', data[0]);
		$scope.dataIn.currcolofficer = data[0].OWNER;
		$scope.dataIn.dept = data[0].DIVISION;
		
	})
	
	StudentDataOp.Users().success(function (data) {
		$scope.Col = data;
	})
	
	$scope.aroupdate = function(){
		console.log($scope.dataIn);
      $http({
        method: 'POST',
        url: ServerAddress.address+'/UpdateAro',
        headers: {'Content-Type': 'application/json'},
        data : $scope.dataIn
      }).success(function (data) {
          alert('AROCODE Updated');
          $state.go('aro');
        }).error(function (err) {
          alert("Error Updating ARO ");
          $state.go('aro');
        });
	};
})

.controller('cardsCtrl', function($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var inUrl = ServerAddress.address+'/api/status/Allcards';
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.section = division
	$scope.divisionselect = [];
	$scope.regionselect = [];
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'creditcards.csv',
		    fastWatch: true,
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		    }
	};
	
	$scope.gridOptions.columnDefs = [
				{ name: 'CARDNUMBER',
					 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 150 },
				{name:'CARDACCT',cellClass: cellColor},
				{name:'CARDNAME', field:'CARDNAME',minWidth: 200,cellClass: cellColor},
				{name:'CARDSTATUS',cellClass: cellColor},
				{name:'AGEINMONTHS',cellClass: cellColor},
				{name:'PAYMENT',cellClass: cellColor},
				{name:'LIMIT',cellClass: cellColor},
				{name:'OUTBALANCE',cellClass: cellColor},
				{name:'CYCLE',cellClass: cellColor},
				{name:'EXPPMNT',cellClass: cellColor},
				{name:'COLOFFICER',cellClass: cellColor},
				{name:'REVIEWDATE',cellClass: cellColor},
				{name:'OVEDUE',visible: false}
				];

	loadgridData('status/Allcards');
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         alert('Error '+err) 
	      });
	}
	
	function cellColor(grid, row, col, rowRenderIndex, colRenderIndex) {
        if (row.entity.OVEDUE > 5) {
              return 'red';
            }
    }
	
	$scope.showMe = function(cardacct){
		 StudentDataOp.getCard(cardacct).success(function(data){
		 	 //console.log(cardacct+ ' data is',data)
			 $("#acc_number").val(cardacct);
	         $("#cust_number").val(cardacct);
            servletPass();
	         $window.open('topnavcc.jsp','_blank');
		  })
    };
})

.controller('bucketsCtrl', function($scope,$http, ServerAddress, StudentDataOp){
	$scope.dataIn = {};
	$scope.delIn = {};
	$scope.AttData = [];
	$scope.bucketData = [];
	
	var dept = localStorage.getItem('section');
	//console.log(dept);
	
	getBuckets()
	deptUsers(dept);
	
	function deptUsers(dept){
		StudentDataOp.deptUsers(dept).success(function (data) {
			$scope.AttData = data;
		}).error(function (error) {
	        alert('Error in deptUsers()');
	    });
	};
	
	function getBuckets(){
		StudentDataOp.getBuckets().success(function (data) {
			$scope.bucketData = data;
		});
	};
	
	function getdeptBuckets(dept){
		StudentDataOp.getdeptBuckets(dept).success(function (data) {
			$scope.bucketData = data;
		});
	};
	
	$scope.saveBucket = function(){
		$http({
            method: 'POST',
            url: ServerAddress.address + '/addBucket',
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
            alert("Data Successfully Submitted");
            $scope.dataIn = {};
            getBuckets();
            }).error(function () {
              alert("Error submitting action data");
            });
	}
	
	$scope.delBucketButton = function(id){
		$scope.myShowme = true;
		$scope.delIn.id = id;
	}
	
	$scope.cancelButton = function(id){
		$scope.myShowme = false;
	}
	
	$scope.delBucket = function(){
		$http({
            method: 'POST',
            url: ServerAddress.address + '/deleteBucket',
            headers: {'Content-Type': 'application/json'},
            data : $scope.delIn
          }).success(function (data) {
            alert("Successfully Deleted");
            $scope.delIn = {};
            getBuckets();
            $scope.myShowme = false;
          }).error(function () {
              alert("Error deleting bucket");
         });
	}
	
	$scope.$watch("dataIn.division", function (newval) {
		deptUsers(newval);
  }, true);
	
	$scope.$watch("dataIn.section", function (newval) {
		getdeptBuckets(newval);
     }, true);
})

.controller('woffCtrl', function($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var inUrl = ServerAddress.address+'/api/status/woff';
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.section = division
	$scope.divisionselect = [];
	$scope.regionselect = [];
	
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

.controller('temCtrl', function($scope, StudentDataOp){
	var username= localStorage.getItem("uname");
	 $scope.foreview = '0';
	 StudentDataOp.getReviewer(username).success(function (data) {
	 	   var revw  = data[0].FULLNAME;
	 	   StudentDataOp.TotalReviewers(revw).success(function (data) {
			 $scope.foreview = data.length;
	 	   })
	    })
})

.controller('temccCtrl', function($scope, StudentDataOp){
	var username= localStorage.getItem("uname");
	//console.log('in temccCtrl with user=----'+ username);
	 $scope.foreviewcc = '0';
	 StudentDataOp.getReviewer(username).success(function (data) {
	 	   var revw  = data[0].FULLNAME;
	 	   StudentDataOp.TotalReviewerscc(revw).success(function (data) {
			 	  $scope.foreviewcc = data.length;
			 })
	    })
})

.controller('demandsCtrl', function($scope, StudentDataOp){
	 $scope.sendData = [];
	 var username= localStorage.getItem("uname");
	 StudentDataOp.UserInfo(username).success(function (data) {
		 var branch = data[0].BRANCH;
		 StudentDataOp.confirmLetter(branch).success(function (data) {
			 $scope.sendData = data;
		 })
	 })
	 
})

.controller('searchidCtrl', function($scope,$stateParams,$window,StudentDataOp){

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

;

function MasterCtrl($scope,$state,$window,$http,$timeout, Idle, $mdDialog,ServerAddress,StudentDataOp,Notification) {
	var username= localStorage.getItem("uname");
    var division= localStorage.getItem("division");
    var rights= localStorage.getItem("rights");
    
	console.log('---- MasterCtrl '+ rights); 
	
	var bbbrc = "Dashboard";
    var mobileView = 992;
    
    $scope.notifications = [];
    $scope.dataNotification = [];
    $scope.Regions = [];
    
    $scope.todaysworknotify = 0;
    $scope.worklistnotify = 0;
    $scope.myallocnotify = 0;
    $scope.overdueplansnotify = 0;
    $scope.noplansnotify = 0;
    $scope.cmd = false;
    $scope.teamleader = false;
    
    $scope.username= localStorage.getItem("uname");
    
    if(division === 'CMD'){
    	$scope.cmd = true;
    }
    
    if(rights === 'Admin'){
    	$scope.teamleader = true;
    }

	getregion();
	
    function getregion(){
		StudentDataOp.getregion().success(function(data){
			$scope.Regions = data;
		})
	}
    
    var socket = io(ServerAddress.urlsocketio);
    
      socket.on('chatmessage', function(msg){
	    //console.log('Message received ',msg);
	    getNotification();
	  });
      
      socket.on('logout', function(msg){
    	  console.log('calling logout from io');
    	  tousers();
  	  });
	
    
    $scope.sendMessage = function(msg){
        socket.emit('chatmessage',msg);
    }
    
    $scope.tousers = [];
  	$scope.messages = [];
  	$scope.pendingchatsdata = [];
  	$scope.nuofnotification = 0;
  	$scope.msgbounced = 0;
  	$scope.showread = false;
  	$scope.read = true;
	
	var msgid;

	$(document).on("click", ".openNotificationDialog", function () {
	   var receiver = $(this).data('username');
       var fullname = $(this).data('fullname');
	   document.getElementById("receiver").innerHTML = fullname;
       document.getElementById("username").value = receiver;
       
      //console.log('receiver  -- >'+receiver);
      
      $scope.dataNotification.receiver = receiver;
      $scope.dataNotification.sender = username;
	});
    
	$(document).on("click", ".readNotification", function () {
		   var message = $(this).data('id');
	       var sender = $(this).data('sender');
	       var msgid = $(this).data('msgid');
	       
		   document.getElementById("msgid").innerHTML = msgid;
	       document.getElementById("msg").innerHTML = message;
	       document.getElementById("sender").innerHTML = sender;
	       document.getElementById("msgid2").value = msgid;
	});

	getNotification();
	
	//noplans();
	//overdueplans();
	
	//bounced ajax
	var ajax_call = function() {
		getbouncedNotification();
		//console.log('ajax run ');
	};
	var interval = 1000 * 60 * 1; // where X is your every X minutes
	
	setInterval(ajax_call, interval);
	
	
	function noplans(){
		StudentDataOp.noplans(username).success(function(data){
			$scope.noplansnotify = data.length;
		})
	}

	function overdueplans(){
		StudentDataOp.overdueplans(username).success(function(data){
			$scope.overdueplansnotify = data.length;
		})
	}
	
	function getNotification(){
		StudentDataOp.getNotification(username).success(function(data){
			$scope.messages = data;
			if(data.length>0){
				Notification.error({message: 'You have '+data.length+' unread notification(s)', delay: null});
			}
		})
	}
	
	function getreadNotification(){
		StudentDataOp.getreadNotification(username).success(function(data){
			$scope.messages = data;
		})
	}
	
	function getbouncedNotification(){
		StudentDataOp.getbouncedNotification(username).success(function(data){
			//
			if(data.length>0){
				//console.log(data);
				$scope.msgbounced = data.length;
				$scope.messages = data;
				//send email
				$.ajax({
					  url: ServerAddress.urlemail + '/api/v2/bouncednotificationemail',
				   	  type: "post", 
				   	  data:{'sender':data[0].SENDER,'totalNum':data.length,'slatime':data[0].SLATIME,'receiver':data[0].RECEIVER,'msg':data[0].MESSAGE},
				   	  success: function(response) {
				   		  //
				   	  },
				   	  error: function(xhr) {
				   	    alert('Error');
				   	  }
				 });
				//update notesent
				for(var i=0; i < data.length; i++){
					var id = data[i].ID;
						//console.log('to update-->'+id);
					$.ajax({
						  url: ServerAddress.address + '/api/updatenotesent',
					   	  type: "post", 
					   	  data:{'id':id},
					   	  success: function(response) {
					   		  //console.log('updated-->'+id);
					   	  }
					 });
				}
			}
		})
	}
	
	//pending chats
	pendingChats();
	
	function pendingChats(){
		StudentDataOp.pendingChats(username).success(function(data){
			if(data.length > 0){
				Notification.error({message: 'You have '+data.length+' pending chat(s)', delay: null});
				for (var i = 0; i < data.length; i++) { 
				    var pending_from = data[0].USER_FROM;
					var pending_msg = data[0].MSG;
					var timesent = data[0].TIME_SENT;
				    
				    $.ajax({
				    	  url: ServerAddress.address + '/api/v2/userstatus/' + pending_from +'?_=' + new Date().getTime(), //to prevent cache, repeat solution
				    	  type: "get",
				    	  cache: false,
				    	  success: function(response) {
								$scope.openChat(pending_from,response[0].VONLINE);
								$("#chatbox_"+pending_from+" .chatboxcontent").append('<div class="msg_a">'+pending_msg+'</div><p class="timesize_b">'+pending_from+" • "+timesent+'</p>');	
				    	  },
				    	  error: function(xhr) {
				    	    alert('Error pendingChats() function')
				    	  }
				    	});
				}
				//update backonline
				backonline(username);
			}
		});
	}
	
	//generate custnumber
	$scope.fillcustnumber = function(){
		if($scope.dataNotification.accnumber === undefined){
			return;
		}else{
			$scope.dataNotification.custnumber = ($scope.dataNotification.accnumber).substring(5,12);
		}
	}
	
	$scope.sendnotification = function(){
		$scope.Loading = true;
		var notifocation_data = {
  				'id' : makeid(),
		        'cust' : $scope.dataNotification.custnumber,
		        'accnumber' : $scope.dataNotification.accnumber,
		        'sender' : $scope.dataNotification.action,
		        'receiver' : $scope.dataNotification.receiver,
		        'sender' : $scope.dataNotification.sender,
		        'msg' : $scope.dataNotification.msg
		 };
		//console.log('sending this message ', notifocation_data);
		$timeout(function(){
			$.ajax({
				  url: ServerAddress.address + '/api/save_notification',
			   	  type: "post", 
			   	  data:notifocation_data,
			   	  success: function(response) {
			   		alert('Notification successfully sent.');
			   		$scope.Loading = false;
			    	$scope.sendMessage('notification sent');
			    	$scope.dataNotification = [];
			   	  },
			   	  error: function(xhr) {
			   	    alert('Error');
			   	  }
			   	});
			$scope.Loading = false;
		},1500);
		
		//send email
		
		sendEmail();
		
		function sendEmail(){
			$.ajax({
				  url: ServerAddress.urlemail + '/api/v2/email',
			   	  type: "post", 
			   	  data:notifocation_data,
			   	  success: function(response) {
			   		$scope.dataNotification = [];
			   	  },
			   	  error: function(xhr) {
			   	    alert('Error');
			   	  }
			 });
		}
		
		function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
	}
	
	//button group
	
	 $scope.msgnotRead = function(){
     	$scope.Loading = true;
		$timeout(function() {
			getNotification();
			$scope.readtitle = "Not Read";
			$scope.Loading = false;
		}, 1000);
	 }
	 
	 $scope.msgRead = function(){
     	$scope.Loading = true;
		$timeout(function() {
			getreadNotification();
			$scope.readtitle = "Read";
			$scope.Loading = false;
		}, 1000);
	 }
	 
	 $scope.msgBounced = function(){
			$scope.Loading = true;
			$timeout(function() {
				getbouncedNotification();
				$scope.readtitle = "Bounced";
				$scope.Loading = false;
			}, 1000);
		}
	
	//start id search
		$scope.searchid = '';
		$scope.accounts = [];
		$scope.searchtotal = 0;
		$scope.badge = "badges-ribbon-content badge-success";
		
		$scope.myFunct = function(keyEvent) {
			  if (keyEvent.which === 13)
				  searchidfunc();
			    $state.go('searchid');
		}
		
		if($scope.searchid == ''){
			//console.log('No id to search')
		}else{
			searchidfunc();
		}
		
		function searchidfunc(){
			//console.log('--> searchidfunc id :'+$scope.searchid);
			$http({
		        method: 'get',
		        url: ServerAddress.address + '/api/v2/searchid/'+$scope.searchid,
		        headers: {'Content-Type': 'application/json'}
		      }).success(function (data) {
		    	  $scope.accounts = data;
		    	  $scope.searchtotal = data.length;
		      }).error(function (err) {
		         alert('Error '+err) 
		      });
		}
	//end id search

	$scope.readMessagebtn = function(){
		var msgid2 = document.getElementById("msgid2").value;
		$scope.Loading = true;
        $timeout(function() {
        	$.ajax({
				  url: ServerAddress.address + '/api/read_notification',
			   	  type: "post", 
			   	  data: {'id' : msgid2, 'currdate' : new Date()},
			   	  success: function(response) {
			   		$timeout(function() {
			   			$scope.dataLoading = false;
				    	$scope.showread = true;
				    	$scope.sendMessage('msgread');
			   		}, 1000);
			   	  },
			   	  error: function(xhr) {
			   	    alert('Error');
			   	  }
			   	});
        	$scope.Loading = false;
        }, 1000);
	}
	
	//tousers data
	
	tousers();
	
	function tousers(){
		$http({
	        method: 'get',
	        cache: false,
	        url: ServerAddress.address + '/api/status/users',
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  //console.log(data)
	    	  $scope.tousers = data;
	      }).error(function (err) {
	         alert('Error '+err) 
	      });
	}
    //start chat
	$scope.openChat = function(chatuser,onlinestatus){
		//console.log('open chat with ' + chatuser + ' ' + onlinestatus);
		createChatBox(chatuser,onlinestatus);
		$("#chatbox_"+chatuser+" .chatboxtextarea").focus();
	}
    
    //Open reports
    $scope.openActivityrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity_Report","_blank");
    }
    $scope.openAmountcollectedrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=amountcollectedtest.rptdesign&__title=Amount Collected","_blank");
    }
    $scope.openOverduerpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=overdue_test.rptdesign&__showtitle=false&__title=Overdue Report","_blank");
    }
    $scope.openSmsrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=sms.rptdesign&__title=SMS Sent Report","_blank");
    }
    $scope.openNewfileanalysisrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=newfileanalysis.rptdesign&__title=New File Analysis Report","_blank");
    }
    $scope.openPortfoliomovementrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=portfoliomovt.rptdesign&__title=Portfolio Movement Report","_blank");
    }
    $scope.openRelegationanalysisrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=file_analysis_test.rptdesign&__title=Relegation Analysis","_blank");
    }
    $scope.openAllocationsummaryrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=summary_allocation_test.rptdesign&__title=Allocation Summary","_blank");
    }
    $scope.openUnreadnotificationsrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=notifications.rptdesign&__title=Unread notifications","_blank");
    }
    $scope.noplansrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=noplans.rptdesign&__title=No plans","_blank");
    }
    $scope.expiredplansrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=unattendedplans.rptdesign&__title=Expired plans","_blank");
    }
    $scope.spamountcollectedrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=spamountcollected.rptdesign&__title=Service provider amount collected","_blank");
    }
    $scope.spexpiredindemnityrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=expiredindemnity.rptdesign&__title=Expired indemnity","_blank");
    }
    $scope.spstatusanalysis = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=spstatusanalysis.rptdesign&__title=Service provider status","_blank");
    }
    $scope.spfeenoterpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=spfeenote.rptdesign&__title=Service provider fee note","_blank");
    }
    $scope.sppaymenthistoryrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=sppaymenthistory.rptdesign&__title=Service provider payment history","_blank");
    }
    $scope.openInvoincesrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=invoices.rptdesign&__title=Invoices","_blank");
    }
    //openNotesrpt()
    $scope.openNotesrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=notes.rptdesign&__title=Notes","_blank");
    }
      
    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
    
  //For user timeout 
    
    $scope.events = [];
    $scope.idle = 5;
    $scope.timeout = 5;

    $scope.$on('IdleStart', function() {
      //console.log('IdleStart '+ new Date());
      /*var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/templates/timeout-dialog.html'
        });
      
      modalInstance.result.then(function (selectedItem) {
          //$scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });*/
    });
    
    $scope.$on('Keepalive', function() {
      //console.log('Keepalive '+ new Date());
    });
    
    $scope.$on('IdleTimeout', function() {
        //console.log('IdleTimeout'+ new Date());
    	loggedout(username);
    	//
        window.open("login.html","_self");
        //
        localStorage.setItem("uname","");
		localStorage.setItem("division","");
		localStorage.setItem("rights","");
		localStorage.setItem("branch","");
        
      });
    
    $scope.$on('$locationChangeStart', function(event) {
        var loggeduser = localStorage.getItem("uname");
        if(loggeduser=== null || loggeduser === undefined){
        	window.open("login.html","_self");
        }
    });

    $scope.logout = function(){
    	var confirm = $mdDialog.confirm()
		        .title('Logout')
		        .textContent('Are you sure you want to logout?')
		        .ok('OK')
		        .cancel('Cancel');
		  $mdDialog.show(confirm).then(function() {
			  	//socket.emit('logout',username);
			  	loggedout(username);
	    		//
			  	localStorage.clear();
	    		//localStorage.setItem("uname","");
	    		//localStorage.setItem("division","");
	    		//localStorage.setItem("rights","");
	    		//localStorage.setItem("branch","");
			  	
	    		window.open("login.html","_self");
	    		
		  }, function() {
		    console.log('Cancelled')
		  });
    }
    
    function loggedout(loginname){
		$http({
			url : './api/whologgedout',
			method : 'post',
			data : $.param({
		        'username' : loginname
		    }),
		    headers : {
		        'Content-Type' : 'application/x-www-form-urlencoded'
		    }
		}).success(function(response){
			
		})
    }
    
    function backonline(loginname){
    	$.ajax({
			  url: ServerAddress.address + '/api/backonline',
		   	  type: "post", 
		   	  data:{'username' : loginname},
		   	  success: function(response) {
		   	  },
		   	  error: function(xhr) {
		   	    alert('Error backonline');
		   	  }
		   	});
    }
}

function dataLoading_all_fnc($scope, $http, $cookieStore, ServerAddress){
	$scope.indata = {};
	
	var dept = localStorage.getItem("division");
	var branchcode = localStorage.getItem("branch");
	
	var inUrl = ServerAddress.address+'/api/v2/divall/'+dept;
	dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	
	$scope.in_arocode = ""
	
	$scope.deptclick = function(dep){
		var inUrl = ServerAddress.address+'/api/v2/divall/'+dep;
		dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	}
	
	$scope.arodeptclick = function(dep){
		var inUrl = ServerAddress.address+'/api/v2/branchall/'+dep;
		dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	}
	
}

function dataLoading_branch_fnc($scope, $http, $cookieStore, ServerAddress){
	$scope.indata = {};

	var dept = localStorage.getItem("division");
	var branchcode = localStorage.getItem("branch");
	$scope.branchcode = localStorage.getItem("branch");
	
	var inUrl = ServerAddress.address+'/api/v2/divallbranch/'+branchcode;
	
	dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	
	$scope.in_arocode = ""
	
	$scope.arodeptclick = function(dep){
		var inUrl = ServerAddress.address+'/api/v2/branchall/'+dep;
		dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	}
	
	$scope.deptclick = function(dep){
		var inUrl = ServerAddress.address+'/api/v2/divall/'+dep;
		dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	}
		
}

function dataLoading_port_fnc($scope, $http, $cookieStore, ServerAddress){
	
	var dept = "PORTFOLIO";
	var inUrl = ServerAddress.address+'/api/v2/portfolioall/'+dept;
	dataLoadingfnc_port($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	
}

function dataLoading_all_fnc_closed($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var dept = localStorage.getItem("division");
	var inUrl = ServerAddress.address+'/api/v2/closed/'+dept;
	//dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	
	$scope.section = division
	$scope.divisionselect = [];
	$scope.regionselect = [];
	
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
	                                 {name:'ACCNUMBER', cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 140, enableFiltering: false },
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
}

function dataLoading_all_fnc_cc($scope, $http, $cookieStore, ServerAddress){
	var inUrl = ServerAddress.address+'/api/status/Allcards';
	dataLoadingfnc_cc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	
	$scope.deptclick = function(dep){
		var inUrl = ServerAddress.address+'/api/v2/divall/'+dep;
		dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
	}
}

function dataLoading_all_fnc_trw($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	
}

function dataLoading_all_fnc_due($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	   var br = localStorage.getItem("branch");
 	   var inUrl = ServerAddress.address+'/api/v2/dueissued/' + br;
 	   //dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);

    $scope.section = division
    $scope.divisionselect = [];
    $scope.regionselect = [];
    
    $scope.gridOptions = {  
          enableFiltering: true,
          flatEntityAccess: true,
          showGridFooter: true,
          showColumnFooter: true,
          enableGridMenu: true,
          enableSelectAll: true,
          exporterCsvFilename: 'Letters due.csv',
          fastWatch: true,
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          }
    };
    
    $scope.gridOptions.columnDefs = [
                                   { name: 'ACCNUMBER',
                                     cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 150, enableFiltering: false },
                                   {name:'CUSTNUMBER'},
                                   {name:'Client Name', field:'CLIENT_NAME', minWidth: 250},
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

    
      $http({
            method: 'get',
            url: inUrl,
            headers: {'Content-Type': 'application/json'}
          }).success(function (data) {
            $scope.gridOptions.data = data;
          }).error(function (err) {
             alert('Error '+ err) 
          });
    
    
     $scope.showMe = function(accnumber){
       StudentDataOp.getAccount(accnumber).success(function(data){
         $("#acc_number").val(accnumber);
             $("#cust_number").val(data[0].CUSTNUMBER);
             $("#username").val(username);
             servletPass();
             $window.open('topnav2.jsp','_blank');
        })
    };
}

function dataLoading_cc_fnc_trw($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
		var username = localStorage.getItem("uname");
 	   var inUrl = ServerAddress.address+'/api/v2/reviewerdatacc/'+username;
 	  //dataLoadingfnc_cc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
 	   
 		$scope.section = division
 		$scope.divisionselect = [];
 		$scope.regionselect = [];
 		
 		$scope.gridOptions = {  
 			    enableFiltering: true,
 			    flatEntityAccess: true,
 			    showGridFooter: true,
 			    showColumnFooter: true,
 			    enableGridMenu: true,
 			    enableSelectAll: true,
 			    exporterCsvFilename: 'Credit cards.csv',
 			    fastWatch: true,
 			    onRegisterApi: function(gridApi){
 			      $scope.gridApi = gridApi;
 			    }
 		};
 		
 		$scope.gridOptions.columnDefs = [
 		                				{ name: 'CARDNUMBER',
 		                					 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 150 },
 		                				{name:'CARDACCT',cellClass: cellColor},
 		                				{name:'CARDNAME', field:'CARDNAME',minWidth: 200,cellClass: cellColor},
 		                				{name:'CARDSTATUS',cellClass: cellColor},
 		                				{name:'AGEINMONTHS',cellClass: cellColor},
 		                				{name:'PAYMENT',cellClass: cellColor},
 		                				{name:'LIMIT',cellClass: cellColor},
 		                				{name:'OUTBALANCE',cellClass: cellColor},
 		                				{name:'CYCLE',cellClass: cellColor},
 		                				{name:'EXPPMNT',cellClass: cellColor},
 		                				{name:'COLOFFICER',cellClass: cellColor},
 		                				{name:'REVIEWDATE',cellClass: cellColor},
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
}


function dataLoading_to_fnc($scope, $http, $cookieStore, sharedProperties, ServerAddress){
	sharedProperties.setBreadcrump('View All');
	$scope.indata = {};
	$scope.showActivity = true;
	$scope.showAct = false;

	var user_name = localStorage.getItem("uname");
	var inUrl = SvrIP+'/api/v2/division/'+user_name;
	dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_to_wlist_fnc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/worklist/'+user_name;
	dataLoadingfnc($scope, $http, $cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_withfunds($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/withfunds/' + user_name;
	//dataLoadingfnc($scope, $http, $cookieStore, ServerAddress.address, inUrl);
  $scope.section = division
  $scope.region = "ALL"
  $scope.divisionselect = [];
  $scope.regionselect = [];
  
  $scope.gridOptions = {  
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        showColumnFooter: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'withfunds.csv',
        fastWatch: true,
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        }
  };
  
                                 $scope.gridOptions.columnDefs = [
                                   { name: 'ACCNUMBER',
                                     cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 150, enableFiltering: false },
                                   {name:'CUSTNUMBER'},
                                   {name:'Client Name', field:'CLIENT_NAME', minWidth: 250},
                                   {name:'AROCODE'},
                                   {name:'DAYSINARR'},
                                   {name:'BUCKET'},
                                   {name:'OUSTBALANCE',cellFilter: 'number: 2'},
                                   {name:'TOTALARREARS',cellFilter: 'number: 2'},
                                   {name:'PRINCARREARS',cellFilter: 'number: 2'},
                                   {name:'COLOFFICER'},
                                   {name:'BRANCHNAME'},
                                   {name:'REGIONNAME'},
                                   {name:'REVIEWDATE'}
                                 ];
  
    $http({
          method: 'get',
          url: inUrl,
          headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
          $scope.gridOptions.data = data;
        }).error(function (err) {
           alert('Error '+ err) 
        });
  
   
   $scope.showMe = function(accnumber){
     StudentDataOp.getAccount(accnumber).success(function(data){
      //console.log(data[0]);
       $("#acc_number").val(accnumber);
       $("#cust_number").val(data[0].CUSTNUMBER);
       $("#username").val(username);
           servletPass();
       $window.open('topnav2.jsp','_blank');
      })
     };
}

function dataLoading_to_new_fnc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var div = localStorage.getItem("division");
	var inUrl = ServerAddress.address+'/api/v2/newcases/'+ div;
	dataLoadingfnc($scope, $http, $cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_to_wlistport_fnc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/portfolioworklist/'+user_name;
	dataLoadingfnc_port($scope, $http, $cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_to_wlist_fnc_cc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/worklistcc/'+user_name;
	dataLoadingfnc_cc($scope, $http, $cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_to_my_fnc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/division/'+user_name;
	dataLoadingfnc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_to_port_fnc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/myallocationport/'+user_name;
	dataLoadingfnc_port($scope, $http,$cookieStore, ServerAddress.address, inUrl);
}

function dataLoading_to_my_fnc_cc($scope, $http,$cookieStore,$cacheFactory, ServerAddress){
	var user_name = localStorage.getItem("uname");
	var inUrl = ServerAddress.address+'/api/v2/cards/'+user_name;
	dataLoadingfnc_cc($scope, $http,$cookieStore, ServerAddress.address, inUrl);
}

function viewallgrid($scope, $http,$cookieStore, ServerAddress, inUrl){
	$http({
		method:'get',
		url:inUrl
	}).success(function(data, status){
		var source =
            {
                datatype: "json",
                datafields: [
                    	{ name: 'CLIENT_NAME', type: 'string' },
                        { name: 'ACCNUMBER', type: 'string' },
                        { name: 'CUSTNUMBER', type: 'string' },
                        { name: 'DAYSINARR', type: 'number' },
                        { name: 'INTRATEARR', type: 'number' },
                        { name: 'OUSTBALANCE', type: 'number'},
                        { name: 'REVIEWDATE', type: 'date' },
                        { name: 'PRINCARREARS', type: 'number'},
                        { name: 'TOTALARREARS', type: 'number'},
                        { name: 'OVEDUE', type: 'number'},
                        { name: 'COLOFFICER', type: 'string' },
                        { name: 'AROCODE', type: 'string' },
                        { name: 'BRANCHNAME', type: 'string' }
                ],
                id: 'id',
                url: url,
                root: 'Rows',
                //sortcolumn: 'TOTALARREARS',
                //sortdirection: 'desc',
                beforeprocessing: function (data) {
                    //source.totalrecords = data[0].TotalRows;
                    source.totalrecords = 5000;
                },
                filter: function()
				{
					// update the grid and send a request to the server.
					$("#jqxgrid").jqxGrid('updatebounddata', 'filter');
				},
                sort: function () {
                    // update the grid and send a request to the server.
                    $("#jqxgrid").jqxGrid('updatebounddata','sort');
                }
            };
		var dataAdapter = new $.jqx.dataAdapter(source);
        var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
            	var review = $("#jqxgrid").jqxGrid('getrowdata', row).OVEDUE;
            	
            	if (review >= 7) {
                    return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #ff0000;font-weight: bold">' + value + '</span>';
                }
                else if (review == 2) {
                    return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #006638;font-weight: bold">' + value + '</span>';
                }
                else if (review == 3) {
                    return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #9B30FF;font-weight: bold">' + value + '</span>';
                }
            };
            
        $("#jqxgrid").jqxGrid(
        {
            width : '100%',
            height : '900',
            source: dataAdapter,
            columnsresize: true,
            theme : 'coop',
            pageable: true,
            virtualmode: true,
                pageSize: 200,
                pagerButtonsCount: 10,
                filterable: true,
                sortable: true,
                showstatusbar: false,
                showtoolbar: true,
                rendergridrows: function () {
                return dataAdapter.records;
            },
            columns: [
              	  { text: 'ACCNUMBER', dataField: 'ACCNUMBER', width: 150 , cellsRenderer: accnumrender},
                  { text: 'CUSTNUMBER', datafield: 'CUSTNUMBER', cellsRenderer: cellsrenderer},
                  { text: 'CLIENT NAME', datafield: 'CLIENT_NAME', width: '15%', cellsRenderer: cellsrenderer },
                  { text: 'OUSTBALANCE', datafield: 'OUSTBALANCE', cellsformat: 'f'},
                  { text: 'PRINCARREARS', datafield: 'PRINCARREARS', cellsformat: 'f'},
                  { text: 'INTRATEARR', datafield: 'INTRATEARR', cellsformat: 'f'},
                  { text: 'TOTALARREARS', datafield: 'TOTALARREARS', cellsformat: 'f'},
                  { text: 'DAYSINARR', datafield: 'DAYSINARR' },
                  { text: 'COLOFFICER', datafield: 'COLOFFICER'},
                  { text: 'AROCODE', datafield: 'AROCODE'},
                  { text: 'REVIEWDATE', datafield: 'REVIEWDATE',cellsformat: 'dd/MM/yyyy' },
                  { text: 'BRANCHNAME', datafield: 'BRANCHNAME'}
            ]
        });
        $("#jqxgrid").bind('rowselect', function (event) {
            var row = event.args.rowindex;
            var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
            var accID = event.args.row.ACCNUMBER;
            var customerID = event.args.row.CUSTNUMBER;
            $("#acc_number").val(accID);
            $("#cust_number").val(customerID);
            servletPass();
        });
    
       function accnumrender (row, columnDataField, value) {
		return "<a href='topnav.jsp' target='_blank'>"+value+"</a>";
       };
	})
}

function viewalldataLoadingfnc($scope, $http, ServerAddress, inUrl){
	console.log('viewalldataLoadingfnc');
}

function dataLoadingfnc($scope, $http,$cookieStore, ServerAddress, inUrl){
	console.log('In dataLoadingfnc _with_ '+ inUrl);
	
	$scope.swith = true;
    $http({
    			cache: true,        
    			method: 'get',
                url: inUrl
            }).success(function (data, status) {
            	//console.log('grid data loaded with ', data[0]);
            	//$scope.branchname = data[0].BRANCHNAME;
            	$("#txt").val(JSON.stringify(data));
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'CLIENT_NAME', type: 'string' },
                        { name: 'ACCNUMBER', type: 'string' },
                        { name: 'CUSTNUMBER', type: 'string' },
                        { name: 'DAYSINARR', type: 'number' },
                        { name: 'INTRATEARR', type: 'number' },
                        { name: 'OUSTBALANCE', type: 'number'},
                        { name: 'REVIEWDATE', type: 'date' },
                        { name: 'PRINCARREARS', type: 'number'},
                        { name: 'TOTALARREARS', type: 'number'},
                        { name: 'OVEDUE', type: 'number'},
                        { name: 'COLOFFICER', type: 'string' },
                        { name: 'AROCODE', type: 'string' },
                        { name: 'BRANCHNAME', type: 'string' }
                    ],
                    id: 'gridid',
                    localdata: data,
                    sortcolumn: 'TOTALARREARS',
                	sortdirection: 'desc'
                };
                
                var dataAdapter = new $.jqx.dataAdapter(source);
                
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                	var review = $("#jqxgrid").jqxGrid('getrowdata', row).OVEDUE;
                	
                	if (review >= 7) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #ff0000;font-weight: bold">' + value + '</span>';
                    }
                    else if (review == 2) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #006638;font-weight: bold">' + value + '</span>';
                    }
                    else if (review == 3) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #9B30FF;font-weight: bold">' + value + '</span>';
                    }
                };
                
                $("#jqxgrid").jqxGrid(
                {
                    width : '100%',
                    height : '900',
                    source: dataAdapter,
                    columnsresize: true,
                    theme : 'coop',
                    pageable: true,
                    pageSize: 30,
                    pagerButtonsCount: 10,
                    filterable: false,
                    sortable: true,
                    showstatusbar: false,
                    showtoolbar: true,
                    autosavestate:true,
                    autoloadstate:true,
                    rendertoolbar: function (toolbar) {
                    	var container = $("<div style='margin: 0px;'></div>");
                        var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Search: </span>");
                        var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 223px;color:black' />");
                        var submitButton = $("<button class='btn btn-sm btn-primary' style='margin-left: 5px;' id='submitButton'>Search</button>");
                        var excelExport = $("<button class='btn btn-sm btn-primary' style='margin-left: 5px;' id='excelExport'>Export to Excel</button>");
                        
                        toolbar.append(container);
                        container.append(excelExport);
                        container.append(submitButton);
                        //submitButton.jqxButton();
                        // excelExport.jqxButton({});
                    },
                    columns: [
                      { text: 'ACCNUMBER', dataField: 'ACCNUMBER', width: 150 , cellsRenderer: accnumrender},
                      { text: 'CUSTNUMBER', datafield: 'CUSTNUMBER', cellsRenderer: cellsrenderer},
                      { text: 'CLIENT NAME', datafield: 'CLIENT_NAME', width: '15%', cellsRenderer: cellsrenderer },
                      { text: 'OUSTBALANCE', datafield: 'OUSTBALANCE', cellsformat: 'f'},
                      { text: 'PRINCARREARS', datafield: 'PRINCARREARS', cellsformat: 'f'},
                      { text: 'INTRATEARR', datafield: 'INTRATEARR', cellsformat: 'f'},
                      { text: 'TOTALARREARS', datafield: 'TOTALARREARS', cellsformat: 'f'},
                      { text: 'DAYSINARR', datafield: 'DAYSINARR' },
                      { text: 'COLOFFICER', datafield: 'COLOFFICER'},
                      { text: 'AROCODE', datafield: 'AROCODE'},
                      { text: 'REVIEWDATE', datafield: 'REVIEWDATE',cellsformat: 'dd/MM/yyyy' },
                      { text: 'BRANCHNAME', datafield: 'BRANCHNAME'}
                    ]
                });
                
                // now create the widget.
                $scope.createWidget = true;
                $scope.swith = false;
                
                $("#excelExport").click(function () {
                    //$("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid'); 
                	console.log('Exporting to excel .....');
                	var data = $('#txt').val();
                	if(data == '')
                        return;
                	// Convert JSON to CSV & Display CSV
                    //$('#csv').text(ConvertToCSV(data));
                	//DownloadJSON2CSV(data);
                    JSONToCSVConvertor(data, "Portfolio Report", true);
                    
                });
                
             // create jqxWindow.
                $("#jqxwindow").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
                // create find and clear buttons.
                $("#findButton").jqxButton({ width: 70});
                $("#clearButton").jqxButton({ width: 70});
             // create dropdownlist.
                $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
                    source: [
                             	"CUSTNUMBER","ACCNUMBER","CLIENT_NAME","COLOFFICER","AROCODE","BRANCHNAME","DAYSINARR"
                            ]
                });
             // clear filters.
                $("#clearButton").click(function () {
                    $("#jqxgrid").jqxGrid('clearfilters');
                });
             // find records that match a criteria.
                $("#findButton").click(function () {
                	$("#jqxgrid").jqxGrid('clearfilters');
                    var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
                    var datafield = "";
                    switch (searchColumnIndex) {
                        case 0:
                            datafield = "CUSTNUMBER";
                            break;
                        case 1:
                            datafield = "ACCNUMBER";
                            break;
                        case 2:
                            datafield = "CLIENT_NAME";
                            break;
                        case 3:
                            datafield = "COLOFFICER";
                            break;
                        case 4:
                            datafield = "AROCODE";
                            break;
                        case 5:
                            datafield = "BRANCHNAME";
                            break;
                        case 6:
                            datafield = "DAYSINARR";
                            break;
                       
                    }
                    var searchText = $("#inputField").val();
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 1;
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgrid").jqxGrid('applyfilters');
                });
                
                $("#submitButton").click(function() {
                	var offset = $("#jqxgrid").offset();
                    $("#jqxwindow").jqxWindow('open');
                    $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 40);
            		var search = $("#searchField").val();
            	});
                
                $("#jqxgrid").bind('rowselect', function (event) {
                    var row = event.args.rowindex;
                    var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
                    var accID = event.args.row.ACCNUMBER;
                    var customerID = event.args.row.CUSTNUMBER;
                    $("#acc_number").val(accID);
                    $("#cust_number").val(customerID);
                    servletPass();
                });
                
            }).error(function (data, status) {
                // Some error occurred return "<a href='#/activity/"+value+"'>"+value+"</a>";
            });
   
    					function accnumrender (row, columnDataField, value) {
    							return "<a href='action.jsp' target='_blank'>"+value+"</a>";
   	                      };
   	                      
   	                // JSON to CSV Converter
   	                   function ConvertToCSV(objArray) {
   	                       var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   	                       var str = '';

   	                       for (var i = 0; i < array.length; i++) {
   	                           var line = '';
   	                           for (var index in array[i]) {
   	                               if (line != '') line += ','

   	                               line += array[i][index];
   	                           }

   	                           str += line + '\r\n';
   	                       }

   	                       return str;
   	                   }
   	                   
   	                   //
   	                function DownloadJSON2CSV(objArray)
   	             {
   	               var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   	               var str = '';
   	                
   	               for (var i = 0; i < array.length; i++) {
   	                 var line = '';
   	                 for (var index in array[i]) {
   	                   if(line != '') line += ','
   	                  
   	                   line += array[i][index];
   	                 }
   	              
   	                 str += line + '\r\n';
   	               }
   	              
   	               if (navigator.appName != 'Microsoft Internet Explorer')
   	               {
   	                 window.open('data:text/csv;charset=utf-8,' + escape(str));
   	               }
   	               else
   	               {
   	                 var popup = window.open('','csv','');
   	                 popup.document.body.innerHTML = '<pre>' + str + '</pre>';
   	               }     
   	             }
   	                   
   	                   //function ....22
   	      function JSONToCSVConvertor2(JSONData, ReportTitle, ShowLabel) {     

   	               //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
   	               var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
   	               var CSV = '';    
   	               //This condition will generate the Label/Header
   	               if (ShowLabel) {
   	                   var row = "";

   	                   //This loop will extract the label from 1st index of on array
   	                   for (var index in arrData[0]) {
   	                       //Now convert each value to string and comma-seprated
   	                       row += index + ',';
   	                   }
   	                   row = row.slice(0, -1);
   	                   //append Label row with line break
   	                   CSV += row + '\r\n';
   	               }

   	               //1st loop is to extract each row
   	               for (var i = 0; i < arrData.length; i++) {
   	                   var row = "";
   	                   //2nd loop will extract each column and convert it in string comma-seprated
   	                   for (var index in arrData[i]) {
   	                       row += '"' + arrData[i][index] + '",';
   	                   }
   	                   row.slice(0, row.length - 1);
   	                   //add a line break after each row
   	                   CSV += row + '\r\n';
   	               }

   	               if (CSV == '') {        
   	                   alert("Invalid data");
   	                   return;
   	               }   

   	               //this trick will generate a temp "a" tag
   	               var link = document.createElement("a");    
   	               link.id="lnkDwnldLnk";

   	               //this part will append the anchor tag and remove it after automatic click
   	               document.body.appendChild(link);

   	               var csv = CSV;  
   	               blob = new Blob([csv], { type: 'text/csv' }); 
   	               var csvUrl = window.webkitURL.createObjectURL(blob);
   	               var filename = 'UserExport.csv';
   	               $("#lnkDwnldLnk")
   	               .attr({
   	                   'download': filename,
   	                   'href': csvUrl
   	               }); 

   	               $('#lnkDwnldLnk')[0].click();    
   	               document.body.removeChild(link);
   	                }
   	                   
   	                      //for data Export
   	                   function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
   	                    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
   	                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
   	                    
   	                    var CSV = '';    
   	                    //Set Report title in first row or line
   	                    
   	                    CSV += ReportTitle + '\r\n\n';

   	                    //This condition will generate the Label/Header
   	                    if (ShowLabel) {
   	                        var row = "";
   	                        
   	                        //This loop will extract the label from 1st index of on array
   	                        for (var index in arrData[0]) {
   	                            
   	                            //Now convert each value to string and comma-seprated
   	                            row += index + ',';
   	                        }

   	                        row = row.slice(0, -1);
   	                        
   	                        //append Label row with line break
   	                        CSV += row + '\r\n';
   	                    }
   	                    
   	                    //1st loop is to extract each row
   	                    for (var i = 0; i < arrData.length; i++) {
   	                        var row = "";
   	                        
   	                        //2nd loop will extract each column and convert it in string comma-seprated
   	                        for (var index in arrData[i]) {
   	                            row += '"' + arrData[i][index] + '",';
   	                        }

   	                        row.slice(0, row.length - 1);
   	                        
   	                        //add a line break after each row
   	                        CSV += row + '\r\n';
   	                    }

   	                    if (CSV == '') {        
   	                        alert("Invalid data");
   	                        return;
   	                    }   
   	                    
   	                    //Generate a file name
   	                    var fileName = "E-Collect_";
   	                    //this will remove the blank-spaces from the title and replace it with an underscore
   	                    fileName += ReportTitle.replace(/ /g,"_");   
   	                    
   	                    //Initialize file format you want csv or xls
   	                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
   	                    
   	                    // Now the little tricky part.
   	                    // you can use either>> window.open(uri);
   	                    // but this will not work in some browsers
   	                    // or you will not get the correct file extension    
   	                    
   	                    //this trick will generate a temp <a /> tag
   	                    var link = document.createElement("a");    
   	                    link.href = uri;
   	                    
   	                    //set the visibility hidden so it will not effect on your web-layout
   	                    link.style = "visibility:hidden";
   	                    link.download = fileName + ".csv";
   	                    
   	                    //this part will append the anchor tag and remove it after automatic click
   	                    document.body.appendChild(link);
   	                    link.click();
   	                    document.body.removeChild(link);
   	                }
};

function dataLoadingfnc_cc($scope, $http,$cookieStore, SvrIP, inUrl){
	//console.log('In dataLoadingfnc cards _with_ '+ inUrl);
	
	$scope.swith = true;
	$scope.createWidget = false;
    $http({
    			cache: true,        
    			method: 'get',
                url: inUrl
            }).success(function (data, status) {
            	//console.log(data);
            	$("#txt").val(JSON.stringify(data));
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'CARDNUMBER', type: 'string' },
		                { name: 'CARDNAME', type: 'string' },
		                { name: 'CARDACCT', type: 'string' },
		                { name: 'OUTBALANCE', type: 'number' },
		                { name: 'LIMIT', type: 'number' },
		                { name: 'EXPPMNT', type: 'number' },
		                { name: 'PREVDEBT', type: 'number' },
		                { name: 'CYCLE', type: 'number' },
		                { name: 'AGEINMONTHS', type: 'string' },
		                { name: 'PAYMENT', type: 'string' },
		                { name: 'COLOFFICER', type: 'string' },
		                { name: 'OVEDUE', type: 'number'},
		                { name: 'REVIEWDATE', type: 'date',cellsformat: 'dd/MM/yyyy' }
                    ],
                    id: 'gridid',
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                	var review = $("#jqxgrid").jqxGrid('getrowdata', row).OVEDUE;
                	
                	if (review >= 7) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #ff0000;font-weight: bold">' + value + '</span>';
                    }
                    else if (review == 2) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #006638;font-weight: bold">' + value + '</span>';
                    }
                    else if (review == 3) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #9B30FF;font-weight: bold">' + value + '</span>';
                    }
                };
                
                $("#jqxgrid").jqxGrid(
                {
                    width : '100%',
                    height : '900',
                    source: dataAdapter,
                    columnsresize: true,
                    theme : 'coop',
                    pageable: true,
                    pageSize: 30,
                    pagerButtonsCount: 10,
                    filterable: true,
                    sortable: true,
                    showstatusbar: false,
                    showtoolbar: true,
                    autosavestate:false,
                    autoloadstate:false,
                    rendertoolbar: function (toolbar) {
                    	var container = $("<div style='margin: 0px;'></div>");
                        var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Search: </span>");
                        var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 223px;color:black' />");
                        var submitButton = $("<button class='btn btn-sm btn-primary' style='margin-left: 0px;' id='submitButton'>Search</button>");
                        var excelExport = $("<button class='btn btn-sm btn-primary' style='margin-left: 0px;' id='excelExport'>Export to Excel</button>");
                        
                        toolbar.append(container);
                        container.append(excelExport);
                        container.append(submitButton);
                        //submitButton.jqxButton({theme:'coop'});
                        //excelExport.jqxButton({theme:'coop'});
                    },
                    columns: [
                            { text: 'CardNumber', datafield: 'CARDNUMBER', width: 150,cellsRenderer: accnumrender },
	                        { text: 'Card Name', datafield: 'CARDNAME', width: 200, cellsRenderer : cellsrenderer },
	                        { text: 'Card Account', datafield: 'CARDACCT', width: 120, cellsRenderer : cellsrenderer },
	                        { text: 'Outstanding Balance', datafield: 'OUTBALANCE', width: 180, cellsformat: 'f' },
	                        { text: 'Cycle', datafield: 'CYCLE'},
	                        { text: 'AgeInMonths', datafield: 'AGEINMONTHS'},
	                        { text: 'Payment', datafield: 'PAYMENT'},
	                        { text: 'Limit Amount', datafield: 'LIMIT', cellsformat: 'f' },
	                        { text: 'Expected Payment', datafield: 'EXPPMNT', cellsformat: 'f' },
	                        { text: 'Previous Debt', datafield: 'PREVDEBT', cellsformat: 'f' },
	                        { text: 'Review Date', datafield: 'REVIEWDATE',cellsformat: 'dd/MM/yyyy'},
	                        { text: 'Collection Officer', datafield: 'COLOFFICER'}
                    ]
                });
                
                // now create the widget.
                $scope.createWidget = true;
                $scope.swith = false;
                
                $("#excelExport").click(function () {
                    //$("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');
                	var data = $('#txt').val();
                	if(data == '')
                        return;
                    JSONToCSVConvertor(data, "Portfolio Report", true);
                });
                
             // create jqxWindow.
                $("#jqxwindow").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
                // create find and clear buttons.
                $("#findButton").jqxButton({ width: 70});
                $("#clearButton").jqxButton({ width: 70});
             // create dropdownlist.
                $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
                    source: [
                             	"CARDNUMBER","CARDNAME","CARDACCT","COLOFFICER","CYCLE"
                    ]
                });
             // clear filters.
                $("#clearButton").click(function () {
                    $("#jqxgrid").jqxGrid('clearfilters');
                });
             // find records that match a criteria.
                $("#findButton").click(function () {
                	$("#jqxgrid").jqxGrid('clearfilters');
                    var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
                    var datafield = "";
                    switch (searchColumnIndex) {
                        case 0:
                            datafield = "CARDNUMBER";
                            break;
                        case 1:
                            datafield = "CARDNAME";
                            break;
                        case 2:
                            datafield = "CARDACCT";
                            break;
                        case 3:
                            datafield = "COLOFFICER";
                            break;
                        case 4:
                            datafield = "CYCLE";
                            break;
                    }
                    var searchText = $("#inputField").val();
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 1;
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgrid").jqxGrid('applyfilters');
                });
                
                $("#submitButton").click(function() {
                	var offset = $("#jqxgrid").offset();
                    $("#jqxwindow").jqxWindow('open');
                    $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 30);
            		var search = $("#searchField").val();
            		});
                
                $("#jqxgrid").bind('rowselect', function (event) {
                    var row = event.args.rowindex;
                    var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
                    var accID = event.args.row.CARDACCT;
                    var customerID = event.args.row.CARDACCT;
                    $("#acc_number").val(accID);
                    $("#cust_number").val(customerID);
                    servletPass();
                });
                
                var state = null;
                
                $("#saveState").click(function () {
                    // save the current state of jqxGrid.
                    state = $("#jqxgrid").jqxGrid('savestate');
                })
                ;
                $("#loadState").click(function () {
                    // load the Grid's state.
                    if (state) {
                        $("#jqxgrid").jqxGrid('loadstate', state);
                    }
                    else {
                        $("#jqxgrid").jqxGrid('loadstate');
                    }
                });
                
            }).error(function (data, status) {
                // Some error occurred return "<a href='#/activity/:"+value+"'>"+value+"</a>";
            });
   
	    	function accnumrender (row, columnDataField, value) {
	    		return "<a href='action_cc.jsp' target='_blank'>"+value+"</a>";
	    		//return "<a href='#/activitycc/"+value+"'>"+value+"</a>";
	   	    };
   	    
		   	 /*function accnumrender (row, columnDataField, value) {
					return "<a href='action.jsp' target='_blank'>"+value+"</a>";
		      };*/
   
      //for data Export
   function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
}

function dataLoadingfnc_port($scope, $http,$cookieStore, ServerAddress, inUrl){
	//console.log('In dataLoadingfnc _with_ '+ inUrl);
	
	$scope.swith = true;
    $http({
    			cache: true,        
    			method: 'get',
                url: inUrl
            }).success(function (data, status) {
            	//console.log(data[0]);
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'CLIENT_NAME', type: 'string' },
                        { name: 'ACCNUMBER', type: 'string' },
                        { name: 'CUSTNUMBER', type: 'string' },
                        { name: 'DAYSINARR', type: 'number' },
                        { name: 'TEMPLIMIT', type: 'number' },
                        { name: 'OUSTBALANCE', type: 'number'},
                        { name: 'REVIEWDATE', type: 'date' },
                        { name: 'LIMITAMOUNT', type: 'number'},
                        { name: 'TEMPLIMITEXPIRYDATE', type: 'string'},
                        { name: 'LIMITEXPIRYDATE', type: 'string'},
                        { name: 'COLOFFICER', type: 'string' },
                        { name: 'AROCODE', type: 'string' },
                        { name: 'BRANCHNAME', type: 'string' }
                    ],
                    id: 'gridid',
                    localdata: data,
                    sortcolumn: 'OUSTBALANCE',
                	sortdirection: 'asc'
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                	var review = $("#jqxgrid").jqxGrid('getrowdata', row).OVEDUE;
                	
                	if (review >= 7) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #ff0000;font-weight: bold">' + value + '</span>';
                    }
                    else if (review == 2) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #006638;font-weight: bold">' + value + '</span>';
                    }
                    else if (review == 3) {
                        return '<span style="margin: 4px;float: ' + columnproperties.cellsalign + ';color: #9B30FF;font-weight: bold">' + value + '</span>';
                    }
                };
                
                $("#jqxgrid").jqxGrid(
                {
                    width : '100%',
                    height : '900',
                    source: dataAdapter,
                    columnsresize: true,
                    theme : 'coop',
                    pageable: true,
                    pageSize: 30,
                    pagerButtonsCount: 10,
                    filterable: false,
                    sortable: true,
                    showstatusbar: false,
                    showtoolbar: true,
                    autosavestate:true,
                    autoloadstate:true,
                    rendertoolbar: function (toolbar) {
                    	var container = $("<div style='margin: 0px;'></div>");
                        var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Search: </span>");
                        var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 223px;color:black' />");
                        var submitButton = $("<button class='btn btn-sm btn-primary' style='margin-left: 5px;' id='submitButton'>Search</button>");
                        var excelExport = $("<button class='btn btn-sm btn-primary' style='margin-left: 5px;' id='excelExport'>Export to Excel</button>");
                        
                        toolbar.append(container);
                        container.append(excelExport);
                        container.append(submitButton);
                        //submitButton.jqxButton();
                        // excelExport.jqxButton({});
                    },
                    columns: [
                      { text: 'ACCNUMBER', dataField: 'ACCNUMBER', width: 150 , cellsRenderer: accnumrender},
                      { text: 'CUSTNUMBER', datafield: 'CUSTNUMBER', cellsRenderer: cellsrenderer},
                      { text: 'CLIENT NAME', datafield: 'CLIENT_NAME', width: '15%', cellsRenderer: cellsrenderer },
                      { text: 'OUSTBALANCE', datafield: 'OUSTBALANCE', cellsformat: 'f'},
                      { text: 'LIMITAMOUNT', datafield: 'LIMITAMOUNT', cellsformat: 'f'},
                      { text: 'TEMPLIMIT', datafield: 'TEMPLIMIT', cellsformat: 'f'},
                      { text: 'TEMPLIMITEXPIRYDATE', datafield: 'TEMPLIMITEXPIRYDATE'},
                      { text: 'LIMITEXPIRYDATE', datafield: 'LIMITEXPIRYDATE' },
                      { text: 'COLOFFICER', datafield: 'COLOFFICER'},
                      { text: 'REVIEWDATE', datafield: 'REVIEWDATE',cellsformat: 'dd/MM/yyyy' },
                      { text: 'BRANCHNAME', datafield: 'BRANCHNAME'}
                    ]
                });
                
                // now create the widget.
                $scope.createWidget = true;
                $scope.swith = false;
                
                $("#excelExport").click(function () {
                    $("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');           
                });
                
             // create jqxWindow.
                $("#jqxwindow").jqxWindow({ resizable: true,  autoOpen: false, width: 210, height: 180 });
                // create find and clear buttons.
                $("#findButton").jqxButton({ width: 70});
                $("#clearButton").jqxButton({ width: 70});
             // create dropdownlist.
                $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 45, 
                    source: [
                             	"CUSTNUMBER","ACCNUMBER","CLIENT_NAME","COLOFFICER","AROCODE","BRANCHNAME","DAYSINARR","REVIEWDATE"
                            ]
                });
             // clear filters.
                $("#clearButton").click(function () {
                    $("#jqxgrid").jqxGrid('clearfilters');
                });
             // find records that match a criteria.
                $("#findButton").click(function () {
                	$("#jqxgrid").jqxGrid('clearfilters');
                    var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
                    var datafield = "";
                    switch (searchColumnIndex) {
                        case 0:
                            datafield = "CUSTNUMBER";
                            break;
                        case 1:
                            datafield = "ACCNUMBER";
                            break;
                        case 2:
                            datafield = "CLIENT_NAME";
                            break;
                        case 3:
                            datafield = "COLOFFICER";
                            break;
                        case 4:
                            datafield = "AROCODE";
                            break;
                        case 5:
                            datafield = "BRANCHNAME";
                            break;
                        case 6:
                            datafield = "DAYSINARR"; //REVIEWDATE
                            break;
                        case 7:
                            datafield = "REVIEWDATE"; //
                            break;
                       
                    }
                    var searchText = $("#inputField").val();
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 1;
                    var filtervalue = searchText;
                    var filtercondition = 'contains';
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgrid").jqxGrid('applyfilters');
                });
                
                $("#submitButton").click(function() {
                	var offset = $("#jqxgrid").offset();
                    $("#jqxwindow").jqxWindow('open');
                    $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 40);
            		var search = $("#searchField").val();
            	});
                
                $("#jqxgrid").bind('rowselect', function (event) {
                    var row = event.args.rowindex;
                    var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
                    var accID = event.args.row.ACCNUMBER;
                    var customerID = event.args.row.CUSTNUMBER;
                    $("#acc_number").val(accID);
                    $("#cust_number").val(customerID);
                    servletPass();
                });
                
            }).error(function (data, status) {
                // Some error occurred return "<a href='#/activity/"+value+"'>"+value+"</a>";
            });
   
    					function accnumrender (row, columnDataField, value) {
    							return "<a href='action.jsp' target='_blank'>"+value+"</a>";
   	                      };
};