var app = angular.module('RDash');

app.controller('MasterCtrl', function($scope,$state,$window,$http,$timeout, Idle, $mdDialog,ServerAddress,StudentDataOp,Notification){
	
	var username= localStorage.getItem("uname");
    var division= localStorage.getItem("division");
    var rights= localStorage.getItem("rights");

    $scope.todaysworknotify = 0;
    $scope.worklistnotify = 0;
    $scope.myallocnotify = 0;
    $scope.overdueplansnotify = 0;
    $scope.viewallnotify = 0;
    $scope.noplansnotify = 0;
    $scope.zeronotify = 0;

    var socket = io(ServerAddress.urlsocketio);
    
      socket.on('chatmessage', function(msg){
	    //console.log('Message received ',msg);
	    getNotification();
	  });
      
      socket.on('logout', function(msg){
    	  tousers();
    	  $scope.$apply();
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
	//noplanscc();
	//overdueplanscc();
	//worklistnotify();
	//viewallnotify();
	//myallocnotify();
	
	//bounced ajax
	var ajax_call = function() {
		getbouncedNotification();
	};
	
	var interval = 1000 * 60 * 1; // runs every minute
	setInterval(ajax_call, interval);

	
	function worklistnotify(){
		StudentDataOp.worklistnotifycc(username).success(function(data){
			$scope.worklistnotify = data.length;
		})
	}

	function myallocnotify(){
		StudentDataOp.myallocnotifycc(username).success(function(data){
			$scope.myallocnotify = data.length;
		})
	}

	function viewallnotify(){
		StudentDataOp.viewallnotifycc(username).success(function(data){
			$scope.viewallnotify = data.length;
		})
	}

	function noplanscc(){
		StudentDataOp.noplanscc(username).success(function(data){
			$scope.noplansnotify = data.length;
		})
	}

	function overdueplanscc(){
		StudentDataOp.overdueplanscc(username).success(function(data){
			$scope.overdueplansnotify = data.length;
		})
	}
	
	function getNotification(){
		StudentDataOp.getNotification(username).success(function(data){
			$scope.messages = data;
			$scope.nuofnotification = data.length;
			if(data.length>0){
				Notification.error({message: 'You have '+ data.length +' unread notification(s)', delay: null});
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
			$scope.messages = data;
		})
	}
	
	//pending chats
	
	pendingChats();
	
	function pendingChats(){
		StudentDataOp.pendingChats(username).success(function(data){
			//console.log('with no function ' + username);
			if(data.length > 0){
				//console.log('Pending chats '+ data.length);
				Notification.error({message: 'You have '+ data.length +' pending chat(s)', delay: null});
				
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
	

	$scope.sendnotification = function(){
		$scope.Loading = true;
		var notifocation_data = {
  				'id' : makeid(),
		        'cust' : $scope.dataNotification.custnumber,
		        'accnumber' : $scope.dataNotification.custnumber,
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
		
		//  send email
		
		sendEmail();
		
		function sendEmail(){
			$.ajax({
				  url: ServerAddress.urlemail + '/api/v2/email',
			   	  type: "post", 
			   	  data:notifocation_data,
			   	  success: function(response) {
			   		//console.log('Email sent from sendEmail()');
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
	
		$scope.accounts = [];
		$scope.searchtotal = 0;
		$scope.badge = "badges-ribbon-content badge-success";

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

app.controller('dashccCtrl', function($scope,$http,StudentDataOp,ServerAddress){	
	var username= localStorage.getItem("uname");
	
	$scope.attrs = {

    "caption": "Portfolio Size",
    "subCaption": "Co-operative Bank",
    "numberprefix": "",
    "plotgradientcolor": "",
    "bgcolor": "FFFFFF",
    "showalternatehgridcolor": "0",
    "divlinecolor": "CCCCCC",
    "showvalues": "0",
    "showcanvasborder": "0",
    "canvasborderalpha": "0",
    "canvasbordercolor": "CCCCCC",
    "canvasborderthickness": "1",
    "yaxismaxvalue": "30000",
    "captionpadding": "30",
    "linethickness": "3",
    "yaxisvaluespadding": "15",
    "legendshadow": "0",
    "legendborderalpha": "0",
    "palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
    "showborder": "0"
};

$scope.categories = [{
    "category": [{
        "label": "Jan"
    }, {
        "label": "Feb"
    }, {
        "label": "Mar"
    }, {
        "label": "Apr"
    }, {
        "label": "May"
    }, {
        "label": "Jun"
    }, {
        "label": "Jul"
    }, {
        "label": "Aug"
    }, {
        "label": "Sep"
    }, {
        "label": "Oct"
    }, {
        "label": "Nov"
    }, {
        "label": "Dec"
    }]
}];

$scope.dataset = [{
        "seriesname": "Value",
        "data": [{
            "value": "22400"
        }, {
            "value": "24800"
        }, {
            "value": "21800"
        }, {
            "value": "21800"
        }, {
            "value": "24600"
        }, {
            "value": "27600"
        }, {
            "value": "26800"
        }, {
            "value": "27700"
        }, {
            "value": "23700"
        }, {
            "value": "25900"
        }, {
            "value": "26800"
        }, {
            "value": "24800"
        }]
    },

    {
        "seriesname": "Volume",
        "data": [{
            "value": "10000"
        }, {
            "value": "11500"
        }, {
            "value": "12500"
        }, {
            "value": "15000"
        }, {
            "value": "16000"
        }, {
            "value": "17600"
        }, {
            "value": "18800"
        }, {
            "value": "19700"
        }, {
            "value": "21700"
        }, {
            "value": "21900"
        }, {
            "value": "22900"
        }, {
            "value": "20800"
        }]
    }
];
    
})

app.controller('viewallccCtrl', function($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var username = localStorage.getItem('uname');
	//console.log('-->viewall2Ctrl ' + $stateParams.from);
	var _from = $stateParams.from;
	var division  = localStorage.getItem("division");
	//console.log('-->viewall2Ctrl ' + division);
	
	$scope.section = division
	
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
				  loadgridData('searchbyarocode/' + $scope.searchbyarocode);
			  }
		  }
	}
     
     $scope.mySearchcustnumber = function(keyEvent) {
		  if (keyEvent.which === 13){
			  $scope.searchbyarocode = undefined;
			  $scope.searchbyname = undefined;
			  
			  if($scope.searchbycustnumber !== undefined){
				  loadgridData('searchbycustnumber/'+$scope.searchbycustnumber);
			  }
		  }
	}
	
})//

app.controller('noplansccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
		    fastWatch: true
		};
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
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
	         $window.open('topnavcc.jsp','_blank');
		  })
     };
})


app.controller('overdueplansccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
		    fastWatch: true
		};
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
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
	         $window.open('topnavcc.jsp','_blank');
		  })
     };
})

app.controller('todaysccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
		    fastWatch: true
		};
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
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
	         $window.open('topnavcc.jsp','_blank');
		  })
     };
})

app.controller('myallocationsccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
		    fastWatch: true
		};
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 130 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME',minWidth: 200},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('cards/' + username);
	
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
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavcc.jsp','_blank');
		  //})
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
		    fastWatch: true
		};
	
	$scope.gridOptions.columnDefs = [
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
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
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnavcc.jsp','_blank');
		  //})
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
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
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  //})
     };
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
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
	
	 $scope.showMe = function(accnumber){
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  //})
     };
})

app.controller('todaysworkccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('todaysworkcc/'+username);
	
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
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  //})
     };
})//

app.controller('closedccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = localStorage.getItem('uname');
	var division = localStorage.getItem("division");
	
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT'},
	                                 {name:'OUTBALANCE'},
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('closed/' + division);
	
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
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		 // })
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
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  //})
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
	
	 $scope.showMe = function(accnumber){
		 //StudentDataOp.getAccount(accnumber).success(function(data){
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         servletPass();
	         $window.open('topnav2.jsp','_blank');
		  //})
     };
})

app.controller('smsCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
  var cust = document.getElementById("cust").value;
  var acc = document.getElementById("acc").value;
  var dept = localStorage.getItem("division");
  var username = document.getElementById("username").value;

  $scope.dataSms = [];
  $scope.sentsms = [];

  sentsms(cust);

  StudentDataOp.getAccount(acc).success(function(data){
    $scope.dataSms.smsNumber = data[0].TELNUMBER;
    var days = data[0].DAYSINARR;
    var totalarr = data[0].TOTALARREARS;

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
	  var cust = document.getElementById("cust").value;
	  var acc = document.getElementById("acc").value;
	  var division = localStorage.getItem("division");
	  var username = document.getElementById("username").value;

	  //console.log('division is '+ division);

	  $scope.dataIn = [];
	  $scope.collectors = []

	  StudentDataOp.getAccount(acc).success(function(data){
	    $scope.dataIn.colofficer = data[0].COLOFFICER;
	    $scope.dataIn.acc = data[0].ACCNUMBER;
	  })

	  StudentDataOp.deptUsers(division).success(function(data){
	    $scope.collectors = data;
	  })

	   $scope.reallocatefunct = function(){
	    $scope.Loading = true;
	    $.ajax({
	            url: ServerAddress.address + '/api/reallocate',
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