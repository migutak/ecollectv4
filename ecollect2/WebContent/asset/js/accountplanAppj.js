var app = angular.module("App",[]);

//
app.controller('mainCtrl', function($scope, $http){
	$scope.otheraccsData = [];
	$scope.backgroundhistory = [];
	
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
	
	$scope.deletebackground = function(id){
		alert('delete func still inactive == '+id);
	}
	
	$('#backgroundbtn').on('click', function() {
	    var $this = $(this);
	    var background  = document.getElementById("backgroundcomment").value; //
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
	    		    	})
	    		    });
	    	//
	       $this.button('reset');
	   }, 5000);
	});
	
	$('#myTabs a').click(function (e) {
		e.preventDefault();
		var url = $(this).attr("aria-controls");
		console.log('___' + url)
		switch (url) {
		    case 'background':
		    	loadhistory(urladdress + '/api/accplans/background/' + custnumber);
		        break;
		    case 'problem':
		    	loadhistory(urladdress + '/api/accplans/problemdefinition/' + custnumber);
		        break;
		    case 'swot':
		    	loadhistory(urladdress + '/api/accplans/swot/' + custnumber);
		        break;
		    case 'ability':
		    	loadhistory(urladdress + '/api/accplans/ability/' + custnumber);
		        break;
		    case 'custproposal':
		    	loadhistory(urladdress + '/api/accplans/customerproposal/' + custnumber);
		        break;
		    case 'bankproposal':
		    	loadhistory(urladdress + '/api/accplans/bankproposal/' + custnumber);
		        break;
		    case 'remedials':
		    	loadhistory(urladdress + '/api/accplans/remedials/' + custnumber);
		}
	})
	
	function loadhistory(inurl){
		$http.get(inurl).success(function(data){
        	console.log(data);
    		$scope.backgroundhistory = data;
    	})
	}
	
})