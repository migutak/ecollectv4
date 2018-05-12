<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>auctioneer</title>

<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="bootstrap-select/dist/css/bootstrap-select.css">
<link rel="stylesheet" href="bootstrap/css/bootstrap-datetimepicker.css" >

<script src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="bootstrap-select/dist/js/bootstrap-select.js"></script>
<script type="text/javascript" src="asset/js/plugins/moment.min.js"></script>
<script type="text/javascript" src="views/bootstrap-datepicker/js/bootstrap-datetimepicker.js"></script>

<script src="asset/js/global.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="views/js/services/mainService.js"></script>
<script type="text/javascript" src="js/assign_App.js"></script>

<script type="text/javascript" src="fusion-charts/fusioncharts.js"></script>
<script type="text/javascript" src="fusion-charts/themes/fusioncharts.theme.fint.js"></script>

</head>
<body ng-app="App" ng-controller="valuersCtrl">
	<!-- Fixed navbar -->
	<!-- <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">E-Collect</a>
        </div>
      </div>
    </nav>-->
   
    <%
	    if ((session.getAttribute("s_username") == null) || (session.getAttribute("s_username") == "")) {
	    	response.sendRedirect("https://ecollect03.co-opbank.co.ke/ecollect2/login.jsp");
	    }
	%>

    <input type="hidden" id="s_in_username" value="<%=session.getAttribute("s_username")%>">
	<input type="hidden" id="s_in_division" value="<%=session.getAttribute("s_division")%>">
	<input type="hidden" id="s_in_rights" value="<%=session.getAttribute("s_rights")%>">
	<input type="hidden" id="s_in_role" value="<%=session.getAttribute("s_role")%>">
	
	<div class="page-header">
		<h1 class="container" ng-cloak>
			{{custname.CUSTNAME}} <small>{{custname.CUSTNUMBER}}</small>|<small> Property : {{custname.PROPERTYNO}}</small>
		</h1>
		<p class="container" ng-cloak>File No: {{custname.FILENO}}</p>
		<p class="container" ng-cloak>AROCODE: {{custname.AROCODE}}</p>
	</div>
	<div class="container">
			<div class="row">
				<div class="col-md-6">
					<form name="newvaluerForm" ng-submit="newvaluersfunc()" class="form-vertical">
						<div class="form-group">
							<label>Service Provider:</label>
							<select class="form-control selectpicker show-tick"
								title="Choose a valuer ..." multiple ng-model="newvaluer.valuer" id="valuer" name="valuer"
								data-max-options="4" data-live-search="true">
							</select>
						</div>
						<div class="form-group">
							<label>Date of Instruction:</label>
							<input type="text" class="form-control" id="dateinst" name="dateinst" ng-model="newvaluer.dateinst" readonly>
						</div>

						<div class="input-group">
							<label>Due date:</label>
							<input type="text" class="form-control form_date" id="duedate" name="duedate" ng-model="newvaluer.duedate" required>
							<span class="input-group-addon" style="display:block">
									<span class="glyphicon glyphicon-calendar"></span></span>
						</div>
						<div class="checkbox">
						    <label><input type="checkbox" ng-model="newvaluer.reviewdate"> Update review date</label>
						</div>
						<div class="form-group">
							<a class="btn btn-danger" href="javascript:history.back()"><i class="fa fa-chevron-left"></i> Cancel</a>
						    <button class="btn btn-primary" ng-click="Submit()">Assign</button>
						</div>
					</form>
				</div>
				<div class="col-md-6">
					<div id="chart-container">Valuers-Charts will load here!</div>
				</div>
			</div>
	</div>
	<script type="text/javascript">
		$( document ).ready(function(){
				
				$.ajax({
			        type:"GET",
			        url: urladdress + "/api/v2/get_a_provider/VALUERS",
			        dataType:"json",
			        success: function(data) {
			            $('#valuer').empty();
			            $.each(data,function (index, item) {
			                $('#valuer').append("<option value='"+ item.SPTITLE +"' data-subtext=' EndOfIndemnity:"+item.ENDOFINDEMNITY+"'>"+ item.SPTITLE +" ("+item.PENDING+")"+"</option>");
			                $('#valuer').selectpicker('refresh');
			            });
			        },complete: function() {}
			    });
				
				$('.form_date').datetimepicker({
					format : 'dd-M-yyyy',
					startDate : '-0d',
					language : 'en',
					weekStart : 1,
					todayBtn : 1,
					autoclose : 1,
					startView : 2,
					minView : 2,
					forceParse : 0
				});
			});
	</script>
</body>
</html>