var app = angular.module("App",[]);

//
app.controller('mainCtrl', function($scope, $http){
	$scope.otheraccsData = [];
	$scope.backgroundhistory = [];
	
	$http.get(urladdress + '/api/v2/views/' + custnumber).success(function(data){
		$scope.otheraccsData = data;
	})
	
	$('#backgroundbtn').on('click', function() {
	    var $this = $(this);
	    var background  = document.getElementById("background").value; //
	  $this.button('loading');
	    setTimeout(function() {
	    	//submit background comment
	    	$.post(urladdress + "/api/accplans/background", 
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
	    		        $http.get(urladdress + 'api/accplans/background/' + custnumber).success(function(data){
	    		    		$scope.backgroundhistory = data;
	    		    	})
	    		    });
	    	//
	       $this.button('reset');
	   }, 5000);
	});
})