<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript"
	src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="../../asset/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../../asset/css/buttons.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../../asset/css/plugins/font-awesome.min.css"/>

<script type="text/javascript" src="../../bootstrap/js/bootstrap.min.js"></script>
<script src="../../bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="../../asset/js/global.js"></script>
<script type="text/javascript" src="../../asset/js/activityglobal.js"></script>
<script type="text/javascript" src="../../asset/js/accountplanApp.js"></script>
<!------ Include the above in your HEAD tag ---------->

<title>E-Collect&reg;</title>
</head>
<body ng-app="App" ng-controller="mainCtrl">
<input type="hidden" id="s_in_username" value="<%=session.getAttribute("s_username")%>">
<input type="hidden" id="s_in_division" value="<%=session.getAttribute("s_division")%>">
<input type="hidden" id="s_in_rights" value="<%=session.getAttribute("s_rights")%>">
<input type="hidden" id="s_in_role" value="<%=session.getAttribute("s_role")%>">

	<div>
	
	<!-- start: Header 
        <nav class="navbar navbar-default header navbar-fixed-top">
          <div class="col-md-12">
            <div class="navbar-header" style="width:100%;">
                <h3 id="firstname"></h3>
            </div>
          </div>
        </nav>
     end: Header -->
     
    <div class="card text-center" style="width: 100%">
	  <div class="card-body">
	    <h5 class="card-title" id="firstname"></h5>
	    <p class="card-text" id="addressline"></p>
	    <p class="card-text" id="telnumber"></p>
	  </div>
	</div>
    
		<div class="row" style="padding:35px; margin-to:50px">
			<div class="col-md-12">
				<!-- Nav tabs -->
				<div class="card">
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation" class="active"><a href="#facilities"
							aria-controls="facilities" role="tab" data-toggle="tab">Facilities</a></li>
						<li role="presentation"><a href="#background"
							aria-controls="background" role="tab" data-toggle="tab">Background</a></li>
						<li role="presentation"><a href="#problem"
							aria-controls="problem" role="tab" data-toggle="tab">Problem
								Definition</a></li>
						<li role="presentation"><a href="#swot" aria-controls="swot"
							role="tab" data-toggle="tab">SWOT</a></li>
						<li role="presentation"><a href="#ability"
							aria-controls="ability" role="tab" data-toggle="tab">Ability
								to Pay</a></li>
						<li role="presentation"><a href="#custproposal"
							aria-controls="custproposal" role="tab" data-toggle="tab">Customer
								Proposals</a></li>
						<li role="presentation"><a href="#bankproposal"
							aria-controls="bankproposal" role="tab" data-toggle="tab">Bank
								Proposals</a></li>
						<li role="presentation"><a href="#remedials"
							aria-controls="remedials" role="tab" data-toggle="tab">Remedial
								offerings</a></li>
						<li role="presentation"><a href="#actions"
							aria-controls="actions" role="tab" data-toggle="tab">Actions
								agreed</a></li>
						<li role="presentation"><a href="#nextreview"
							aria-controls="nextreview" role="tab" data-toggle="tab">Next
								Review</a></li>
						<li role="presentation"><a href="#expected"
							aria-controls="expected" role="tab" data-toggle="tab">Collections</a></li>
					</ul>

					<!-- Tab panes -->
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane active" id="facilities">
							<div class="container">
								<div class="panel panel-default">
							        <div class="panel-heading">
							            <h3 class="panel-title">Customer facilities</h3>
							        </div>
							        <div class="panel-body" style="height:500px">   
							        <ul class="list-group">
							            <li class="list-group-item" id="accounts_list" ng-repeat="d in otheraccsData">
							                <div class="row toggle" id="dropdown-detail-1" data-toggle="detail-1">
							                    <div class="col-xs-10">
							                        customer number : {{d.CUSTNUMBER}}
							                    </div>
							                </div>
							                <div id="detail-1">
							                    <hr></hr>
							                    <div class="container">
							                        <div class="fluid-row">
							                            <div class="col-xs-1">
							                                account number : {{d.ACCNUMBER}}
							                            </div>
							                            <div class="col-xs-5">
							                                oustbalance: {{d.OUSTBALANCE | number:0}}
							                            </div>
							                            <div class="col-xs-1">
							                                product : {{d.PRODUCTCODE}}
							                            </div>
							                            <div class="col-xs-5">
							                                arocode : {{d.AROCODE}}
							                            </div>
							                            <div class="col-xs-1">
							                                rrocode:
							                            </div>
							                            <div class="col-xs-5">
							                                sample.
							                            </div>
							                            <div class="col-xs-1">
							                                Detail:
							                            </div>
							                            <div class="col-xs-5">
							                                sample.
							                            </div>
							                        </div>
							                    </div>
							                </div>
							            </li>
							        </ul>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="background">
							<div class="container">
								<div class="panel panel-info">
									<div class="panel-heading">
							            <h3 class="panel-title">Background</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="col-sm-8">
							        		<label for="comment">Summary Comment:</label>
  											<textarea class="form-control" rows="5" id="comment"></textarea>
  											<!--  <button type="button" class="button button1">Update</button> -->
  											<br/>
  											<button type="button" class="btn btn-primary " id="backgroundbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														sample
													</p>
													<p>
														details.
													</p>
													<p>
														
													</p>
												</div>
											</div>
							        	</div>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="problem">
							<div class="container">
								<div class="panel panel-default">
									<div class="panel-heading">
							            <h3 class="panel-title">Problem definition</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="col-sm-8">
							        		<label for="comment">Summary:</label>
  											<textarea class="form-control" rows="5" id="comment"></textarea>
  											<br>
  											<button type="button" class="btn btn-primary " id="problemdefinitionbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														sample
													</p>
													<p>
														details.
													</p>
													<p>
														
													</p>
												</div>
											</div>
							        	</div>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="swot">
							<div class="container">
								<div class="panel panel-info">
									<div class="panel-heading">
							            <h3 class="panel-title">Actions</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="col-sm-8">
							        		<form>
											  <div class="form-group row">
											    <label for="staticEmail" class="col-sm-2 col-form-label">Strengths</label>
											    <div class="col-sm-10">
											      <textarea class="form-control" rows="3" id="strengths" name="strengths"></textarea>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label for="inputPassword" class="col-sm-2 col-form-label">Weaknesses</label>
											    <div class="col-sm-10">
											      <textarea class="form-control" rows="3" id="weaknesses" name="weaknesses"></textarea>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label for="inputPassword" class="col-sm-2 col-form-label">Opportunities</label>
											    <div class="col-sm-10">
											      <textarea class="form-control" rows="3" id="opportunities" name="opportunities"></textarea>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label for="inputPassword" class="col-sm-2 col-form-label">Threats</label>
											    <div class="col-sm-10">
											      <textarea class="form-control" rows="3" id="threats" name="threats"></textarea>
											    </div>
											  </div>
											  <button type="button" class="btn btn-primary " id="swotbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
											</form>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														sample
													</p>
													<p>
														details.
													</p>
													<p>
														
													</p>
												</div>
											</div>
							        	</div>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="ability">
							<div class="container">
								<div class="panel panel-default">
									<div class="panel-heading">
							            <h3 class="panel-title">Ability to pay</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="col-sm-8">
							        		<form>
											  <div class="form-group row">
											    <label for="staticEmail" class="col-sm-2 col-form-label">ability to pay</label>
											    <div class="col-sm-10">
											      <select id="abilitytopay" class="form-control">
													  <option value="volvo">YES</option>
													  <option value="saab">NO</option>
												  </select>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label for="inputPassword" class="col-sm-2 col-form-label">willing to pay</label>
											    <div class="col-sm-10">
											      <select id="willingtopay" class="form-control">
													  <option value="volvo">NO</option>
													  <option value="saab">YES</option>
												  </select>
											    </div>
											  </div>
											  <br>
											  <button type="button" class="btn btn-primary " id="abilitybtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
											</form>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														sample
													</p>
													<p>
														details.
													</p>
													<p>
														
													</p>
												</div>
											</div>
							        	</div>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="custproposal">
							<div class="container">
								<div class="panel panel-default">
									<div class="panel-heading">
							            <h3 class="panel-title">Customer proposal</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="col-sm-8">
							        		<label for="comment">Summary:</label>
  											<textarea class="form-control" rows="5" id="customerproposal"></textarea>
  											<br>
  											<button type="button" class="btn btn-primary " id="customerproposalbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														sample
													</p>
													<p>
														details.
													</p>
													<p>
														
													</p>
												</div>
											</div>
							        	</div>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="bankproposal">
							<div class="container">
								<div class="panel panel-info">
									<div class="panel-heading">
							            <h3 class="panel-title">Bank proposal</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="col-sm-8">
							        		<label for="comment">Summary:</label>
  											<textarea class="form-control" rows="5" id="bankproposal"></textarea>
  											<br>
  											<button type="button" class="btn btn-primary " id="bankproposalbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														sample
													</p>
													<p>
														details.
													</p>
													<p>
														
													</p>
												</div>
											</div>
							        	</div>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="remedials">
							<div class="container">
								<div class="panel panel-default">
									<div class="panel-heading">
							            <h3 class="panel-title">Remedial offerings</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<p>Private Treaty</p>
							        	<p>Full & Final Settlement</p>
							        	<p>Rescheduling</p>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="actions">
							<div class="container">
								<div class="panel panel-info">
									<div class="panel-heading">
							            <h3 class="panel-title">Actions</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<p>Customer proposal Received</p>
							        	<p>Internal approval sought </p>
							        	<p>Internal Approval granted </p>
							        	<p>Internal Approval Declined </p>
							        	<p>Customer Accepted </p>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="nextreview">
							<div class="container">
								<div class="panel panel-default">
									<div class="panel-heading">
							            <h3 class="panel-title">ReviewDate</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<form>
										  <div class="form-group row">
										    <label for="staticEmail" class="col-sm-2 col-form-label">Next review date</label>
										    <div class="col-sm-10">
										      <input type="text" class="form-control">
										    </div>
										  </div>
										  <button type="button" class="btn btn-info">Update</button>
										</form>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="expected">
							<div class="container">
								<div class="panel panel-info">
									<div class="panel-heading">
							            <h3 class="panel-title">Expected & actual collections</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
							        	<div class="table-responsive col-md-12">
									        <table id="sort2" class="grid table table-bordered table-sortable">
									            <thead>
									                <tr><th>MON-Year</th><th>Expected</th><th>Actual</th></tr>
									            </thead>
									            <tbody>
									                <tr>
									                    <td>JAN-2018</td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><button class="btn btn-primary glyphicon glyphicon-play-circle"></button></td>
									                </tr>
									                <tr>
									                    <td>FEB-2018</td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><button class="btn btn-primary glyphicon glyphicon-play-circle"></button></td>
									                </tr>
									                <tr>
									                    <td>MAR-2018</td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><button class="btn btn-primary glyphicon glyphicon-play-circle"></button></td>
									                </tr>
									                <tr>
									                    <td>APR-2018</td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><button class="btn btn-primary glyphicon glyphicon-play-circle"></button></td>
									                </tr>
									                <tr>
									                    <td>MAY-2018</td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><button class="btn btn-primary glyphicon glyphicon-play-circle"></button></td>
									                </tr>
									                <tr>
									                    <td>JUN-2018</td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><input type="text" class="form-control"></td>
									                    <td><button class="btn btn-primary glyphicon glyphicon-play-circle"></button></td>
									                </tr>
									            </tbody>
									        </table>
									        </div>
							        </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="../../asset/js/loadScript.js"></script>
</body>
</html>