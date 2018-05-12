/**
 * 
 */
var app = angular.module('RDash');

app.controller('cardCtrl', function($scope,sharedProperties){
	
	var SvrIP = sharedProperties.getString();
	var acc = document.getElementById("acc").value;
	var cust = document.getElementById("cust").value;
	var Region = $cookieStore.get('section');
	
	  $scope.accdata = {};
	  $scope.dataIn = {};
	  $scope.datax = {};
	  $scope.notesData = {};
	  $scope.colOfficer = {};
	  $scope.Meta = {};
	  $scope.dataContacts = {};

	  $scope.inactive = false;
	  $scope.partyinactive = true;
	  $scope.ptpinactive = true;
	  
	  $scope.today = new Date();
	  
	  var todayFormatted = $filter('date')($scope.today, 'dd-MM-yyyy');

	  $scope.submitHeader = "Submit";
	  
	  	$scope.goBack = function(){
			console.log('back button clicked');
		    window.history.back();
		  };
	
	$scope.$watch("dataIn.action", function (newval) {
        switch (newval) {
          case 'OC':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = false;
              break;
          case 'IC':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = false;
              break;
          case 'MET':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = false;
              break;
          case 'REVW':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'SC':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'LR':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'RR':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'OA':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'RF':
          $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'NFA':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
          case 'Invalid':
            $scope.dataIn.party = "NA";
          $scope.partyinactive = true;
              break;
      }
        }, true);
	
	$scope.$watch("dataIn.party", function (newval) {
        switch (newval) {
          case '1':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = false;
              break;
          case '2':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = true;
              break;
          case '3':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = true;
              break;
          case '4':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = false;
              break;
          case '5':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = false;
              break;
          case '6':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = true;
              break;
          case 'NA':
            $scope.dataIn.ptp = "No";
          $scope.ptpinactive = true;
              break;
      }
        }, true);
	
	$scope.$watch("dataIn.ptp", function (newval) {
        if(newval=='Yes'){
            $scope.dataIn.ptpamount = "0";
            $scope.dataIn.ptpdate = todayFormatted;
                $scope.dataIn.paymode = "NA";
            $scope.inactive = false;
          }else{
            $scope.dataIn.ptpamount = "0";
            $scope.dataIn.ptpdate = todayFormatted;
              $scope.dataIn.paymode = "NA";
            $scope.inactive = true;
          }
              
        }, true);
      
      $scope.$watch("datax.imp", function (newval) {
          if(newval==true){
              $scope.dataIn.impvalue = "Z";
            }else{
         	 $scope.dataIn.impvalue = "A";
            }
                
          }, true);
	
	
});

app.controller('worklistccCtrl', function($scope){
	
});

app.controller('promisesCtrl', function($scope){
	
});

app.controller('contactCtrl', function($scope){
	
});

app.controller('Appctrl', function($scope){
	
});