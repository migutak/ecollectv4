<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="RDash">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>E-Collect</title>
<!-- STYLES -->
  <!-- build:css lib/css/main.min.css -->
  <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.coop.css">
  <link rel="stylesheet" type="text/css" href="views/components/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="views/components/rdash-ui/dist/css/rdash.min.css">
  
  <script src="bower_components/jquery/dist/jquery.js"></script>

  <!-- endbuild -->
  <!-- SCRIPTS -->
  <!-- build:js lib/js/main.min.js -->
  <script type="text/javascript" src="jqwidgets/scripts/angular.min.js"></script>
  <script type="text/javascript" src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
  <script type="text/javascript" src="bower_components/angular-cookies/angular-cookies.min.js"></script>
  <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
  <!-- endbuild -->
  <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="bower_components/ng-idle/angular-idle.min.js"></script>
  <!-- Angular loading bar js -->
  <link rel='stylesheet' href='bower_components/angular-loading-bar/build/loading-bar.min.css' type='text/css' />
  <script type='text/javascript' src='bower_components/angular-loading-bar/build/loading-bar.min.js'></script>
  
  	<!-- jqwidgets -->
  	<link rel="stylesheet" type="text/css" href="jqwidgets/styles/jqx.base.css" />
  	<link rel="stylesheet" type="text/css" href="jqwidgets/styles/jqx.coop.css" />
    <script type="text/javascript" src="jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxdata.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.selection.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.sort.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.pager.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.filter.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.columnsresize.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.export.js"></script> 
    <script type="text/javascript" src="jqwidgets/jqxdata.export.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxwindow.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxangular.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxInput.js"></script>
    
    <script type="text/javascript">
    	$(function() {
	  	document.getElementById("username").value = localStorage.getItem("uname");
	  	document.getElementById("division").value = localStorage.getItem("division");
	  	document.getElementById("rights").value = localStorage.getItem("rights");
	  	
	  	document.getElementById("userLogged").innerHTML = localStorage.getItem("uname");
	  	document.getElementById("role").innerHTML = localStorage.getItem("rights");
    	})
	  	
	</script>
    
  <!-- Custom Scripts -->
  <script type="text/javascript" src="views/js/dashboard.cc.js"></script>
  <script type="text/javascript" src="controllers/activityController.js"></script>
  <script type="text/javascript" src="views/js/services/mainService.js"></script>
  <script type="text/javascript" src="views/js/controllers/master-ctrl.js"></script>
  
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
			 				"&txtacc=" + document.getElementById("acc_number").value 
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
	}
  </script>
  
</head>
<body ng-controller="MasterCtrl">
		<input type="hidden" id="username">
		<input type="hidden" id="division">
		<input type="hidden" id="rights">
 <div id="page-wrapper" ng-class="{'open': toggle}" ng-cloak>
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <ul class="sidebar">
        <li class="sidebar-main">
          <a ng-click="toggleSidebar()">
            E-Collect
            <span class="menu-icon glyphicon glyphicon-transfer"></span>
          </a>
        </li>
        <li class="sidebar-title"><span>NAVIGATION</span></li>
        <hr>
        <li class="sidebar-list">
          <a href="#">Dashboard <span class="menu-icon fa fa-tachometer"></span></a>
        </li>
        <li class="sidebar-list">
          <a href="#/myallocations">My Allocations <span class="menu-icon fa fa-file"></span></a>
        </li>
        <li class="sidebar-list">
          <a href="#/myworklist">My Worklist <span class="menu-icon fa fa-file"></span></a>
        </li>
        <li class="sidebar-list" ng-show="menu">
          <a href="#/teamreview">Team Reviewer Cards &nbsp;&nbsp;<span class="label label-danger" ng-controller="temccCtrl">{{foreview}}</span></a>
        </li>
        <li class="sidebar-list">
              <a href="#/viewall"><span>View All</span><i class="menu-icon fa fa-file"></i></a>
        </li>
        <li class="sidebar-list">
          <a href="#/closed">Cards Cr/Zero Bal<span class="menu-icon fa fa-file"></span></a>
        </li>
      </ul>
      <div class="sidebar-footer">
        <div class="col-xs-6">
          <a href="" target="_blank">
            Manual
          </a>
        </div>
        <div class="col-xs-6">
          <a href="http://inteligen.co.ke" target="_blank">
            &copy;Inteligen
          </a>
        </div>
      </div>
    </div>
    <!-- End Sidebar -->

    <div id="content-wrapper">
      <div class="page-content">
        <!-- Header Bar -->
        <div class="row header">
          <div class="col-xs-12">
            <div class="user pull-right">
              <div class="item dropdown">
                <a href="#" class="dropdown-toggle">
                  <img class="img img-circle" src="./views/img/avatar.jpg" />
                  <span id="userLogged"></span>
                </a>
                
                <ul class="dropdown-menu dropdown-menu-right">
                  <li class="dropdown-header">
                    <p id="role"></p>
                  </li>
                  <li class="divider"></li>
                  <li class="link" ng-show="menu">
                    <a href="#/aro" style="color:blue">
                     &nbsp;ARO Codes
                    </a>
                  </li>
                  <li class="link" ng-show="menu">
                    <a href="#/allocate" style="color:blue">
                      &nbsp;Import Files
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li class="link">
                    <a href="" ng-click="logout()">
                      &nbsp;Logout
                    </a>
                  </li>
                </ul>
              </div>
              <div class="item dropdown">
              	<a href="" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                </a>
                <ul class="dropdown-menu">
                  <li class="dropdown-header">Notifications</li>
                  <li class="divider"></li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user "></i> New Notification
                        </a>
                      </li>
                </ul>
              </div>
              <div class="item dropdown">
               <a href="#" class="dropdown-toggle">
                  <i class="fa fa-line-chart fa-4x"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right >">
                  <li class="dropdown-header">
                    Reports
                  </li>
                  <li class="divider"></li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=summary_allocation_cc_test.rptdesign&__title=Allocation Summary" target="_blank"><i class="fa fa-book"></i>&nbsp; Allocation Summary</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=collectoractivity_test.rptdesign&__title=Activity_Report" target="_blank"><i class="fa fa-book"></i>&nbsp; Collector Activity</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=ptps_cc_test.rptdesign&__title=Promises Kept" target="_blank"><i class="fa fa-book"></i>&nbsp; Promises Kept</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=overdue_cc_test.rptdesign&__showtitle=false&__title=Overdue_Report" target="_blank"><i class="fa fa-book"></i>&nbsp; Overdue Report</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=amountcollected_cc_test.rptdesign&__title=Amount Collected" target="_blank"><i class="fa fa-book"></i>&nbsp; Amount Collected</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=file_analysis_cc_test.rptdesign&__title=Relegation Analysis" target="_blank"><i class="fa fa-book"></i>&nbsp; Relegation Analysis</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=unallocated_cc_test.rptdesign&__title=Non Allocated" target="_blank"><i class="fa fa-book"></i>&nbsp; Non Allocated</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=portfoliomovt_cc_test.rptdesign&__title=Portfolio Movement Report" target="_blank"><i class="fa fa-book"></i>&nbsp; Portfolio Movement</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=notescc.rptdesign&__title=Daily Notes" target="_blank"><i class="fa fa-book"></i>&nbsp; Daily Notes Cards</a>
                  </li>
                  <li>
                  	<a href="http://192.168.0.51:8080/birt/frameset?__report=newfileanalysis_cc_test.rptdesign&__title=New File Analysis Report" target="_blank"><i class="fa fa-book"></i>&nbsp; New File Analysis</a>
                  </li>
                </ul>
                
              </div>
            </div>
            <div class="meta" ng-controller="BreadCtrl">
              <div class="page">
                {{title}}
              </div>
              <div class="breadcrumb-links">
                Home / {{title}}
              </div>
            </div>
          </div>
        </div>
        <!-- End Header Bar -->

        <!-- Main Content -->
        <div ui-view></div>
        <input type="hidden" id="cust_number" name="cust_number" />
		<input type="hidden" id="acc_number" name="acc_number" />
        
      </div><!-- End Page Content -->
    </div><!-- End Content Wrapper -->
    <nav class="navbar navbar-default navbar-fixed-bottom">
	  <div class="well">
	    
	  </div>
	</nav>
  </div><!-- End Page Wrapper -->
  <style type="text/css">
  	body { padding-bottom: 70px; }
  </style>
</body>
</html>