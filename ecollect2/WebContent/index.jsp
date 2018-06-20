<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="RDash">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <title>E-Collect&reg;</title>
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
  <link rel="stylesheet" type="text/css" href="asset/css/plugins/bootstrap-material-datetimepicker.css"/>
  <link rel="stylesheet" type="text/css" href="bower_components/bootstrap-table/dist/bootstrap-table.css">
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
<script type="text/javascript" src="asset/js/jquery.min.js"></script>
<script type="text/javascript" src="asset/js/bootstrap.min.js"></script>

<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script type="text/javascript" src="bower_components/ng-file-upload/ng-file-upload.js"></script>
<script type="text/javascript" src="bower_components/ng-file-upload/ng-file-upload-shim.js"></script>
<script type="text/javascript" src="node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script>
  
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
  
	<link rel="styleSheet" href="angular-ui-grid/ui-grid.min.css"/>
	<script src="angular-ui-grid/ui-grid.min.js"></script>
	
  <link rel="stylesheet" href="bower_components/angular-ui-notification/dist/angular-ui-notification.min.css">
  <script src="bower_components/angular-ui-notification/src/angular-ui-notification.js"></script>
  

	<script type="text/javascript" src="bower_components/angular/lodash.js"></script>
	<script type="text/javascript" src="bower_components/angular/angularjs-dropdown-multiselect.js"></script>
	
<script src="assets/angular-ladda/dist/spin.min.js" ></script>
<script src="assets/angular-ladda/dist/ladda.min.js" ></script>
<script src="assets/angular-ladda/dist/angular-ladda.min.js" ></script>

<script src="assets/angular-spinner/spin.js"></script>
<script src="assets/angular-spinner/angular-spinner.js"></script>

<script type="text/javascript" src="fusion-charts/fusioncharts.js"></script>
<script type="text/javascript" src="fusion-charts/angular-fusioncharts.min.js"></script>
<script type="text/javascript" src="fusion-charts/themes/fusioncharts.theme.fint.js"></script>
	
  <!-- Global valiable  -->
<script type="text/javascript" src="asset/js/globalr.js"></script>

  <!-- Custom Scripts -->
<script type="text/javascript" src="views/js/Mainapp.js"></script>
<script type="text/javascript" src="views/js/services/mainService.js"></script>
<script type="text/javascript" src="views/js/controllers/MasterCtrl.js"></script>
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
                <a href="index.jsp" class="navbar-brand"> 
                 <b>E-Collect<sup>&reg;</sup></b>
                </a>

              <ul class="nav navbar-nav navbar-right user-nav">
                <li class="user-name"><span id="username2"><%=session.getAttribute("s_username")%></span></li>
                  <li class="dropdown avatar-dropdown">
                   <img src="asset/img/avatar.jpg" class="img-circle avatar" alt="username" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"/>
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
                <li><a href="" class="opener-right-menu"><span class="fa fa-bell" id="nuofnotification2"></span></a></li>
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
                          <li><a ui-sref="dashboard">Summary Dashboard</a></li>
                          <li><a ui-sref="regionaldashboard">Regional Dashboard</a></li>
                          <li><a ui-sref="par">Portfolio-at-Risk</a></li>
                          <li><a href="" ng-click="openActivitydash()">Activity Dashboard</a></li>
                          <!--  <li class="ripple">
	                          <a class="sub-tree-toggle nav-header">
	                            Activity Dashboard
	                            <span class="fa-angle-right fa right-arrow text-right"></span>
	                          </a>
	                          <ul class="nav nav-list sub-tree">
	                            <li><a ui-sref="divdashboard">Head office</a></li>
	                            <li><a ui-sref="branchdashboard">Branches</a></li>
	                          </ul>
	                     </li>-->
                        <!-- <li><a ui-sref="vintages">Vintages</a></li>
                        <li><a ui-sref="rollrates">Roll rates</a></li>
                        <li><a ui-sref="curerate">Cure rate</a></li>-->
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-diamond fa"></span> Work Queue <span class="badge badge-danger" id="viewallnotify2"></span>
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="todayswork">Today's Work <span class="badge badge-success pull right" id="todaysworknotify"></span></a></li>
                        <li><a ui-sref="myworklist">My Worklist <span class="badge badge-primary pull right" id="worklistnotify"></span></a></li>
                        <li><a ui-sref="myallocations">My Allocations <span class="badge badge-success pull right" id="myallocnotify"></span></a></li>
                        <!-- <li><a ui-sref="noplans">No plans <span class="badge badge-danger pull right" id="noplansnotify2"></span></a></li>
                        <li><a ui-sref="overdueplans">Overdue plans <span class="badge badge-danger pull right" id="overdueplansnotify"></span></a></li>-->
                        <li><a ui-sref="viewall({from:'home'})">View All <span class="badge badge-primary pull right" id="viewallnotify"></span></a></li>
                        <li><a ui-sref="predelinq">Pre-delinquent<span class="badge badge-primary pull right" id="predelinqnotify"></span></a></li>
                        <li><a ui-sref="funds">With funds<span class="badge badge-primary pull right" id="withfundsnotify"></span></a></li>
                        <li><a ui-sref="lettersdue">Letters due<span class="badge badge-primary pull right" id="lettersduenotify"></span></a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa fa-credit-card"></span> Mco-op cash <span class="badge badge-danger" id="noplansnotifymcoop"></span>
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <!--<li><a ui-sref="todaysworkmcoop">Today's Work <span class="badge badge-success pull right" id="todaysworknotifymcoop"></span></a></li>
                        <li><a ui-sref="myworklistmcoop">My Worklist <span class="badge badge-primary pull right" id="worklistnotifymcoop"></span></a></li>
                        <li><a ui-sref="myallocationsmcoop">My Allocations <span class="badge badge-success pull right" id="myallocnotifymcoop"></span></a></li>
                        <li><a ui-sref="noplansmcoop">No plans <span class="badge badge-danger pull right" id="noplansnotify2mcoop"></span></a></li>
                        <li><a ui-sref="overdueplansmcoop">Overdue plans <span class="badge badge-danger pull right" id="overdueplansnotifymcoop"></span></a></li>-->
                        <li><a ui-sref="viewallmcoop">View All <span class="badge badge-primary pull right" id="viewallnotifymcoop"></span></a></li>
                      </ul>
                    </li>
                    <li class="ripple" ng-show="teamleader">
                      <a class="tree-toggle nav-header">
                        <span class="fa-area-chart fa"></span> Team Leader
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                      	<li><a ui-sref="allocateflags">Pre-DELQ flags</a></li>
                        <li><a ui-sref="teamreview">Review-Loans</a></li>
                        <li><a ui-sref="teamreviewcc">Review-Cards</a></li>
                        <li><a ui-sref="cards">All Cards</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-area-chart fa"></span> Paying - Watch
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="no_creditwatch">No Credit Buildup</a></li>
                        <li><a ui-sref="creditwatch">Credit build watch</a></li>
                      </ul>
                    </li>
                    <!--  <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-area-chart fa"></span> Paying - No alert
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="paynoalert">View all</a></li>
                      </ul>
                    </li>-->
                    <li class="ripple"><a class="tree-toggle nav-header" ng-show="cmd">
                    <span class="fa fa-pencil-square"></span> CMD  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="cards">Credit cards</a></li>
                        <li><a ui-sref="woffs">Write offs</a></li>
                        <li><a ui-sref="closed">CMD Cr/Zero Balance</a></li>
                        <li><a ui-sref="closedcc">Cards Cr/Zero Balance</a></li>
                        <li class="ripple">
                        	  <a class="sub-tree-toggle nav-header">
	                            <span class="fa fa-database"></span> Service Providers
	                            <span class="fa-angle-right fa right-arrow text-right"></span>
	                          </a>
	                          <ul class="nav nav-list sub-tree">
	                            <li><a ui-sref="auctioneers">Auctioneers</a></li>
	                            <li><a ui-sref="marketors">Marketors</a></li>
	                            <li><a ui-sref="repossessors">Repossessors</a></li>
	                            <li><a ui-sref="investigators">Investigators</a></li>
	                            <li><a ui-sref="debtcollectors">Debt Collectors</a></li>
	                            <li><a ui-sref="valuers">Valuers</a></li>
	                          </ul>
                        </li>
                        <!-- <li class="ripple">
                            <a class="sub-tree-toggle nav-header">
                              <span class="fa fa-circle"></span> Other Providers
                              <span class="fa-angle-right fa right-arrow text-right"></span>
                            </a>
                            <ul class="nav nav-list sub-tree">
                              <li><a ui-sref="yards">Storage yards</a></li>
                              <li><a ui-sref="discharge">Discharge request</a></li>
                              <li><a ui-sref="transfer">Transfer of chargee</a></li>
                              <li><a ui-sref="notices40days">40-Days Notices</a></li>
                            </ul>
                        </li>-->
                        <li class="ripple">
                            <a class="sub-tree-toggle nav-header">
                              <span class="fa fa-clone"></span> Payments
                              <span class="fa-angle-right fa right-arrow text-right"></span>
                            </a>
                            <ul class="nav nav-list sub-tree">
                              <li><a ui-sref="invoices">Invoices</a></li>
                              <li><a ui-sref="payments">Payment History</a></li>
                            </ul>
                        </li>
                      </ul>
                    </li>
                     <li class="ripple"><a class="tree-toggle nav-header"><span class="fa fa-table"></span> Reports  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a href="" ng-click="openActivityrpt()">Collector activity</a></li>
                        <li><a href="" ng-click="openAmountcollectedrpt()">Amount collected</a></li>
                        <li><a href="" ng-click="openSmsrpt()">SMS report</a></li>
                        <li><a href="" ng-click="openNotesrpt()">Daily notes</a></li>
                        
                        <li class="ripple">
                          <a class="sub-tree-toggle nav-header">
                            <span class="fa fa-envelope-o"></span> Collections Summary
                            <span class="fa-angle-right fa right-arrow text-right"></span>
                          </a>
                          <ul class="nav nav-list sub-tree">
                            <!--  <li><a href="" ng-click="openOverduerpt()">Overdue Report</a></li>
                            <li><a href="" ng-click="openUnreadnotificationsrpt()">Notifications</a></li>
	                        <li><a href="" ng-click="noplansrpt()">With no plans</a></li>
	                        <li><a href="" ng-click="expiredplansrpt()">Expired plans</a></li>-->
	                        <li><a href="" ng-click="openAllocationsummaryrpt()">Allocation Summary</a></li>
	                        <li><a ui-sref="amntcollected">amnt collected summary</a></li>
	                        <li><a ui-sref="sms_dash">SMS rpt summary</a></li>
	                        <li><a ui-sref="notes_dash">Daily notes summary</a></li>
                          </ul>
                        </li>
                        <li class="ripple" ng-show="cmd">
                          <a class="sub-tree-toggle nav-header">
                            <span class="fa fa-envelope-o"></span> Remedial
                            <span class="fa-angle-right fa right-arrow text-right"></span>
                          </a>
                          <ul class="nav nav-list sub-tree">
                            <li><a href="" ng-click="openunactionedrpt()">Unactioned report</a></li>
                            <li><a href="" ng-click="openNewfileanalysisrpt()">New File Analysis</a></li>
                            <li><a href="" ng-click="openPortfoliomovementrpt()">Portfolio Movement</a></li>
                            <li><a href="" ng-click="openRelegationanalysis()">Relegation Analysis</a></li>
                            <li><a href="" ng-click="openInvoincesrpt()">Invoices</a></li>
                            <li><a href="" ng-click="openPortfoliomovementrptcc()">Portfolio movement cc</a></li>
                            <li><a href="" ng-click="openRelegationanalysisrptcc()">Relegation analysis cc</a></li>
                          </ul>
                        </li>
                        <li class="ripple" ng-show="cmd">
                          <a class="sub-tree-toggle nav-header">
                            <span class="fa fa-envelope-o"></span> Service Provider
                            <span class="fa-angle-right fa right-arrow text-right"></span>
                          </a>
                          <ul class="nav nav-list sub-tree">
                            <li><a ui-sref="spdashboard">Allocation summary</a></li>
                            <li><a href="" ng-click="spamountcollectedrpt()">Amount Collected</a></li>
                            <li><a href="" ng-click="spexpiredindemnityrpt()">Expired indemnity</a></li>
                            <li><a href="" ng-click="spstatusanalysis()">Status Analysis</a></li>
                            <li><a href="" ng-click="spfeenoterpt()">Fee Note</a></li>
                            <li><a href="" ng-click="sppaymenthistoryrpt()">Payment History</a></li>
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
                  <span class="fa fa-bell-o fa-2x" id="nuofnotification"></span>
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
				                    <!--  <div class="mini-onoffswitch onoffswitch-danger">
	                                  <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="onoffswitch" ng-model="onoffswitch" checked>
	                                  <label class="onoffswitch-label" for="onoffswitch"></label>
	                                </div>
	                                <div class="btn-group" role="group" aria-label="...">
			                            <button class="btn btn-primary" ladda="Loading" ng-click="msgBounced()" data-spinner-size="30">Bounced {{msgbounced}}</button>
			                        </div>-->
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
	                                <li><a ui-sref="regions"><i class="fa fa-user"></i> Regional</a></li>
    			                        <li><a ui-sref="branch"><i class="fa fa-user"></i> Branches</a></li>
    			                        <li><a ui-sref="memo"><i class="fa fa-user"></i> Memo Groups</a></li>
    			                        <li><a ui-sref="sla"><i class="fa fa-user"></i> SLA</a></li>
    			                        <li><a ui-sref="allocate"><i class="fa fa-file-text"></i> Import Files</a></li>
    			                        <li><a ui-sref="buckets"><i class="fa fa-file-text-o"></i> Bucket</a></li>
    			                        <li><a ui-sref="managers"><i class="fa fa-user"></i> Branch Managers</a></li>
    			                        <li><a ui-sref="actcodes"><i class="fa fa-user"></i> Activity codes</a></li>
    			                        <li><a ui-sref="accplans"><i class="fa fa-file-text-o"></i> Account plans</a></li>
    			                        <li><a ui-sref="sptype"><i class="fa fa-user"></i> Service providers</a></li>
                                  <li><a ui-sref="bankregions"><i class="fa fa-user"></i> Bank Regions</a></li>
                                  <li><a href="/ecollect2/Manual" target="_blank"><i class="fa fa-book"></i> Manual</a></li>
                                  <li><a href="/ecollect2/collectionscripts" target="_blank"><i class="fa fa-file"></i> Collection call plan scripts</a></li>
                                  <li><a href="/ecollect2/customer_visit" target="_blank"><i class="fa fa-file"></i> Collection customer visit</a></li>
                                  <li><a href="/ecollect2/decision_tree" target="_blank"><i class="fa fa-file"></i> Decision tree</a></li>
                                  <li><a href="/ecollect2/account_plans" target="_blank"><i class="fa fa-file"></i> Account plans</a></li>
                                  <li><a href="/ecollect2/loan_process_flow" target="_blank"><i class="fa fa-file"></i> Loan process flow</a></li>
                                  <li><a href="/ecollect2/pbo_handover_guideline" target="_blank"><i class="fa fa-file"></i> PBO handover guideline</a></li>
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
                            <!-- read notification modal -->
                    
                     <div class="col-md-12">
                                <div class="modal fade modal-v1" id="notifModal" tabindex="-1" role="dialog">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title">
						                  <i class="icon-user icons"></i> 
						                  <span id="receiver"></span>
						                </h4>
                                      </div>
                                      	<div class="modal-body">
                                        		<div class="form-group form-animate-text" style="margin-top:40px !important;">
                                                    <input type="text" class="form-text" ng-model="dataNotification.accnumber" ng-blur="fillcustnumber()" required>
                                                    <span class="bar"></span>
                                                    <label>ACCNUMBER</label>
                                                </div>
                                                <div class="form-group form-animate-text" style="margin-top:40px !important;">
                                                    <input type="text" class="form-text" ng-model="dataNotification.custnumber" required>
                                                    <span class="bar"></span>
                                                    <label>CUSTNUMBER</label>
                                                </div>
                                                <div class="form-group form-animate-text" style="margin-top:40px !important;">
                                                    <input type="text" class="form-text" ng-model="dataNotification.msg" required>
                                                    <span class="bar"></span>
                                                    <label>Message</label>
                                                </div>
                                                <div class="col-md-12">
                                                  <button class="btn btn-primary" ladda="Loading" ng-click="sendnotification()" data-spinner-size="30">Send</button>
                                              	</div>
                                      	</div>
                                    </div><!-- /.modal-content -->
                                  </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->
                            </div>
	
<!-- plugins -->

<script type="text/javascript" src="asset/js/plugins/moment.min.js"></script>
<script type="text/javascript" src="asset/js/plugins/jquery.nicescroll.js"></script>
<script type="text/javascript" src="asset/js/main.js"></script>
<!--  <script type="text/javascript" src="js/chat_final.js"></script>-->

<script type="text/javascript">
  $(document).ready(function(){
    var globalUrl = urladdress;
    
    var username = document.getElementById("s_in_username").value;
    var division = document.getElementById("s_in_division").value;
    var branch = document.getElementById("s_in_branch").value;

    //nuofnotification
   /* $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/notifications/' + username,
          success: function(data) {
            document.getElementById("nuofnotification").innerHTML = data.length;
            document.getElementById("nuofnotification2").innerHTML = data.length;
          }
    })*/
    //username
    //document.getElementById("username2").innerHTML = username;
    document.getElementById("username").value = username;
    
    //todaysworknotify
    $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/todayswork/' + username,
          success: function(data) {
            document.getElementById("todaysworknotify").innerHTML = data.length;
          }
    })
    //worklistnotify
    $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/worklist/' + username,
          success: function(data) {
            document.getElementById("worklistnotify").innerHTML = data.length;
          }
    })
    //myallocnotify
    $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/division/' + username,
          success: function(data) {
            document.getElementById("myallocnotify").innerHTML = data.length;
          }
    })
    //noplansnotify
   /* $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/noplans/' + username,
          success: function(data) {
            document.getElementById("noplansnotify").innerHTML = data.length;
            document.getElementById("noplansnotify2").innerHTML = data.length;
          }
    })
    //overdueplansnotify
    $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/overdueplans/' + username,
          success: function(data) {
            document.getElementById("overdueplansnotify").innerHTML = data.length;
            document.getElementById("noplansnotify").innerHTML = data.length;
          }
    })*/
    //viewallnotify
    if(division === 'BRANCH'){
      //
      $.ajax({
        type: 'GET',
            //url: globalUrl+'/api/v2/divall/' + division,
            url: globalUrl+'/api/status/allaccounts_branch/'+ branch,
            success: function(data) {
              document.getElementById("viewallnotify").innerHTML = data[0].TOTALACCOUNTS;
            }
      })
    }else{
      $.ajax({
        type: 'GET',
            //url: globalUrl+'/api/v2/divall/' + division,
            url: globalUrl+'/api/status/allaccounts_division/'+ division,
            success: function(data) {
              document.getElementById("viewallnotify").innerHTML = data[0].TOTALACCOUNTS;
              document.getElementById("viewallnotify2").innerHTML = data[0].TOTALACCOUNTS;
            }
      })
    }
    
    //todaysworknotifymcoop
  /*   $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/todaysworkmcoop/' + username,
          success: function(data) {
            document.getElementById("todaysworknotifymcoop").innerHTML = data.length;
          }
    })
  
  //worklistnotifymcoop
   $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/worklistmcoop/' + username,
          success: function(data) {
            document.getElementById("worklistnotifymcoop").innerHTML = data.length;
          }
    })
  
  //myallocnotifymcoop
   $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/myallocationsmcoop/' + username,
          success: function(data) {
            document.getElementById("myallocnotifymcoop").innerHTML = data.length;
          }
    })
  //noplansnotify2mcoop
   $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/noplansmcoop/' + username,
          success: function(data) {
            document.getElementById("noplansnotify2mcoop").innerHTML = data.length;
            document.getElementById("noplansnotifymcoop").innerHTML = data.length;
          }
    })
  //overdueplansnotifymcoop
   $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/overdueplansmcoop/' + username,
          success: function(data) {
            document.getElementById("overdueplansnotifymcoop").innerHTML = data.length;
          }
    })*/
 
 //viewallnotifymcoop
   $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/lazymcoop',
          success: function(data) {
            document.getElementById("viewallnotifymcoop").innerHTML = data.total;
          }
    })
    
    //predelinqnotify
   /* $.ajax({
      type: 'GET',
          url: globalUrl+'/api/status/predelinqmyallocations/'+username,
          success: function(data) {
            document.getElementById("predelinqnotify").innerHTML = data.length;
          }
    })*/
  })
</script>

</body>
</html>