var app = angular.module("App",[]);

//
app.controller('mainCtrl', function($scope, $http){
	$scope.otheraccsData = [];
	$scope.backgroundhistory = [];
	$scope.problemdefinitionhis = [];
	$scope.customerproposalhis = [];
	$scope.bankproposalhis = [];
	
	$http.get(urladdress + '/api/v2/views/' + custnumber).success(function(data){
		$scope.otheraccsData = data;
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
		$http.get(inurl).success(function(data){
    		$scope.remedialshis = data;
    	})
	}
})