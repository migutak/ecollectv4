<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>E-Collect&reg;</title>
<!-- start: Css -->
<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="asset/css/plugins/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/simple-line-icons.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/animate.min.css" />
<link rel="stylesheet" type="text/css" href="asset/css/plugins/icheck/skins/flat/aero.css" />
<link rel="stylesheet" type="text/css" href="asset/css/style.css">
<!-- end: Css -->

<link rel="shortcut icon" href="asset/img/logomi.png">
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif] LoginServlet Logintest-->
      
</head>
<body id="mimin" class="dashboard form-signin-wrapper" ng-app="App" ng-controller="loginCtrl">
	<div class="container">
		<form class="form-signin" method="post" action="LoginServlet" autocomplete="off">
			<div class="panel periodic-login">
				<span class="atomic-number"></span>
				<div class="panel-body text-center">
					<h1 class="atomic-symbol">E</h1>
					<p class="atomic-mass">v3</p>
					<p class="element-name">E-Collect<sup>&reg;</sup></p>

					<i class="icons icon-arrow-down"></i>
					
					<div class="form-group form-animate-text" style="margin-top: 40px !important;">
						<input type="text" class="form-text" name="username" required autocomplete="off">
						<span class="bar"></span> <label>Username</label>
					</div>
					<div class="form-group form-animate-text" style="margin-top: 40px !important;">
						<input type="password" class="form-text" name="password" autocomplete="off" required> 
						<span class="bar"></span> 
						<label>Password</label>
					</div>
					<input type="submit" class="btn col-md-12" value="SignIn" /> 
				</div>
				<div style="color: red">
					<strong></strong>
				</div>
			</div>
		</form>
	</div>
	<!-- end: Content --->
</body>
</html>