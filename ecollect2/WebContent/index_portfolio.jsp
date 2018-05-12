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

  <!-- Global valiable -->
<script type="text/javascript" src="asset/js/global.js"></script>

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
                <li class="user-name"><span><%=session.getAttribute("s_username")%></span></li>
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
                          <li ng-show="teamleader"><a ui-sref="dashboard">Summary Dashboard</a></li>
                          <li><a ui-sref="regionaldashboard">Regional Dashboard</a></li>
                      </ul>
                    </li>
                    <li class="ripple">
                      <a class="tree-toggle nav-header">
                        <span class="fa-diamond fa"></span> Work Queue <span class="badge badge-danger" id="noplansnotify"></span>
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="todaysworkport">Today's Work <span class="badge badge-success pull right" id="todaysworknotify"></span></a></li>
                        <li><a ui-sref="myworklistport">My Worklist <span class="badge badge-primary pull right" id="worklistnotify"></span></a></li>
                        <li><a ui-sref="myallocationsport">My Allocations <span class="badge badge-success pull right" id="myallocnotify"></span></a></li>
                        <li><a ui-sref="viewallport_r">View All <span class="badge badge-primary pull right" id="viewallnotify"></span></a></li>
                      </ul>
                    </li>
                    <li class="ripple" ng-show="teamleader">
                      <a class="tree-toggle nav-header">
                        <span class="fa-area-chart fa"></span> Team Leader
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                        <li><a ui-sref="teamreviewport">Review-Cards</a></li>
                        <li><a ui-sref="cards">All Cards</a></li>
                      </ul>
                    </li>
                     <li class="ripple"><a class="tree-toggle nav-header"><span class="fa fa-table"></span> Reports  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li><a href="" ng-click="openActivityrpt()">Collector Activity</a></li>
                        <li><a ui-sref="divdashboard">Collector activity summary</a></li>
                        <li><a href="" ng-click="openAmountcollectedrpt()">Amount Collected</a></li>
                        <li><a href="" ng-click="openSmsrpt()">SMS report</a></li>
                        <li><a href="" ng-click="openNotesrpt()">Daily notes</a></li>
                        <li><a href="" ng-click="openAllocationsummary()">Allocation Summary</a></li>
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

<script type="text/javascript">
  $(document).ready(function(){
    var globalUrl = urladdress;
    //var username = localStorage.getItem("uname");
    //var division = localStorage.getItem("division");
    var username = document.getElementById("s_in_username").value
    var division = document.getElementById("s_in_division").value

    //nuofnotification
    $.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/notifications/' + username,
          success: function(data) {
            document.getElementById("nuofnotification").innerHTML = data.length;
            document.getElementById("nuofnotification2").innerHTML = data.length;
          }
    })
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
    /*$.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/noplans/' + username,
          success: function(data) {
            document.getElementById("noplansnotify").innerHTML = data.length;
            //document.getElementById("noplansnotify2").innerHTML = data.length;
          }
    })*/
    //overdueplansnotify
    /*$.ajax({
      type: 'GET',
          url: globalUrl+'/api/v2/overdueplans/' + username,
          success: function(data) {
            //document.getElementById("overdueplansnotify").innerHTML = data.length;
            document.getElementById("noplansnotify").innerHTML = data.length;
          }
    })*/
    //viewallnotify
      $.ajax({
        type: 'GET',
            url: globalUrl+'/api/status/totalportfolio',
            success: function(data) {
              document.getElementById("viewallnotify").innerHTML = data[0].TOTALACCOUNTS;
            }
      })
  
  })
</script>

</body>
</html>