var app = angular.module('RDash');

app.controller('MainCtrl', function($scope,$state,$window,$http,$timeout, Idle, $mdDialog,ServerAddress,StudentDataOp,Notification){

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
    
    var username= localStorage.getItem("uname");
    var division= localStorage.getItem("division");
    var rights= localStorage.getItem("rights");
    
    if(division === 'CMD'){
    	$scope.cmd = true;
    }
    
    if(rights === 'ADMIN'){
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
    	  tousers();
    	  console.log('calling logout from io');
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

	$scope.msgBounced = function(){
		$scope.Loading = true;
		$timeout(function() {
			getbouncedNotification();
        	$scope.read = false;
			$scope.Loading = false;
		}, 1000);
	}

	getNotification();

	function getNotification(){
		StudentDataOp.getNotification(username).success(function(data){
			$scope.messages = data;
			if(data.length>0){
				Notification.error({message: 'There are unread notifications', delay: null});
			}
		})
	}


//pending chats
pendingChats();
	
	function pendingChats(){
		StudentDataOp.pendingChats(username).success(function(data){
			//console.log('with no function ' + username);
			if(data.length > 0){
				//console.log('Pending chats '+ data.length);
				Notification.error({message: 'You have '+data.length+' pending chat(s)', delay: null});
				for (var i = 0; i < data.length; i++) { 
				    console.log('loop '+i, data[i].USER_FROM);
				    var pending_from = data[0].USER_FROM;
					var pending_msg = data[0].MSG;
					var timesent = data[0].TIME_SENT;
				    
				    $.ajax({
				    	  url: ServerAddress.address + '/api/v2/userstatus/' + pending_from +'?_=' + new Date().getTime(), //to prevent cache, repeat solution
				    	  type: "get",
				    	  cache: false,
				    	  success: function(response) {
				    		    //console.log('Sending user:::: ' , response[0])
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
		$scope.dataNotification.custnumber = ($scope.dataNotification.accnumber).substring(5,12);
		//console.log('custnumber === '+ $scope.dataNotification.custnumber)
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
		$timeout(function(){
			$.ajax({
				  url: ServerAddress.address + '/api/save_notification',
			   	  type: "post", 
			   	  data:notifocation_data,
			   	  success: function(response) {
			   		$timeout(function() {
						$mdDialog.show(
					      $mdDialog.alert()
					        .title('Success')
					        .textContent('Notification successfully sent.')
					        .ok('OK')
					    ).then(function(){
					    	$scope.Loading = false;
					    	$scope.sendMessage('notification sent');
					    	$scope.dataNotification = [];
					    });
			   		},500);
			   	  },
			   	  error: function(xhr) {
			   	    alert('Error');
			   	  }
			   	});
			$scope.Loading = false;
		},1500);
		
		//  send email
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
	
	//onoffswitch
	
	 $scope.$watch("onoffswitch", function (newval) {
        if(newval === true){
        	getNotification();
        	$scope.read = true;
        } else if(newval === false){
        	getreadNotification();
        	$scope.read = false;
        }
     }, true);

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

  //For user timeout 
    
    $scope.events = [];
    $scope.idle = 5;
    $scope.timeout = 5;

    $scope.$on('IdleStart', function() {
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
        if(loggeduser=="" || loggeduser == undefined){
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
})

app.controller('dashCtrl', function($scope,$http,StudentDataOp,ServerAddress){
	var username= localStorage.getItem("uname");

	//chart
	$scope.datasource = {
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

app.controller('viewallmcoopCtrl', function($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var username = localStorage.getItem('uname');
	var division  = localStorage.getItem("division");
	
	$scope.section = division
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'viewallmcoop.csv',
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
	                                 {name:'AROCODE'},
	                                 {name:'LOANAMOUNT',cellFilter: 'number: 2'},
	                                 {name:'REPAYMENTAMOUNT',cellFilter: 'number: 2'},
	                                 {name:'COLOFFICER'},
	                                 {name:'ARREARS_CATEGORY'},
	                                 {name:'EMPLOYER'},
	                                 {name:'REVIEWDATE'}
	                               ];

		loadgridData('divallmcoop');
		//$scope.gridApi.saveState.restore( $scope, $scope.state );
	
	function loadgridData(inparams){
		$http({
	        method: 'get',
	        url: ServerAddress.address + '/api/status/'+ inparams,
	        headers: {'Content-Type': 'application/json'}
	      }).success(function (data) {
	    	  $scope.gridOptions.data = data;
	      }).error(function (err) {
	         alert('Error '+ err) 
	      });
	}
	 
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
		 	//console.log(data[0]);
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].PHONENUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
     
     $scope.mySearchname = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbycustnumber = undefined;
			  
			  if($scope.searchbyname !== undefined){
				  loadgridData('searchbyname/'+$scope.searchbyname);
			  }
		  }
	}
     
     $scope.mySearcharocode = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbycustnumber = undefined;
			  $scope.searchbyname = undefined;
			  
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
			  
			  if($scope.searchbycustnumber !== undefined){
				  console.log('searching by custnumber '+ $scope.searchbycustnumber);
				  loadgridData('searchbycustnumber/'+$scope.searchbycustnumber);
			  }
			  //console.log('no search key detected');	
		  }
	}
	
})

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
		loadgridData('worklist/'+username);
	
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
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].CUSTNUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
})

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
	
	 $scope.showMe = function(accnumber){
		 StudentDataOp.getMcoop(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(data[0].PHONENUMBER);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavmcoop.jsp','_blank');
		  })
     };
})//

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
})

app.controller('bucketsCtrl', function($scope,$http, ServerAddress, StudentDataOp){
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

app.controller('creditwatchCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
  //
})

app.controller('nocreditwatchCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
  //
})