/**
 * Activity Controller
 */

var app = angular.module('RDash');

app.controller('promisesCtrl', function($scope, StudentDataOp){
	  var acc = document.getElementById("acc").value;
	  $scope.promiseData = [];
	  $scope.ptpLength = "0";
	  StudentDataOp.getPtp(acc).success(function(data){
		  $scope.promiseData = data;
		  $scope.ptpLength = data.length;
     })
});

app.controller('otheraccCtrl', function($scope,StudentDataOp){
	var cust = document.getElementById("cust").value;
	  $scope.otheraccsData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherAccs(cust).success(function(data){
		  //console.log('otheraccCtrl data ', data);
		  $scope.otheraccsData = data;
		  $scope.otherLength = data.length;
     })
        
})

app.controller('ActivityCtrl', function($scope,$filter,$http,$window,$stateParams,StudentDataOp){
	var acc = localStorage.getItem("acc");
	var cust;
	var dept = localStorage.getItem("division");
	var username = localStorage.getItem("uname");
	//$scope.username= localStorage.getItem("uname");
	
	document.getElementById("acc").value = acc;
	document.getElementById("username").value = username;
	
	$scope.sameidnotification = 0;
	$scope.directorsnotification = 0;
	$scope.sameidnotification = 0;
	$scope.notesnotification = 0;
	$scope.collateralnotification = 0;
	$scope.promisesnotification = 0;
	$scope.customcontactsnotification = 0;
	
     StudentDataOp.getPtp(acc).success(function(data){
		  $scope.promisesnotification = data.length;
     })
     
    StudentDataOp.getAccount(acc).success(function (data) {
    	$scope.accdata = data;
    	
    	cust = data[0].CUSTNUMBER;
    	
    	document.getElementById("cust").value = data[0].CUSTNUMBER;
    	localStorage.setItem("cust", data[0].CUSTNUMBER);
    	
    	var nationalid = data[0].NATIONID;
    	
    		StudentDataOp.getDirectors(data[0].CUSTNUMBER).success(function(data){
	  		  $scope.directorsnotification = data.length;
	       })
    	
    	   StudentDataOp.sameIdnumbers(nationalid).success(function(data){
			  $scope.sameidnotification = data.length;
	       })
	       
	       StudentDataOp.getNotes(data[0].CUSTNUMBER).success(function(data){
	    	   $scope.notesnotification = data.length;
		   })
		   
		   StudentDataOp.getContacts2(data[0].CUSTNUMBER).success(function(data){
			 $scope.customcontactsnotification = data.length;
	      })
	      
	      StudentDataOp.getOtherAccs(data[0].CUSTNUMBER).success(function(data){
			  $scope.otherLength = data.length;
	     })
	       
    })
})

app.controller('sameidnumbersCtrl', function($scope,StudentDataOp){
	var acc = document.getElementById("acc").value;
	  $scope.sameidnumbers = [];
	  StudentDataOp.getAccount(acc).success(function(data){
		  //console.log('sameidnumbersCtrl id for acc '+ data[0].NATIONID);
		  var nationalid = data[0].NATIONID;
		  StudentDataOp.sameIdnumbers(nationalid).success(function(data){
			  console.log('sameidnumbersCtrl data ',data.length);
			  $scope.sameidnumbers = data;
	       })
	  })
	  
})

app.controller('actionCtrl', function($scope,$filter,$timeout,$http,$state,$mdDialog,StudentDataOp,ServerAddress){
	
	var cust;
	var acc = localStorage.getItem("acc");
	var dept = localStorage.getItem("division");
	var user = localStorage.getItem("uname");
	
	
	$scope.dataIn = [];
	$scope.accdata = [];
	$scope.dataSms = [];
	$scope.Reall = []
	$scope.today = new Date();
	
	$scope.firstname = "Kevin";
	
   StudentDataOp.getOtherAccs(cust).success(function(data){
		  $scope.otherLength = data.length;
   })
   
   StudentDataOp.getPtp(acc).success(function(data){
		  $scope.promisesnotification = data.length;
   })
   
	var todayFormatted = $filter('date')($scope.today, 'dd-MM-yyyy');

	$scope.accnumber = acc;
	$scope.dataIn.owner = user;
    $scope.dataIn.acc = acc;
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
    
    StudentDataOp.getAccount(acc).success(function (data) {
    	
    	//$scope.firstname = data[0].FIRSTNAME;
    	$scope.address = data[0].ADDRESSLINE1;
    	$scope.tel = data[0].TELNUMBER;
    	
    	console.log('firstname ', $scope.firstname);
    	
    	$scope.accdata = data;
    	var owner = $scope.accdata[0].COLOFFICER;
    	var cust = $scope.accdata[0].CUSTNUMBER;
    	
    	$scope.dataIn.owner = $scope.accdata[0].COLOFFICER;
    	$scope.dataIn.cust = $scope.accdata[0].CUSTNUMBER;
        $scope.dataIn.cmdstatus = $scope.accdata[0].CMDSTATUS;
        $scope.dataIn.brstatus = $scope.accdata[0].BRANCHSTATUS;
        $scope.dataIn.route = $scope.accdata[0].ROUTETOSTATE;
        $scope.dataIn.reason = $scope.accdata[0].EXCUSE;
        $scope.dataIn.curing = $scope.accdata[0].CURING;
        $scope.dataSms.smsNumber = $scope.accdata[0].TELNUMBER;
        $scope.Reall.owner = $scope.accdata[0].COLOFFICER;
        $scope.dataIn.arrearsamount = $scope.accdata[0].TOTALARREARS;
        $scope.dataIn.oustbalance = $scope.accdata[0].OUSTBALANCE;
        $scope.dataIn.reviewdate = $scope.accdata[0].REVIEWDATE;
        
      //disable review date for none owner
       // console.log(owner+' owner -- username= '+user);
        if(owner == undefined){
        	//console.log('am here')
        	document.getElementById("reviewdate").disabled = false;
        	document.getElementById('divspan').style.display = 'block';
        }else if(username !== owner){
        	document.getElementById("reviewdate").disabled = true;
        	document.getElementById('divspan').style.display = 'none';
        }else{
        	document.getElementById("reviewdate").disabled = false;
        	document.getElementById('divspan').style.display = 'block';
        }
        
        StudentDataOp.getNotes($scope.accdata[0].CUSTNUMBER).success(function(data){
     	   $scope.notesnotification = data.length;
        })
        
        StudentDataOp.getDirectors($scope.accdata[0].CUSTNUMBER).success(function(data){
        	console.log(data)
			  $scope.directorsnotification = data.length;
	   })
        
        StudentDataOp.getContacts2($scope.accdata[0].CUSTNUMBER).success(function(data){
		 $scope.customcontactsnotification = data.length;
    })
        
        //action submit button
        $scope.addAction = function() { 

            $scope.Loading = true;
          	
          	if($scope.dataIn.ptpamount == null){
          		$scope.dataIn.ptpamount = 0;
          	};
          	
            //$scope.dataLoading = true;
            $scope.dataIn.impvalue = 'Y';
            
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
          		        'owner' : user,
          		        'party' : $scope.dataIn.party,
          		        'paymode' : $scope.dataIn.paymode,
          		        'ptp' : $scope.dataIn.ptp,
          		        'ptpamount' : $scope.dataIn.ptpamount,
          		        'ptpdate' : document.getElementById("ptpdate").value,
          		        'reason' : $scope.dataIn.reason,
          		        'reviewdate' : document.getElementById("reviewdate").value,
          		        'route' : $scope.dataIn.route,
          		        'arrearsamount' : $scope.dataIn.arrearsamount,
          		        'oustbalance' : $scope.dataIn.oustbalance
      			 };
            		console.log('activity data ',action_data);
            $.ajax({
          	  url: ServerAddress.address + '/api/save_activity',
  	       	  type: "post", 
  	       	  data:action_data,
  	       	  success: function(response) {
  	       		console.log(response);
  	       		$timeout(function() {
          			$mdDialog.show(
          		      $mdDialog.alert()
          		        .parent(angular.element(document.querySelector('#mimin')))
          		        .title('Success')
          		        .textContent('Action successfully submitted.')
          		        .ariaLabel('Success')
          		        .ok('OK')
          		    ).then(function(){
          		    	$scope.Loading = false;
                   	    //$state.go('viewall',{'from':'action'});
          		    	window.history.back();
          		    });
  	       		}, 1500);
  	       	  },
  	       	  error: function(xhr) {
  	       	    alert('Error');
  	       	  }
  	       	});
            
          };
          //end action submit button
          
          //letter generation start
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
         	 StudentDataOp.pbbBalance(document.getElementById("cust").value).success(function (data) {
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
    })
})

app.controller('contactCtrl', function($scope,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var cust = document.getElementById("cust").value;
	var username = document.getElementById("username").value;
	
	$scope.saveData = [];
	$scope.addShow = true;
	
	$scope.refreshBtn = "fa fa-refresh";
	  $scope.contactsData = [];
	  
	  StudentDataOp.getContacts2(cust).success(function(data){
		 $scope.contactsData = data;
      })
      
      $scope.saveContact = function(){
		  $scope.saveData.owner = username;
		  $scope.saveData.custnumber = cust;
		  
		  var contact_data = {
    			'cust' : cust,
  		        'owner' : username,
  		        'fullname' : $scope.saveData.fullname,
  		        'address' : $scope.saveData.address,
  		        'phone' : $scope.saveData.phone,
  		        'email' : $scope.saveData.email,
  		        'relationship' : $scope.saveData.relationship,
  		        'id' : makeid()
			 };
		  
		  //console.log('contacts data to save ',$scope.saveData);
		  
		  $.ajax({
        	  url: ServerAddress.address + '/api/save_contact',
	       	  type: "post", 
	       	  data: contact_data,
	       	  success: function(response) {
	       		$timeout(function() {
        			$mdDialog.show(
        		      $mdDialog.alert()
        		        .parent(angular.element(document.querySelector('#mimin')))
        		        .clickOutsideToClose(true)
        		        .title('Success')
        		        .textContent('Contacts submitted.')
        		        .ariaLabel('Success')
        		        .ok('OK')
        		    ).then(function(){
        		    	$scope.saveData = [];
        		    	$scope.dataLoading = false;
        		    	$scope.contactsRefreshfnc();
        		    });
	       		}, 1500);
	       	  },
	       	  error: function(xhr) {
	       	    alert('Error adding contacts');
	       	  }
	       	});
	  }
       
       $scope.contactsRefreshfnc = function(){
			$scope.refreshBtn = "fa fa-spinner fa-spin";
			StudentDataOp.getContacts2(cust).success(function(data){
	            $scope.contactsData = data;
	            $scope.refreshBtn = "fa fa-refresh";
			}).error(function(err){
				$scope.refreshBtn = "fa fa-refresh";
				alert('Unable to retrieve contacts'+err);
			})
		}
       
       $scope.delC = function(task){
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
})

app.controller('otherCtrl', function($scope,StudentDataOp){
	var cust = document.getElementById("cust").value;
	  $scope.othercardData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherCards(cust).success(function(data){
		  $scope.othercardData = data;
		  $scope.otherLength = data.length;
       })
          
})

app.controller('sameidnumbersCtrl', function($scope,StudentDataOp){
	var acc = document.getElementById("acc").value;
	  $scope.sameidnumbers = [];
	  StudentDataOp.getAccount(acc).success(function(data){
		  //console.log('sameidnumbersCtrl id for acc '+ data[0].NATIONID);
		  var nationalid = data[0].NATIONID;
		  StudentDataOp.sameIdnumbers(nationalid).success(function(data){
			  console.log('sameidnumbersCtrl data ',data.length);
			  $scope.sameidnumbers = data;
	       })
	  })
	  
})

app.controller('directorsCtrl', function($scope,StudentDataOp){
	var cust = localStorage.getItem('cust');
	  $scope.directorsData = [];
	  StudentDataOp.getDirectors(cust).success(function(data){
		  console.log('directorsCtrl data',data)
		  $scope.directorsData = data;
       })
          
})

app.controller('otherCtrl', function($scope,StudentDataOp){
	var cust = document.getElementById("cust").value;
	  $scope.othercardData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherCards(cust).success(function(data){
		  $scope.othercardData = data;
		  $scope.otherLength = data.length;
       })
          
})

app.controller('filesCtrl', function($scope,StudentDataOp,FileUploader){
  console.log('-->filesCtrl');
  $scope.uploadedfiles = [];
  
  var acc = document.getElementById("acc").value;
  var cust = document.getElementById("cust").value;
  
  StudentDataOp.getFiles(cust).success(function (data) {
    console.log('uploaded files',data);
    $scope.uploadedfiles = data;
  })
  
  var uploader = $scope.uploader = new FileUploader({
      url: 'upload.php'
  });

  // FILTERS

  uploader.filters.push({
      name: 'customFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          return this.queue.length < 10;
      }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

  console.info('uploader', uploader);
})

app.controller('collateralCtrl', function($scope,$http,$timeout,$mdDialog,StudentDataOp,ServerAddress){
  var acc = document.getElementById("acc").value;
  var cust = document.getElementById("cust").value;
  var username = document.getElementById("username").value;
  
  $scope.addShow=true;
  $scope.deleteShow=false;
  $scope.editShow=false;

  $scope.Collateral = [];
  $scope.dataDeptColl = [];
  $scope.delContacts = {};

       StudentDataOp.getCollateral(cust).success(function (data) {
         console.log('getCollateral data',data);
         $scope.Collateral = data;
       })
getDeptCollateral(); 
       function getDeptCollateral(){
	       StudentDataOp.getDeptCollateral(cust).success(function (data) {
	         console.log('getDeptCollateral =>',data);
	         $scope.dataDeptColl = data;
	       })
       }
       $scope.saveDeptColl = function(){
    	   	 $scope.Loading = true;
           
             $scope.deptColl.acc = document.getElementById("acc").value;
             $scope.deptColl.cust = document.getElementById("cust").value;
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

})

app.controller('contactCtrl', function($scope,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var cust = document.getElementById("cust").value;
	var username = document.getElementById("username").value;
	
	$scope.saveData = [];
	$scope.addShow = true;
	
	$scope.refreshBtn = "fa fa-refresh";
	  $scope.contactsData = [];
	  
	  StudentDataOp.getContacts2(cust).success(function(data){
		 $scope.contactsData = data;
      })
      
      $scope.saveContact = function(){
		  $scope.saveData.owner = username;
		  $scope.saveData.custnumber = cust;
		  
		  var contact_data = {
    			'cust' : cust,
  		        'owner' : username,
  		        'fullname' : $scope.saveData.fullname,
  		        'address' : $scope.saveData.address,
  		        'phone' : $scope.saveData.phone,
  		        'email' : $scope.saveData.email,
  		        'relationship' : $scope.saveData.relationship,
  		        'id' : makeid()
			 };
		  
		  //console.log('contacts data to save ',$scope.saveData);
		  
		  $.ajax({
        	  url: ServerAddress.address + '/api/save_contact',
	       	  type: "post", 
	       	  data: contact_data,
	       	  success: function(response) {
	       		$timeout(function() {
        			$mdDialog.show(
        		      $mdDialog.alert()
        		        .parent(angular.element(document.querySelector('#mimin')))
        		        .clickOutsideToClose(true)
        		        .title('Success')
        		        .textContent('Contacts submitted.')
        		        .ariaLabel('Success')
        		        .ok('OK')
        		    ).then(function(){
        		    	$scope.saveData = [];
        		    	$scope.dataLoading = false;
        		    	$scope.contactsRefreshfnc();
        		    });
	       		}, 1500);
	       	  },
	       	  error: function(xhr) {
	       	    alert('Error adding contacts');
	       	  }
	       	});
	  }
       
       $scope.contactsRefreshfnc = function(){
			$scope.refreshBtn = "fa fa-spinner fa-spin";
			StudentDataOp.getContacts2(cust).success(function(data){
	            $scope.contactsData = data;
	            $scope.refreshBtn = "fa fa-refresh";
			}).error(function(err){
				$scope.refreshBtn = "fa fa-refresh";
				alert('Unable to retrieve contacts'+err);
			})
		}
       
       $scope.delC = function(task){
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
})

app.controller('addcontactCtrl', function($scope,$state,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var cust = localStorage.getItem("cust");
	var username = localStorage.getItem("uname");
	
	$scope.addcontactData = [];
	$scope.addcontactData.fullname = 0;
	$scope.addcontactData.rel = 0;
	$scope.addcontactData.contact = 0;
	
	$scope.addContact = function(){
		$scope.Loading = true;
		addData();
			
	}
	
	$scope.cancelAdd = function(){
		$state.go('action.contacts');
	}
	
	function addData(){
		   var contacts_data = { 
				   'cust' : cust,
			       'fullname' : $scope.addcontactData.fullname,
			       'contact' : $scope.addcontactData.contact,
			       'rel' : $scope.addcontactData.rel,
			       'owner' : username
	          }; 
		   console.log('saving contact '+ contacts_data.cust+ 'full name '+contacts_data.fullname+' contacts '+ contacts_data.contact+ ' owner '+contacts_data.owner+ ' rel '+contacts_data.rel);
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
})

app.controller('contactssCtrl', function($scope,$state,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var cust = localStorage.getItem("cust");
	var username = document.getElementById("username").value;
	var acc = document.getElementById("acc").value;
	
	console.log('cust from session '+cust);
	
	$scope.contactsData = [];
	$scope.contact= [];
	
	StudentDataOp.getAccount(acc).success(function(data){
		//console.log(data);
		if(data.length !== 0)
		$scope.contact=data[0];
	})
	getContacts();
	function getContacts(){
		StudentDataOp.getContacts(cust).success(function(data){
			//console.log('getContacts data ',data.length);
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
		$state.go('action.editcontacts',{'id':id})
	}
})

app.controller('editcontactsCtrl', function($scope,$state,$stateParams,StudentDataOp,ServerAddress,$timeout,$mdDialog,$mdMedia){
	var id = $stateParams.id;
	$scope.editContact = {};
	StudentDataOp.getaddedContact(id).success(function(data){
		//$scope.editContact = data[0];
		$scope.editContact.id = data[0].ID;
		$scope.editContact.person = data[0].PERSON;
		$scope.editContact.contact = data[0].CONTACT;
		$scope.editContact.rel = data[0].REL;
		
		console.log('edit contacts data ',$scope.editContact);
	})
	$scope.cancelAdd = function(){
		$state.go('action.contacts');
	}
})

app.controller('emailCtrl', function($scope){
	console.log('--> emailCtrl ');
	$scope.send = [];
	
	$scope.sendEmail = function(){
		$scope.Loading = true;
		console.log('sending this email ',$scope.send);
	}
})

app.controller('customerinfoCtrl', function($scope,$timeout,$mdDialog,StudentDataOp){
	var cust = document.getElementById("cust").value;
	var acc= localStorage.getItem("acc").value;
	var dept= localStorage.getItem("division");
	var user= localStorage.getItem("username");
	
	console.log('customerinfoCtrl ... '+ cust);
	
	$scope.meta = [];
	
	getMeta();
	
	function getMeta(){
		StudentDataOp.getMeta(cust).success(function(data){
			console.log('getMeta data ',data);
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
		console.log('showing update button ... ...');
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
})