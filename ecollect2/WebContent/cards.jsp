<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>E-Collect&reg;</title>
<link rel="shortcut icon" href="asset/img/favicon.ico">
<!-- start: Css -->
<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">

<!-- start: Css -->
<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="assets/angular-ladda/dist/ladda-themeless.min.css">
<link rel="stylesheet" type="text/css" href="asset/css/plugins/jquery.steps.css" />
<!-- plugins -->
<link rel="stylesheet" type="text/css" href="asset/css/plugins/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/simple-line-icons.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/animate.min.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/summernote.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/bootstrap-material-datetimepicker.css" />
<link rel="stylesheet" type="text/css" href="bower_components/bootstrap-table/dist/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="asset/css/style.css">
<link rel="stylesheet" type="text/css" href="css/chat.css" />
<link rel="stylesheet" type="text/css" href="css/screen.css" />
<!-- end: Css -->
<link rel="styleSheet" href="angular-ui-grid/ui-grid.min.css" />
<link rel="stylesheet" href="bower_components/angular-ui-notification/dist/angular-ui-notification.min.css">
<!-- Angular Material style sheet -->
<link rel="stylesheet" href="bower_components/angular-material/angular-material.min.css">
<!-- Angular loading bar js -->
<link rel='stylesheet' href='bower_components/angular-loading-bar/build/loading-bar.min.css' type='text/css' />
		
</head>
<body ng-app="RDash" id="mimin" class="dashboard" ng-controller="MasterCtrl">
<%
    if ((session.getAttribute("s_username") == null) || (session.getAttribute("s_username") == "")) {
    	response.sendRedirect(request.getContextPath() + "/login.jsp");
    }
%>
<input type="hidden" id="s_in_username" value="<%=session.getAttribute("s_username")%>">
<input type="hidden" id="s_in_division" value="<%=session.getAttribute("s_division")%>">
<input type="hidden" id="s_in_rights" value="<%=session.getAttribute("s_rights")%>">
<input type="hidden" id="s_in_role" value="<%=session.getAttribute("s_role")%>">
<input type="hidden" id="s_in_branch" value="<%=session.getAttribute("s_branch")%>">

	<!-- start: Header -->
        <nav class="navbar navbar-default header navbar-fixed-top">
          <div class="col-md-12 nav-wrapper">
            <div class="navbar-header" style="width:100%;">
              <div class="opener-left-menu is-open">
                <span class="top"></span>
                <span class="middle"></span>
                <span class="bottom"></span>
              </div>
                <a href="cards.jsp" class="navbar-brand"> 
                 <b>E-Collect<sup>&reg;</sup></b>
                </a>

              <!--  <ul class="nav navbar-nav search-nav">
                <li>
                   <div class="search">
                    <span class="fa fa-search icon-search" style="font-size:23px;"></span>
                    <div class="form-group form-animate-text">
                      <input type="text" class="form-text" ng-model="searchid" ng-keypress="myFunct($event)" required>
                      <span class="bar"></span>
                      <label class="label-search">Search by <b>ID</b> </label>
                    </div>
                  </div>
                </li>
              </ul>-->

              <ul class="nav navbar-nav navbar-right user-nav">
                <li class="user-name"><span id="username"><%=session.getAttribute("s_username")%></span></li>
                  <li class="dropdown avatar-dropdown">
                   <img src="asset/img/avatar.jpg" class="img-circle avatar" alt="user name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"/>
                   <ul class="dropdown-menu user-dropdown">
                     <li><a href=""><span class="fa fa-user"></span> My Profile</a></li>
                     <li><a href=""><span class="fa fa-calendar"></span> My Calendar</a></li>
                     <li role="separator" class="divider"></li>
                     <li class="more">
                      <ul>
                        <li><a href=""></a></li>
                        <li><a href="" ng-click="logout()"><span class="fa fa-power-off "></span> Logout</a></li>
                        <li><a href=""></a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li ><a href="" class="opener-right-menu"><span class="fa fa-coffee"></span ng-cloak>{{nuofnotification}}</a></li>
              </ul>
            </div>
          </div>
        </nav>
      <!-- end: Header -->
      
      <div class="container-fluid mimin-wrapper">
      	<!-- start:Left Menu -->
            <div id="left-menu">
              <div class="sub-left-menu scroll">
                <ul class="nav nav-list">
                    <li class="active ripple">
                      <a class="tree-toggle nav-header"><span class="fa-home fa"></span> Dashboard 
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                          <li><a ui-sref="dash">User Dashboard</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-diamond fa"></span> Work Queue <span class="badge badge-danger" id="overdueplansnotify2"></span>
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="todaywork">Today's Work <span class="badge badge-success pull right" id="todaysworknotify"></span></a></li>
                        <li><a ui-sref="myworklist">My Worklist <span class="badge badge-primary pull right" id="worklistnotify"></span></a></li>
                        <li><a ui-sref="myallocations">My Allocations <span class="badge badge-success pull right" id="myallocnotify"></span></a></li>
                        <!--  <li><a ui-sref="noplans">No plans <span class="badge badge-danger pull right" id="noplansnotify"></span></a></li>
                        <li><a ui-sref="overdueplans">Overdue plans <span class="badge badge-danger pull right" id="overdueplansnotify"></span></a></li>-->
                        <li><a ui-sref="viewall">View all cards <span class="badge badge-primary pull right" id="viewallnotify"></span></a></li>
                        <li><a ui-sref="closed">Cards Cr/Zero Bal <span class="badge badge-primary pull right" id="zeronotify"></span></a></li>
                        <li><a ui-sref="viewall_loan">View all loans <span class="badge badge-primary pull right"></span></a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-area-chart fa"></span> Pre-Delinquent
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="precards">Credit Cards</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-area-chart fa"></span> Team Leader
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="teamreview">Loans</a></li>
                        <li><a ui-sref="teamreviewcc">Cards</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa fa-pencil-square"></span> Service Providers
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="investigators">Investigators</a></li>
                        <li><a ui-sref="debtcollectors">Debt Collectors</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa fa-pencil-square"></span> Payments
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="invoices">Invoices</a></li>
                        <li><a ui-sref="payments">Payment History</a></li>
                      </ul>
                    </li>
                     <li class="ripple"><a class="tree-toggle nav-header"><span class="fa fa-table"></span> Reports  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a href="" ng-click="openAllocationsummary()">Allocation Summary</a></li>
                        <li><a href="" ng-click="openActivityrpt()">Collector activity</a></li>
                        <!--  <li><a href="" ng-click="openUnreadnotificationsrpt()">Notifications</a></li>-->
                        <li><a href="" ng-click="openNotesrpt()">Daily notes</a></li>
                        <li><a href="" ng-click="openSmsrpt()">SMS report</a></li>
                        <li><a href="" ng-click="openNoneactivityrpt()">None activity</a></li>
                        <li class="ripple">
                          <a class="sub-tree-toggle nav-header">
                            <span class="fa fa-envelope-o"></span> Other reports
                            <span class="fa-angle-right fa right-arrow text-right"></span>
                          </a>
                          <ul class="nav nav-list sub-tree">
                            <li><a href="" ng-click="openAmountcollectedrpt()">Amount Collected</a></li>
                            <li><a href="" ng-click="openPortfoliomovementrpt()">Portfolio movement</a></li>
                            <li><a href="" ng-click="openRelegationanalysis()">Relegation analysis</a></li>
                            <li><a href="" ng-click="openOverduerpt()">Overdue Report</a></li>
                            <li><a href="" ng-click="openPtpmetrpt()">PTP Met</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
            </div>
          <!-- end: Left Menu -->
          <!-- start: Content -->
          
          <div ui-view></div>
          
          
		 
			<input type="hidden" id="username" name="username" value="<%=session.getAttribute("s_username")%>">
			<input type="hidden" id="division" name="division" value="<%=session.getAttribute("s_division")%>">
			<input type="hidden" id="rights" name="rights" value="<%=session.getAttribute("s_rights")%>">
	   		<input type="hidden" id="cust_number" name="cust_number" />
			<input type="hidden" id="acc_number" name="acc_number" />
		
		<textarea id="txt" style="display:none"></textarea>
          
          <!-- end: Content -->
          <!-- start: right menu -->
            <div id="right-menu">
              <ul class="nav nav-tabs">
                <li class="active">
                 <a data-toggle="tab" href="#right-menu-user">
                  <span class="fa fa-comment-o fa-2x"></span>
                 </a>
                </li>
                <li>
                 <a data-toggle="tab" href="#right-menu-notif">
                  <span class="fa fa-bell-o fa-2x"></span> {{nuofnotification}}
                 </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#right-menu-config">
                   <span class="fa fa-cog fa-2x"></span>
                  </a>
                 </li>
              </ul>

              <div class="tab-content">
                <div id="right-menu-user" class="tab-pane fade in active">
                            <div class="search col-md-12">
                                <input class="form-control border-bottom" type="text" ng-model="n_query" placeholder="search.."/>
                            </div>
                            <div class="col-md-12">
                              <ul class="nav nav-list">
                                <li class="away" ng-repeat="notify in tousers | filter:n_query">
                                  <div class="name">
                                    <h5><b>{{notify.FULLNAME}}</b></h5>
                                    <p>{{notify.VONLINE}}</p>
                                          <p><a href="" data-toggle="modal" data-target="#notifModal" data-username="{{notify.USERNAME}}" data-fullname="{{notify.FULLNAME}}" class="openNotificationDialog">Notify</a> 
                                          | <a ng-show="notify.USERNAME !== username" href="javascript:void(0)" ng-click="openChat(notify.USERNAME,notify.VONLINE)">Chat</a>
                                          </p>
                                  </div>
                                  <hr>
                                   </li>
                              </ul>
                            </div>
                          </div>
                          <div id="right-menu-notif" class="tab-pane fade">
                          		
				                <div class="search col-md-12">
				                    <div class = "btn-group btn-group-sm">
									   <button type = "button" class = "btn btn-default" ladda="Loading" ng-click="msgnotRead()" data-spinner-size="30">Not Read {{}}</button>
									   <button type = "button" class = "btn btn-default" ladda="Loading" ng-click="msgRead()" data-spinner-size="30">Read {{}}</button>
									   <button type = "button" class = "btn btn-default" ladda="Loading" ng-click="msgBounced()" data-spinner-size="30">Bounced {{msgbounced}}</button>
									</div>
				                </div>
				                <div class="search col-md-12">
				                    <input class="form-control border-bottom" type="text" ng-model="notify_query" placeholder="search.."/>
				                </div>
				                <b>{{readtitle}}</b>
                            	<ul class="mini-timeline">
    			                    <li class="mini-timeline-highlight mini-timeline-success" ng-repeat="notification in messages | filter:notify_query">
    			                      <div class="mini-timeline-panel">
    			                        <h5 class="time">{{notification.DATESENT}}</h5>
    			                        <p><a href="" data-target="#readNotificationmodal" data-id="{{notification.MESSAGE}}" data-sender="{{notification.SENDER}}" data-msgid="{{notification.ID}}" data-toggle="modal" class="readNotification">{{notification.MESSAGE | limitTo:50 }} ...</a></p>
    			                        <p>{{notification.SENDER}}</p>
    			                      </div>
    			                    </li>
      			               </ul>
                      		</div>
                      		<div id="right-menu-config" class="tab-pane fade">
                      			  <div class="col-md-12">
	                              <ul class="nav nav-list">
	                                <li><a ui-sref="aro"><i class="fa fa-user"></i> ARO Codes</a></li>
    			                        <li><a ui-sref="branch"><i class="fa fa-user"></i> Branches</a></li>
    			                        <li><a ui-sref="sla"><i class="fa fa-user"></i> SLA</a></li>
    			                        <li><a ui-sref="allocate"><i class="fa fa-file-text-o"></i> Import Files</a></li>
    			                        <li><a ui-sref="actcodes"><i class="fa fa-user"></i> Activity codes</a></li>
    			                        <li><a ui-sref="accplans"><i class="fa fa-file-text-o"></i> Account plans</a></li>
	                              </ul>
	                            </div>
	                            <br><br><br>
	                            <div class="col-md-12">
                                <ul class="nav nav-list">
                                    <li><a href="" ng-click="logout()"><span class="fa fa-power-off "></span> Logout</a></li>
                                </ul>
	                            </div>
                      		</div>                     		
              </div>
            </div>  
          <!-- end: right menu --> 
      </div>
      <!-- start notification -->
      <div id="notifModal" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">
                  <i class="icon-user icons"></i> 
                  <span id="receiver"></span>
                </h4>
              </div>
              <div class="modal-body">
                    <form ng-submit="sendnotification()">
                    	<div class="col-md-12">
                    		
                            <div class="form-group form-animate-text" style="margin-top:40px !important;">
                                <input type="text" class="form-text" ng-model="dataNotification.custnumber" required>
                                <span class="bar"></span>
                                <label>Card account</label>
                            </div>
                            <div class="form-group form-animate-text" style="margin-top:40px !important;">
                                <input type="text" class="form-text" ng-model="dataNotification.msg" required>
                                <span class="bar"></span>
                                <label>Message</label>
                            </div>
                            <div class="col-md-12">
                              <button class="btn btn-primary" ladda="Loading" ng-click="Submit()" data-spinner-size="30">Send</button>
                        	</div>
                       </div>
                    </form>
              </div>
              <div class="modal-footer">
                
              </div>
            </div>

          </div>
        </div>
		<!-- notification end -->
        					<!-- read notification modal -->
        					  <div class="col-md-12">
                                <div class="modal fade modal-v1" id="readNotificationmodal" tabindex="-1" role="dialog">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h2 class="modal-title" id="msgid">
                                        </h2>
                                      </div>
                                      <div class="modal-body">
                                        <p id="msg"></p>
                                        from : <b id="sender"></b>
                                        <input type="hidden" id="msgid2">
                                        <button class="btn btn-primary" ladda="Loading" ng-click="readMessagebtn()" data-style="expand-left">Confirm read</button>
                                      </div>
                                      <div class="modal-footer">
                                          <p ng-show="showread">Message read</p>
                                      </div>
                                    </div><!-- /.modal-content -->
                                  </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->
                            </div>

	<!-- start: Javascript -->
	<script src="asset/js/jquery.min.js"></script>
	<script src="asset/js/bootstrap.min.js"></script>

	<script src="bower_components/angular/angular.min.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
	<script src="bower_components/ng-file-upload/ng-file-upload.js"></script>
	<script src="bower_components/ng-file-upload/ng-file-upload-shim.js"></script>
	
	<script src="node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script>
	<script src="bower_components/ng-idle/angular-idle.min.js"></script>
	<script src='bower_components/angular-loading-bar/build/loading-bar.min.js'></script>

	<!-- Angular Material requires Angular.js Libraries -->
	<script src="bower_components/angular-animate/angular-animate.min.js"></script>
	<script src="bower_components/angular-aria/angular-aria.min.js"></script>
	<script src="bower_components/angular-messages/angular-messages.min.js"></script>

	<!-- Angular Material Library -->
	<script src="bower_components/angular-material/angular-material.min.js"></script>

	
	<script type="text/javascript" src="angular-ui-grid/ui-grid.min.js"></script>
	<script type="text/javascript" src="bower_components/angular-ui-notification/src/angular-ui-notification.js"></script>
	<script type="text/javascript" src="bower_components/fusioncharts-suite-xt/js/fusioncharts.js"></script>
	<script type="text/javascript" src="bower_components/fusioncharts-suite-xt/js/themes/fusioncharts.theme.fint.js"></script>
	<script type="text/javascript" src="bower_components/angular/angular-fusioncharts.min.js"></script>

	<script type="text/javascript" src="assets/angular-ladda/dist/spin.min.js"></script>
	<script type="text/javascript" src="assets/angular-ladda/dist/ladda.min.js"></script>
	<script type="text/javascript" src="assets/angular-ladda/dist/angular-ladda.min.js"></script>
	<script type="text/javascript">
		/*function getXmlHttpRequestObject() {
			var xmlHttp = false;
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest(); //To support the browsers IE7+, Firefox, Chrome, Opera, Safari
			} else if (window.ActiveXObject) {
				return new ActiveXObject("Microsoft.XMLHTTP"); // For the browsers IE6, IE5 
			} else {
				alert("Error due to old verion of browser upgrade your browser");
			}
		}

		var xmlhttp = new getXmlHttpRequestObject(); //xmlhttp holds the ajax object

		function servletPass() {
			if (xmlhttp) {
				var parameter = "&txtcust="
						+ document.getElementById("cust_number").value
						+ "&txtacc="
						+ document.getElementById("acc_number").value
						+ "&txtusername="
						+ document.getElementById("username").value
				xmlhttp.open("POST", "Passme", true);
				xmlhttp.onreadystatechange = handleServletPost;
				xmlhttp.setRequestHeader('Content-Type',
						'application/x-www-form-urlencoded');
				xmlhttp.send(parameter);
			}
		}
		function handleServletPost() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {

				} else {
					alert("Error Handling Request: " + xmlhttp.responseText);
				}
			}
		}*/
	</script>
	<!-- Custom Scripts -->
  <script type="text/javascript" src="asset/js/global.js"></script>
  <script type="text/javascript" src="views/js/Appcc_f.js"></script>
  <script type="text/javascript" src="views/js/services/mainService.js"></script>
  <script type="text/javascript" src="views/js/controllers/ccCtrl.js"></script>
	
	<!-- plugins -->
	<script type="text/javascript" src="asset/js/plugins/moment.min.js"></script>
	<script type="text/javascript" src="asset/js/plugins/jquery.nicescroll.js"></script>
	<script type="text/javascript" src="asset/js/main.js"></script>
	<!--  <script type="text/javascript" src="js/chat_final.js"></script> -->
	
	<script type="text/javascript">
		$(document).ready(function(){
			var globalUrl = urladdress;
    		var username = document.getElementById("s_in_username").value
    		var division = document.getElementById("s_in_division").value
    		
    		//username
    		//document.getElementById("username").innerHTML = username;
    		//nuofnotification
		    /*$.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/v2/notifications/' + username,
		          success: function(data) {
		            document.getElementById("nuofnotification").innerHTML = data.length;
		            document.getElementById("nuofnotification2").innerHTML = data.length;
		          }
		    })*/
		    //todaysworknotify
		    $.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/v2/todaysworkcc/' + username,
		          success: function(data) {
		            document.getElementById("todaysworknotify").innerHTML = data.length;
		          }
		    })
		    //worklistnotify
		    $.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/v2/worklistcc/' + username,
		          success: function(data) {
		            document.getElementById("worklistnotify").innerHTML = data.length;
		          }
		    })
		    //myallocnotify
		    $.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/v2/cards/' + username,
		          success: function(data) {
		            document.getElementById("myallocnotify").innerHTML = data.length;
		          }
		    })
		    //noplansnotify
		    /*$.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/v2/noplanscc/' + username,
		          success: function(data) {
		            document.getElementById("noplansnotify").innerHTML = data.length;
		          }
		    })
		    //overdueplansnotify
		    $.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/v2/overdueplanscc/' + username,
		          success: function(data) {
		            document.getElementById("overdueplansnotify").innerHTML = data.length;
		            document.getElementById("overdueplansnotify2").innerHTML = data.length;
		          }
		    })*/
		    //viewallnotify
		    $.ajax({
		      type: 'GET',
		          url: globalUrl+'/api/status/Allcards',
		          success: function(data) {
		            document.getElementById("viewallnotify").innerHTML = data.length;
		          }
		    })

        //zeronotify
        $.ajax({
          type: 'GET',
              url: globalUrl+'/api/status/closedcc',
              success: function(data) {
                document.getElementById("zeronotify").innerHTML = data.length;
              }
        })
		})
	</script>

</body>
</html>