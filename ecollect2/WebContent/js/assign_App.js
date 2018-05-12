var app = angular.module('App', ['mainService']);

app.controller('auctioneerCrtl', function($scope,$http,StudentDataOp,ServerAddress){
	$(document).ready(function(){
	$scope.auctioneers = [];
	$scope.newauctioneer = [];
	var username = document.getElementById("s_in_username").value;
	
	var id = getParameterByName('id');
	
	StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
		$scope.auctioneers = data;
	})
	
	StudentDataOp.getauctintructions(id).success(function (data) {
		$scope.custname = data[0];
		$scope.newauctioneer.dateinst = moment().format('DD-MMM-YYYY');
		
		
		$scope.newauctioneerfunc = function(){
			//console.log($scope.newauctioneer);
			var targets = [];
			$.each($(".selectpicker option:selected"), function(){
				targets.push($(this).val());
			});
			//console.log("You have selected the s.providers ", targets);
			
			if(targets.length > 0){
				for(i=0; i <= targets.length - 1; i++){
					//console.log(targets[i]);
					$.ajax({
						url: ServerAddress.address + '/api/addauctioneerlogs',
						type: "post", 
						data:{'id' : data[0].ID,'dateinst' : $scope.newauctioneer.dateinst ,'duedate' : $scope.newauctioneer.duedate,
						'serviceprovider' : targets[i],'owner' : username, 'reviewdate' : $scope.newauctioneer.reviewdate
						,'acc':data[0].ACCNUMBER,'cust' : data[0].CUSTNUMBER
						},
						success: function(response) {
							
				        },
				        error: function(xhr) {
				        	alert('Error assigning an auctioneer');
				        }
				    });
				};
				alert('Processing completed!!! ');
				//refresh page
				location.reload();
			}else{
				alert('Please select one or more auctioneer(s)')
			}
			
		}
	})
	//charts start
		$http.get(ServerAddress.address + '/api/status/sppending/AUCTIONEERS-MARKETORS-REPOSSESSORS').success(function(data){
			FusionCharts.ready(function(){
			    var fusioncharts = new FusionCharts({
			    type: 'column2d',
			    renderAt: 'chart-container',
			    width: '100%',
			    height: '500',
			    dataFormat: 'json',
			    dataSource: {
			        "chart": {
			            "caption": "AUCTIONEERS-MARKETORS-REPOSSESSORS",
			            "subCaption": "Pending accounts ",
			            "xAxisName": "AUCTIONEERS-MARKETORS-REPOSSESSORS",
			            "yAxisName": "No of accounts",
			            "numberPrefix": "",
			            "theme": "fint"
			        },

			        "data": data
			    }
			}
			);
			    fusioncharts.render();
			});
		})//charts end
	})//end document.ready()
})//end auctioneerCrtl

app.controller('marketorCtrl', function($scope,$http,StudentDataOp,ServerAddress){
	$(document).ready(function(){
		$scope.newmarketor = [];
		$scope.marketors = [];
		var username = document.getElementById("s_in_username").value;
		
		var id = getParameterByName('id');
		
		StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
			$scope.marketors = data;
		})
		
		StudentDataOp.getmktintructions2(id).success(function (data) {
			$scope.custname = data[0];
			$scope.newmarketor.dateinst = moment().format('DD-MMM-YYYY');
			$scope.newmarketor.id = data[0].ID;
			$scope.newmarketor.cust = data[0].CUSTNUMBER;
			$scope.newmarketor.acc = data[0].ACCNUMBER;
			$scope.newmarketor.omv = data[0].OPENMARKETVALUE;
			$scope.newmarketor.fsv = data[0].FORCEDSALEVALUE;
			
			$scope.newmarketor.dateinst = moment().format('DD-MMM-YYYY');
			$scope.newmarketor.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
			
			$scope.newmarketorfunc = function(){
				var targets = [];
				$.each($(".selectpicker option:selected"), function(){
					targets.push($(this).val());
				});
				if(targets.length > 0){
					for(i=0; i <= targets.length - 1; i++){
						$.ajax({
							url: ServerAddress.address + '/api/addmarketorlogs',
							type: "post", 
							data:{'id' : id,'dateinst' : $scope.newmarketor.dateinst,
							'duedate' : $scope.newmarketor.duedate,'serviceprovider' : targets[i],'omv' : $scope.newmarketor.omv,
							'fsv' : $scope.newmarketor.fsv,'owner' : username,'reviewdate':$scope.newmarketor.reviewdate,
							'acc': data[0].ACCNUMBER,'cust' : data[0].CUSTNUMBER},
							success: function(response) {
				                //alert($scope.newmarketor.acc + ' successfully assigned to '+$scope.newmarketor.marketor);
				            },
				            error: function(xhr) {
				            	alert('Error assigning marketor ');
				            }
				        });
					};//end for loop
					alert('Processing completed!!! ');
					//refresh page
					location.reload();
				}else{
					alert('Please select one or more marketor(s)')
				}
			}
		})
		//charts start
		$http.get(ServerAddress.address + '/api/status/sppending/AUCTIONEERS-MARKETORS-REPOSSESSORS').success(function(data){
			FusionCharts.ready(function(){
			    var fusioncharts = new FusionCharts({
			    type: 'column2d',
			    renderAt: 'chart-container',
			    width: '100%',
			    height: '500',
			    dataFormat: 'json',
			    dataSource: {
			        "chart": {
			            "caption": "AUCTIONEERS-MARKETORS-REPOSSESSORS",
			            "subCaption": "Pending accounts ",
			            "xAxisName": "AUCTIONEERS-MARKETORS-REPOSSESSORS",
			            "yAxisName": "No of accounts",
			            "numberPrefix": "",
			            "theme": "fint"
			        },

			        "data": data
			    }
			}
			);
			    fusioncharts.render();
			});
		})//charts end
	})//end document.ready()
});//end marketorCtrl	
	
	app.controller('repossessorsCtrl', function($scope,$http,StudentDataOp,ServerAddress){
		$(document).ready(function(){
			$scope.newrepossessor = [];
			$scope.repossessors = [];
			var username = document.getElementById("s_in_username").value;
			$scope.yards = [];
			var id = getParameterByName('id');
			
			StudentDataOp.get_a_provider("AUCTIONEERS-MARKETORS-REPOSSESSORS").success(function (data) {
				$scope.repossessors = data;
			})
			
			StudentDataOp.get_a_provider("STORAGE YARDS").success(function (data) {
				$scope.yards = data;
			})
			
			StudentDataOp.getrepointructions(id).success(function (data) {
				$scope.custname = data[0];
				$scope.newrepossessor.id = data[0].ID;
			    $scope.newrepossessor.cust = data[0].CUSTNUMBER;
			    $scope.newrepossessor.acc = data[0].ACCNUMBER;
			    $scope.newrepossessor.dateinst = moment().format('DD-MMM-YYYY');
			    $scope.newrepossessor.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
				
				$scope.newrepofunc = function(){
					var targets = [];
					$.each($(".selectpicker option:selected"), function(){
						targets.push($(this).val());
					});
					if(targets.length > 0){
						for(i=0; i <= targets.length - 1; i++){
							$.ajax({
								url: ServerAddress.address + '/api/addrepologs',
								type: "post", 
								data:{'id' : id,'dateinst' : $scope.newrepossessor.dateinst,'duedate' : $scope.newrepossessor.duedate,'serviceprovider' : targets[i],'owner' : username,
									'acc': $scope.newrepossessor.acc,'cust' : $scope.newrepossessor.cust,'uniq' : makeid(),'reviewdate':$scope.newrepossessor.reviewdate
								},
								success: function(response) {
					                //alert($scope.newmarketor.acc + ' successfully assigned to '+$scope.newmarketor.marketor);
					            },
					            error: function(xhr) {
					            	alert('Error assigning repossessor ');
					            }
					        });
						};//end for loop
						alert('Processing completed!!! ');
						//refresh page
						location.reload();
					}else{
						alert('Please select one or more repossessor(s)')
					}
				}
				
				function makeid() {
					var text = "";
					var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					for( var i=0; i < 5; i++ )
						text += possible.charAt(Math.floor(Math.random() * possible.length));
					return text;
				}
			})
			//charts start
		$http.get(ServerAddress.address + '/api/status/sppending/AUCTIONEERS-MARKETORS-REPOSSESSORS').success(function(data){
			FusionCharts.ready(function(){
			    var fusioncharts = new FusionCharts({
			    type: 'column2d',
			    renderAt: 'chart-container',
			    width: '100%',
			    height: '500',
			    dataFormat: 'json',
			    dataSource: {
			        "chart": {
			            "caption": "AUCTIONEERS-MARKETORS-REPOSSESSORS",
			            "subCaption": "Pending accounts ",
			            "xAxisName": "AUCTIONEERS-MARKETORS-REPOSSESSORS",
			            "yAxisName": "No of accounts",
			            "numberPrefix": "",
			            "theme": "fint"
			        },

			        "data": data
			    }
			}
			);
			    fusioncharts.render();
			});
		})//charts end
		
		})//end document.ready()
	});//end repossessorsCtrl
	
	app.controller('investigatorsCtrl', function($scope,$http,StudentDataOp,ServerAddress){
		$(document).ready(function(){
			var username = document.getElementById("s_in_username").value;
			var id = getParameterByName('id');
			
			$scope.newinvestigator = [];
			$scope.investigators = [];

			StudentDataOp.get_a_provider("INVESTIGATORS").success(function (data) {
				$scope.investigators = data;
			})
			
			StudentDataOp.getinvintructions(id).success(function (data) {
				$scope.custname = data[0];
				$scope.newinvestigator.id = data[0].ID;
			    $scope.newinvestigator.cust = data[0].CUSTNUMBER;
			    $scope.newinvestigator.acc = data[0].ACCNUMBER;
			    $scope.newinvestigator.dateinst = moment().format('DD-MMM-YYYY');
			    $scope.newinvestigator.duedate = moment().add(45, 'days').format('DD-MMM-YYYY');
				
				$scope.newinvestigatorfunc = function(){
					var targets = [];
					$.each($(".selectpicker option:selected"), function(){
						targets.push($(this).val());
					});
					if(targets.length > 0){
						for(i=0; i <= targets.length - 1; i++){
							$.ajax({
								url: ServerAddress.address + '/api/addinvestigatelogs',
								type: "post", 
								data:{'id' : id,'dateinst' : $scope.newinvestigator.dateinst,
					      			'duedate' : $scope.newinvestigator.duedate,'serviceprovider' : targets[i],'owner' : username
					      			,'acc': data[0].ACCNUMBER,'cust': data[0].CUSTNUMBER,'reviewdate':$scope.newinvestigator.reviewdate
								},
								success: function(response) {
					                //
					            },
					            error: function(xhr) {
					            	alert('Error assigning an investigator ');
					            }
					        });
						};//end for loop
						alert('Processing completed!!! ');
						//refresh page
						location.reload();
					}else{
						alert('Please select one or more investigator(s)')
					}
				}
			})
		//charts start
		$http.get(ServerAddress.address + '/api/status/sppending/INVESTIGATORS').success(function(data){
			FusionCharts.ready(function(){
			    var fusioncharts = new FusionCharts({
			    type: 'column2d',
			    renderAt: 'chart-container',
			    width: '100%',
			    height: '500',
			    dataFormat: 'json',
			    dataSource: {
			        "chart": {
			            "caption": "Investigators allocations",
			            "subCaption": "Pending accounts ",
			            "xAxisName": "Service Provider - Investigators",
			            "yAxisName": "No of accounts",
			            "numberPrefix": "",
			            "theme": "fint"
			        },

			        "data": data
			    }
			}
			);
			    fusioncharts.render();
			});
		})//charts end
		})//end document.ready()
	});//end investigatorsCtrl
	
	app.controller('debtcollectorsCtrl', function($scope,$http,StudentDataOp,ServerAddress){
		$(document).ready(function(){
			var username = document.getElementById("s_in_username").value;
			var id = getParameterByName('id');
			
			$scope.newdebtcollector = [];
			$scope.debtcollectors = [];

			StudentDataOp.get_a_provider("DEBT COLLECTORS").success(function (data) {
				$scope.debtcollectors = data;
			})
			
			StudentDataOp.getdebtintructions(id).success(function (data) {
				$scope.custname = data[0];
				  $scope.newdebtcollector = data[0];
			      $scope.newdebtcollector.id = data[0].ID;
			      $scope.newdebtcollector.cust = data[0].CUSTNUMBER;
			      $scope.newdebtcollector.acc = data[0].ACCNUMBER;
			      $scope.newdebtcollector.dateinst = moment().format('DD-MMM-YYYY');
			      $scope.newdebtcollector.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
			      document.getElementById('address').value = data[0].ADDRESS;
			      $scope.newdebtcollector.accbalance = data[0].ACCBALANCE;
			      document.getElementById('region').value = data[0].REGION;
				
				$scope.newdebtcollectorfunc = function(){
					var targets = [];
					$.each($(".selectpicker option:selected"), function(){
						targets.push($(this).val());
					});
					if(targets.length > 0){
						for(i=0; i <= targets.length - 1; i++){
							$.ajax({
								url: ServerAddress.address + '/api/adddebtcollectorlogs',
								type: "post", 
								data:{'id' : id,'dateinst' : $scope.newdebtcollector.dateinst,'duedate' : $scope.newdebtcollector.duedate,'serviceprovider' : targets[i],'owner' : username
									,'acc':$scope.newdebtcollector.acc,'cust' : $scope.newdebtcollector.cust,'reviewdate':$scope.newdebtcollector.reviewdate
								},
								success: function(response) {
					                //
					            },
					            error: function(xhr) {
					            	alert('Error assigning an debt collector ');
					            }
					        });
						};//end for loop
						alert('Processing completed!!! ');
						//refresh page
						location.reload();
					}else{
						alert('Please select one or more debt collector(s)')
					}
				}
			})
			//charts start
			$http.get(ServerAddress.address + '/api/status/sppending/DEBT COLLECTORS').success(function(data){
				FusionCharts.ready(function(){
				    var fusioncharts = new FusionCharts({
				    type: 'column2d',
				    renderAt: 'chart-container',
				    width: '100%',
				    height: '500',
				    dataFormat: 'json',
				    dataSource: {
				        "chart": {
				            "caption": "External Debt Collector allocations",
				            "subCaption": "Pending accounts ",
				            "xAxisName": "Service Provider - EDC",
				            "yAxisName": "No of accounts",
				            "numberPrefix": "",
				            "theme": "fint"
				        },

				        "data": data
				    }
				}
				);
				    fusioncharts.render();
				});
			})//charts end
		})//end document.ready()
	});//end debtcollectorsCtrl
	
	app.controller('valuersCtrl', function($scope,$http,StudentDataOp,ServerAddress){
		$(document).ready(function(){
			var username = document.getElementById("s_in_username").value;
			var id = getParameterByName('id');
			
			$scope.valuers = [];
			$scope.newvaluer = [];

			StudentDataOp.get_a_provider("VALUERS").success(function (data) {
				$scope.valuers = data;
			})
			
			StudentDataOp.getvaluerintructions(id).success(function (data) {
				$scope.custname = data[0];
				$scope.newvaluer.id = data[0].ID;
			      $scope.newvaluer.cust = data[0].CUSTNUMBER;
			      $scope.newvaluer.acc = data[0].ACCNUMBER;
			      $scope.newvaluer.dateinst = moment().format('DD-MMM-YYYY');
			      $scope.newvaluer.duedate = moment().add(30, 'days').format('DD-MMM-YYYY');
				
				$scope.newvaluersfunc = function(){
					var targets = [];
					$.each($(".selectpicker option:selected"), function(){
						targets.push($(this).val());
					});
					if(targets.length > 0){
						for(i=0; i <= targets.length - 1; i++){
							$.ajax({
								url: ServerAddress.address + '/api/addvaluerslogs',
								type: "post", 
								data:{'id' : id,'dateinst' : $scope.newvaluer.dateinst,'duedate':$scope.newvaluer.duedate,'serviceprovider': targets[i],'owner':username
					      			,'acc':data[0].CUSTNUMBER,'cust':data[0].CUSTNUMBER,'reviewdate':$scope.newvaluer.reviewdate
								},
								success: function(response) {
					                //
					            },
					            error: function(xhr) {
					            	alert('Error assigning a valuer ');
					            }
					        });
						};//end for loop
						alert('Processing completed!!! ');
						//refresh page
						location.reload();
					}else{
						alert('Please select one or more valuer(s)')
					}
				}
			})
			//charts start
		$http.get(ServerAddress.address + '/api/status/sppending/VALUERS').success(function(data){
			FusionCharts.ready(function(){
			    var fusioncharts = new FusionCharts({
			    type: 'column2d',
			    renderAt: 'chart-container',
			    width: '100%',
			    height: '500',
			    dataFormat: 'json',
			    dataSource: {
			        "chart": {
			            "caption": "Valuers allocations",
			            "subCaption": "Pending accounts ",
			            "xAxisName": "Service Provider - Valuers",
			            "yAxisName": "No of accounts",
			            "numberPrefix": "",
			            "theme": "fint"
			        },

			        "data": data
			    }
			}
			);
			    fusioncharts.render();
			});
		})//charts end
		})//end document.ready()
	});//end valuersCtrl
	
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
