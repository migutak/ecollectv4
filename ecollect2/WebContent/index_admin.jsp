<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="RDash">
<head>
<meta charset="utf-8">
	<meta name="description" content="Miminium Admin Template v.1">
	<meta name="author" content="Kevin miguta">
	<meta name="keyword" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <title>E-Collect</title>
  <link rel="shortcut icon" href="asset/img/favicon.ico">
    <!-- start: Css -->
    <link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">

      <!-- plugins -->
      <link rel="stylesheet" type="text/css" href="asset/css/plugins/font-awesome.min.css"/>
      <link rel="stylesheet" type="text/css" href="asset/css/plugins/simple-line-icons.css"/>
      <link rel="stylesheet" type="text/css" href="asset/css/plugins/animate.min.css"/>
      <link rel="stylesheet" type="text/css" href="asset/datepicker/datepicker3.css">
	  <link rel="stylesheet" type="text/css" href="asset/css/style.css">
	<!-- end: Css -->
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script type="text/javascript" src="asset/js/jquery.min.js"></script>
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="bower_components/ng-idle/angular-idle.min.js"></script>
  
  <!-- Custom Scripts -->
  <script type="text/javascript" src="asset/js/global.js"></script>
  <script type="text/javascript" src="views/js/dashboard.admn.js"></script>
  <script type="text/javascript" src="views/js/controllers/adminctrl.js"></script>
  <script type="text/javascript" src="views/js/services/mainService.js"></script>
</head>

<body id="mimin" class="dashboard" ng-controller="MasterCtrl">
<%
    if ((session.getAttribute("s_username") == null) || (session.getAttribute("s_username") == "")) {
    	response.sendRedirect("login.jsp");
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
                <a href="index_admin.html" class="navbar-brand"> 
                 <b>E-Collect</b>
                </a>

              <ul class="nav navbar-nav navbar-right user-nav">
                <li class="user-name"><span><%=session.getAttribute("s_username")%></span></li>
                  <li class="dropdown avatar-dropdown">
                   <img src="asset/img/avatar.jpg" class="img-circle avatar" alt="user name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"/>
                   <ul class="dropdown-menu user-dropdown">
                     <li><a href="#"><span class="fa fa-user"></span> My Profile</a></li>
                     <li><a href="#"><span class="fa fa-calendar"></span> My Calendar</a></li>
                     <li role="separator" class="divider"></li>
                     <li class="more">
                      <ul>
                        <li><a href=""><span class="fa fa-cogs"></span></a></li>
                        <li><a href=""><span class="fa fa-lock"></span></a></li>
                        <li><a href="" ng-click="logout()"><span class="fa fa-power-off "></span></a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
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
                    <li><div class="left-bg"></div></li>
                    <li class="time">
                      <h1 class="animated fadeInLeft">21:00</h1>
                      <p class="animated fadeInRight">Sat,October 1st 2029</p>
                    </li>
                    <li class="active ripple">
                      <a class="tree-toggle nav-header"><span class="fa-home fa"></span> Manage 
                        <span class="fa-angle-right fa right-arrow text-right"></span>
                      </a>
                      <ul class="nav nav-list tree">
                          <li><a ui-sref="users">Users</a></li>
                          <li><a ui-sref="branches">Branches</a></li>
                          <li><a ui-sref="departments">Departments</a></li>
                      </ul>
                    </li>
                    <li class="ripple"><a class="tree-toggle nav-header"><span class="fa fa-table"></span> Reports  <span class="fa-angle-right fa right-arrow text-right"></span> </a>
                      <ul class="nav nav-list tree">
                        <li>
                          <a href="" ng-click="openUsersrpt()"><i class="fa fa-book"></i>&nbsp; Users Report</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
            </div>
          <!-- end: Left Menu -->

          <!-- start: content -->
          <div ui-view></div>
          <!-- end: content -->        
      </div>

    <!-- start: Javascript -->
    <script src="asset/js/jquery.min.js"></script>
    <script src="asset/js/bootstrap.min.js"></script>
   
    
    <!-- plugins -->
    <script src="asset/js/plugins/moment.min.js"></script>
    <script src="asset/js/plugins/jquery.nicescroll.js"></script>


    <!-- custom -->
     <script src="asset/js/main.js"></script>
     <script src="asset/datepicker/bootstrap-datepicker.js" type="text/javascript"></script>
  <!-- end: Javascript -->
  </body>
</html>