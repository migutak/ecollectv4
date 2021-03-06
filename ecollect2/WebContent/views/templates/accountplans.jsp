<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>E-Collect&reg;</title>
<link rel="shortcut icon" href="../../asset/img/favicon.ico">
<script type="text/javascript"
	src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="../../asset/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../../asset/css/buttons.css" />
<!--  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="../../bootstrap/css/bootstrapv4.min.css"></link>
<link rel="stylesheet" type="text/css" href="../../asset/css/plugins/font-awesome.min.css"/>

<link rel="stylesheet" href="../../bootstrap/css/bootstrap-datetimepicker.css"></link>

<script type="text/javascript" src="../../bootstrap/js/bootstrap.min.js"></script>
<script src="../../bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="../../asset/js/globalr.js"></script>
<script type="text/javascript" src="../../asset/js/activityglobal.js"></script>
<script type="text/javascript" src="../../asset/js/accountplanAppj.js"></script>
<!------ Include the above in your HEAD tag ---------->

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
					<ul class="nav nav-tabs" role="tablist" id="myTabs">
						<li role="presentation" class="active"><a href="#facilities"
							aria-controls="facilities" role="tab" data-toggle="tab">Facilities</a></li>
						<li role="presentation"><a href="#background"
							aria-controls="background" role="tab" data-toggle="tab">Background</a></li>
						<li role="presentation"><a href="#problem"
							aria-controls="problem" role="tab" data-toggle="tab">Problem Definition</a></li>
						<li role="presentation"><a href="#swot" aria-controls="swot"
							role="tab" data-toggle="tab">SWOT</a></li>
						<li role="presentation"><a href="#ability"
							aria-controls="ability" role="tab" data-toggle="tab">Ability
								to Pay</a></li>
						<li role="presentation"><a href="#custproposal"
							aria-controls="custproposal" role="tab" data-toggle="tab">Customer
								Proposals</a></li>
						<li role="presentation"><a href="#paymentplans"
							aria-controls="paymentplans" role="tab" data-toggle="tab">Payment Plan</a></li>
						<li role="presentation"><a href="#bankproposal"
							aria-controls="bankproposal" role="tab" data-toggle="tab">Bank
								Proposals</a></li>
						<li role="presentation"><a href="#remedials"
							aria-controls="remedials" role="tab" data-toggle="tab">Remedial
								offerings</a></li>
						<li role="presentation"><a href="#actions"
							aria-controls="actions" role="tab" data-toggle="tab">Actions
								agreed <span class="badge badge-danger" ng-cloak>{{actionsoverduebadge}}</span></a></li>
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
							        <div class="panel-body" style="min-height: 500px; max-height: 600px; overflow-y: scroll;">   
							        <ul class="list-group">
							            <li class="list-group-item" id="accounts_list" ng-repeat="d in otheraccsData">
							                <div class="row toggle" id="dropdown-detail-1" data-toggle="detail-1">
							                    <div class="col-xs-10">
							                        CUSTNUMBER: {{d.CUSTNUMBER}}
							                    </div>
							                </div>
							                <div id="detail-1">
							                    <hr></hr>
							                    <div class="container">
							                        <div class="fluid-row">
							                            <div class="col-xs-6">
							                                ACCNUMBER: {{d.ACCNUMBER}}
							                            </div>
							                            <div class="col-xs-6">
							                                OUSTBALANCE: {{d.OUSTBALANCE | number:0}}
							                            </div>
							                         </div>
							                         <div class="fluid-row">
							                            <div class="col-xs-6">
							                                PRODUCTCODE: {{d.PRODUCTCODE}}
							                            </div>
							                            <div class="col-xs-6">
							                                AROCODE: {{d.AROCODE}}
							                            </div>
							                         </div>
							                         <div class="fluid-row">
							                            <div class="col-xs-6">
							                                RROCODE: {{d.RROCODE}}
							                            </div>
							                            <div class="col-xs-6">
							                                BRANCHCODE: {{d.BRANCHCODE}}
							                            </div>
							                         </div>
							                         <div class="fluid-row">
							                            <div class="col-xs-6">
							                                COLOFFICER: {{d.COLOFFICER}}
							                            </div>
							                            <div class="col-xs-6">
							                                BRANCHNAME: {{d.BRANCHNAME}}
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
							        <div class="panel-body" style="min-height: 500px; max-height: 600px; overflow-y: scroll;">
							        	<div class="col-sm-8">
							        		<label for="comment">Summary Comment:</label>
  											<textarea class="form-control" rows="8" id="backgroundcomment"></textarea>
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
														    <div class="card-body" ng-repeat="d in backgroundhistory">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> {{d.BACKGROUND}}</p>
														      <p class="card-text"><span></span>By {{d.OWNER}} on {{d.DATEUPDATED}}</p>
														      <button ng-click="makecurrent(d.ID)" class="btn-link">Make Current</button>
														      <button ng-click="deletebackground(d.ID)" class="btn-link">Remove</button>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_2">
													<p>
														
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
							        		<label for="comment">Problem Summary:</label>
  											<textarea class="form-control" rows="8" id="problemdefinitioncomment"></textarea>
  											<br>
  											Attachment: <span><input type="file"></span>
  											<br/>
  											<button type="button" class="btn btn-primary " id="problemdefinitionbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_problem1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_problem2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_problem1">
														<div class="card">
														    <div class="card-body" ng-repeat="p in problemdefinitionhis">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> {{p.PROBLEMDEFINITION}}</p>
														      <p class="card-text"><span></span>By {{p.OWNER}} on {{p.DATEUPDATED}}</p>
														      <button ng-click="makecurrentproblem(p.ID)" class="btn-link">Make Current</button>
														      <button ng-click="deleteproblem(p.ID)" class="btn-link">Remove</button>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_problem2">
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
							            <h3 class="panel-title">SWOT analysis</h3>
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
													<a href="#tab_default_swot1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_swot2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_swot1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_swot2">
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
													  <option>--Default--</option>
													  <option>Able and Willing</option>
													  <option>UnAble and Willing</option>
													  <option>unWilling and Able</option>
													  <option>unWilling and unAble</option>
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
													<a href="#tab_default_ability1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_ability2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_ability1">
														<div class="card">
														    <div class="card-body">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> Some example text. Some example text.</p>
														      <a href="#" class="card-link">Make Current</a>
														      <a href="#" class="card-link">Remove</a>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_ability2">
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
  											<textarea class="form-control" rows="8" id="customerproposalcomment"></textarea>
  											<br>
  											Attachment: <span><input type="file"></span>
  											<br/>
  											<button type="button" class="btn btn-primary " id="customerproposalbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_custproposal1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_custproposal2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_custproposal1">
														<div class="card">
														    <div class="card-body" ng-repeat="c in customerproposalhis">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> {{c.CUSTOMERPROPOSAL}}</p>
														      <p class="card-text"><span></span>By {{c.OWNER}} on {{c.DATEUPDATED}}</p>
														      <button ng-click="makecurrentcustomerproposal(c.ID)" class="btn-link">Make Current</button>
														      <button ng-click="deletebackground(c.ID)" class="btn-link">Remove</button>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_custproposal2">
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
  											<textarea class="form-control" rows="8" id="bankproposalcomment"></textarea>
  											<br>
  											
  											<button type="button" class="btn btn-primary " id="bankproposalbtn" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
							        	</div>
							        	<div class="col-sm-4">
							        		<ul class="nav nav-tabs ">
												<li class="active">
													<a href="#tab_default_bankproposal1" data-toggle="tab">
													History </a>
												</li>
												<li>
													<a href="#tab_default_bankproposal2" data-toggle="tab">
													Change logs </a>
												</li>
											</ul>
											<div class="tab-content">
												<div class="tab-pane active" id="tab_default_bankproposal1">
														<div class="card">
														    <div class="card-body" ng-repeat="k in bankproposalhis">
														      <h4 class="card-title"></h4>
														      <p class="card-text"><span class="glyphicon glyphicon-list-alt"></span> {{k.BANKPROPOSALS}}</p>
														      <p class="card-text"><span></span>By {{k.OWNER}} on {{k.DATEUPDATED}}</p>
														      <button ng-click="makecurrentbankproposal(k.ID)" class="btn-link">Make Current</button>
														      <button ng-click="deletebackground(k.ID)" class="btn-link">Remove</button>
														    </div>
														 </div>
												</div>
												<div class="tab-pane" id="tab_default_bankproposal2">
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
							        
							        <select>
									  <option>Private Treaty Sale</option>
							        	<option>Debt discount/Full & Final Settlement</option>
							        	<option>Rescheduling</option>
							        	<option>Interest concessions</option>
							        	<option>Insurance claims</option>
							        	<option>Out of court settlements</option>
							        	<option>Foreclosure</option>
							        	<option>Lumpsum payment</option>
							        	<option>Public sale below the reserve</option>
							        	<option>Top Ups</option>
							        	<option>Exit Relationship / take over</option>
							        	<option>Write off</option>
							        	<option>Restructure</option>
							        	<option>Refinancing</option>
									</select>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="actions">
							<div class="container">
								<div class="panel panel-info">
									<div class="panel-heading">
							            <h3 class="panel-title">Actions agreed</h3>
							        </div>
							        <div class="panel-body" style="height:600px">
							        		<form>
											  <div class="form-group row">
											    <label class="col-sm-2 col-form-label">Customer proposal Received</label>
											    <div class="col-sm-2">
											      Initiation Date <input type="text" class="form-control form_date2" id="initiationdateProposal" name="initiationdateProposal" ng-disabled="stateCheck" /> 
											    </div>
											    <div class="col-sm-2">
											      Next Review <input type="text" class="form-control form_date" id="reviewProposal" name="reviewProposal" ng-disabled="stateCheck" /> 
											    </div>
											    <div class="col-sm-2">
											      Attachment: <span><input type="file"></span>
											    </div>
											    <div class="col-sm-2">
											      Remark: <textarea class="form-control" rows="2" id="remarkproposal" name="remarkproposal" ng-disabled="stateCheck"></textarea>
											    </div>
											    <div class="col-sm-1">
											      Completed: 
											      <select id="action_completed" ng-disabled="stateCheck">
													<option value="N">No</option>
											        <option value="Y">Yes</option>
												  </select>
											    </div>
											    <div class="col-sm-1">
											    	<button type="button" class="btn btn-sm btn-info" id="btn_proposalreceived" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ..." ng-disabled="stateCheck">update</button>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label class="col-sm-2 col-form-label">Internal approval sought</label>
											    <div class="col-sm-2">
											      Initiation Date <input type="text" class="form-control form_date2" id="initiationdateapprovalsort" name="initiationdateapprovalsort" ng-disabled="stateCheckapprovalsort" /> 
											    </div>
											    <div class="col-sm-2">
											      Next Review <input type="text" class="form-control form_date" id="reviewedinternalApprovalSort" name="reviewedinternalApprovalSort" ng-disabled="stateCheckapprovalsort" /> 
											    </div>
											    <div class="col-sm-2">
											      Attachment: <span><input type="file" ng-disabled="stateCheckapprovalsort" /></span>
											    </div>
											    <div class="col-sm-2">
											      Remark: <textarea class="form-control" rows="2" id="remarkapprovalsought" name="remarkapprovalsought" ng-disabled="stateCheckapprovalsort"></textarea>
											    </div>
											    <div class="col-sm-1">
											      Completed: 
											      <select id="action_completed_approvalsought" ng-disabled="stateCheckapprovalsort">
													<option value="N">No</option>
											        <option value="Y">Yes</option>
												  </select>
											    </div>
											    <div class="col-sm-1">
											    	<button type="button" class="btn btn-sm btn-info" id="btn_approvalsought" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ..." ng-disabled="stateCheckapprovalsort">update</button>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label class="col-sm-2 col-form-label">Internal Approval granted</label>
											    <div class="col-sm-2">
											      Initiation Date <input type="text" class="form-control form_date2" id="initiationdateapprovalgranted" name="initiationdateapprovalgranted" ng-disabled="stateCheckapprovalgranted" /> 
											    </div>
											    <div class="col-sm-2">
											      Next Review <input type="text" class="form-control form_date" id="reviewedinternalApprovalgranted" name="reviewedinternalApprovalgranted" ng-disabled="stateCheckapprovalgranted" /> 
											    </div>
											    <div class="col-sm-2">
											      Attachment: <span><input type="file" ng-disabled="stateCheckapprovalgranted" ></span>
											    </div>
											    <div class="col-sm-2">
											      Remark: <textarea class="form-control" rows="2" id="remarkapprovalgranted" name="remarkapprovalgranted" ng-disabled="stateCheckapprovalgranted" ></textarea>
											    </div>
											    <div class="col-sm-1">
											      Completed: 
											      <select id="action_completed_approvalgranted" ng-disabled="stateCheckapprovalgranted" >
													<option value="N">No</option>
											        <option value="Y">Yes</option>
												  </select>
											    </div>
											    <div class="col-sm-1">
											    	<button type="button" class="btn btn-sm btn-info" id="btn_approvalgranted" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ..." ng-disabled="stateCheckapprovalgranted" >update</button>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label class="col-sm-2 col-form-label">Internal Approval Declined</label>
											    <div class="col-sm-2">
											      Initiation Date <input type="text" class="form-control form_date2" id="initiationdateapprovaldeclined" name="initiationdateapprovaldeclined" ng-disabled="stateCheckapprovaldeclined" /> 
											    </div>
											    <div class="col-sm-2">
											      Next Review <input type="text" class="form-control form_date" id="reviewedinternalApprovaldeclined" name="reviewedinternalApprovaldeclined" ng-disabled="stateCheckapprovaldeclined" /> 
											    </div>
											    <div class="col-sm-2">
											      Attachment: <span><input type="file" ng-disabled="stateCheckapprovaldeclined"></span>
											    </div>
											    <div class="col-sm-2">
											      Remark: <textarea class="form-control" rows="2" id="remarkapprovaldeclined" name="remarkapprovaldeclined" ng-disabled="stateCheckapprovaldeclined"></textarea>
											    </div>
											    <div class="col-sm-1">
											      Completed: 
											      <select id="action_completed_approvaldeclined" ng-disabled="stateCheckapprovaldeclined">
													<option value="N">No</option>
											        <option value="Y">Yes</option>
												  </select>
											    </div>
											    <div class="col-sm-1">
											    	<button type="button" class="btn btn-sm btn-info" id="btn_approvaldeclined" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ..." ng-disabled="stateCheckapprovaldeclined">update</button>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label class="col-sm-2 col-form-label">Customer Accepted</label>
											    <div class="col-sm-2">
											      Initiation Date <input type="text" class="form-control form_date2" id="initiationdatecustomeraccepted" name="initiationdatecustomeraccepted" ng-disabled="stateCheckcustomeraccepted" /> 
											    </div>
											    <div class="col-sm-2">
											      Next Review <input type="text" class="form-control form_date" id="reviewedinternalcustomeraccepted" name="reviewedinternalcustomeraccepted" ng-disabled="stateCheckcustomeraccepted" /> 
											    </div>
											    <div class="col-sm-2">
											      Attachment: <span><input type="file" ng-disabled="stateCheckcustomeraccepted"></span>
											    </div>
											    <div class="col-sm-2">
											      Remark: <textarea class="form-control" rows="2" id="remarkcustomeraccepted" name="remarkcustomeraccepted" ng-disabled="stateCheckcustomeraccepted"></textarea>
											    </div>
											    <div class="col-sm-1">
											      Completed: 
											      <select id="action_completed_customeraccepted" ng-disabled="stateCheckcustomeraccepted">
													<option value="N">No</option>
											        <option value="Y">Yes</option>
												  </select>
											    </div>
											    <div class="col-sm-1">
											    	<button type="button" class="btn btn-sm btn-info" id="btn_customeraccepted" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ..." ng-disabled="stateCheckcustomeraccepted">update</button>
											    </div>
											  </div>
											  <div class="form-group row">
											    <label class="col-sm-2 col-form-label">Cure implemented</label>
											    <div class="col-sm-2">
											      Initiation Date <input type="text" class="form-control form_date2" id="initiationdatecure" name="initiationdatecure" /> 
											    </div>
											    <div class="col-sm-2">
											      Next Review <input type="text" class="form-control form_date" id="reviewedcure" name="reviewedcure" /> 
											    </div>
											    <div class="col-sm-2">
											      Attachment: <span><input type="file"></span>
											    </div>
											    <div class="col-sm-2">
											      Remark: <textarea class="form-control" rows="2" id="remarkcure" name="remarkcure"></textarea>
											    </div>
											    <div class="col-sm-1">
											      Completed: 
											      <select id="action_completed_cure">
													<option value="N">No</option>
											        <option value="Y">Yes</option>
												  </select>
											    </div>
											    <div class="col-sm-1">
											    	<button type="button" class="btn btn-sm btn-info" id="btn_cureimplemented" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">update</button>
											    </div>
											  </div>
											</form>
							        </div>
								</div>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="paymentplans">
							<div class="container">
								<div class="panel panel-default">
									<div class="panel-heading">
							            <h3 class="panel-title">Payment Plan</h3>
							        </div>
							        <div class="panel-body" style="height:500px">
										 <div class="col-sm-8">
  											<table class="grid table table-bordered table-sortable">
  												<thead>
									                <tr><th>accountNumber</th><th>PTP Amount</th><th>PTP Date</th><th>Frequency</th><th>Freq No.</th><th>dateMade</th></tr>
									            </thead>
									            <tbody>
									               <tr ng-repeat="p in paymentplanshis">
									            		<td>{{p.ACCNUMBER}}</td>
									                	<td>{{p.PTPAMOUNT}}</td>
									                	<td>{{p.PTPSTARTDATE}}</td>
									                	<td>{{p.PTPFREQ}}</td>
									                	<td>{{p.FREQNO}}</td>
									                	<td>{{p.DATEUPDATED}}</td>
									                </tr>
									            </tbody>
  											</table>
							        	</div>
							        	<div class="col-sm-4">
							        		<p>New Plan</p>
							        		
							        		<hr />
							        		
							        		<form class="form-horizontal" action="/">
											  <div class="form-group">
											    <label class="control-label col-sm-4" for="email">amount:</label>
											    <div class="col-sm-8">
											      <input type="text" class="form-control" id="ptpamount" placeholder="Promise amount">
											    </div>
											  </div>
											  <div class="form-group">
											    <label class="control-label col-sm-4" for="ptpdate">Frequency:</label>
											    <div class="col-sm-8">
											      <select class="form-control" id="planfreq">
											        	<option default value="One-time">One-time</option>
											        	<option value="Daily">Daily</option>
											        	<option value="Weekly">Weekly</option>
											        	<option value="Monthly">Monthly</option>
											        	<option value="Yearly">Yearly</option>
													</select>
											    </div>
											  </div>
											  <div class="form-group">
											    <label class="control-label col-sm-4" for="no_of_frequency">No of frequency:</label>
											    <div class="col-sm-8"> 
											      <input type="text" class="form-control" id="no_of_frequency" value="1">
											    </div>
											  </div>
											  <div class="form-group">
											    <label class="control-label col-sm-4" for="pwd">Start date:</label>
											    <div class="col-sm-8"> 
											      <input type="text" class="form-control form_date" id="ptpstartdate">
											    </div>
											  </div>
											  <div class="form-group"> 
											    <div class="col-sm-offset-2 col-sm-10">
											      <button type="button" class="btn btn-primary " id="btn_ptpplan" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing ...">Submit</button>
											    </div>
											  </div>
											</form>
							        	</div>
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
									        <table class="grid table table-bordered table-sortable">
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
	
	<script type="text/javascript" src="../../bootstrap/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>

<script type="text/javascript">
// https://www.malot.fr/bootstrap-datetimepicker/
	$('.form_date').datetimepicker({
        format:  'dd-M-yyyy',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		startDate : new Date(),
		minView: 2,
		forceParse: true
    });
    
	$('.form_date2').datetimepicker({
        format:  'dd-M-yyyy',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		startDate : new Date(),
		endDate : new Date(),
		minView: 2,
		forceParse: true
    });
	
</script>

	<script type="text/javascript" src="../../asset/js/loadScript.js"></script>
	<script type="text/javascript">
		function makecurrent() {
			console.log('clicked----');
		}
	</script>
</body>
</html>