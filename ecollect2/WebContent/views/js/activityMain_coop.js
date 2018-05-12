//var app = angular.module("App", ["ui.router",'mainService',"ngMaterial","angular-ladda",'ui-notification','ngFileUpload']);
var app = angular.module("App", ["ui.router",'mainService',"ngMaterial","angular-ladda",'ui-notification','ngFileUpload','ng-fusioncharts','ngLoadingSpinner']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/action")
	$stateProvider
	.state('notes', {
		url : "/notes",
		templateUrl : "views/templates/notesmcoop.html"
	}).state('directors', {
		url : "/directors",
		templateUrl : "views/templates/directors2.html",
		controller : 'directorsCtrl'
	}).state('action', {
		url : "/action",
		templateUrl : "actionpage.html",
		controller : 'ActivityCtrl'
	}).state('ptps', {
		url : "/ptps",
		templateUrl : "views/templates/ptps.html",
		controller : 'promisesCtrl'
	}).state('otheraccs', {
		url : "/otheraccs",
		templateUrl : "views/templates/otheraccs.html",
		controller : 'otheraccCtrl'
	}).state('sameidnumbers', {
		url : "/sameidnumbers",
		templateUrl : "views/templates/sameidnumbers2.html",
		controller : 'sameidnumbersCtrl'
	}).state('accountinfo', {
		url : "/accountinfo",
		templateUrl : "views/templates/accountinfomcoop.html"
	}).state('customerinfo', {
		url : "/customerinfo",
		templateUrl : "views/templates/customerinfo3.html",
		controller : "customerinfoCtrl"
	}).state('contacts', {
		url : "/contacts",
		templateUrl : "views/templates/contactsmcoop.html",
		controller : "contactssCtrl"
	}).state('files', {
		url : "/files",
		templateUrl : "views/templates/filesj.html",
		controller : 'filesCtrl2'
	}).state('editnote', {
		url : "/editnote/:id",
		templateUrl : "views/templates/editnotes.html",
		controller : 'editnoteCtrl'
	}).state('email', {
		url : "/email",
		templateUrl : "views/templates/email2.html",
		controller : 'emailCtrl'
	}).state('collateral', {
		url : "/collateral",
		templateUrl : "views/templates/collateral.html",
		controller : 'collateralCtrl'
	}).state('addcontacts', {
		url : "/addcontacts",
		templateUrl : "views/templates/addcontact.html",
		controller : 'addcontactCtrl'
	}).state('editcontacts', {
		url : "/editcontacts/:id",
		templateUrl : "views/templates/editcontacts.html",
		controller : 'editcontactsCtrl'
	}).state('activityaccplan', {
		url : "/activityaccplan",
		templateUrl : "views/templates/activityaccplan.html",
		controller : 'activityaccplanCtrl'
	}).state('updateaccplan', {
		url : "/updateaccplan/:pcode/:activcode/:acc/:owner",
		templateUrl : "views/templates/updateaccplan.html",
		controller : 'updateaccplanCtrl'
	}).state('reallocate', {
    url : "/reallocate",
    templateUrl : "views/templates/reallocate.html",
    controller : 'reallocateCtrl'
  }).state('sms', {
    url : "/sms",
    templateUrl : "views/templates/sms.html",
    controller : 'smsCtrl'
  })
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller('smsCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
	var cust = custnumber;
	var acc = accnumber;
	var dept = document.getElementById("s_in_division").value;
	var username = document.getElementById("s_in_username").value;

  $scope.dataSms = [];
  $scope.sentsms = [];
  $scope.showSendsms = true; // to show sms send button
  
  sentsms(cust);

  StudentDataOp.getMcoop(acc).success(function(data){
    $scope.dataSms.smsNumber = data[0].PHONENUMBER;
    var days = data[0].ARREARS_CATEGORY;
    var totalarr = data[0].LOANAMOUNT;

            $scope.$watch("dataSms.smsTemplate", function (newval) {
              if(newval=="LOAN"){
                  $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
                  $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
                }else if(newval=="LOANOD"){
                  $scope.dataSms.smsMessage = "Dear Customer, Your account is overdawn by  Kes. "+totalarr+". Please regularize within seven days.";
                  $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
                }else{
                  $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
                  $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
                }
           }, true);

  }) 

function sentsms(cust){
  StudentDataOp.getsms(cust).success(function(data){
    $scope.sentsms = data;
  }) 
}
  

  $scope.sendsmsfunc = function(){
    $scope.Loading = true;
    $.ajax({
            url: ServerAddress.address + '/api/sendsms',
            type: "post", 
            data:{'cust':cust,'smsnumber':$scope.dataSms.smsNumber,'smsmessage':$scope.dataSms.smsMessage,'smscallback':$scope.dataSms.smsCallback,'owner':username},
            success: function(response) {
              $timeout(function() {
                $mdDialog.show(
                    $mdDialog.alert()
                      .title('Success')
                      .textContent('SMS queueing successful')
                      .ok('OK')
                  ).then(function(){
                    $scope.Loading = false;
                    sentsms(cust);
                  });
              }, 1500);
            },
            error: function(xhr) {
              alert('Error sending sms');
            }
          });
   }         
          
});

app.controller('reallocateCtrl', function($scope,$timeout,$mdDialog,StudentDataOp,ServerAddress){
  var cust = custnumber;
  var acc = accnumber;
  var division = document.getElementById("s_in_division").value;
  var username = document.getElementById("s_in_username").value;

  //console.log('division is '+ division);

  $scope.dataIn = [];
  $scope.collectors = []

  StudentDataOp.getMcoop(acc).success(function(data){
    $scope.dataIn.colofficer = data[0].COLOFFICER;
    $scope.dataIn.acc = data[0].LOANACCNUMBER;
  })

  StudentDataOp.deptUsers(division).success(function(data){
    $scope.collectors = data;
  })

   $scope.reallocatefunct = function(){
    $scope.Loading = true;
    $.ajax({
            url: ServerAddress.address + '/api/reallocate_mcoop',
            type: "post", 
            data:{'acc':$scope.dataIn.acc,'newcolofficer':$scope.dataIn.newcolofficer},
            success: function(response) {
            $timeout(function() {
              $mdDialog.show(
                  $mdDialog.alert()
                    .title('Success')
                    .textContent('account is reallocated to : ' + $scope.dataIn.newcolofficer)
                    .ok('OK')
                ).then(function(){
                  $scope.dataIn = [];
                  $scope.Loading = false;
                });
            }, 1500);
            },
            error: function(xhr) {
              alert('Error');
            }
          });
   } 
          
});

app.controller('directorsCtrl', function($scope,StudentDataOp){
  var cust = custnumber;
    $scope.directorsData = [];
    StudentDataOp.getDirectors(cust).success(function(data){
      $scope.directorsData = data;
       })
          
});

app.controller('otheraccCtrl', function($scope,StudentDataOp){
	var cust = custnumber;
	  $scope.otheraccsData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherAccs(cust).success(function(data){
		  //console.log('otheraccCtrl data ', data);
		  $scope.otheraccsData = data;
		  $scope.otherLength = data.length;
       })
          
});

app.controller('promisesCtrl', function($scope, StudentDataOp){
	  var acc = accnumber;
	  $scope.promiseData = [];
	  $scope.ptpLength = "0";
	  StudentDataOp.getPtp(acc).success(function(data){
		  $scope.promiseData = data;
		  $scope.ptpLength = data.length;
     })
});

app.controller('sameidnumbersCtrl', function($scope,StudentDataOp){
	var acc = accnumber;
	  $scope.sameidnumbers = [];
	  StudentDataOp.getMcoop(acc).success(function(data){
		  var nationalid = data[0].IDNUMBER;
		  StudentDataOp.sameIdnumbers2(nationalid).success(function(data){
			  $scope.sameidnumbers = data;
	       })
	  })
});

app.controller('otherCtrl', function($scope,StudentDataOp){
	var cust = custnumber;
	  $scope.othercardData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherCards(cust).success(function(data){
		  $scope.othercardData = data;
		  $scope.otherLength = data.length;
       })
          
});

app.controller('filesCtrl2', function($scope,$state,$window,$http,Upload,StudentDataOp,ServerAddress){
	  //console.log('-->filesCtrl ..... ');
	  var acc = accnumber;//document.getElementById("acc").value;fileUpload
	  var cust = custnumber;//document.getElementById("cust").value;
	  var username = gusername;//document.getElementById("username").value;

	  $("#filesid").addClass("loading");

	  getFiles(cust);

	  function getFiles(cust){
	    /*StudentDataOp.getFiles(cust).success(function (data) {
	      $scope.dataFiles = data;
	      $("#filesid").removeClass("loading");
	    })*/
		  $http.get(ServerAddress.address+'/api/status/files/'+cust).success(function(data){
			  $scope.dataFiles = data;
		      $("#filesid").removeClass("loading");
	      });
	  }
	  
	  
	  var vm = this;

	      vm.submit = function(){ //function to call on form submit
	            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
	                vm.upload(vm.file); //call upload function
	              }
	            }

	        //
	        vm.upload = function (file) {
	          Upload.upload({
	                url:  ServerAddress.upload + '/re_upload', //webAPI exposed to upload the file 
	                data:{file:file} //pass file as data, should be user ng-model
	            }).then(function (resp) {
	                console.log('this is response from upload ',resp)
	                if(resp.data.error_code === 0){
	                  $window.alert('Success ' + resp.config.data.file.name + ' uploaded.');
	                  $.ajax({
	                    url: ServerAddress.address + '/api/addfile?custnumber='+custnumber+'&accnumber='+accnumber+'&doctype='+$scope.up.doctype+'&docdesc='+$scope.up.uploadnote+'&destpath='+resp.data.data_resp.path+'&colofficer='+username+'&filetype='+resp.data.data_resp.mimetype+'&filename='+resp.data.data_resp.filename+'&filesize='+resp.data.data_resp.size,
	                    type: "get",
	                    success: function(response) {
	                     getFiles(custnumber);
	                       //refresh list
	                       $state.reload();
	                     },
	                     error: function(xhr) {
	                      alert('Error ');
	                    }
	                  });
	                } else {
	                  $window.alert('an error occured during upload');
	                }
	            }, function (resp) { //catch error
	              console.log('Error status: ' + resp.status);
	              $window.alert('Error status: ' + resp.status);
	            }, function (evt) { 
	              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	                vm.progress = 'Progress: ' + progressPercentage + '% '; // capture upload progress
	              });
	      };

		//open upload page
		$scope.openPage = function(){
			$window.open('upload.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_self');
		};

	    //download function
	    $scope.download = function(infile){
	      var file = ServerAddress.upload+'/download/'+infile;
	      $window.open(file,"_self");
	    }
});//end filesCtrl

app.controller('ActivityCtrl', function($scope,$filter,$http,$window,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var acc = accnumber;
	var cust = custnumber;
	var dept = document.getElementById("s_in_division").value;
	//var username = document.getElementById("s_in_username").value;

  $scope.cust = cust;
	
	console.log('--> in ActivityCtrl ...' + username);
	
	$scope.dataIn = [];
	$scope.dataSms = [];
	$scope.Reall = []
	$scope.today = new Date();
	$scope.rfd_other = false;
  $scope.letterissued = [];
	  
	var todayFormatted = $filter('date')($scope.today, 'dd-MM-yyyy');

	$scope.accnumber = document.getElementById("acc").value;
	$scope.dataIn.owner = localStorage.getItem("username");
    $scope.dataIn.acc = document.getElementById("acc").value;
    $scope.dataIn.ptpamount = "0";
    $scope.dataIn.ptpdate = todayFormatted;
    $scope.dataIn.reviewdate = todayFormatted;
    $scope.dataIn.paymode = "NA";
    $scope.dataIn.ptp = "No";
    $scope.dataIn.party = "NA";
    $scope.dataIn.action = "Invalid";
    $scope.dataIn.demand = "N/A";
    $scope.dataIn.impvalue = "N";
    $scope.dataIn.impsrc = "Made a Comment";
    $scope.letterSpolled = "N/A";
    
    StudentDataOp.getMcoop(accnumber).success(function (data) {
    	console.log('acc -->', data);
    	$scope.accdata = data;
    	
    		//same id notification
    	  var nationalid = data[0].NATIONID;
		  StudentDataOp.sameIdnumbers(nationalid).success(function(data){
			  $scope.sameidnotification = data.length;
	    })
    	
    	 var owner = $scope.accdata[0].COLOFFICER;
    	 $scope.dataIn.owner = $scope.accdata[0].COLOFFICER;
    	 $scope.dataIn.cust = $scope.accdata[0].PHONENUMBER;
        $scope.dataIn.cmdstatus = $scope.accdata[0].CMDSTATUS;
        $scope.dataIn.brstatus = $scope.accdata[0].BRANCHSTATUS;
        $scope.dataIn.route = $scope.accdata[0].ROUTETOSTATE;
        $scope.dataIn.reason = $scope.accdata[0].EXCUSE;
        $scope.dataIn.curing = $scope.accdata[0].CURING;
        $scope.Reall.owner = $scope.accdata[0].COLOFFICER;
        $scope.dataIn.arrearsamount = $scope.accdata[0].LOANAMOUNT;
        $scope.dataIn.oustbalance = $scope.accdata[0].LOANAMOUNT;
        $scope.dataIn.reviewdate = $scope.accdata[0].REVIEWDATE;
        $scope.dataIn.rfd_other = $scope.accdata[0].EXCUSE_OTHER;

        //show other field
        if($scope.accdata[0].EXCUSE_OTHER !== null || $scope.accdata[0].EXCUSE_OTHER !== undefined){
          $scope.rfd_other = true;
        }
        
      //disable review date for none owner
        console.log(owner +' owner -- username ='+username);
        if(owner == undefined){
        	//console.log('am here')
        	document.getElementById("reviewdate").disabled = false;
        	document.getElementById('divspan').style.display = 'block';
        } else if(username !== owner){
        	document.getElementById("reviewdate").disabled = true;
        	document.getElementById('divspan').style.display = 'none';
        } else{
        	document.getElementById("reviewdate").disabled = false;
        	document.getElementById('divspan').style.display = 'block';
        }
        
        $scope.addAction = function() { 

          $scope.Loading = true;
        	
        	if($scope.dataIn.ptpamount == null){
        		$scope.dataIn.ptpamount = 0;
        	};
        	
          //$scope.dataLoading = true;
          $scope.dataIn.impvalue = 'Y';
          console.log('activity data ',$scope.dataIn);
          		var action_data = {
          				'acc' : $scope.dataIn.acc,
        		        'cust' : $scope.dataIn.cust,
        		        'action' : $scope.dataIn.action,
        		        'brstatus' : $scope.dataIn.brstatus,
        		        'cmdstatus' : $scope.dataIn.cmdstatus,
        		        'curing' : $scope.dataIn.curing,
        		        'demand' : $scope.dataIn.demand,
        		        'impsrc' : $scope.dataIn.impsrc,
        		        'impvalue' : $scope.dataIn.impvalue,
        		        'notemade' : $scope.dataIn.notemade,
        		        'owner' : username,
        		        'party' : $scope.dataIn.party,
        		        'paymode' : $scope.dataIn.paymode,
        		        'ptp' : $scope.dataIn.ptp,
        		        'ptpamount' : $scope.dataIn.ptpamount,
        		        'ptpdate' : document.getElementById("ptpdate").value,
        		        'reason' : $scope.dataIn.reason,
        		        'reviewdate' : document.getElementById("reviewdate").value,
        		        'route' : $scope.dataIn.route,
        		        'arrearsamount' : $scope.dataIn.arrearsamount,
        		        'oustbalance' : $scope.dataIn.oustbalance,
        		        'rfd_other' : $scope.dataIn.rfd_other
    			 };
          
          $.ajax({
        	  url: ServerAddress.address + '/api/save_activity_mcoop',
	       	  type: "post", 
	       	  data:action_data,
	       	  success: function(response) {
	       		console.log(response);
	       		$timeout(function() {
        			$mdDialog.show(
        		      $mdDialog.alert()
        		        .title('Success')
        		        .textContent('Action successfully submitted.')
        		        .ok('OK')
        		    ).then(function(){
        		    	$scope.dataLoading = false;
                 	    $window.close();
        		    });
	       		}, 1500);
	       	  },
	       	  error: function(xhr) {
	       	    alert('Error');
	       	  }
	       	});
          
         
        };
        var dept = $scope.accdata[0].SECTION;
        var custname = $scope.accdata[0].FIRSTNAME;
        var address = $scope.accdata[0].ADDRESSLINE1;
        var postcode = $scope.accdata[0].POSTCODE;
        var balance = $scope.accdata[0].OUSTBALANCE;
        var arrears = $scope.accdata[0].PRINCARREARS;
        var intarr = $scope.accdata[0].INTRATEARR;
        var penarr = $scope.accdata[0].PENALARREARS;
        var days = $scope.accdata[0].DAYSINARR;
        var cust = $scope.accdata[0].CUSTNUMBER;
        var arocode = $scope.accdata[0].AROCODE;
        var branch = $scope.accdata[0].BRANCHNAME;
        var manager = $scope.accdata[0].MANAGER;
        var accnumber = $scope.accdata[0].ACCNUMBER;
        var totalarr = arrears + intarr + penarr;
        
        //console.log('Before summation===>'+arrears);
        
        if(dept=='PBBSCHEME'){
       	 StudentDataOp.pbbBalance(custnumber).success(function (data) {
           	 var balance = data[0].SUMBALANCE;
           	 var arrears = data[0].SUMARREARS;
            })
        };
        
        //$scope.generatetitle = "Generate";
        $scope.iconGenerate = "fa fa-arrow-down";//fa fa-spinner fa-pulse
        //document.getElementById('a_generate2').style.display = 'none';
        document.getElementById('a_download').style.display = 'none';
        document.getElementById('a_download2').style.display = 'none';
        
      //letter generation	         
        $scope.generate = function(intype){
       	 //console.log(intype);
       	 var type = null;
       	 switch(intype){
       	 case 'Post listing (Card)': type = "cards"
       		 break;
       	 case 'Post listing (Secured)': type = "secured"
       		 break;
       	 case 'Post Listing(Personal)': type = "personal"
       		 break;
       	 case 'Post Listing(Overdrawn)': type = "overdue"
       		 break;
       	 case 'Post listing (MCU)': type = "mcu"
       		 break;
       	 case 'Notification of Sale': type = "salenotice"
       		 break;
       	 case 'Pre-Listing Notice': type = "prelisting"
       		 break;
       	 case 'Statutory Notice': type = "statutory"
       		 break;
       	 case 'Personal Demand 1': type = "pbb1"
       		 break;
       	 case 'Personal Demand 2': type = "pbb2"
       		 break;
       	 case 'Personal Demand 3': type = "pbb3"
       		 break;
       	 case 'Card Overdue': type = "ccoverdue"
       		 break;
       	 case 'Card Prelisting': type = "ccprelisting"
       		 break;
       	 case 'Repossession Notice': type = "repossession"
       		 break;
       	 }
       	 
       	 $scope.iconGenerate = "fa fa-spinner fa-pulse fa-1x";
       	 $scope.generatetitle = "Generating Letter..."
       		 
       		 var letter_data = {
       				 "acc" : accnumber,
       				 "custname" : custname,
       				 "address" : address,
       				 "balance" : balance,
       				 "arrears" : arrears,
       				 "intarr" : intarr,
       				 "cust" : cust,
       				 "arocode" : arocode,
       				 "branch" : branch,
       				 "manager" : manager,
       				 "postcode" : postcode
       			 };
       	
       	
	       	$.ajax({
	       		url : './api/generate/' + type,
	       	  type: "get", 
	       	  data:letter_data,
	       	  success: function(response) {
	       		document.getElementById('reportname').value = response;
	       		document.getElementById('a_download').style.display = 'block';
	       		document.getElementById('a_download2').style.display = 'block';
	       		document.getElementById('a_generate').style.display = 'none';
	       		document.getElementById('a_generate2').style.display = 'none';
	       	  },
	       	  error: function(xhr) {
	       	    console.log('Error');
	       	  }
	       	});
       		 
        }
        
        	$scope.$watch("dataSms.smsTemplate", function (newval) {
              if(newval=="LOAN"){
                  $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
                  $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
                }else if(newval=="LOANOD"){
             	   $scope.dataSms.smsMessage = "Dear Customer, Your account is overdawn by  Kes. "+totalarr+". Please regularize within seven days.";
             	   $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
                }else{
               	 $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
	                 $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
                }
           }, true);
        	$scope.$watch("dataIn.reason", function (newval) {
                if(newval=="Other"){
                	$scope.rfd_other = true;
                  }else{
                	$scope.rfd_other = false;
                  }
             }, true);
        	
    }).error(function(){
 	   alert('No customer data found');
    });
    
    StudentDataOp.Users().success(function (data) {
    	   $scope.colOfficer = data;
    })
       
       StudentDataOp.Reviewers().success(function (data) {
    	   $scope.Reviewer = data;
       })
    
    var SvrIP = ServerAddress.address;
    
	$scope.brstatus_src=[];
	$scope.cmdstatus_src = [];
	$scope.letters = [];
	$scope.colofficer_src = [];
	
	$http.get(SvrIP+'/api/status/cmdstatus')
	.success(function(resp){
		$scope.cmdstatus_src = resp;
	})
	.error(function(err){
		console.log('Error retrieving cmd status listings');
	});
	
	$http.get(SvrIP+'/api/status/brstatus')
	.success(function(resp){
		$scope.brstatus_src = resp;
	})
	.error(function(err){
		console.log('Error retrieving branch status listings');
	});
	
	//Letters
	$http.get(SvrIP+'/api/status/letters')
	.success(function(resp){
		$scope.letters = resp;
	})
	.error(function(err){
		console.log('Error retrieving demand listings');
	});
    
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
      }}, true);
      
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

      //toggle right menu
      $scope.ddsent = function(){
        
        StudentDataOp.getlettersissued(cust).success(function(data){
          //console.log('Issued letters for cust '+cust);
          //console.log(data);
          $scope.letterissued = data;
        })

        var body = $('#main');
        body.toggleClass('menu-open');
        return false;
      }
});

app.controller('mainCtrl', function($scope,$timeout,StudentDataOp, Notification){
	var cust = custnumber;//document.getElementById("cust").value;
	var acc = accnumber;//document.getElementById("acc").value;
	var dept = document.getElementById("s_in_division").value;//localStorage.getItem("division");
	var username = document.getElementById("s_in_username").value;
	var rights= document.getElementById("s_in_rights").value; //localStorage.getItem("rights");

  $scope.allteles = [];
  $scope.teamleader = false;

  $scope.callingtitle = "Click here to call"
  $scope.callingicon = "fa fa-phone"
	
	$scope.sameidnotification = 0;
	$scope.collateralnotification = 0;

  if(rights === 'ADMIN'){
      $scope.teamleader = true;
  }

  getallteles(cust);

    function getallteles(cust){
      StudentDataOp.getallteles(cust).success(function(data){
          $scope.allteles = data;
      })
    }

	  StudentDataOp.getOtherAccs(cust).success(function(data){
		  $scope.otherLength = data.length;
    })
     
     /*StudentDataOp.getaccountplanlogs(acc).success(function(data){
       	if(data.length === 0){
       		Notification.error({message: 'This account has no account plan', delay: null});
       	}
  	 })*/
	
	
	StudentDataOp.getMcoop(acc).success(function (data) {
  	  	  var nationalid = data[0].IDNUMBER;
		  StudentDataOp.sameIdnumbers2(nationalid).success(function(data){
		      $scope.sameidnotification = data.length;
		  })
	})

  $scope.callingfunc = function(){
        $scope.callingicon = "fa fa-spinner fa-pulse fa-fw";
        $scope.callingtitle = "Calling ...";
        
        $timeout(function() {
          $scope.callingtitle = "Click here to call"
          $scope.callingicon = "fa fa-phone"
      }, 1500);
  }

  $scope.changeNumber = function(newnumber){
    $scope.phonenumber = newnumber;
  }

});

app.controller('contactssCtrl', function($scope,$state,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var cust = custnumber;
	var username = gusername;
	var acc = accnumber;
	
	//console.log('cust from id '+cust);
	
	$scope.contactsData = [];
	$scope.contact= [];
	
	StudentDataOp.getMcoop(acc).success(function(data){
		if(data.length !== 0)
		$scope.contact=data[0];
	})
	
  getContacts();

	function getContacts(){
		StudentDataOp.getContacts(cust).success(function(data){
			if(data.length !==0)
			$scope.contactsData=data;
		})
	}
	
	$scope.delC = function(id){
		var confirm = $mdDialog.confirm()
        .title('Confirm')
        .textContent('Would you like to delete this contact?')
        .ok('OK Confirmed')
        .cancel('No Cancel');
		  $mdDialog.show(confirm).then(function() {
			  $.ajax({
					url: ServerAddress.address + '/api/del_contact',
						  type: "post", 
						  data:{'id':id},
						  success: function(response) {
							$mdDialog.show(
						      $mdDialog.alert()
						        .title('Success')
						        .textContent('Contact successfully deleted.')
						        .ariaLabel('Success')
						        .ok('OK')
						    ).then(function(){
						    	getContacts();
						    });
						  },
						  error: function(xhr) {
						    alert('Error');
						  }
						});
		  }, function() {
		    console.log('delete cancelled');
		  });
	}
	
	$scope.edit = function(id){
		//console.log(id);
		$state.go('editcontacts',{'id':id})
	}
});

app.controller('customerinfoCtrl', function($scope,$timeout,$mdDialog,StudentDataOp){
	var cust = custnumber;
	var acc= accnumber;
	var dept= document.getElementById("s_in_division").value;
	var user= gusername;
	
	//console.log('customerinfoCtrl ... '+ cust);
	
	$scope.meta = [];
	
	getMeta();
	
	function getMeta(){
		StudentDataOp.getMeta(cust).success(function(data){
			if(data.length > 0){
				$scope.meta = data[0];
				$scope.meta.MetaEmployer = data[0].EMPLOYER;
				$scope.meta.MetaDob = data[0].DOB
				$scope.meta.MetaDoe = data[0].DOE
				$scope.meta.MetaMarital = data[0].MARITAL
				$scope.meta.MetaPhone = data[0].PHONE
				$scope.meta.MetaSalary = data[0].SALARY
				$scope.meta.MetaResidential = data[0].RESIDENTIAL
				$scope.meta.MetaFileno = data[0].FILENO
				$scope.meta.MetaEmpstatus = data[0].EMPSTATUS
				$scope.meta.MetaEmail = data[0].EMAIL
			}
		})
	}
	
	$scope.showedit = true;
	$scope.editMeta = function(){
		$scope.showedit = false;
	}
	
	$scope.editMetadata = function(){
		console.log('Saving meta info');
		$scope.showedit = true;
		sendData();
	}
	
	$scope.canceleditMeta = function(){
		getMeta();
		$scope.showedit = true;
	}
	
	
	function sendData(){
		   var metasaveData = { 
	        		'custnumber' : cust,
			        'txtemployeredit' : $scope.meta.MetaEmployer,
			        'txtdobedit' : $scope.meta.MetaDob,
			        'txtdateempedit' : $scope.meta.MetaDoe,
			        'txtmaritaledit' : $scope.meta.MetaMarital,
			        'txtphoneedit' : $scope.meta.MetaPhone,
			        'txtaddressedit' : $scope.meta.MetaResidential,
			        'txtfileno' : $scope.meta.MetaFileno,
			        'txtstatusedit' : $scope.meta.MetaEmpstatus,
			        'txtemailedit' : $scope.meta.MetaEmail,
			        'txtsalaryedit' : $scope.meta.MetaSalary
	          }; 
		   console.log('saving meta '+ metasaveData);
		    $.ajax({
		        type: "POST",
		        url: "Meta",
		        data:metasaveData 
		      }).done(function( msg ) {
		    	  $timeout(function() {
						$mdDialog.show(
					      $mdDialog.alert()
					        //.parent(angular.element(document.querySelector('#mimin')))
					        .title('Success')
					        .textContent('Customer information updated.')
					        .ariaLabel('Success')
					        .ok('OK')
					    ).then(function(){
					    	$scope.Loading = false;
					    	getMeta();
					    });
			 		}, 1500);
		      });
		}
});

	/*app.controller('filesCtrl', function($scope,Upload,fileUpload,StudentDataOp){
	  console.log('-->filesCtrl');
	  var acc = document.getElementById("acc").value;
	  var cust = document.getElementById("cust").value;
	  
	  StudentDataOp.getFiles(cust).success(function (data) {
	    console.log('uploaded files',data);
	    $scope.dataFiles = data;
	  })
	  
	// upload later on form submit or something similar
	    $scope.submit = function() {
	    	console.log('uploading file ....')
	      if ($scope.form.file.$valid && $scope.file) {
	        $scope.upload($scope.file);
	      }
	    };
	    
	 // upload on file select or drop
	    $scope.upload = function (file) {
	        Upload.upload({
	            url: 'http://localhost:3000/upload',
	            data: {file: file, 'username': $scope.username}
	        }).then(function (resp) {
	            console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ', resp.data);
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	            $scope.progress = progressPercentage;
	        });
	    };

	});*/

	app.controller('collateralCtrl', function($scope,$http,$timeout,$mdDialog,StudentDataOp,ServerAddress){
	  var acc = accnumber;
	  var cust = custnumber;
	  var username = gusername;
	  
	  $scope.addShow=true;
	  $scope.deleteShow=false;
	  $scope.editShow=false;

	  $scope.Collateral = [];
	  $scope.dataDeptColl = [];
	  $scope.delContacts = {};

	       StudentDataOp.getCollateral(cust).success(function (data) {
	         $scope.Collateral = data;
	       })
	getDeptCollateral(); 
	       function getDeptCollateral(){
		       StudentDataOp.getDeptCollateral(cust).success(function (data) {
		         $scope.dataDeptColl = data;
		       })
	       }
	       $scope.saveDeptColl = function(){
	    	   	 $scope.Loading = true;
	           
	             $scope.deptColl.acc = accnumber;
	             $scope.deptColl.cust = custnumber;
	             $scope.deptColl.owner = username;
	             $scope.deptColl.id = makeid();
	             
	             //console.log('collateral data to save ', $scope.deptColl);
	             $timeout(function() {
	               $http({
	                   url: ServerAddress.address + '/addDeptColl',
	                   method: 'post',
	                   header:'application/json',
	                   data: $scope.deptColl
	               }).success(function(response){
	                   		$mdDialog.show(
	             		      $mdDialog.alert()
	             		        .parent(angular.element(document.querySelector('#mimin')))
	             		        .clickOutsideToClose(true)
	             		        .title('Success')
	             		        .textContent('Collateral successfully added.')
	             		        .ariaLabel('Success')
	             		        .ok('OK')
	             		    ).then(function(){
	             		    	$scope.dataLoading = false;
	             		    	$scope.deptColl = [];
	             		    	getDeptCollateral();
	             		    });
	               }).error(function(){
	                 alert('Error encountered!!');
	                 $scope.Loading = false;
	               })
	             }, 2000);
	        }
	       
	       $scope.deleteCont = function() {
	    	    var confirm = $mdDialog.confirm()
	    	          .title('Confirm')
	    	          .textContent('Would you like to delete this collateral?')
	    	          .ariaLabel('Confirmation')
	    	          .ok('Confirm OK')
	    	          .cancel('Cancel');
	    	    
	    	    var deleteok = $mdDialog.alert()
		          .title('Confirm')
		          .textContent('Contact Deleted')
		          .ariaLabel('Confirmation')
		          .ok('OK');
	    	    
	    	    $mdDialog.show(confirm).then(function() {
	    	    	//console.log($scope.delContacts);
	    	    	$http({
	                    url:ServerAddress.address + '/deleteCollateral',
	                    method: 'post',
	                    header:'application/json',
	                    data:$scope.delContacts
	                }).success(function(response){
	                	$mdDialog.show(deleteok).then(function(){
	                		getDeptCollateral();
	                		$scope.backCont();
	                	});
	                }).error(function(){
	                    alert('Error deleting contact');
	                })
	    	    }, function() {
	    	      console.log('user cancelled');
	    	    });
	    	  };

	                          
	            $scope.backCont = function(){
	         	   $scope.addShow=true;
	         	   $scope.deleteShow=false;
	         	   $scope.editShow=false;
	            }

	            $scope.delC = function(task){
	            	$scope.delContacts.contact = task;
	             $scope.addShow=false;
	             $scope.deleteShow=true;
	             $scope.editShow=false;
	           }
	            
	            function makeid()
	            {
	                var text = "";
	                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	                for( var i=0; i < 5; i++ )
	                    text += possible.charAt(Math.floor(Math.random() * possible.length));

	                return text;
	            }

	});
	
	app.controller('addcontactCtrl', function($scope,$state,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
		var acc = accnumber;
		var cust = custnumber;
		var username = gusername;
		
		$scope.addcontactData = [];
		$scope.addcontactData.fullname = 0;
		$scope.addcontactData.rel = 0;
		$scope.addcontactData.contact = 0;
		
		$scope.addContact = function(){
			$scope.Loading = true;
			addData();
				
		}
		
		$scope.cancelAdd = function(){
			$state.go('contacts');
		}
		
		function addData(){
			   var contacts_data = { 
					   'cust' : cust,
				       'fullname' : $scope.addcontactData.fullname,
				       'contact' : $scope.addcontactData.contact,
				       'rel' : $scope.addcontactData.rel,
				       'owner' : username
		          }; 
			   //console.log('saving contact '+ contacts_data.cust+ 'full name '+contacts_data.fullname+' contacts '+ contacts_data.contact+ ' owner '+contacts_data.owner+ ' rel '+contacts_data.rel);
			    $.ajax({
			        type: "POST",
			        url: "addContacts2",
			        data:contacts_data 
			      }).done(function( msg ) {
			    	  $timeout(function() {
							$mdDialog.show(
						      $mdDialog.alert()
						        .title('Success')
						        .textContent('Customer contact updated.')
						        .ariaLabel('Success')
						        .ok('OK')
						    ).then(function(){
						    	$scope.Loading = false;
						    	$scope.cancelAdd();
						    });
				 		}, 1500);
			      });
			}
	});
	
	app.controller('editcontactsCtrl', function($scope,$state,$stateParams,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
		var id = $stateParams.id;
		$scope.editContact = [];
		
    StudentDataOp.getaddedContact(id).success(function(data){
			$scope.editContact.id = data[0].ID;
			$scope.editContact.person = data[0].PERSON;
			$scope.editContact.contact = data[0].CONTACT;
			$scope.editContact.rel = data[0].REL;
      $scope.editContact.active = data[0].ACTIVE;
		})

		$scope.cancelAdd = function(){
			$state.go('contacts');
		}
    //edit contacts function
    $scope.editContactfunc = function() {
      $scope.Loading = true;
         var edit_data = { 
               'id' : $scope.editContact.id,
               'fullname' : $scope.editContact.person,
               'contact' : $scope.editContact.contact,
               'rel' : $scope.editContact.rel,
               'active':$scope.editContact.active
          }; 
         
         $.ajax({
              type: "POST",
              url: "editContacts",
              data:edit_data 
            }).done(function( msg ) {
              $timeout(function() {
              $mdDialog.show(
                  $mdDialog.alert()
                    .title('Success')
                    .textContent('Customer contact updated.')
                    .ariaLabel('Success')
                    .ok('OK')
                ).then(function(){
                  $scope.Loading = false;
                  $state.go('contacts');
                });
            }, 1500);
            });
      }

	});

	app.controller('emailCtrl', function($scope){
		$scope.send = [];
		
		$scope.sendEmail = function(){
			$scope.Loading = true;
			console.log('sending this email ',$scope.send);
		}

	});
	
	app.controller('updateaccplanCtrl', function($scope,$state,$stateParams,$mdDialog,$timeout,ServerAddress){
		$scope.dataIn = [];
		var acc = $stateParams.acc;
		$scope.dataIn.pcode = $stateParams.pcode;
		$scope.dataIn.activcode = $stateParams.activcode;
		var owner = $stateParams.owner;
		
		$scope.updatePlan = function(){
			$scope.Loading = true;
			var dateupdated = document.getElementById("dateupdated").value;
			var pcomment = document.getElementById("pcomment").value;
			$.ajax({
	        	  url: ServerAddress.address + '/api/update_accplan',
		       	  type: "post", 
		       	  data:{'accnumber':acc,'actcode':$scope.dataIn.activcode,'pcode':$scope.dataIn.pcode,'pcomment':pcomment,'owner':owner,'dateupdated':dateupdated},
		       	  success: function(response) {
		       		$timeout(function() {
	        			$mdDialog.show(
	        		      $mdDialog.alert()
	        		        .clickOutsideToClose(true)
	        		        .title('Success')
	        		        .textContent('account plan successfully updated.')
	        		        .ok('OK')
	        		    ).then(function(){
	        		    	$scope.Loading = false;
	        		    	$state.go('activityaccplan')
	        		    });
		       		}, 1500);
		       	  },
		       	  error: function(xhr) {
		       	    alert('Error');
		       	  }
		       	});
		}
	})
	//,,,
	app.controller('activityaccplanCtrl', function($scope,$state,$timeout,$mdDialog,StudentDataOp,ServerAddress){
		var username = gusername;
		var cust = custnumber;
		var acc = accnumber;
		
		//console.log(username+ ' acc: '+acc+' cust'+cust);
		
		$scope.plans = [];
		$scope.activs = [];
		$scope.dataIn = [];
		$scope.accountplan = [];
		$scope.showPlan = false;
		
		getaccplans();
		getaccountplanlogs(acc);
		get_rfd(acc);
		
		function getaccplans(){
			StudentDataOp.getaccplans().success(function(data){
				$scope.plans = data;
			})
		}
		
		function getactivs(pcode){
			StudentDataOp.getactivs(pcode).success(function(data){
				$scope.activs = data;
			})
		}
		
		function get_rfd(acc){
			StudentDataOp.getAccount(acc).success(function(data){
				$scope.dataIn.rfd = data[0].EXCUSE;
			})
		}
		
		function getaccountplanlogs(acc){
			StudentDataOp.getaccountplanlogs(acc).success(function(data){
				$scope.accountplan = data;
				if(data.length !== 0){
					$scope.showPlan = true;
					//notification
				}
			})
		}
		
		
		$scope.$watch("dataIn.accplan", function (newval) {
			getactivs(newval);
        }, true);
		
		$scope.addaccplan = function(){
			$scope.Loading = true;
			for(var i = 0; i<$scope.activs.length;i++){
				var indate = $scope.activs[i].ACTIVCODE
				$.ajax({
		        	  url: ServerAddress.address + '/api/save_accplan',
			       	  type: "post", 
			       	  data:{'accnumber':acc,'custnumber':cust,'actcode':$scope.activs[i].ACTIVCODE,'pcode':$scope.activs[i].PCODE,'excuse':$scope.dataIn.rfd,
                'dateofexec':document.getElementById(indate).value,'owner':username},
			       	  success: function(response) {
			       		$timeout(function() {
		        			$mdDialog.show(
		        		      $mdDialog.alert()
		        		        .clickOutsideToClose(true)
		        		        .title('Success')
		        		        .textContent('Account plan successfully submitted.')
		        		        .ok('OK')
		        		    ).then(function(){
		        		    	$scope.Loading = false;
		        		    	updateRfd();
		        		    	$state.go('action');
		        		    });
			       		}, 1500);
			       	  },
			       	  error: function(xhr) {
			       	    alert('Error');
			       	  }
			       	});
			}
			
			function updateRfd(){
				if($scope.dataIn.rfd !== null || $scope.dataIn.rfd === undefined){
					$.ajax({
			        	  url: ServerAddress.address + '/api/update_excuse',
				       	  type: "post", 
				       	  data:{'excuse':$scope.dataIn.rfd,'accnumber':acc},
				       	  success: function(response) {
				       	  },
				       	  error: function(xhr) {
				       	    alert('Error');
				       	  }
				       	});
				}
			}
		}
	})
	//
	app.controller('editnoteCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,StudentDataOp,ServerAddress){
		var id = $stateParams.id;
		$scope.dataIn = [];
		
		StudentDataOp.getanote(id).success(function(data){
			//console.log(data);
			$scope.dataIn.noteid = data[0].ID;
			$scope.dataIn.notemade = data[0].NOTEMADE;

      $scope.editnote = function(){
      $scope.Loading = true;
      $.ajax({
              url: ServerAddress.address + '/api/editnote',
              type: "post", 
              data:{'noteid':document.getElementById("noteid").value,'notemade':$scope.dataIn.notemade},
              success: function(response) {
              $timeout(function() {
                $mdDialog.show(
                    $mdDialog.alert()
                      .title('Success')
                      .textContent('Note successfully updated!')
                      .ok('OK')
                  ).then(function(){
                    $scope.Loading = false;
                    $state.go('notes')
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