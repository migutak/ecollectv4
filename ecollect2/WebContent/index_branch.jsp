<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="RDash">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <title>E-Collect</title>
  <link rel="shortcut icon" href="asset/img/favicon.ico">
  <!-- start: Css -->
  <link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">

  <!-- start: Css -->
  <link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/angular-ladda/dist/ladda-themeless.min.css">
  <link rel="stylesheet" type="text/css" href="asset/css/plugins/jquery.steps.css"/>
  <!-- plugins -->
  <link rel="stylesheet" type="text/css" href="asset/css/plugins/font-awesome.min.css"/>
  <link rel="stylesheet" type="text/css" href="asset/css/plugins/simple-line-icons.css"/>
  <link rel="stylesheet" type="text/css" href="asset/css/plugins/animate.min.css"/>
  <link rel="stylesheet" type="text/css" href="asset/css/plugins/summernote.css"/>
  <link rel="stylesheet" type="text/css" href="asset/css/style.css" >
  <link rel="stylesheet" type="text/css" href="css/chat.css" />
  <link rel="stylesheet" type="text/css" href="css/screen.css" />
  <!-- end: Css -->
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
            <!-- start: Javascript -->
<script src="asset/js/jquery.min.js"></script>
<script src="asset/js/bootstrap.min.js"></script>

  <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
  <script type="text/javascript" src="bower_components/angular-cookies/angular-cookies.min.js"></script>
  <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
  <script src="views/templates/plugins/angular-file-upload.min.js"></script>
  <script src="node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script>
  
<script src="bower_components/ng-idle/angular-idle.min.js"></script>
  <!-- Angular loading bar js -->
  <link rel='stylesheet' href='bower_components/angular-loading-bar/build/loading-bar.min.css' type='text/css' />
  <script type='text/javascript' src='bower_components/angular-loading-bar/build/loading-bar.min.js'></script>
  
  <!-- Angular Material style sheet -->
  <link rel="stylesheet" href="bower_components/angular-material/angular-material.min.css">

  <!-- Angular Material requires Angular.js Libraries -->
  <script src="bower_components/angular-animate/angular-animate.min.js"></script>
  <script src="bower_components/angular-aria/angular-aria.min.js"></script>
  <script src="bower_components/angular-messages/angular-messages.min.js"></script>

  <!-- Angular Material Library -->
  <script src="bower_components/angular-material/angular-material.min.js"></script>
  
    <script type="text/javascript">
    	$(function() {
	  	document.getElementById("username").value = localStorage.getItem("uname");
	  	document.getElementById("division").value = localStorage.getItem("division");
	  	document.getElementById("rights").value = localStorage.getItem("rights");
    	})
	</script>

	<link rel="styleSheet" href="angular-ui-grid/ui-grid.min.css"/>
	<script src="angular-ui-grid/ui-grid.min.js"></script>
	
  <link rel="stylesheet" href="bower_components/angular-ui-notification/dist/angular-ui-notification.min.css">
  <script src="bower_components/angular-ui-notification/src/angular-ui-notification.js"></script>
	
	<script src="assets/angular-ladda/dist/spin.min.js" ></script>
  <script src="assets/angular-ladda/dist/ladda.min.js" ></script>
  <script src="assets/angular-ladda/dist/angular-ladda.min.js" ></script>
	<script type="text/javascript">
  function getXmlHttpRequestObject() {
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
			var parameter = "&txtcust="+ document.getElementById("cust_number").value +
			 				"&txtacc=" + document.getElementById("acc_number").value +
			 				"&txtusername=" + document.getElementById("username").value
			xmlhttp.open("POST", "Passme", true);
			xmlhttp.onreadystatechange = handleServletPost;
			xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xmlhttp.send(parameter);
		}
	}
	function handleServletPost() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				
			} else {
				alert("Error Handling Request: "+xmlhttp.responseText);
			}
		}
	}//<span class="menu-icon badge-danger" style="color:red">{{foreview}}</span> chnged from views/js/controllers/master-ctrl.js ... views/js/controllers/activity-ctrl.js
  </script>
  <!-- Custom Scripts -->
  <script type="text/javascript" src="views/js/Mainappj.js"></script>
  <script type="text/javascript" src="views/js/services/mainService.js"></script>
  <script type="text/javascript" src="views/js/controllers/mastctrlf.js"></script>
  <script type="text/javascript" src="views/js/controllers/worklistCtrl.js"></script>

  
</head>
<body id="mimin" class="dashboard" ng-controller="MasterCtrl">
<%
	    if ((session.getAttribute("s_username") == null) || (session.getAttribute("s_username") == "")) {
	    	response.sendRedirect(request.getContextPath() +"/login.jsp");
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
                <a href="index_admin.html" class="navbar-brand"> 
                 <b>E-Collect</b>
                </a>

              <ul class="nav navbar-nav search-nav">
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
              </ul>

              <ul class="nav navbar-nav navbar-right user-nav">
                <li class="user-name"><span>{{username}}</span></li>
                  <li class="dropdown avatar-dropdown">
                   <img src="asset/img/avatar.jpg" class="img-circle avatar" alt="user name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"/>
                   <ul class="dropdown-menu user-dropdown">
                     <li><a href=""><span class="fa fa-user"></span> My Profile</a></li>
                     <li><a ui-sref="diary"><span class="fa fa-calendar"></span> My Calendar</a></li>
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
                <li ><a href="" class="opener-right-menu"><span class="fa fa-coffee"></span>{{nuofnotification}}</a></li>
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
                    <!--  <li><div class="left-bg"></div></li>
                    <li class="time">
                      <h1 class="animated fadeInLeft">21:00</h1>
                      <p class="animated fadeInRight">Sat,October 1st 2029</p>
                    </li>-->
                    <li class="active ripple">
                      <a class="tree-toggle nav-header"><span class="fa-home fa"></span> Dashboard 
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                          <li><a ui-sref="dashboard">User Dashboard</a></li>
                          <li><a ui-sref="regionaldashboard">Regional Dashboard</a></li>
                          <li><a ui-sref="divdashboard">Divisional Dashboard</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-diamond fa"></span> Work Queue
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="todayswork">Today's Work</a></li>
                        <li><a ui-sref="myworklist">My Worklist</a></li>
                        <li><a ui-sref="myallocations">My Allocations</a></li>
                        <li><a ui-sref="viewall({from:'home'})">View All</a></li>
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
                    <li class="ripple"><a class="tree-toggle nav-header">
                    <span class="fa fa-pencil-square"></span> CMD  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="serviceproviders">Service Provides</a></li>
                        <li><a ui-sref="cmdcards">Credit cards</a></li>
                        <li><a ui-sref="woffs">Write offs</a></li>
                        <li><a ui-sref="closed">CMD Cr/Zero Balance</a></li>
                      </ul>
                    </li>
                    <li class="ripple"><a class="tree-toggle nav-header"><span class="fa fa-check-square-o"></span> Letters  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="demands">Confirmations</a></li>
                        <li><a ui-sref="demands">Letters Due</a></li>
                        <li><a ui-sref="demands">Letter Confirmations</a></li>
                      </ul>
                    </li>
                     <li class="ripple"><a class="tree-toggle nav-header"><span class="fa fa-table"></span> Reports  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a href="" ng-click="openAllocationsummary()">Allocation Summary</a></li>
                        <li><a href="" ng-click="openActivityrpt()">Collector Activity</a></li>
                        <li class="ripple">
                          <a class="sub-tree-toggle nav-header">
                            <span class="fa fa-envelope-o"></span> Collections
                            <span class="fa-angle-right fa right-arrow text-right"></span>
                          </a>
                          <ul class="nav nav-list sub-tree">
                            <li><a href="" ng-click="openAmountcollectedrpt()">Amount Collected</a></li>
                            <li><a href="" ng-click="openOverduerpt()">Overdue Report</a></li>
                            <li><a href="" ng-click="openSmsrpt()">SMS report</a></li>
                          </ul>
                        </li>
                        <li class="ripple">
                          <a class="sub-tree-toggle nav-header">
                            <span class="fa fa-envelope-o"></span> Remedial
                            <span class="fa-angle-right fa right-arrow text-right"></span>
                          </a>
                          <ul class="nav nav-list sub-tree">
                            <li><a href="" ng-click="openNewfileanalysisrpt()">New File Analysis</a></li>
                            <li><a href="" ng-click="openPortfoliomovementrpt">Portfolio Movement</a></li>
                            <li><a href="" ng-click="openRelegationanalysis">Relegation Analysis</a></li>
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
          
          
	        <input type="hidden" id="username" name="username">
			<input type="hidden" id="division" name="division">
			<input type="hidden" id="rights" name="rights">
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
                 <!--   <div class="search col-md-12">
                    <input type="text" ng-model="query" placeholder="search.."/>
                  </div>
                  <div class="user col-md-12">
                   <ul class="nav nav-list">
                    <li class="online" ng-repeat="u in tousers | filter:query">
                      <img src="asset/img/avatar.jpg">
                      <div class="name">
                        <h5><b>{{u.FULLNAME}}</b></h5>
                        <p>{{u.VONLINE}}</p>
                      </div>
                      <div ng-show="u.VONLINE == 'online'" class="dot"></div>
                    </li>
                  </ul>
                </div>
                -->
                <!-- Chatbox -->
                <!--  <div class="col-md-12 chatbox">
                  <div class="col-md-12">
                    <a href="" class="close-chat">X</a><h4>Akihiko Avaron</h4>
                  </div>
                  <div class="chat-area">
                    <div class="chat-area-content">
                      <div class="msg_container_base">
                        <div class="row msg_container send">
                          <div class="col-md-9 col-xs-9 bubble">
                            <div class="messages msg_sent">
                              <p>that mongodb thing looks good, huh?
                                tiny master db, and huge document store</p>
                                <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                              </div>
                            </div>
                            <div class="col-md-3 col-xs-3 avatar">
                              <img src="asset/img/avatar.jpg" class=" img-responsive " alt="user name">
                            </div>
                          </div>

                          <div class="row msg_container receive">
                            <div class="col-md-3 col-xs-3 avatar">
                              <img src="asset/img/avatar.jpg" class=" img-responsive " alt="user name">
                            </div>
                            <div class="col-md-9 col-xs-9 bubble">
                              <div class="messages msg_receive">
                                <p>that mongodb thing looks good, huh?
                                  tiny master db, and huge document store</p>
                                  <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                </div>
                              </div>
                            </div>
                          </div>
                         </div>
                       </div>
                       <div class="chat-input">
                           <textarea placeholder="type your message here.."></textarea>
                       </div>
                              <div class="user-list">
                                <ul>
                                  <li class="online">
                                    <a href=""  data-toggle="tooltip" data-placement="left" title="Akihiko avaron">
                                      <div class="user-avatar"><img src="asset/img/avatar.jpg" alt="user name"></div>
                                      <div class="dot"></div>
                                    </a>
                                  </li>
                                  <li class="offline">
                                    <a href="" data-toggle="tooltip" data-placement="left" title="Akihiko avaron">
                                      <img src="asset/img/avatar.jpg" alt="user name">
                                      <div class="dot"></div>
                                    </a>
                                  </li>
                                  <li class="away">
                                    <a href="" data-toggle="tooltip" data-placement="left" title="Akihiko avaron">
                                      <img src="asset/img/avatar.jpg" alt="user name">
                                      <div class="dot"></div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            //-->
                            <div class="search col-md-12">
                                <input class="form-control border-bottom" border-bottom" type="text" ng-model="n_query" placeholder="search.."/>
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
                          		<div class="search col-md-6">
				                    <input class="form-control border-bottom" type="text" ng-model="notify_query" placeholder="search.."/>
				                </div>
				                <div class="search col-md-6">
				                    <div class="mini-onoffswitch onoffswitch-danger">
	                                  <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="onoffswitch" ng-model="onoffswitch" checked>
	                                  <label class="onoffswitch-label" for="onoffswitch"></label>
	                                </div>
	                                <div class="btn-group" role="group" aria-label="...">
			                            <button class="btn btn-primary" ladda="Loading" ng-click="msgBounced()" data-spinner-size="30">Bounced {{msgbounced}}</button>
			                        </div>
				                </div>
				                <p ng-show="!read">Read</p><p ng-show="read">Not Read</p>
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
	                                <li><a ui-sref="aro">ARO Codes</a></li>
	                                <li><a ui-sref="regions">Regions</a></li>
			                        <li><a ui-sref="branch">Branches</a></li>
			                        <li><a ui-sref="memo">Memo Groups</a></li>
			                        <li><a ui-sref="sla">Service level A</a></li>
			                        <li><a ui-sref="allocate"><i class="fa fa-file-text-o"></i> Import Files</a></li>
			                        <li><a ui-sref="buckets">Bucket Assignment</a></li>
			                        <li><a ui-sref="managers"><i class="fa fa-user"></i> Branch Managers</a></li>
			                        <li><a ui-sref="actcodes">Activity codes</a></li>
			                        <li><a ui-sref="accplans"><i class="fa fa-file-text-o"></i> Account plans</a></li>
			                        <li><a ui-sref="sptype"><i class="fa fa-user"></i> Service providers</a></li>
	                              </ul>
	                            </div>
	                            <hr>
	                            <div class="col-md-12">
	                            	<a href="" ng-click="logout()"><span class="fa fa-power-off "></span> Logout</a>
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
                  <p id="receiver"></p>
                </h4>
              </div>
              <div class="modal-body">
                    <form ng-submit="sendnotification()">
                    	<div class="col-md-12">
                            <div class="form-group form-animate-text" style="margin-top:40px !important;">
                                <input type="text" class="form-text" ng-model="dataNotification.custnumber" required>
                                <span class="bar"></span>
                                <label>Custnumber</label>
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
        					  <div class="col-md-12" ng-controller="MasterCtrl">
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
                                        from : <p id="sender"></p>
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

<!-- plugins -->
<script type="text/javascript" src="asset/js/plugins/moment.min.js"></script>
<script type="text/javascript" src="asset/js/plugins/jquery.nicescroll.js"></script>
<script type="text/javascript" src="asset/js/main.js"></script>
<script type="text/javascript" src="js/chat_final.js"></script>

</body>
</html>