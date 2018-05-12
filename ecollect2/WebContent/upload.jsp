<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>E-Collect&reg;</title>
    <link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
    <script type="text/javascript" src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>
    
<script type="text/javascript">
  $( document ).ready(function() {
    var custnumber = getParameterByName('custnumber');
	var username = getParameterByName('username');
	var accnumber = getParameterByName('accnumber');
	
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};
    document.getElementById("custnumber").value = custnumber;
    document.getElementById("accnumber").value = accnumber;
    document.getElementById("colofficer").value = username;
  });	//https://ecollectapp.co-opbank.co.ke:3000/upload_a_file    
</script>
    
</head>
<body>
<div class="page-header">
  <h1>File upload <small></small></h1>
</div>
    <div class="container">
        <form action="https://ecollectapp.co-opbank.co.ke:3000/upload_a_file" enctype="multipart/form-data" method="post">
            <div class="form-group">
                <label for="custnumber">Custnumber:</label>
                <input type="text" class="form-control" name="custnumber" id="custnumber" required readonly/>
            </div>
            <div class="form-group">
                <label for="accnumber">Accnumber:</label>
                <input type="text" class="form-control" name="accnumber" id="accnumber" required readonly/>
            </div>
            <div class="form-group">
                <label for="colofficer">Colofficer:</label>
                <input type="text" class="form-control" name="colofficer" id="colofficer" required readonly/>
            </div>
            <div class="form-group">
                <label>Document type:</label>
                <select class="form-control" note id="doctype" name="doctype">
                        <option value="Other">Other</option>
                        <option value="Demand Letter">Demand Letter</option>
                </select>
            </div>
            <div class="form-group">
                <label for="uploadnote">Description:</label>
                <textarea class="form-control" rows="2" id="uploadnote" name="uploadnote" required ></textarea>
            </div>
            <div class="form-group">
                <input type="file" name="upload" required>
            </div>
            <input class="btn" type="submit" value="Upload">
        </form>
    </div> 
</body>
</html>