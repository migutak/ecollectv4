
var app = angular.module('RDash');

app.controller('MasterCtrl', function($scope,$state,$window,$http,$timeout, Idle, $mdDialog,ServerAddress,StudentDataOp,Notification){
	
    var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	var rights = document.getElementById("s_in_rights").value;

    $scope.todaysworknotify = 0;
    $scope.worklistnotify = 0;
    $scope.myallocnotify = 0;
    $scope.overdueplansnotify = 0;
    $scope.viewallnotify = 0;
    $scope.noplansnotify = 0;
    $scope.zeronotify = 0;

    /*var socket = io(ServerAddress.urlsocketio);
    
      socket.on('chatmessage', function(msg){
	    //console.log('Message received ',msg);
	    getNotification();
	  });
      
      socket.on('logout', function(msg){
    	  tousers();
    	  $scope.$apply();
  	  });*/
	
    
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
	
	//getNotification();
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
	//setInterval(ajax_call, interval);

	
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
	
	//pendingChats();
	
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
    //openPortfoliomovementrpt
    $scope.openPortfoliomovementrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=portfoliomovt_cc_test.rptdesign&__title=Portfolio Movement Report","_blank");
    }

    $scope.openRelegationanalysis = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=file_analysis_cc_test.rptdesign&__title=Relegation Analysis","_blank");
    }
  //openNotesrpt()
    $scope.openNotesrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=notes.rptdesign&__title=Notes","_blank");
    }
    
  //openNoneactivityrpt()
    $scope.openNoneactivityrpt = function(){
    	window.open(ServerAddress.urlreports + "/frameset?__report=noneactivity_cc.rptdesign&__title=None activity","_blank");
    }

    
   /* $scope.$on('IdleTimeout', function() {
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
    });*/

    $scope.logout = function(){
    	var confirm = $mdDialog.confirm()
		        .title('Logout')
		        .textContent('Are you sure you want to logout?')
		        .ok('OK')
		        .cancel('Cancel');
		  $mdDialog.show(confirm).then(function() {
			  	//socket.emit('logout',username);
			  	loggedout(username);
			  	logg_out();
	    		//
	    		window.open("login.jsp","_self");
	    		
		  }, function() {
		    console.log('Cancelled')
		  });
    }
    
    function logg_out(){
		$http({
			url : './LogoutServlet',
			method : 'post'
		}).success(function(response){
			//console.log('logg_out success')
		})
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
	//var username= localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	
	
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
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
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
	                                 {name:'LIMIT',cellFilter: 'number: 2',cellClass: cellColor},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2',cellClass: cellColor},
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
			 $("#acc_number").val(cardacct);
	         $("#cust_number").val(cardacct);
	         $window.open('topnavcc.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
     };
     
     
     $scope.mySearchidnumber = function(keyEvent) {
  			if (keyEvent.which === 13){
  				$scope.searchbycustnumber = undefined;
  				$scope.searchbyname = undefined;
  				$scope.searchbyaccnumber = undefined;
  				$scope.mysearchempcode = undefined;
  				$scope.searchbyarocode = undefined;

  				if($scope.mysearchidnumber !== undefined){
 				  $state.go('searchbyidnumber',{'idnumber':$scope.mysearchidnumber});
 				}else{
 					console.log('no search key detected'); 
 				}
 			}
 		}
})//

app.controller('precardsCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp, $state, uiGridConstants){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
	$scope.section = division
	
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
	              { name: 'CARD_NUMBER',
	                                	cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 150 },
	              {name:'CARDACCT',cellClass: cellColor},
	              {name:'CARDNAME', field:'CARDNAME',minWidth: 200,cellClass: cellColor},
	              {name:'PREVDEBT',cellClass: cellColor},
	              {name:'DAYSINARREARS',cellClass: cellColor},
	              {name:'PAYMENT',cellClass: cellColor},
	              {name:'LIMIT',cellFilter: 'number: 2',cellClass: cellColor},
	              {name:'OUTBALANCE',cellFilter: 'number: 2',cellClass: cellColor},
	              {name:'CYCLE',cellClass: cellColor},
	              {name:'EXPPMNT',cellClass: cellColor},
	              {name:'COLOFFICER',cellClass: cellColor},
	              {name:'LASTPAYMENTDATE',cellClass: cellColor},
	              {name:'PREVDEBT',visible: true}
	                               ];
		loadgridData('status/precards');
	
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
              return 'black';
            }
    }
	 
	 $scope.showMe = function(cardacct){
			 $("#acc_number").val(cardacct);
	         $("#cust_number").val(cardacct);
	         $window.open('topnavccpre.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
     };
     
     
     $scope.mySearchidnumber = function(keyEvent) {
  			if (keyEvent.which === 13){
  				$scope.searchbycustnumber = undefined;
  				$scope.searchbyname = undefined;
  				$scope.searchbyaccnumber = undefined;
  				$scope.mysearchempcode = undefined;
  				$scope.searchbyarocode = undefined;

  				if($scope.mysearchidnumber !== undefined){
 				  $state.go('searchbyidnumber',{'idnumber':$scope.mysearchidnumber});
 				}else{
 					console.log('no search key detected'); 
 				}
 			}
 		}
})//

//begin viewall loans
app.controller('viewallCtrl',function($scope,$scope,$http,$window,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
		var division  = 'CMD';
		//var branch  = localStorage.getItem("branch");
		var branch = document.getElementById("s_in_branch").value;

	        var data1 = [];

	        $scope.gridOpts = {
	        	enableFiltering: true,
				flatEntityAccess: true,
				showGridFooter: true,
				showColumnFooter: true,
				enableGridMenu: true,
				enableSelectAll: true,
				exporterCsvFilename: 'viewall.csv',
				fastWatch: false,
			    data: data1
			  };

			  $scope.reset = function(){
			 	document.getElementById('grid02').style.display = 'none';
			 	document.getElementById('grid01').style.display = 'block';
			 	$scope.gridOpts = {
				    data: data1
				};
			  }

	$scope.refreshViewall = function(){
	 		$scope.spinner = 'fa fa-spinner fa-spin fa-2x fa-fw';
	 		$scope.regionselect = $("#regionselect").multipleSelect("getSelects", "text");
	 		$scope.divisionselect = $("#divisionselect").multipleSelect("getSelects", "text");

	 		if($scope.regionselect.length>0 || $scope.divisionselect.length>0){
	  			//
	  			var sql = "";
	  			var sqlouter = "";
	  			for(var i = 0; i<$scope.regionselect.length; i++){
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
	 				document.getElementById('grid01').style.display = 'none';
	 				document.getElementById('grid02').style.display = 'block';

	 				$scope.gridOpts.columnDefs = [
				        { name:'ACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>', minWidth: 150 },
				        { name:'CUSTNUMBER' },
				        { name:'CLIENT_NAME' },
				        { name:'OUSTBALANCE',type: 'number',cellFilter: 'number: 2',sort: {
				          direction: uiGridConstants.ASC
				        } },
				        { name:'TOTALARREARS',type: 'number',cellFilter: 'number: 2' },
				        { name:'DAYSINARR' },
				        { name:'BUCKET' },
				        { name:'BRANCHNAME' },
				        { name:'REGION' },
				        { name:'COLOFFICER' },
				        { name:'SECTION' }
				      ];
				     $scope.gridOpts.data = data;
	 			})
	 			
	 			$scope.spinner = 'fa fa-spinner';

			}else{
			       	alert('Select a region and a maximum of 2 products');
			       	$scope.spinner = 'fa fa-spinner';
			}
	}

	$scope.showMe = function(accnumber,custnumber){
		$("#acc_number").val(accnumber);
		$("#cust_number").val(custnumber);
		$("#username").val(username);
		//servletPass();
		//$window.open('topnav2.jsp','_blank');
		$window.open('topnav2.jsp?accnumber='+accnumber+"&custnumber="+ custnumber+"&username="+ username,'_blank');
	};

	$scope.mySearchname = function(keyEvent) {
	if (keyEvent.which === 13){
		$scope.searchbyarocode = undefined;
		$scope.searchbycustnumber = undefined;
		$scope.mysearchempcode = undefined;
		$scope.searchbyaccnumber = undefined;

		if($scope.searchbyname !== undefined){
			console.log('____ name ' + $scope.searchbyname);
  				  //loadgridData('searchbyname/'+$scope.searchbyname);
  				  $state.go('searchbyname',{'name':$scope.searchbyname});
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
  				  // loadgridData('searchbyarocode/' + $scope.searchbyarocode);
  				  $state.go('searchbyarocode',{'arocode':$scope.searchbyarocode});
  				}else{
  					console.log('no search key detected'); 
  				}

  			}
  		}

  		$scope.mySearchidnumber = function(keyEvent) {
  			if (keyEvent.which === 13){
  				$scope.searchbycustnumber = undefined;
  				$scope.searchbyname = undefined;
  				$scope.searchbyaccnumber = undefined;
  				$scope.mysearchempcode = undefined;
  				$scope.searchbyarocode = undefined;

  				if($scope.mysearchidnumber !== undefined){
  					console.log('searching by idnumber '+ $scope.mysearchidnumber);
 				  // loadgridData('searchbyarocode/' + $scope.searchbyarocode);
 				  $state.go('searchbyidnumber',{'idnumber':$scope.mysearchidnumber});
 				}else{
 					console.log('no search key detected'); 
 				}

 			}
 		}

 		$scope.mySearchcustnumber = function(keyEvent) {
 			if (keyEvent.which === 13){
			  // $scope.searchbycustnumber = undefined;
			  $scope.searchbyname = undefined;
			  $scope.searchbyaccnumber = undefined;
			  $scope.mysearchempcode = undefined;
			  $scope.searchbyarocode = undefined;
			  $scope.mysearchidnumber = undefined;
			  
			  if($scope.searchbycustnumber !== undefined){
			  	console.log('searching by custnumber '+ $scope.searchbycustnumber);
				  //loadgridData('searchbyarocode/' + $scope.searchbyarocode);
				  $state.go('searchbycustnumber',{'custnumber':$scope.searchbycustnumber});
				}else{
					console.log('no search key detected'); 
				}

			}
		}

}); //end viewall loans

app.controller('noplansccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnavcc.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})


app.controller('overdueplansccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnavcc.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})

app.controller('todaysccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnavcc.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})

app.controller('myallocationsccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
     };
})

app.controller('worklistccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
		$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'worklist_cards.csv',
		    fastWatch: true
		};
	
		$scope.gridOptions.columnDefs = [
            { name: 'CARDNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
            {name:'CARDACCT',cellClass: cellColor},
            {name:'CARDNAME', field:'CARDNAME',minWidth: 200,cellClass: cellColor},
            {name:'CARDSTATUS',cellClass: cellColor},
            {name:'AGEINMONTHS',cellClass: cellColor},
            //{name:'PAYMENT',cellClass: cellColor},
            {name:'LIMIT',cellFilter: 'number: 2',cellClass: cellColor},
            {name:'OUTBALANCE',cellFilter: 'number: 2',cellClass: cellColor},
            {name:'CYCLE',cellClass: cellColor},
            {name:'EXPPMNT',cellClass: cellColor},
            {name:'COLOFFICER',cellClass: cellColor},
            {name:'REVIEWDATE',cellClass: cellColor}
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
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
     };
     
   //start cellColor()
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
        	 return 'blue'
         }else{
        	 return 'black'
         }
     }//end cellColor()
})

app.controller('noplansCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnav2.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})

app.controller('worklistCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnav2.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})

app.controller('todaysworkccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
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
	                                 { name: 'CARDNUMBER',
	                                	 cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.CARDACCT)">{{row.entity.CARDNUMBER}}</a>',minWidth: 100 },
	                                 {name:'CARDACCT'},
	                                 {name:'CARDNAME', field:'CARDNAME'},
	                                 {name:'CARDSTATUS'},
	                                 {name:'AGEINMONTHS'},
	                                 {name:'PAYMENT'},
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnav2.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})//

app.controller('closedccCtrl', function($scope,$http,$window,ServerAddress,StudentDataOp){
	var username = document.getElementById("s_in_username").value;
	var division = document.getElementById("s_in_division").value;
	
	$scope.gridOptions = {  
		    enableFiltering: true,
		    flatEntityAccess: true,
		    showGridFooter: true,
		    showColumnFooter: true,
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'closedcards.csv',
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
	                                 {name:'LIMIT',cellFilter: 'number: 2'},
	                                 {name:'OUTBALANCE',cellFilter: 'number: 2'
									  },
	                                 {name:'CYCLE'},
	                                 {name:'EXPPMNT'},
	                                 {name:'COLOFFICER'},
	                                 {name:'REVIEWDATE'}
	                               ];
		loadgridData('closedcc');
	
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
			 $("#acc_number").val(accnumber);
	         $("#cust_number").val(accnumber);
	         $("#username").val(username);
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
     };
})//end closedccCtrl

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
	                                 {name:'OUSTBALANCE',cellFilter: 'number: 2'},
	                                 {name:'REVIEWDATE'},
	                                 {name:'TOTALARREARS',cellFilter: 'number: 2'},
	                                 {name:'PRINCARREARS',cellFilter: 'number: 2'},
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
	         //servletPass();
	         //$window.open('topnav2.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
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
	         //servletPass();
	         //$window.open('topnav2.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+accnumber+"&custnumber="+ accnumber+"&username="+ username,'_blank');
		  //})
     };
})

app.controller('smsCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
  var cust = document.getElementById("cust").value;
  var acc = document.getElementById("acc").value;
  //var dept = localStorage.getItem("division");
  //var username = document.getElementById("username").value;
  
  var username = document.getElementById("s_in_username").value;
	var dept = document.getElementById("s_in_division").value;

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
	  //var division = localStorage.getItem("division");
	  //var username = document.getElementById("username").value;
	  
	 var username = document.getElementById("s_in_username").value;
	 var division = document.getElementById("s_in_division").value;

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

app.controller('assigninvestigatorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
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

});

app.controller('updateinvestigatorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
  var id = $stateParams.id;
  //var username= localStorage.getItem("uname");
  var username = document.getElementById("s_in_username").value;

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
});

app.controller('investigatorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//var username= localStorage.getItem("uname");
	//var rights= localStorage.getItem("rights");
	var username = document.getElementById("s_in_username").value;
	var rights = document.getElementById("s_in_rights").value;
	
	$scope.instructions = [];
	
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];

	$scope.investigatorsfilter = 'ALL';

	//load table data
	loadTable('/api/status/investigators');
	//
	function loadTable(inUrl){
		//console.log(ServerAddress.address + inUrl);
		$('#table').bootstrapTable({
			method: 'GET',
			url: ServerAddress.address + inUrl,
			cache: false,
			height: 700,
			striped: true,
			pagination: true,
			pageSize: 20,
			search: true,
			showRefresh: true,
			columns: [
			{field: '',title: '',align: 'left',radio: 'true',clickToSelect: true},
			{field: 'ID',title: 'ID',align: 'left',valign: 'middle',formatter: assignFormatter,sortable: true}, 
			{field: 'CUSTNUMBER',title: 'CUSTNUMBER',align: 'left',valign: 'top',sortable: true},
			{field: 'ACCNUMBER',title: 'ACCNUMBER',align: 'left',valign: 'top',sortable: true},
			{field: 'CUSTNAME',title: 'CUSTNAME',align: 'left',valign: 'top',sortable: true},
			{field: 'PROPERTYNO',title: 'PROPERTYNO',align: 'left',valign: 'top',sortable: true},
			{field: 'OWNERSHIP',title: 'OWNERSHIP',align: 'left',valign: 'top',sortable: true},
			{field: 'SERVICEPROVIDER',title: 'SERVICEPROVIDER',align: 'left',valign: 'top',sortable: true},
			{field: 'DATEINPUT',title: 'DATEINPUT',align: 'left',valign: 'top',sortable: true},
			{field: 'DATEINST',title: 'DATEINST',align: 'left',valign: 'top',sortable: true},
			{field: 'AROCODE',title: 'AROCODE',align: 'left',valign: 'top',sortable: true},
			{field: 'REASONFORINV',title: 'REASONFORINV',align: 'left',visible:true},
			{field: 'DUEDATE',title: 'DUEDATE',align: 'left',visible:true},
			{field: 'FILENO',title: 'FILENO',align: 'left',visible:false},
			{field: 'STATUS',title: 'STATUS',align: 'left',visible:false}
			]
		});
}

function assignFormatter(value) {
	var $table = $('#table');
	$table.on('check.bs.table', function (e, row) {
		//var d = $table.bootstrapTable('getSelections');
		//window.localStorage.setItem("rowid", d[0].ID);	
		//window.localStorage.setItem("rowuniq", d[0].UNIQ);	
		//window.localStorage.setItem("cust", d[0].CUSTNUMBER);
		
		window.localStorage.setItem("rowid", row.ID);
		window.localStorage.setItem("cust", row.CUSTNUMBER);							
	});
	var id_in = window.localStorage.getItem("rowid");
	var cust = window.localStorage.getItem("cust");
	return '<select onChange="window.location.href=this.value"><option value="">Update</option><option value="#/assigninvestigator/'+id_in+'">Assign</option><option value="#/updateinvestigators/'+id_in+'">Status Update</option><option value="#/deleteinvestigators/'+id_in+'/'+cust+'">Cancel inst</option></select>';
}
	
	var $table = $('#table'), $button = $('#button');

	$table.on('check.bs.table', function (e, row) {
		console.log(row);
		//$scope.detailsfunc();
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

	$scope.investigatorsclick = function(f){
		$scope.investigatorsfilter = f; //,

		switch (f) {
			case 'ALL':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/investigators'
			});
			break;
			case 'unassigned':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/investigators_unassigned'
			});
			break;
			case 'Deleted':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/investigators_deleted'
			});
			break;
			case 'assigned':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/investigators_assigned'
			});
			break;
			case 'expired':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/investigators_expired'
			});
			break;
		}
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
	})//end investigatorsCtrl

app.controller('newinvestigateCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	// console.log('--> newinvestigateCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
  $scope.dataIn.dateinput = moment().format('DD-MMM-YYYY'); 

	//var username= localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	
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
});

//start debtcollectorsCtrl
app.controller('debtcollectorsCtrl', function($scope,$state,$timeout,$stateParams,$mdDialog,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem("uname");
	//var rights = localStorage.getItem("rights");
	var username = document.getElementById("s_in_username").value;
	var rights = document.getElementById("s_in_rights").value;

	$scope.total = 0;
		
	$scope.instructions = [];
	$scope.newfeenote = [];
	$scope.newstatus = [];
	$scope.extend = [];

	$scope.debtcollectorsfilter = 'ALL';

	//load table data
	loadTable('/api/status/debtcollectors');
	//
	function loadTable(inUrl){
		//console.log(ServerAddress.address + inUrl);
		$('#table').bootstrapTable({
			method: 'GET',
			url: ServerAddress.address + inUrl,
			cache: false,
			height: 700,
			striped: true,
			pagination: true,
			pageSize: 20,
			search: true,
			showRefresh: true,
			columns: [
			{field: '',title: '',align: 'left',radio: 'true',clickToSelect: true},
			{field: 'ID',title: 'ID',align: 'left',valign: 'middle',formatter: assignFormatter,sortable: true}, 
			{field: 'CUSTNUMBER',title: 'CUSTNUMBER',align: 'left',valign: 'top',sortable: true},
			{field: 'CUSTNAME',title: 'CUSTNAME',align: 'left',valign: 'top',sortable: true},
			{field: 'DATERECALLED',title: 'DATERECALLED',align: 'left',valign: 'top',sortable: true},
			{field: 'SERVICEPROVIDER',title: 'SERVICEPROVIDER',align: 'left',valign: 'top',sortable: true},
			{field: 'DATEINPUT',title: 'DATEINPUT',align: 'left',valign: 'top',sortable: true},
			{field: 'DATEINST',title: 'DATEINST',align: 'left',valign: 'top',sortable: true},
			{field: 'AROCODE',title: 'AROCODE',align: 'left',valign: 'top',sortable: true},
			{field: 'REMARKS',title: 'REMARKS',align: 'left',visible:true},
			{field: 'STATUS',title: 'STATUS',align: 'left',visible:false},
			{field: 'FILENO',title: 'FILENO',align: 'left',visible:false},
			{field: 'OWNER',title: 'OWNER',align: 'left',visible:false}
			]
		});
}

function assignFormatter(value) {
	var $table = $('#table');
	$table.on('check.bs.table', function (e, row) {
		//var d = $table.bootstrapTable('getSelections');
		window.localStorage.setItem("rowid", row.ID);	
		window.localStorage.setItem("cust", row.CUSTNUMBER);							
	});
	var id_in = window.localStorage.getItem("rowid");
	var cust = window.localStorage.getItem("cust");
	return '<select onChange="window.location.href=this.value"><option value="">Update</option><option value="#/assigndebtcollector/'+id_in+'">Assign</option><option value="#/updatedebtcollectors/'+id_in+'">Status Update</option><option value="#/deletedebtcollectors/'+id_in+'/'+cust+'">Cancel</option></select>';
}
	
	var $table = $('#table'),
	$button = $('#button');

	$table.on('check.bs.table', function (e, row) {
		//$scope.detailsfunc();
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
	
	$scope.feefunc = function(){
		var feenoteid = document.getElementById('feenoteid').value;
		var spname = document.getElementById('spname').value;
		$scope.Loading = true;
		$timeout(function() {
			$.ajax({
				url: ServerAddress.address + '/api/debtcollectorfeenote',
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
				url: ServerAddress.address + '/api/debtcollectorextend',
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
		StudentDataOp.chart_debtcollectors().success(function (response) {
			for (var i=0; i<response.length;i++){
				$scope.myDataSource.data[i].label = response[i].SERVICEPROVIDER;
				$scope.myDataSource.data[i].value = response[i].NUOFINSTRUCTIONS;
			}
		})
	}

	$scope.debtcollectorsclick = function(f){
		$scope.debtcollectorsfilter = f; //,

		switch (f) {
			case 'ALL':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/debtcollectors'
			});
			break;
			case 'unassigned':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/debtcollectors_unassigned'
			});
			break;
			case 'Deleted':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/debtcollectors_deleted'
			});
			break;
			case 'assigned':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/debtcollectors_assigned'
			});
			break;
			case 'expired':
			$table.bootstrapTable('refresh', {
				url: ServerAddress.address + '/api/status/debtcollectors_expired'
			});
			break;
		}
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

	//$scope.updateMyChartData();
})//end debtcollectorsctrl


app.controller('newdebtcollectorsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//console.log('--> newdebtcollectorsCtrl');
	$scope.showcancel = true;
	$scope.dataIn = [];
	//var username= localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
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
        //console.log(data[0]);
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

app.controller('searcharocodeCtrl', function($scope,$scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
	var arocode = $stateParams.arocode;
	// var username = localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	$scope.arocode = $stateParams.arocode;

	$scope.gridOptions = {  
		enableFiltering: true,
		flatEntityAccess: true,
		showGridFooter: true,
		showColumnFooter: true,
		enableGridMenu: true,
		enableSelectAll: true,
		exporterCsvFilename: 'searcharocode.csv',
		fastWatch: true,
		onRegisterApi: function(gridApi){
			$scope.gridApi = gridApi;
		}
	};

	$scope.gridOptions.columnDefs = [
	{name:'ACCNUMBER',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	{name:'CUSTNUMBER'},
	{name:'CLIENTNAME', field:'CLIENT_NAME'},
	{name:'AROCODE'},
	{name:'BRANCHNAME'},
	{name:'TELNUMBER'},
	{name:'OUSTBALANCE',type: 'number',cellFilter: 'number: 2',sort: {
          direction: uiGridConstants.ASC
        }},
	{name:'TOTALARREARS',type: 'number',cellFilter: 'number: 2'},
	{name:'NATIONID'},
	{name:'BUCKET'},
	{name:'COLOFFICER'}
	];
	
	loadgridData(arocode);

	function loadgridData(arocode){
		$http({
			method: 'get',
			url: ServerAddress.address + '/api/v2/searchbyarocode/'+arocode,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$scope.gridOptions.data = data;
		}).error(function (err) {
			alert('Error ' + err) 
		});
	}

	$scope.showMe = function(accnumber,custnumber){
		$("#acc_number").val(accnumber);
		$("#cust_number").val(custnumber);
		$("#username").val(username);
		$window.open('topnavcc.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
	};
}); //end searcharocodeCtrl

app.controller('searchbycustnumberCtrl', function($scope,$scope,$window,$stateParams,$http,StudentDataOp,ServerAddress,$stateParams, $state, uiGridConstants){
	var custnumber = $stateParams.custnumber;
	$scope.custnumber = $stateParams.custnumber;
	// var username= localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	
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
	cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	{name:'CUSTNUMBER'},
	{name:'Client Name', field:'CLIENT_NAME'},
	{name:'AROCODE'},
	{name:'DAYSINARR'},
	{name:'INTRATEARR'},
	{name:'OUSTBALANCE'},
	{name:'REVIEWDATE'},
	{name:'TOTALARREARS'},
	{name:'PRINCARREARS'},
	{name:'COLOFFICER'},
	{name:'BRANCHNAME'}
	];

	loadgridData(custnumber);
	
	function loadgridData(custnumber){
		$http({
			method: 'get',
			url: ServerAddress.address+'/api/v2/searchbycustnumber/'+custnumber,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
	    	  //console.log(data);
	    	  $scope.gridOptions.data = data;
	    	}).error(function (err) {
	    		alert('Error '+err) 
	    	});
	    }

	    $scope.showMe = function(cardacct, custnumber){
	    	$("#acc_number").val(cardacct);
	    	$("#cust_number").val(custnumber);
	    	$("#username").val(username);
	    	//servletPass();
	    	$window.open('topnavcc.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
		};  

}); //end searchbycustnumberCtrl

app.controller('searchbynameCtrl', function($scope,$scope,$http,$window,$stateParams,ServerAddress,StudentDataOp,$stateParams, $state, uiGridConstants){
	var name = $stateParams.name;
	$scope.name = $stateParams.name;
	// var username= localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	
	$scope.gridOptions = {  
		enableFiltering: true,
		flatEntityAccess: true,
		showGridFooter: true,
		showColumnFooter: true,
		enableGridMenu: true,
		enableSelectAll: true,
		exporterCsvFilename: 'accounts_by_name.csv',
		fastWatch: true,
		onRegisterApi: function(gridApi){
			$scope.gridApi = gridApi;
		}
	};
	
	$scope.gridOptions.columnDefs = [
	{name:'Accnumber',cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER)">{{row.entity.ACCNUMBER}}</a>' },
	{name:'CUSTNUMBER'},
	{name:'Client Name', field:'CLIENT_NAME'},
	{name:'AROCODE'},
	{name:'DAYSINARR'},
	{name:'INTRATEARR'},
	{name:'OUSTBALANCE',cellFilter: 'number: 2'},
	{name:'REVIEWDATE'},
	{name:'TOTALARREARS',cellFilter: 'number: 2'},
	{name:'PRINCARREARS'},
	{name:'COLOFFICER'},
	{name:'BRANCHNAME'}
	];
	
	loadgridData(name);
	
		function loadgridData(name){
			$http({
				method: 'get',
				url: ServerAddress.address+'/api/v2/searchbyname/'+name,
				headers: {'Content-Type': 'application/json'}
			}).success(function (data) {
	    	  //console.log(data);
	    	  $scope.gridOptions.data = data;
	    	}).error(function (err) {
	    		alert('Error '+err) 
	    	});
	    }

	    $scope.showMe = function(accnumber,custnumber){
	    	$("#acc_number").val(accnumber);
		 	$("#cust_number").val(custnumber);
		 	$("#username").val(username);
		 	$window.open('topnav2.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
	    };
	});//end searchbynameCtrl

app.controller('searchempcodeCtrl', function($scope,$scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
	var empcode = $stateParams.empcode;
	// var username = localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	$scope.empcode = $stateParams.empcode;

	$scope.gridOptions = {  
		enableFiltering: true,
		flatEntityAccess: true,
		showGridFooter: true,
		showColumnFooter: true,
		enableGridMenu: true,
		enableSelectAll: true,
		exporterCsvFilename: 'seachbyemployer.csv',
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
	{name:'OUSTBALANCE',cellFilter: 'number: 2'},
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

	$scope.showMe = function(accnumber,custnumber){
		//StudentDataOp.getAccount2(accnumber).success(function(data){
			//console.log(data);
			$("#acc_number").val(accnumber);
			$("#cust_number").val(custnumber);
			$("#username").val(username);
			//servletPass();
			$window.open('topnavpredelq.jsp','_blank');
			//$window.open('topnavcc.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
		//})
	};
}); // end searchempcodeCtrl

app.controller('searchidnumberCtrl', function($scope,$stateParams,$http,$window,ServerAddress,$stateParams, $state, uiGridConstants,StudentDataOp){
	var idnumber = $stateParams.idnumber;
	//var username = localStorage.getItem("uname");
	var username = document.getElementById("s_in_username").value;
	$scope.idnumber = $stateParams.idnumber;

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
		cellTemplate:'<a href="" ng-click="grid.appScope.showMe(row.entity.ACCNUMBER,row.entity.CUSTNUMBER,row.entity.PRODUCTCODE)">{{row.entity.ACCNUMBER}}</a>' },
		{name:'CUSTNUMBER'},
		{name:'FIRSTNAME', field:'FIRSTNAME'},
		{name:'PRODUCTCODE'},
		{name:'TELNUMBER'},
		{name:'OUTSBALANCE',cellFilter: 'number: 2'},
		{name:'ADDRESSLINE1'},
		{name:'CELNUMBER'},
		{name:'EMAILADDRESS'}
	];
	loadgridData(idnumber);

	function loadgridData(idnumber){
		$http({
			method: 'get',
			url: ServerAddress.address + '/api/v2/searchbyidnumber/'+idnumber,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			// console.log('searchidnumberCtrl data ', data);
			$scope.gridOptions.data = data;
		}).error(function (err) {
			alert('Error ' + err) 
		});
	}

	$scope.showMe = function(accnumber,cardacct,productcode){
		if(productcode == 'Credit Card'){
			//console.log('open card activity window');
			//StudentDataOp.getCard(cardacct).success(function(data){
			 $("#acc_number").val(cardacct);
	         $("#cust_number").val(cardacct);
	         $("#username").val(username);
             //servletPass();
	         //$window.open('topnavcc.jsp','_blank');
	         $window.open('topnavcc.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
		  //})
		}else{
			//StudentDataOp.getAccount2(accnumber).success(function(data){
				$("#acc_number").val(accnumber);
				$("#cust_number").val(cardacct);
				$("#username").val(username);
				//servletPass();
				//$window.open('topnav2.jsp','_blank');
				$window.open('topnavcc.jsp?accnumber='+cardacct+"&custnumber="+ cardacct+"&username="+ username,'_blank');
			//})
		}
	};
}); //end searchidnumberCtrl

app.controller('invoicesCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem("uname");
	//var rights = localStorage.getItem("rights");
	var username = document.getElementById("s_in_username").value;
	var rights = document.getElementById("s_in_rights").value;

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
					'datefeenote' : document.getElementById('feenotedate').value,'custnumber' : document.getElementById('custnumber').value,
					'dateinput' : document.getElementById('dateinput').value,
					'sptitle' : document.getElementById('sptitle').value,'accnumber' : document.getElementById('accnumber').value,
					'approvedamnt' : $scope.dataIn.approvedamnt,'paymentmethod' : $scope.dataIn.paymentmethod,
					'owner' : username,'arocode' : document.getElementById('arocode').value
	  		   	  },// removed 'feenoteamnt' : document.getElementById('feenoteamnt').value,
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

app.controller('paymentsCtrl', function($scope,$state,$timeout,$mdDialog,ServerAddress,StudentDataOp){
	//var username = localStorage.getItem("uname");
	//var rights = localStorage.getItem("rights");
	var username = document.getElementById("s_in_username").value;
	var rights = document.getElementById("s_in_rights").value;

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

.controller('aroCtrl', function($scope,$http,$state,$mdDialog, StudentDataOp, ServerAddress){
	//var division = localStorage.getItem("division");
	var division = document.getElementById("s_in_division").value;
	//console.log('division ' + division);
	
	$scope.dataIn ={};
	$scope.Memos =[];
	$scope.depart =[];
	$scope.dataIn.section = division;
	
	getAro();
	
	function getAro(division){
		StudentDataOp.getAro(division).success(function(data){
			$scope.Aros = data;
		}).error(function(err){
			console.log('Unable to retrieve ARO Codes');
		});
	}
	
	function getUsers(dept){
		StudentDataOp.deptUsers(dept).success(function (data) {//changed from Users()
			console.log(data);
			$scope.Col = data;
		}).error(function (error) {
			console.log('Error retrieving collectors');
		});
	}
	
	
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
	
	$scope.changeDeptfunc = function(dept){
		console.log(dept);
		getUsers(dept);
	};
	
	$scope.deleteAro = function(arocode){
		var confirm = $mdDialog.confirm()
		.title('Delete arocode '+arocode)
		.textContent('Would you like to delete arocode '+arocode)
		.ok('Please delete')
		.cancel('No Cancel');
		$mdDialog.show(confirm).then(function() {
			//$scope.deleteAro = function(arocode){};
			console.log('delete arocode '+arocode);
				$http({
					method: 'POST',
					url: ServerAddress.address+'/deleteAro',
					headers: {'Content-Type': 'application/json'},
					data : {'arocode':arocode}
				}).success(function (data) {
					getAro();
					$state.reload();
				}).error(function () {
					console.log("Error Deleting arocode");
				});
			
		}, function() {
			console.log('delete cancelled');
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
		
		//console.log('arocode details ', data[0]);
		$scope.dataIn.currcolofficer = data[0].OWNER;
		$scope.dataIn.dept = data[0].DIVISION;
		
		StudentDataOp.deptUsers(data[0].DIVISION).success(function (data) {
			$scope.Col = data;
		})
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

.controller('allocate_Ctrl', function($scope,$http,Upload, StudentDataOp,ServerAddress){
	//console.log('.....> in allocate_Ctrl ');
	$scope.AttData = [];
	$scope.dataIn = {};
	$scope.submitHeader = "Submit";
	$scope.mySwitch = false;
	$scope.Col = [];
	$scope.showReviewdate = false;
	
	var username = document.getElementById("s_in_username").value;
	var rights= document.getElementById("s_in_rights").value;
	
	document.getElementById('lusername').value = username;
	document.getElementById('lusername_r').value = username;
	
	//console.log('Upload username ===> '+username);
	
	var Region = localStorage.getItem('section');
	
	if(rights === 'Reviewer'){
		$scope.showReviewdate = true;
	}else {
		$scope.showReviewdate = false;
	}
	
	$scope.witch = false;

	StudentDataOp.Users().success(function (data) {
		$scope.Col = data;
	})
	
	 // upload later on form submit or something similar
	 $scope.submit = function() {
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