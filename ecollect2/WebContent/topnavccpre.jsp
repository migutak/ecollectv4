
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<meta charset="UTF-8" />
	<title>E-Collect&reg;</title>
	<link rel="shortcut icon" href="asset/img/favicon.ico">
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<!-- start: Css -->
	<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/angular-ladda/dist/ladda-themeless.min.css">

	<!-- plugins -->
	<link rel="stylesheet" type="text/css" href="asset/css/plugins/font-awesome.min.css"/>
	<link rel="stylesheet" type="text/css" href="asset/css/plugins/simple-line-icons.css"/>
	<link rel="stylesheet" type="text/css" href="asset/css/plugins/mediaelementplayer.css"/>
	<link rel="stylesheet" type="text/css" href="asset/css/plugins/animate.min.css"/>
	<link rel="stylesheet" type="text/css" href="asset/css/plugins/summernote.css"/>
	<link rel="stylesheet" type="text/css" href="asset/css/plugins/bootstrap-material-datetimepicker.css"/>
	<link rel="stylesheet" type="text/css" href="asset/css/style.css">
	<!-- end: Css -->

	<!-- Angular Material style sheet -->
	<link rel="stylesheet" href="bower_components/angular-material/angular-material.min.css">

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->

      <script src="asset/js/jquery.min.js"></script>

      <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
      <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
      <script type="text/javascript" src="bower_components/ng-file-upload/ng-file-upload.js"></script>
      <script type="text/javascript" src="bower_components/ng-file-upload/ng-file-upload-shim.js"></script>

      <script src="bootstrap/js/bootstrap.min.js"></script>

      <!-- Angular Material requires Angular.js Libraries -->
      <script src="bower_components/angular-animate/angular-animate.min.js"></script>
      <script src="bower_components/angular-aria/angular-aria.min.js"></script>
      <script src="bower_components/angular-messages/angular-messages.min.js"></script>

      <!-- Angular Material Library -->
      <script src="bower_components/angular-material/angular-material.min.js"></script>

      <!-- Angular loading bar js -->
      <link rel='stylesheet' href="bower_components/angular-loading-bar/build/loading-bar.min.css" type='text/css'/>
      <script type='text/javascript' src="bower_components/angular-loading-bar/build/loading-bar.min.js"></script>

      <script src="assets/angular-ladda/dist/spin.min.js" ></script>
      <script src="assets/angular-ladda/dist/ladda.min.js" ></script>
      <script src="assets/angular-ladda/dist/angular-ladda.min.js" ></script>

      <link rel="stylesheet" href="bower_components/angular-ui-notification/dist/angular-ui-notification.min.css">
      <script src="bower_components/angular-ui-notification/src/angular-ui-notification.js"></script>
      <!-- FusionCharts library-->
	<script type="text/javascript" src="bower_components/fusioncharts-suite-xt/js/fusioncharts.js"></script>
	<script type="text/javascript" src="bower_components/fusioncharts-suite-xt/js/fusioncharts.charts.js"></script>

	<!-- Angular plugin -->
	<script type="text/javascript" src="bower_components/angular/angular-fusioncharts.min.js"></script>

      <script type="text/javascript" src="asset/js/global.js"></script>
      <script type="text/javascript" src="asset/js/activity_global.js"></script> 
      <script type="text/javascript" src="views/js/activMainccpre.js"></script>
      <script type="text/javascript" src="views/js/services/mainService.js"></script>

  </head>
  <!-- END HEAD -->

  <!-- BEGIN BODY -->
  <body id="mimin" class="dashboard topnav" ng-app="App" ng-controller="mainCtrl">

	<%
	    if ((session.getAttribute("s_username") == null) || (session.getAttribute("s_username") == "")) {
	    	response.sendRedirect(request.getContextPath() + "/login.jsp");
	    }
	%>

	<input type="hidden" id="s_in_username" value="<%=session.getAttribute("s_username")%>">
	<input type="text" id="s_in_division" value="<%=session.getAttribute("s_division")%>">
	<input type="hidden" id="s_in_rights" value="<%=session.getAttribute("s_rights")%>">
	<input type="hidden" id="s_in_role" value="<%=session.getAttribute("s_role")%>">
	<input type="hidden" id="s_in_branch" value="<%=session.getAttribute("s_branch")%>">

  	<!-- start: Header -->
  	<nav class="navbar navbar-default header navbar-fixed-top">
  		<div class="col-md-12 nav-wrapper">
  			<div class="navbar-header" style="width:100%;">
  				<h3 class="animated fadeInLeft" id="firstname"></h3>
  			</div>
  		</div>
  	</nav>
  	<!-- end: Header -->

  	<!-- start: Content -->
  	<div id="content">
  		<div class="col-md-12 top-20 padding-0">
  			<div class="col-md-12">
  				<div class="panel">
  					<div class="panel-body">
  						<!-- start: Content -->
  						<div id="content">
  							<div class="col-md-12 col-sm-12 col-xs-12" style="padding:20px;">

  								<div class="col-md-12 col-sm-12 col-xs-12 padding-0">
  									<div class="col-md-3 col-sm-12 col-xs-12 mail-left">

  										<div class="col-md-12 col-sm-12 col-xs-12 mail-left-content">

  											<strong class="animated fadeInLeft" id="addressline"></strong><br>
  											<span class="animated fadeInLeft" id="telnumber" ng-cloak>{{phonenumber}}</span> <span><a href="" ng-click="callingfunc()"><span class="{{callingicon}}"></span> {{callingtitle}}</a></span>
  											<a id="callnumber" href="tel:+123-345-678-5555">Launch Jabber to call</a>
  											<br>
  											<!-- Split button -->
  											<div class="btn-group" role="group">
  												<button type="button" class="btn  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  													<span class="fa fa-pencil-square-o"></span> Change Telephone
  													<span class="fa fa-angle-down"></span>
  												</button>
  												<ul class="dropdown-menu">
  													<li ng-repeat="t in allteles"><a href="" ng-click="changeNumber(t.CONTACT)">{{t.CONTACT}}</a></li>
  												</ul>
  											</div>

  											<hr>
  											<ul class="nav">
  												<li><h5>Activity</h5></li>
  												<li>
  													<a ui-sref="action"><div class="fa fa-circle text-primary"></div> Collector action</a>
  												</li>
  												<li>
  													<a ui-sref="activityaccplan"><div class="fa fa-circle text-primary"></div> Account Plan <span class="badge badge-danger pull-right" ng-cloak>{{plannotification}}</span></a>
  												</li>
  												<li>
  													<a ui-sref="files"><div class="fa fa-circle text-success"></div> Files</a>
  												</li>
  												<li>
  													<a ui-sref="email"><div class="fa fa-circle text-info"></div> Email</a>
  												</li>
  												<li>
  													<a ui-sref="sms"><div class="fa fa-circle text-info"></div> SMS</a>
  												</li>
  												<li>
  													<a ui-sref="reallocate"><span class="fa fa-male"></span> Allocate</a>
  												</li>
  												<li>
				                                    <a ui-sref="custprofile"><span class="fa fa-circle text-info"></span> Customer profile</a>
				                                 </li>
  												<li><h5>Sections</h5></li>
  												<li><hr/></li>
  												<li>
  													<a ui-sref="accountinfo"><span class="fa fa-user-md"></span> Account Information</a>
  												</li>
  												<li>
  													<a ui-sref="customerinfo"><span class="fa fa-inbox"></span> Customer Information</a>
  												</li>
  												<li>
  													<a ui-sref="contacts"><span class="fa fa-comment-o"></span> Customer Contacts </a>
  												</li>
  												<li>
  													<a ui-sref="notes"><span class="fa fa-sticky-note"></span> Notes History <span class="badge badge-success pull-right" ng-cloak>{{notesnotification}}</span></a>
  												</li>
  												<li>
  													<a ui-sref="ptps"><span class="fa fa-star"></span> Promises Made <span class="badge badge-success pull-right" ng-cloak>{{promisesnotification}}</span></a>
  												</li>
  												<li>
  													<a ui-sref="otheraccs"><span class="fa fa-bell"></span> Other accounts <span class="badge badge-success pull-right" ng-cloak>{{otherLength}}</span></a>
  												</li>
  											</ul>
  										</div>
  									</div>
  									<div class="col-md-9 col-sm-12 col-xs-12 mail-right">
  										<div class="col-md-12 col-sm-12 col-xs-12 mail-right-content padding-0"></div>
  											<div class="col-md-12 col-sm-12 col-xs-12 mail-right-text">

  												<!-- start: Content -->
  												<div ui-view></div>

  												<input type="hidden" id="acc">
  												<input type="hidden" id="cust">
  												<input type="hidden" id="username">
  												<input type="hidden" id="dept">
  												<input type="hidden" id="rights">

  											</div>
  										
  									</div>
  								</div>
  							</div>
  						</div>
  						<!-- end: Content -->
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  	<!-- end: content -->

  	<!-- modals start -->
  	<div class="col-lg-12">
  		<div class="modal fade" id="sms" tabindex="-1" role="dialog">
  			<div class="modal-dialog">
  				<div class="modal-content">
  					<div class="modal-header">
  						<h4 class="modal-title">Send SMS</h4>
  					</div>
  					<div class="modal-body">
  						<form role="form" ng-submit="sendSMS()">
  							<div class="form-group">
  								<label>Mobile Number:</label>
  								<input class="form-control" ng-model="dataSms.smsNumber" required/>
  							</div>
  							<div class="form-group">
  								<label>Template:</label>
  								<select id="txtmaritaledit" class="form-control" ng-model="dataSms.smsTemplate">
  									<option value="LOAN">LOAN</option>
  									<option value="LOANOD">LOANOD/LIABILITY</option>
  								</select>
  							</div>
  							<div class="form-group">
  								<label>SMS Message</label>
  								<textarea class="form-control" rows="3" ng-trim="false" maxlength="180" ng-model="dataSms.smsMessage" required id="smsMessage"></textarea>
  								<span>{{180 - dataSms.smsMessage.length}} Characters Left</span>
  							</div>
  							<div class="form-group">
  								<label>CallBack Number</label>
  								<textarea class="form-control" rows="1" ng-trim="false" maxlength="20" ng-model="dataSms.smsCallback" required id="smsCallback"></textarea>
  								<span>{{20 - dataSms.smsCallback.length}} Characters Left</span>
  							</div>
  							<button type="submit" class="btn btn-sm btn-primary" id="smsButton">Send</button>
  						</form>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>

  	<div class="col-lg-12">
  		<div class="modal fade" id="reallocate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  			<div class="modal-dialog">
  				<div class="modal-content">
  					<div class="modal-header">
  						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
  						<h4 class="modal-title" >Allocate this account</h4>
  					</div>
  					<div class="modal-body">
  						<form role="form" ng-submit="reAllocatefunc()">
  							<div class="form-group">
  								<label>Current Officer</label>
  								<input id="colofficer" class="form-control" ng-model="Reall.owner" ng-disabled=true></input>
  							</div>
  							<div class="form-group">
  								<label>New Officer</label>
  								<select id="newcollector" class="form-control" ng-model="Reall.newofficer" required>
  									<option ng-repeat="c in colOfficer">{{c.USERNAME}}</option>
  								</select>
  							</div>
  							<button type="submit" class="btn btn-primary" >{{submitHeader}}</button>
  						</form>
  					</div>
  					<div class="modal-footer">

  					</div>
  				</div>
  			</div>
  		</div>
  	</div>

  	<!-- plugins -->
  	<script src="asset/js/plugins/holder.min.js"></script>
  	<script src="asset/js/plugins/moment.min.js"></script>
  	<script src="asset/js/plugins/jquery.nicescroll.js"></script>

  	<script src="asset/js/plugins/summernote.min.js"></script>
  	<!-- custom -->
  	<script src="asset/js/main.js"></script>


  	<script type="text/javascript">
  	$(document).ready(function(){
  		var globalUrl = urladdress;

  		var cust = custnumber;//document.getElementById("cust").value;
  		var acc = accnumber;//document.getElementById("acc").value;
  		var user= document.getElementById("s_in_username").value;
    	var dept= document.getElementById("s_in_division").value;

  		$.ajax({
  			type: 'GET',
  			url: globalUrl+'/api/v2/cardInfo/'+ acc,
  			success: function(data) {
  			//console.log(data);
        	if(data.length > 0){
        	document.getElementById("firstname").innerHTML = data[0].CARDNAME;
        	document.getElementById("telnumber").innerHTML = data[0].MOBILE;
        	document.getElementById("addressline").innerHTML = data[0].ADDRESS;
        	document.getElementById("callnumber").href = "tel:"+data[0].MOBILE_NO;
        	}else{
        		getcreditcard(acc);
        	}
          }
       })
       
       function getcreditcard(cardacct){
       	$.ajax({
  			type: 'GET',
  			url: globalUrl+'/api/status/'+ cardacct+'/creditcardinfo',
  			success: function(data) {
  				//console.log(data);
        	if(data.length > 0){
        		document.getElementById("firstname").innerHTML = data[0].CARDNAME;
        		document.getElementById("telnumber").innerHTML = data[0].MOBILE;
        		document.getElementById("addressline").innerHTML = data[0].ADDRESS;
        		document.getElementById("callnumber").href = "tel:"+data[0].TEL;
        	}else{
        		document.getElementById("firstname").innerHTML = 'INFO_NOT_FOUND';
        	}
          }
        })
       }
       
       //
       setTimeout(function(){
		$( "html" ).removeClass("loading");
	   }, 2000);
  	});
  	</script>
  </body>
  </html>
