var app = angular.module("App",[]);

//
app.controller('mainCtrl', function($scope, $http){
	$scope.otheraccsData = [];
	$scope.backgroundhistory = [];
	$scope.problemdefinitionhis = [];
	$scope.customerproposalhis = [];
	$scope.bankproposalhis = [];
	$scope.paymentplanshis = [];
	$scope.actionsoverduebadge = 0;
	
	$scope.plan_proposalreceived = [];
	
	//disable fields
	$scope.stateCheck = false;
	$scope.stateCheckapprovalsort = false;
	$scope.stateCheckapprovalgranted = false;
	$scope.stateCheckapprovaldeclined = false;
	$scope.stateCheckcustomeraccepted = false;
	
	$http.get(urladdress + '/api/v2/views/' + custnumber).success(function(data){
		$scope.otheraccsData = data;
	})
	
	//overdue actions flag
	$http.get(urladdress + '/api/accplans/actionplansoverdue/' + custnumber).success(function(data){
		$scope.actionsoverduebadge = data[0].OVERDUEACTIONS
		})
	
	$scope.makecurrent = function(id){
		$.post(urladdress + "/api/v2/accplans/background/" + id + "/"+custnumber+"/makecurrent", 
    		    function(data, status){
    		        alert("Status: " + status);
    		        //load history
    		        $http.get(urladdress + '/api/accplans/background/' + id + '/current').success(function(data){
    		        	//console.log(data[0]);
    		        	document.getElementById("backgroundcomment").value = data[0].BACKGROUND;
    		        	document.getElementById("backgroundcomment").style.backgroundColor = "yellow";
    		    	})
    		    });
	}
	
	$scope.makecurrentproblem = function(id){
		$.post(urladdress + "/api/v2/accplans/problemdefinition/" + id + "/"+custnumber+"/makecurrent", 
    		    function(data, status){
    		        alert("Status: " + status);
    		        //load history
    		        $http.get(urladdress + '/api/accplans/problemdefinition/' + custnumber + '/current').success(function(data){
    		        	//console.log(data[0]);
    		        	document.getElementById("problemdefinitioncomment").value = data[0].PROBLEMDEFINITION;
    		        	document.getElementById("problemdefinitioncomment").style.backgroundColor = "yellow";
    		    	})
    		    });
	}
	
	$scope.makecurrentcustomerproposal = function(id){
		$.post(urladdress + "/api/v2/accplans/customerproposal/" + id + "/"+custnumber+"/makecurrent", 
    		    function(data, status){
    		        alert("Status: " + status);
    		        //load history
    		        $http.get(urladdress + '/api/accplans/customerproposals/' + custnumber + '/current').success(function(data){
    		        	//console.log(data[0]);
    		        	document.getElementById("customerproposalcomment").value = data[0].CUSTOMERPROSAL;
    		        	document.getElementById("customerproposalcomment").style.backgroundColor = "yellow";
    		    	})
    		    });
	}
	
	$scope.makecurrentbankproposal = function(id){
		$.post(urladdress + "/api/v2/accplans/bankproposal/" + id + "/"+custnumber+"/makecurrent", 
    		    function(data, status){
    		        alert("Status: " + status);
    		        //load history
    		        $http.get(urladdress + '/api/accplans/bankproposals/' + custnumber + '/current').success(function(data){
    		        	//console.log(data[0]);
    		        	document.getElementById("bankproposalcomment").value = data[0].BANKPROPOSALS;
    		        	document.getElementById("bankproposalcomment").style.backgroundColor = "yellow";
    		    	})
    		    });
	}
	
	$scope.deletebackground = function(id){
		alert('delete func still inactive == '+id);
	}
	
	$scope.deleteproblem = function(id){
		alert('delete func still inactive == '+id);
	}
	
	$('#backgroundbtn').on('click', function() {
	    var $this = $(this);
	    var background  = document.getElementById("backgroundcomment").value; 
	 // add indicator here (before the ajax request starts)
        var $indicator = $('<div>Ajax in progress...</div>').appendTo('body');
	  $this.button('loading');
	    setTimeout(function() {
	    	//submit background comment
	    	$.post(urladdress + "/api/v2/accplans/background", 
	    			{
		    		  "planid": custnumber,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "background": background,
		    		  "owner": username
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        //load history
	    		        $http.get(urladdress + '/api/accplans/background/' + custnumber).success(function(data){
	    		    		$scope.backgroundhistory = data;
	    		    		$indicator.remove();
	    		    	})
	    		    });
	    	//
	       $this.button('reset');
	   }, 5000);
	});
	
	$('#problemdefinitionbtn').on('click', function() {
	    var $this = $(this);
	    var problemdefinition  = document.getElementById("problemdefinitioncomment").value; //
	    $this.button('loading');
	    setTimeout(function() {
	    	$.post(urladdress + "/api/v2/accplans/problemdefinition", 
	    			{
		    		  "planid": custnumber,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "problemdefinition": problemdefinition,
		    		  "owner": username
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        //load history
	    		        $http.get(urladdress + '/api/accplans/problemdefinition/' + custnumber).success(function(data){
	    		    		$scope.problemdefinitionhis = data;
	    		    	})
	    		    });
	    	//
	       $this.button('reset');
	   }, 5000);
	});
	
	
	$('#customerproposalbtn').on('click', function() {
	    var $this = $(this);
	    var customerproposal  = document.getElementById("customerproposalcomment").value; //
	    $this.button('loading');
	    setTimeout(function() {
	    	$.post(urladdress + "/api/v2/accplans/customerproposal", 
	    			{
		    		  "planid": custnumber,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "customerproposal": customerproposal,
		    		  "owner": username
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        //load history
	    		        $http.get(urladdress + '/api/accplans/customerproposals/' + custnumber).success(function(data){
	    		    		$scope.customerproposalhis = data;
	    		    	})
	    		    });
	    	//
	       $this.button('reset');
	   }, 5000);
	});
	
	$('#bankproposalbtn').on('click', function() {
	    var $this = $(this);
	    var bankproposal  = document.getElementById("bankproposalcomment").value; //
	    $this.button('loading');
	    setTimeout(function() {
	    	$.post(urladdress + "/api/v2/accplans/bankproposal", 
	    			{
		    		  "planid": custnumber,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "bankproposal": bankproposal,
		    		  "owner": username
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        //load history
	    		        $http.get(urladdress + '/api/accplans/bankproposals/' + custnumber).success(function(data){
	    		    		$scope.bankproposalhis = data;
	    		    	})
	    		    });
	    	//
	       $this.button('reset');
	   }, 5000);
	});
	
	$('#btn_ptpplan').on('click', function() {
	    var $this = $(this);
	    var planfreq  = document.getElementById("planfreq").value; //""
	    var ptpstartdate = document.getElementById("ptpstartdate").value; 
	    var ptpamount = document.getElementById("ptpamount").value; 
	    
	    if(planfreq && ptpstartdate && ptpamount){
	    $this.button('loading'); 
	    setTimeout(function() {
	    	$.post(urladdress + "/api/v2/plan_ptp_add", 
	    			{
		    		  "planfreq": planfreq,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "ptpamount": ptpamount,
		    		  "ptpstartdate":ptpstartdate,
		    		  "owner": username
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        //load history
	    		        $http.get(urladdress + '/api/accplans/paymentplans/' + custnumber).success(function(data){
	    					$scope.paymentplanshis = data;
	    				})
	    		    });
	    	//
	       $this.button('reset');
	   }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	});
	
	$('#btn_cureimplemented').on('click', function() {
	    var $this = $(this);
	    var planaction = 'cureimplemented';
	    var initiationdateProposal  = document.getElementById("initiationdatecure").value;
	    var reviewProposal = document.getElementById("reviewedcure").value; 
	    var remarkproposal = document.getElementById("remarkcure").value; 
	    var action_completed = document.getElementById("action_completed_cure").value;
	    
	    if(planaction && initiationdateProposal && reviewProposal && remarkproposal && action_completed){
	    $this.button('loading'); 
	    setTimeout(function() {
	    	$.post(urladdress + "/api/accplans/plan_proposalreceived", 
	    			{
		    		  "planaction": planaction,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "initiationdateProposal": initiationdateProposal,
		    		  "reviewProposal":reviewProposal,
		    		  "remarkproposal":remarkproposal,
		    		  "owner": username,
		    		  "action_completed" : action_completed
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        actionplanshis();
	    		    });
	       $this.button('reset');
	    }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	});
	
	$('#btn_customeraccepted').on('click', function() {
	    var $this = $(this);
	    var planaction = 'customeraccepted';
	    var initiationdateProposal  = document.getElementById("initiationdatecustomeraccepted").value;
	    var reviewProposal = document.getElementById("reviewedinternalcustomeraccepted").value; 
	    var remarkproposal = document.getElementById("remarkcustomeraccepted").value; 
	    var action_completed = document.getElementById("action_completed_customeraccepted").value;
	    
	    if(planaction && initiationdateProposal && reviewProposal && remarkproposal && action_completed){
	    $this.button('loading'); 
	    setTimeout(function() {
	    	$.post(urladdress + "/api/accplans/plan_proposalreceived", 
	    			{
		    		  "planaction": planaction,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "initiationdateProposal": initiationdateProposal,
		    		  "reviewProposal":reviewProposal,
		    		  "remarkproposal":remarkproposal,
		    		  "owner": username,
		    		  "action_completed" : action_completed
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        actionplanshis();
	    		    });
	       $this.button('reset');
	   }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	});
	
	$('#btn_approvaldeclined').on('click', function() {
	    var $this = $(this);
	    var planaction = 'approvaldeclined';
	    var initiationdateProposal  = document.getElementById("initiationdateapprovaldeclined").value;
	    var reviewProposal = document.getElementById("reviewedinternalApprovaldeclined").value; 
	    var remarkproposal = document.getElementById("remarkapprovaldeclined").value; 
	    var action_completed = document.getElementById("action_completed_approvaldeclined").value;
	    
	    if(planaction && initiationdateProposal && reviewProposal && remarkproposal && action_completed){
	    $this.button('loading'); 
	    setTimeout(function() {
	    	$.post(urladdress + "/api/accplans/plan_proposalreceived", 
	    			{
		    		  "planaction": planaction,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "initiationdateProposal": initiationdateProposal,
		    		  "reviewProposal":reviewProposal,
		    		  "remarkproposal":remarkproposal,
		    		  "owner": username,
		    		  "action_completed" : action_completed
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        actionplanshis();
	    		    });
	       $this.button('reset');
	   }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	});
	
	$('#btn_approvalgranted').on('click', function() {
	    var $this = $(this);
	    var planaction = 'approvalgranted';
	    var initiationdateProposal  = document.getElementById("initiationdateapprovalgranted").value;
	    var reviewProposal = document.getElementById("reviewedinternalApprovalgranted").value; 
	    var remarkproposal = document.getElementById("remarkapprovalgranted").value; 
	    var action_completed = document.getElementById("action_completed_approvalgranted").value;
	    
	    if(planaction && initiationdateProposal && reviewProposal && remarkproposal && action_completed){
	    $this.button('loading'); 
	    setTimeout(function() {
	    	$.post(urladdress + "/api/accplans/plan_proposalreceived", 
	    			{
		    		  "planaction": planaction,
		    		  "accnumber": accnumber,
		    		  "custnumber": custnumber,
		    		  "initiationdateProposal": initiationdateProposal,
		    		  "reviewProposal":reviewProposal,
		    		  "remarkproposal":remarkproposal,
		    		  "owner": username,
		    		  "action_completed" : action_completed
		    		},
	    		    function(data, status){
	    		        alert("Status: " + status);
	    		        actionplanshis();
	    		    });
	       $this.button('reset');
	   }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	});
	
	$('#btn_approvalsought').on('click', function() {
	    var $this = $(this);
	    var planaction = 'approvalsought';
	    var initiationdateProposal  = document.getElementById("initiationdateapprovalsort").value;
	    var reviewProposal = document.getElementById("reviewedinternalApprovalSort").value; 
	    var remarkproposal = document.getElementById("remarkapprovalsought").value; 
	    var action_completed = document.getElementById("action_completed_approvalsought").value;
	    
	    if(planaction && initiationdateProposal && reviewProposal && remarkproposal && action_completed){
	    	$this.button('loading');
	    	setTimeout(function() {
		    	$.post(urladdress + "/api/accplans/plan_proposalreceived", 
		    			{
			    		  "planaction": planaction,
			    		  "accnumber": accnumber,
			    		  "custnumber": custnumber,
			    		  "initiationdateProposal": initiationdateProposal,
			    		  "reviewProposal":reviewProposal,
			    		  "remarkproposal":remarkproposal,
			    		  "owner": username,
			    		  "action_completed" : action_completed
			    		},
		    		    function(data, status){
		    		        alert("Status: " + status);
		    		        actionplanshis();
		    		    });
		       $this.button('reset');
		   }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	    
	});
	
	$('#btn_proposalreceived').on('click', function() {
	    var $this = $(this);
	    var planaction = 'proposalreceived';
	    var initiationdateProposal  = document.getElementById("initiationdateProposal").value; //""
	    var reviewProposal = document.getElementById("reviewProposal").value; 
	    var remarkproposal = document.getElementById("remarkproposal").value; 
	    var action_completed = document.getElementById("action_completed").value;
	    
	     
	    if(planaction && initiationdateProposal && reviewProposal && remarkproposal && action_completed){
	    	$this.button('loading');
		    setTimeout(function() {
		    	$.post(urladdress + "/api/accplans/plan_proposalreceived", 
		    			{
			    		  "planaction": planaction,
			    		  "accnumber": accnumber,
			    		  "custnumber": custnumber,
			    		  "initiationdateProposal": initiationdateProposal,
			    		  "reviewProposal":reviewProposal,
			    		  "remarkproposal":remarkproposal,
			    		  "owner": username,
			    		  "action_completed" : action_completed
			    		},
		    		    function(data, status){
		    		        alert("Status: " + status);
		    		        actionplanshis();
		    		    });
		       $this.button('reset');
		   }, 3000);
	    }else{
	    	alert('please provide all fields!');
	    }
	});
	
	$('#myTabs a').click(function (e) {
		e.preventDefault();
		var url = $(this).attr("aria-controls");
		switch (url) {
		    case 'background':
		    	loadhistory(urladdress + '/api/accplans/background/' + custnumber);
		        break;
		    case 'problem':
		    	problemdefinitionhis(urladdress + '/api/accplans/problemdefinition/' + custnumber);
		        break;
		    case 'swot':
		    	swothis(urladdress + '/api/accplans/swot/' + custnumber);
		        break;
		    case 'ability':
		    	abilityhis(urladdress + '/api/accplans/ability/' + custnumber);
		        break;
		    case 'custproposal':
		    	customerproposalhis(urladdress + '/api/accplans/customerproposals/' + custnumber);
		        break;
		    case 'bankproposal':
		    	bankproposalhis(urladdress + '/api/accplans/bankproposals/' + custnumber);
		        break;
		    case 'remedials':
		    	remedialshis(urladdress + '/api/accplans/remedials/' + custnumber);
		    	break;
		    case 'paymentplans':
		    	paymentplanshis(urladdress + '/api/accplans/paymentplans/' + custnumber);
		    	break;
		    case 'actions':
		    	actionplanshis();
		}
	})
	
	function loadhistory(inurl){
		$http.get(inurl).success(function(data){
    		$scope.backgroundhistory = data;
    	})
	}
	
	function swothis(inurl){
		$http.get(inurl).success(function(data){
    		$scope.swothis = data;
    	})
	}
	
	function problemdefinitionhis(inurl){
		$http.get(inurl).success(function(data){
    		$scope.problemdefinitionhis = data;
    	})
	}
	
	function abilityhis(inurl){
		$http.get(inurl).success(function(data){
    		$scope.abilityhis = data;
    	})
	}
	
	function customerproposalhis(inurl){
		$http.get(inurl).success(function(data){
    		$scope.customerproposalhis = data;
    	})
	}
	
	function bankproposalhis(inurl){
		$http.get(inurl).success(function(data){
    		$scope.bankproposalhis = data;
    	})
	}
	
	function remedialshis(inurl){
		console.log('remedialshis');
		/*$http.get(inurl).success(function(data){
    		$scope.remedialshis = data;
    	})*/
	}
	
	function paymentplanshis(inurl){
		//console.log('paymentplanshis');
		$http.get(inurl).success(function(data){
			$scope.paymentplanshis = data;
		})
	}
	
	function actionplanshis(){
		//console.log('in actionplanshis()')
		$http.get(urladdress + '/api/accplans/actionplansoverdue/' + custnumber).success(function(data){
			$scope.actionsoverduebadge = data[0].OVERDUEACTIONS
		})
		
		$http.get(urladdress + '/api/accplans/actionplans/' + custnumber + '/proposalreceived').success(function(data){
			var d = data[0]
			if(data.length>0){
				//console.log('proposalreceived',d)
				document.getElementById("initiationdateProposal").value = d.INITIATIONDATE; //""
			    document.getElementById("reviewProposal").value = d.NEXTREVIEW; 
			    document.getElementById("remarkproposal").value = d.RCOMMENT; 
			    document.getElementById("action_completed").value = d.COMPLETED;
			    if(d.COMPLETED == "Y"){
			    	$scope.stateCheck = true;
			    }
			}
		})
		
		$http.get(urladdress + '/api/accplans/actionplans/' + custnumber + '/approvalgranted').success(function(data){
			var d = data[0]
			if(data.length>0){
			document.getElementById("initiationdateapprovalgranted").value = d.INITIATIONDATE; //""
		    document.getElementById("reviewedinternalApprovalgranted").value = d.NEXTREVIEW; 
		    document.getElementById("remarkapprovalgranted").value = d.RCOMMENT; 
		    document.getElementById("action_completed_approvalgranted").value = d.COMPLETED;
		    if(d.COMPLETED == "Y"){
		    	$scope.stateCheckapprovalgranted = true;
		    }
			}
		})
		
		$http.get(urladdress + '/api/accplans/actionplans/' + custnumber + '/approvalsought').success(function(data){
			var d = data[0]
			if(data.length>0){
				///console.log(d)
			document.getElementById("initiationdateapprovalsort").value = d.INITIATIONDATE; //""
		    document.getElementById("reviewedinternalApprovalSort").value = d.NEXTREVIEW; 
		    document.getElementById("remarkapprovalsought").value = d.RCOMMENT; 
		    document.getElementById("action_completed_approvalsought").value = d.COMPLETED;
		    if(d.COMPLETED == "Y"){
		    	$scope.stateCheckapprovalsort = true;
		    }
			}
		})
		
		$http.get(urladdress + '/api/accplans/actionplans/' + custnumber + '/approvaldeclined').success(function(data){
			var d = data[0]
			if(data.length>0){
			document.getElementById("initiationdateapprovaldeclined").value = d.INITIATIONDATE; //""
		    document.getElementById("reviewedinternalApprovaldeclined").value = d.NEXTREVIEW; 
		    document.getElementById("remarkapprovaldeclined").value = d.RCOMMENT; 
		    document.getElementById("action_completed_approvaldeclined").value = d.COMPLETED;
		    if(d.COMPLETED == "Y"){
		    	$scope.stateCheckapprovaldeclined = true;
		    }
			}
		})
		
		$http.get(urladdress + '/api/accplans/actionplans/' + custnumber + '/customeraccepted').success(function(data){
			var d = data[0]
			if(data.length>0){
			document.getElementById("initiationdatecustomeraccepted").value = d.INITIATIONDATE; //""
		    document.getElementById("reviewedinternalcustomeraccepted").value = d.NEXTREVIEW; 
		    document.getElementById("remarkcustomeraccepted").value = d.RCOMMENT; 
		    document.getElementById("action_completed_customeraccepted").value = d.COMPLETED;
		    if(d.COMPLETED == "Y"){
		    	$scope.stateCheckcustomeraccepted = true;
		    }
			}
		})
		
		$http.get(urladdress + '/api/accplans/actionplans/' + custnumber + '/cureimplemented').success(function(data){
			var d = data[0]
			if(data.length>0){
				document.getElementById("initiationdatecure").value = d.INITIATIONDATE; //""
			    document.getElementById("reviewedcure").value = d.NEXTREVIEW; 
			    document.getElementById("remarkcure").value = d.RCOMMENT; 
			    document.getElementById("action_completed_cure").value = d.COMPLETED;
			}
		})
	}
})