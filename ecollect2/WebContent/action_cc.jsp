
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

 <!-- BEGIN HEAD -->
<head>
    <meta charset="UTF-8" />
    <title>Activity | Cards</title>
     <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!-- GLOBAL STYLES -->
    <script src="assets/jquery-1.11.1.js"></script>
    
    <script type="text/javascript" src="views/components/angular/angular.js"></script>
  <script type="text/javascript" src="views/components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
  <script type="text/javascript" src="views/components/angular-cookies/angular-cookies.min.js"></script>
  <script type="text/javascript" src="views/components/angular-ui-router/release/angular-ui-router.min.js"></script>
  <script src="bower_components/ng-idle/angular-idle.min.js"></script>
    
    <link rel="stylesheet" type="text/css" href="views/components/bootstrap/dist/css/bootstrap.coop.css">
  	<link rel="stylesheet" type="text/css" href="views/components/font-awesome/css/font-awesome.min.css">
	<link href="bootstrap/css/bootstrap-datetimepicker.css" rel="stylesheet" media="screen">
    
	<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
    <script type="text/javascript" src="jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.columnsresize.js"></script> 
    <script type="text/javascript" src="jqwidgets/jqxdata.js"></script> 
    <script type="text/javascript" src="jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.pager.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.sort.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.filter.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.selection.js"></script> 
    <script type="text/javascript" src="jqwidgets/jqxangular.js"></script>
    
    
    <link href="bootstrap/css/bootstrap-toggle.min.css" rel="stylesheet">
	<script src="bootstrap/js/bootstrap-toggle.min.js"></script>

    <!-- overlay mail -->
    <link rel="stylesheet" type="text/css" href="assets/jquery-ui.css">
	<script type="text/javascript" src="assets/jquery-ui.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mail.css"></link>
	<script type="text/javascript">
		$('.fab').hover(function () {
	    $(this).toggleClass('active');
		});
		$(function () {
		  $('[data-tt="tooltip"]').tooltip()
		})
	</script>
    
    <!-- Angular loading bar js -->
  <link rel='stylesheet' href='bower_components/angular-loading-bar/build/loading-bar.min.css' type='text/css' />
  <script type='text/javascript' src='bower_components/angular-loading-bar/build/loading-bar.min.js'></script>
	
	<!-- Bootstrap table -->
	<link rel="stylesheet" href="bootstrap/css/bootstrap-table.css">
	<link rel="stylesheet" href="css/timeline.css">	
	
	<!-- bootstrap wysihtml5 - text editor -->
    <link href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />
		
  <script type="text/javascript" src="views/js/dashboard.min.js"></script>
  <script type="text/javascript" src="controllers/activityController.js"></script>
  <script type="text/javascript" src="views/js/services/mainService.js"></script>
  
  <script type="text/javascript" src="js/activitypagedata_cc.js"></script>

</head>
     <!-- END HEAD -->

     <!-- BEGIN BODY -->
<body ng-app="RDash" ng-controller="ActivityccCtrl">
<input type="hidden" value="<%= session.getAttribute("acc") %>" id="acc">
<input type="hidden" value="<%= session.getAttribute("cust") %>" id="cust">
<input type="hidden" value="<%= session.getAttribute("uname") %>" id="username">
<input type="hidden" value="<%= session.getAttribute("division") %>" id="dept">
<input type="hidden" value="<%= session.getAttribute("rights") %>" id="rights">

	<div class="row">
		<ul class="breadcrumb">
		    <li><a class="btn btn-link" onclick="close_window();return false;">Cancel</a></li>
		</ul>
		<div class="col-lg-12">
			<div class="col-lg-4">
                    <div class="panel panel-primary">
                        <div class="panel-body">
                        <div class="col-lg-12" style="text-align: center">
							<img class="img-circle" src="views/img/avatar.jpg" width="100" height="100">
						</div>
						<div style="text-align: center">
							  <p id="cardname">
							  </p>
						</div>
                            <ul class="profile-details">
								<li>
									<div><i class="fa fa-briefcase"></i> Position</div>
									
								</li>
								<li>
									<div><i class="fa fa-building-o"></i> Company</div>
									
								</li>
							</ul>
							<ul class="nav nav-tabs nav-justified">
								<li class="active"><a href="#contacts" data-toggle="tab"> Contacts</a></li>
								<li><a href="#customs" data-toggle="tab"> Other Details</a></li>
							</ul>
							<div class="tab-content">
                                <div class="tab-pane fade in active" id="contacts"> 
                                	<div class="panel-group" id="accordion">
                                		<div class="panel panel-primary">
                                			<div class="panel-heading">
									                <h4 class="panel-title">
									                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Customer Contacts</a>
									                </h4>
									         </div>
									         <div id="collapseOne" class="panel-collapse collapse in">
	                                			<div class="panel-body">
	                                				<ul class="profile-details">
																<li>
																	<div><i class="fa fa-phone"></i> Phone</div>
																	<p id="telnumber"></p>
																</li>
																<li>
																	<div><i class="fa fa-tablet"></i> Mobile phone</div>
																	<p id="mobile"></p>
																</li>
																<li>
																	<div><i class="fa fa-calendar"></i>DOB/Incorporation</div>
																	<p id="dob"></p>
																</li>
																<li>
																	<div><i class="fa fa-tablet"></i> National ID</div>
																	<p id="nationalid"></p>
																</li>
																<li>
																	<div><i class="fa fa-envelope"></i> E-mail</div>
																	<p id="email"></p>
																</li>
																<li>
																	<div><i class="fa fa-map-marker"></i> Address</div>
																	<p id="address"></p>
																	<p id="postcode"></p>
																</li>
																<li>
																	<div><i class="fa fa-user"></i> Collection Officer</div>
																	<p id="colofficer"></p>
																</li>
															</ul>
	                                			</div>
                                			</div>
                                		</div>
                                		<div class="panel panel-primary">
                                			<div class="panel-heading">
									                <h4 class="panel-title">
									                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseAcc">Account Information</a>
									                </h4>
									         </div>
									         <div id="collapseAcc" class="panel-collapse collapse">
									         		<div class="panel-body">
									         			<ul class="profile-details">
									         			<li>
																<div><i class="fa fa-user"></i> Card Number</div>
																<p id="cardnumber"></p>
															</li>
															<li>
																<div><i class="fa fa-user"></i> Account Number</div>
																<p id="accnumber"></p>
															</li>
															<li>
																<div><i class="fa fa-money"></i> Outstanding Balance</div>
																{{accdata[0].OUTBALANCE | number:0}}
															</li>
															<li>
																<div><i class="fa fa-calendar"></i> Months In Arrears</div>
																{{accdata[0].AGEINMONTHS | number:0}}
															</li>
															<li>
																<div><i class="fa fa-money"></i> Expected Amount</div>
																{{accdata[0].EXPPMNT | number:0}}
															</li>
															<li>
																<div><i class="fa fa-calendar"></i> Last Credit Date</div>
																{{accdata[0].LASTPAYMENTDATE }}
															</li>
															<li>
																<div><i class="fa fa-money"></i> RPCode</div>
																{{accdata[0].RPCODE}}
															</li>
															<li>
																<div><i class="fa fa-money"></i> Limit Amount</div>
																{{accdata[0].LIMIT| number:0}}
															</li>
															<li>
																<div><i class="fa fa-calendar"></i> Cycle</div>
																{{accdata[0].CYCLE}}
															</li>
															<li>
																<div><i class="fa fa-calendar"></i> Account Status</div>
																{{accdata[0].ACCOUNTSTATUS}}
															</li>
															<li>
																<div><i class="fa fa-calendar"></i> Date Disbursed</div>
																{{accdata[0].DATEDISBURSED}}
															</li>
															<li>
																<div><i class="fa fa-calendar"></i> Date Suspended</div>
																{{accdata[0].DATESUSPENDED}}
															</li>
														</ul>
									         		</div>
									         </div>
                                		</div>
                                		<div class="panel panel-primary">
									            <div class="panel-heading">
									                <h4 class="panel-title">
									                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Customer Information</a>
									                </h4>
									            </div>
									            <div id="collapseTwo" class="panel-collapse collapse">
									                <div class="panel-body">
									                <form>
															<div class="row">
																<div class="col-lg-10">
																	<ul class="profile-details">
																		<li>
																			<div><i class="fa fa-user-plus"></i> Employer Name</div>
																			<p id="MetaEmployer"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-venus"></i> Employment Status</div>
									                                            	<p id="MetaEmpstatus"></p>
																				        
																		</li>
																		<li>
																			<div><i class="fa fa-calendar"></i>DOB/Incorporation</div>
																			<p id="MetaDob"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-tablet"></i> Date of Employment</div>
																			<p id="MetaDoe"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-circle"></i> Marital Status</div>
																					<p id="MetaMarital"></p>
																				        
																		</li>
																		<li>
																			<div><i class="fa fa-phone"></i> Primary Phone number</div>
																			<p id="MetaPhone"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-envelope"></i> Email Address</div>
																			<p id="MetaEmail"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-money"></i> Net Salary</div>
																			<p id="MetaSalary"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-file-o"></i> File Number</div>
																			<p id="MetaFileno"></p>
																		</li>
																		<li>
																			<div><i class="fa fa-envelope-o"></i> Residential Address</div>
																					<p id="MetaResidential"></p>
																		</li>
																	</ul>
																</div>
																<div class="col-lg-2">
																	<div class="row">
																		<!--<div class="col-lg-6"><a href="" ng-click="refreshMeta()"><i class="fa fa-undo"></i></a></div>!-->
																		<div class="col-lg-6"><a href="" href="" data-toggle="modal" data-target="#metadatapop" ><i class="fa fa-pencil"></i></a></div>
																	<!--ng-click="editMeta()"!-->
																	</div>
																</div>
															</div>
														</form>
									                </div>
									            </div>
									        </div>
                                	</div>
                                </div>
	                             
	                            <div class="tab-pane fade in" id="customs" ng-controller="contactCtrl">
	                            <div align="right"><a href="" ng-click="contactsRefreshfnc()"><i class="{{refreshBtn}}"></i></a></div>
									<table class="table table-striped">
							            <thead>
							                <tr>
							                    <th class="col-md-10">Contact</th>
							                    <th>Action</th>
							                </tr>
							            </thead>
							            <tbody>
							                <tr ng-repeat="c in contactsData">
							                    <td class="col-md-10">{{c.CONTACT}}</td>
							                    <td>
							                        <button ng-click="edit(c.ID)" class="btn btn-xs btn-info"><i class="fa fa-pencil-square-o"></i></button>
							                        <button ng-click="delC(c.ID)" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button>
							                    </td>
							                </tr>
							            </tbody>
							        </table>
							        <div class="row" ng-show="addShow">
								        <form ng-submit="saveContact()">
								            <div class="form-group">
								                <input type="text" class="form-control" ng-model="dataContacts.contact" placeholder="Add contact here" required>
								            </div>
								            <button type="submit" class="btn btn-xs btn-primary">Add</button>
								        </form>
								    </div>
								    <div class="row" ng-show="editShow">
								        <form ng-submit="editContact()">
								            <div class="form-group">
								                <input type="text" class="form-control" ng-model="editContacts.contact">
								            </div>
								            <button ng-click="backCont()" type="button" class="btn btn-xs btn-danger">Cancel</button>
								            <button type="submit" class="btn btn-xs btn-primary">Edit</button>
								        </form>
								    </div>
								    <div class="row" ng-show="deleteShow">
								        <form ng-submit="deleteCont()">
								            <div class="form-group">
								                Delete Id: <input type="text" class="form-control" ng-model="delContacts.contact" ng-disabled=true>
								            </div>
								            <button ng-click="backCont()" type="button" class="btn btn-xs btn-primary">Cancel</button>
								            <button type="submit" class="btn btn-xs btn-danger">Delete</button>
								        </form>
								    </div>
	                            </div>
                            </div>
							
                        </div>
                    </div>
              </div>
              <div class="col-lg-8">
							<ul class="nav nav-tabs nav-justified">
                                <li class="active"><a href="#notes" data-toggle="tab"> Notes History <span class="label label-primary" id="notesHead"></span></a></li>
                                <li ng-controller="promisesCtrl"><a href="#promises" data-toggle="tab"> Promises Made <span class="label label-danger">{{ptpLength}}</span></a></li>
                                <li ng-controller="otherCtrl"><a href="#otherCards" data-toggle="tab"> Other Cards <span class="label label-success">{{otherLength}}</span></a></li>
                                <li><a href="#activity" data-toggle="tab"> Collector Action</a></li>
                            </ul>
                            <div class="tab-content">
                            			<div class="tab-pane fade in active" id="notes"> 
							    	<div class="row">
							    		<div align="center"><input id="note-toggle" type="checkbox" checked data-toggle="toggle" data-on="All Notes" data-off="Pinned" data-onstyle="success" data-offstyle="danger"></div>
										<div class="col-lg-12" style="min-height: 500; max-height: 750px;overflow-y: scroll;">
											<!--  <div align="right"><a href="" ng-click="notesRefreshfnc()" ng-disabled="showMe"><i class="{{refreshBtn}}"></i></a></div>-->
										    <ul class="timeline" id="notesnode"></ul>
										</div>
									</div>
							   	</div>
							   	<div class="tab-pane fade" id="otherCards" ng-controller="otherCtrl">
							    	<div class="row">
										<div class="col-lg-12">
											<table class="table table-striped header-fixed">
							    				<thead>
							    					<tr>
							    						<th>Card Account</th>
							    						<th>Card Number</th>
							    						<th>Card Name</th>
							    						<th>Outstanding Balance</th>
							    					</tr>
							    				</thead>
							    				<tbody>
							    						<tr ng-repeat="d in othercardData">
							    							<td>{{d.CARDACCT}}</td>	
							    							<td>{{d.CARDNUMBER}}</td>
							    							<td>{{d.CARDNAME}}</td>
							    							<td>{{d.OUTBALANCE | number:0}}</td>
							    						</tr> 	
							    				</tbody>
							    			</table>
										</div>
									</div>
							    </div>
							    <div class="tab-pane fade" id="promises" ng-controller="promisesCtrl">
							    	<div class="row">
										<div class="col-lg-12">
											<table class="table table-striped header-fixed">
							    				<thead>
							    					<tr>
							    						<th>Account#</th>
							    						<th>Promise Amount</th>
							    						<th>Promise Date</th>
							    						<th>Met?</th>
							    						<th>Collection Officer</th>
							    					</tr>
							    				</thead>
							    				<tbody>
							    						<tr ng-repeat="d in promiseData">
							    							<td>{{d.ACCNUMBER}}</td>	
							    							<td>{{d.PTPAMOUNT}}</td>
							    							<td>{{d.PTPDATE}}</td>
							    							<td>{{}}</td>
							    							<td>{{d.OWNER}}</td>	
							    						</tr> 	
							    				</tbody>
							    			</table>
										</div>
									</div>
							    </div>
                                <div class="tab-pane fade" id="activity">
                                    <form class="form-horizontal" data-toggle="validator"  ng-submit="addAction()">
                                    	<br>
										<div class="row">
											<div class="col-md-3">Collector Activity</div>
							                <div class="col-md-3">
												<div class="col-lg-12">
													<select class="form-control" id="action" ng-model="dataIn.action" required>
													  <option value="OC">Outgoing Call</option>
													  <option value="IC">Incoming Call</option>
													  <option value="MET">Debtor Visited</option>
													  <option value="REVW">Account Review</option>
													  <option value="SC">Sent Correspondence</option>
													  <option value="LR">Received Correspondence</option>
													  <option value="RR">Route for review</option>
													  <option value="OA">Assign Outside Agency</option>
													  <option value="RF">Receive File</option>
													  <option value="NFA">New File Allocation</option>
													  <option value="Invalid" selected>-- Select an Option --</option>
													</select>
												</div>
											</div>
							                <div class="col-md-3">Demand Letter</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<div class="input-group col-sm-12" data-link-field="dataIn.demand" ng-controller="Appctrl">
											         	<select class="form-control" id="demand" ng-model="dataIn.demand">
														  <option ng-repeat="letter in letters">{{letter.DEMAND}}</option>
														</select>
											     	</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-3">Party Contacted</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<select class="form-control" id="party" ng-model="dataIn.party" ng-disabled="partyinactive">
													  <option value="1">Account Holder</option>
													  <option value="2">No Answer</option>
													  <option value="3">Number not In Service</option>
													  <option value="4">Secondary AccountHolder</option>
													  <option value="5">Third Party</option>
													  <option value="6">Disconnected</option>
													  <option value="NA">Not Applicable</option>
													</select>
												</div>
											</div>
											<div class="col-md-3">Reason for Default</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<select class="form-control" id="reason" ng-model="dataIn.reason">
													  <option value="Hardship">Hardship</option>
													  <option value="Bankruptcy">Bankruptcy</option>
													  <option value="Death_In_family">Death in Family</option>
													  <option value="Deceased">Deceased</option>
													  <option value="Dispute">Dispute</option>
													  <option value="Divorce">Divorce</option>
													  <option value="Delay_in_proceeds">Delay in proceeds</option>
													  <option value="Diversion_of_proceeds">Diversion of proceeds</option>
													  <option value="Crop_failure">Crop failure</option>
													  <option value="AWOL">AWOL/Left employment</option>
													  <option value="Discharged">Discharged</option>
													  <option value="Dismissed">Dismissed</option>
													  <option value="Interdicted">Interdicted</option>
													  <option value="Left_Employment">Left Employment</option>
													  <option value="Resigned">Resigned</option>
													  <option value="Retired">Retired</option>
													  <option value="Retrenched">Retrenched</option>
													  <option value="Sacked">Sacked</option>
													  <option value="Self_Employed">Self Employed</option>
													  <option value="Summary_Dismissal">Summary Dismissal</option>
													  <option value="Suspended">Suspended</option>
													  <option value="Terminated">Terminated</option>
													  <option value="Business_Failure">Business Failure</option>
													  <option value="Business_Loss">Business Loss</option>
													</select>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-3">Promise to pay</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<select class="form-control" id="ptp" ng-model="dataIn.ptp" ng-disabled="ptpinactive">
													  <option value="Yes">Yes</option>
													  <option value="No" selected>No</option>
													</select>
												</div>
											</div>
											<div class="col-md-3">Route</div>
											<div class="col-md-3">
												<div class="col-lg-12">
							                        <select id="route" class="form-control" ng-model="dataIn.route">
													  <option ng-repeat="r in Reviewer">{{r.FNAME}}</option>
													</select>
							                    </div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-3">Promise Amount</div>
											<div class="col-md-3">
											    <div class="col-lg-12">
													<div class="input-group col-sm-12" >
											         	<input type="text" class="form-control" id="ptpamount" ng-model="dataIn.ptpamount" ng-disabled="inactive">
											         	<span class="input-group-addon"><a href="" data-toggle="modal" data-target="#multiptp">...</a></span>
											     	</div>
												</div>
											</div>
											<div class="col-md-3">CMD Status</div>
											<div class="col-md-3">
												<div class="col-lg-12">
							                        <select id="cmdstatus" class="form-control" ng-model="dataIn.cmdstatus" ng-controller="Appctrl">
													  <option ng-repeat="cmd in cmdstatus_src">{{cmd.VALUE}}</option>
													</select>
													<input id="txtcmdstatus" type="hidden" class="form-control"/>
							                    </div>
											</div>
										</div>
						                <div class="row">
						                	<div class="col-md-3">Promise Date</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<div class="input-group date form_date col-sm-12" data-date="" data-date-format="dd MM yyyy" data-link-field="ptpdate" data-link-format="dd-mm-yyyy">
											         	<input class="form-control" type="text" value="{{date | date:'yyyy-MM-dd'}}" ng-model="dataIn.ptpdate" ng-disabled="inactive">
														<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
											     	</div>
												</div>
											     <input type="hidden" id="ptpdate" ng-model="dataIn.ptpdate"/><br/>
											</div>
											<div class="col-md-3">Branch Status</div>
											<div class="col-md-3">
														<div class="col-lg-12">
									                        <select id="brstatus" class="form-control"  ng-model="dataIn.brstatus" ng-controller="Appctrl">
															  <option ng-repeat="br in brstatus_src" >{{br.VALUE}}</option>
															</select>
															<input id="brstatus" type="hidden" class="form-control"/>
									                    </div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-3">Payment Mode</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<select id="payMode" class="form-control" class="input-medium" ng-model="dataIn.paymode" ng-disabled="inactive">
													  <option value="Cash">Cash</option>
													  <option value="Cheque">Cheque</option>
													  <option value="Transfer">Transfer</option>
													  <option value="NA" selected>Not Applicable</option>
													</select>
												</div>
											</div>
											<div class="col-md-3">Account Curing Method</div>
											<div class="col-md-3">
												<div class="col-lg-12">
													<div class="input-group col-sm-12" data-link-field="dataIn.curing">
											         	<select class="form-control" id="curring" ng-model="dataIn.curing">
														  <option value="NOT">Not Updated</option>
														  <option value="REST">Restructure</option>
														  <option value="MERG">Loan Merging</option>
														  <option value="DCNH">Pay Date Change</option>
														  <option value="MORAT">Moratorium</option>
														  <option value="TAKEOVER">Take Over</option>
														  <option value="TOPUP">Top Ups</option>
														</select>
											     	</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-3">Review Date</div>
											<div class="col-md-3">
													<div class="col-lg-12">
														<div class="input-group date form_date col-lg-12" data-date-format="dd MM yyyy" data-link-field="reviewdate" data-link-format="dd-mm-yyyy">
												         	<input class="form-control" type="text" ng-model="dataIn.reviewdate">
															<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
												     	</div>
													</div>
													<input type="hidden" id="reviewdate" ng-model="dataIn.reviewdate"/><br/>
											</div>
										</div>
						                <div class="row">
											<div class="form-group col-lg-12">
								                <label >&nbsp;Collector Note</label>
								                <textarea class="form-control" rows="5" id="txtnote" data-maxlength="2000" ng-model="dataIn.notemade" required></textarea>
								                <span>{{2000 - dataIn.notemade.length}} Characters left</span>
								            </div>
										</div>
						                <div class="row">
						                	<div class="checkbox">
											  <!--  <label><input type="checkbox" ng-model="datax.imp">Important Note</label>-->
											  <input id="imp-toggle" type="checkbox" checked data-toggle="toggle" data-on="NO" data-off="PIN" data-onstyle="success" data-offstyle="danger">
											  <input id="impvalue" type="hidden" ng-model="dataIn.impvalue">
											</div>
											<br>
							            	<span class="pull-left">
												<button id="myButton" type="submit"  class="btn btn-primary" ng-disabled="mySwitch">{{submitHeader}}</button>
											</span>
							            </div>
						            </form>
						            <hr>
						            <div class="row">
										<span><i class="{{iconGenerate}}"></i></span><a href="" ng-show="showLetter" ng-click="generate(dataIn.demand)"> {{generatetitle}}: {{dataIn.demand}}</a>
										<form action="./DownloadFileServlet" id="myform">
											<input type="text" name="reportname" id="reportname" ng-model="letterSpolled">
										</form>
										<a target="_self" href="#" onclick="document.getElementById('myform').submit()" ng-show="showDownload">Download : {{letterSpolled}}</a>
									</div>
						            <div class="row">
						            	<div class="col-md-4"><span id="action_message">{{message}}</span></div>
						            </div>
						            <hr>
						            <div class="panel-group" id="accordion">
	                            		<div class="panel panel-primary">
	                            			<div class="panel-heading">
									                <h4 class="panel-title">
									                    <a data-toggle="collapse" data-parent="#accordion" href="#docs"> Documents Uploaded</a>
									                </h4>
									        </div>
									        <div id="docs" class="panel-collapse collapse in">
									        	<div class="panel-body">
									        		<ul ng-repeat="p in dataFiles">
									        			<li>
									        				<form action="./DownloadFile" id="dform">
									        					<input type="hidden" name="filename" id="filename" value="{{p.DESTPATH}}">
									        					<button class="btn btn-flat" type="submit">{{p.DOCDESC}}</button> | <small>{{p.COLOFFICER}}</small> | <small>{{p.STAGEDATE}}</small>
									        				</form>
									        				
									        			</li>
									        		</ul>
									        	</div>
									        </div>
	                            		</div>
	                            	</div>
                                </div>
                            </div>
		</div>
		</div>
		
	</div>
			<div class="row">
		        <div id="inbox">
		          <div class="fab btn-group show-on-hover dropup">
		              <div data-toggle="tooltip" data-placement="left" title="Compose" style="margin-left: 42px;">
				          <button type="button" class="btn btn-primary btn-io dropdown-toggle" data-toggle="dropdown">
				            <span class="fa-stack fa-2x">
				                <i class="fa fa-circle fa-stack-2x fab-backdrop"></i>
				                <i class="fa fa-plus fa-stack-1x fa-inverse fab-primary"></i>
				                <i class="fa fa-pencil fa-stack-1x fa-inverse fab-secondary"></i>
				            </span>
				          </button>
		          	</div>
		          <ul class="dropdown-menu dropdown-menu-right" role="menu">
		            <li ng-show="menu"><a href="#reallocate" role="button" data-toggle="modal" data-target="#reallocate" data-tt="tooltip" data-placement="left" title="Reallocate"><i class="fa fa-user"></i></a></li>
		            <li><a href="#emailconfirm" role="button" data-toggle="modal" data-target="#emailconfirm" data-tt="tooltip" data-placement="left" title="Send Email"><i class="fa fa-envelope-o"></i></a></li>
		            <li><a href="#sms" role="button" data-toggle="modal" data-target="#sms" data-tt="tooltip" data-placement="left" title="Send SMS"><i class="fa fa-comment"></i></a></li>
		            <li><a href="#upload" role="button" data-toggle="modal" data-target="#upload" data-tt="tooltip" data-placement="left" title="Upload File"><i class="fa fa-upload"></i></a></li>
		            <li><a href="#" data-tt="tooltip" data-placement="left" title="LiveChat"><i class="fa fa-comments-o"></i></a></li>
		          </ul>
		        </div>
		        </div>
			</div>
			
	<div class="row">
						<div class="col-lg-12">
         					<div class="modal fade" id="multiptp" tabindex="-1" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" >Multiple Promises</h4>
                                        </div>
                                        <div class="modal-body">
		                                        <div class="control-group" id="fields">
										            <div class="controls"> 
										                <form role="form" autocomplete="off">
										                	<input class="form-control" type="text" ng-model="ptp.acc">
										                    <div class="entry input-group col-xs-6">
										                        <input class="form-control" ng-model="ptp.amount" type="text" placeholder="Amount" />
										                        <input class="form-control" ng-model="ptp.date" type="text" placeholder="Date" />
										                    	<span class="input-group-btn">
										                            <button class="btn btn-success btn-add" type="button">
										                                <span class="glyphicon glyphicon-plus"></span>
										                            </button>
										                        </span>
										                    </div>
										                </form>
										            <br>
										            <small>Press <span class="glyphicon glyphicon-plus gs"></span> to add another form field</small>
										            </div>
										        </div>
                                            
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                            <a class="btn btn-default" href="#" role="button">Submit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>               
         				</div>
						<div class="col-lg-12">
         					<div class="modal fade" id="emailconfirm" tabindex="-1" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" >Send E-mail</h4>
                                        </div>
                                        <div class="modal-body">
                                        			<div class="box box-info">
										                <div class="box-header">
										                  
										                </div>
										                <div class="box-body">
										                  <form action="#" method="post">
										                    <div class="form-group">
										                      <input type="email" class="form-control" id="emailto" name="emailto" placeholder="Email to:" />
										                    </div>
										                    <div class="form-group">
										                      <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject" />
										                    </div>
										                    <div>
										                      <textarea id="emailtext" class="textarea" placeholder="Message" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
										                    </div>
										                  </form>
										                </div>
										                <div class="box-footer clearfix">
										                  <button class="pull-right btn btn-default" id="sendEmail">Send <i class="fa fa-arrow-circle-right"></i></button>
										                </div>
										              </div>
                                        </div>
                                        <div class="modal-footer">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>                
         				</div>
         				<div class="col-lg-12">
         					<div class="modal fade" id="metadatapop" tabindex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        	<button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Customer Information | Ammend</h4>
                                        </div>
                                        <div class="modal-body">
                                        	<form class="form-horizontal">
                                        		<div class="row">
                                        			<div class="form-group col-lg-6">
                                        				<label>Customer Number</label>
		                                            	<input class="form-control" id="custnumber"/>
                                        			</div>
                                        			<div class="form-group col-lg-6">
                                        				<label>Employment Status</label><br/>
		                                            	<select id="txtstatusedit" class="form-control">
													        <option value="Active">Active</option>
													        <option value="Reinstated after Suspension">Reinstated after Suspension</option>
													        <option value="Suspended">Suspended</option>
													        <option value="Summary Dismissal">Summary Dismissal</option>
													        <option value="Retrenched">Retrenched</option>
													        <option value="Retired">Retired</option>
													        <option value="Interdicted">Interdicted</option>
													        <option value="Resigned">Resigned</option>
													        <option value="Retrenched">Self-Employed</option>
													        <option value="AWOL">AWOL/ Left employment</option>
													        <option value="Sacked">Sacked</option>
													        <option value="Transferred">Transferred</option>
													    </select>
                                        			</div>
                                        		</div>
                                        		<div class="row">
                                        			<div class="form-group col-lg-6">
                                        				<label>Employer Name</label>
		                                            	<input id="txtemployeredit" class="form-control"/>
                                        			</div>
                                        			<div class="form-group col-lg-6">
                                        				<label>Date of Employment</label>
		                                            	<input id="txtdateempedit" class="form-control form_date2"/>
                                        			</div>
                                        		</div>
                                        		<div class="row">
                                        			<div class="form-group col-lg-6">
                                        				<label>Marital Status</label>
		                                            	<select id="txtmaritaledit" class="form-control">
													        <option value="Married">Married</option>
													        <option value="Single">Single</option>
													        <option value="Divorced">Divorced</option>
													        <option value="Widowed">Widowed</option>
													        <option value="Unknown">Unknown</option>
													    </select>
                                        			</div>
                                        			<div class="form-group col-lg-6">
                                        				<label>Residential Address</label>
		                                            	<select id="txtaddressedit" class="form-control">
													        <option value="Housed_by_employer">Housed by employer</option>
													        <option value="Owner">Owner</option>
													        <option value="Tenant">Tenant</option>
													        <option value="Living_with_Parents.">Living with Parents</option>
													    </select>
                                        			</div>
                                        		</div>
                                        		<div class="row">
                                        			<div class="form-group col-lg-6">
                                        				<label>Email Address</label>
		                                            	<input id="txtemailedit" class="form-control"/>
                                        			</div>
                                        			<div class="form-group col-lg-6">
                                        				<label>Primary Phone number</label>
		                                            	<input id="txtphoneedit" class="form-control"/>
                                        			</div>
                                        		</div>
                                        		<div class="row">
                                        			<div class="form-group col-lg-6">
                                        				<label>DOB/Incorporation</label>
		                                            	<input id="txtdobedit" class="form-control form_date2"/>
                                        			</div>
                                        			<div class="form-group col-lg-6">
                                        				<label>Net Salary</label>
		                                            	<input id="txtsalaryedit" class="form-control"/>
                                        			</div>
                                        		</div>
                                        		<div class="row">
                                        			<div class="form-group col-lg-6">
                                        				<label>File Number</label>
		                                            	<input id="txtfileno" class="form-control"/>
                                        			</div>
                                        			<div class="form-group col-lg-6">
                                        				
                                        			</div>
                                        		</div>
                                        	</form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" id="Add">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
         				</div>
          				<div class="col-lg-12">
         					<div class="modal fade" id="addcontact" tabindex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Add a Contact</h4>
                                        </div>
                                        <div class="modal-body">
	                                        <form role="form" ng-submit="AddContact()">
		                                        <div class="form-group">
		                                            <label>Contact Name</label>
		                                            <input class="form-control" ng-model="dataContacts.person" required/>
		                                        </div>
		                                        <div class="form-group">
		                                            <label>Contact Details</label>
		                                            <textarea ng-model="dataContacts.contact" class="form-control" rows="2" required></textarea>
		                                        </div>
		                                        <button class="btn btn-primary" type="submit">{{submitHeader}}</button>
	                                    	</form>
                                        </div>
                                        <div class="modal-footer">
                                            {{addcontactconfirm}}
                                        </div>
                                    </div>
                                </div>
                            </div>               
         				</div>
         			<div class="col-lg-12">
                        <div class="modal fade" id="sms" tabindex="-1" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Send SMS</h4>
                                        </div>
                                        <div class="modal-body">
                                        <form role="form" ng-submit="sendSMS()">
	                                        <div class="form-group">
	                                            <label>Mobile Number:</label>
	                                            <input class="form-control" ng-model="dataSms.smsNumber" required/>
	                                        </div>
	                                        <div class="form-group">
	                                        <label>Template:</label>
	                                            		<select id="txtmaritaledit" class="form-control" ng-model="dataSms.smsTemplate">
													        <option value="CARDS">CARDS</option>
													    </select>
	                                        </div>
	                                        <div class="form-group">
	                                            <label>SMS Message</label>
	                                            <textarea class="form-control" rows="3" ng-trim="false" maxlength="180" ng-model="dataSms.smsMessage" required id="smsMessage"></textarea>
	                                            <span>{{180 - dataSms.smsMessage.length}} Characters Left</span>
	                                        </div>
	                                        <div class="form-group">
	                                            <label>CallBack Number</label>
	                                            <textarea class="form-control" rows="1" ng-trim="false" maxlength="20" ng-model="dataSms.smsCallback" required id="smsCallback"></textarea>
	                                            <span>{{20 - dataSms.smsCallback.length}} Characters Left</span>
	                                        </div>
	                                        <button type="submit" class="btn btn-sm btn-primary" ng-disabled="mySwitch">{{submitHeader}}</button>
                                    	</form>
                                        </div>
                                        <div class="modal-footer">
                                            {{sendsmsconfirm}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="modal fade" id="reallocate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" >Re-Allocate this account</h4>
                                        </div>
                                        <div class="modal-body">
                                        <form role="form" ng-submit="reAllocatefunc()">
	                                        <div class="form-group">
	                                            <label>Current Officer</label>
	                                            <input id="owner" class="form-control" ng-model="Reall.owner" ng-disabled=true></input>
	                                        </div>
	                                        <div class="form-group">
	                                            <label>New Officer</label>
	                                            <select id="newofficer" class="form-control" ng-model="Reall.newofficer">
											        <option ng-repeat="c in colOfficer">{{c.USERNAME}}</option>
											    </select>
	                                        </div>
	                                        <button type="submit" class="btn btn-primary" >{{submitHeader}}</button>
                                    	</form>
                                        </div>
                                        <div class="modal-footer">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="modal fade" id="upload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Upload File</h4>
                                        </div>
                                        <div class="modal-body">
                                        	<form action="UploadServlet2" method="post" enctype="multipart/form-data">
                                        		<input class="form-control" id="uploadcust" name="uploadcust">
                                        		<input class="form-control" id="uploadacc" name="uploadacc">
                                        		<label>Document Type:</label>
	                                            		<select id="doctype" name="doctype" class="form-control" onchange="changeme()">
													        <option value="Other">Other</option>
													        <option value="DD1">Demand 1</option>
													        <option value="DD2">Demand 2</option>
													        <option value="DD3">Demand 3</option>
													    </select>
													    <label>Description:</label>
												<textarea class="form-control" rows="2" id="uploadnote" name="uploadnote" required></textarea><br />
												<input type="file" name="fileName"> <br>
												<input type="submit" class="btn btn-sm btn-success" value="Upload">
											</form>
                                        </div>
                                        <div class="modal-footer">
                                            {{confirmUpload}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-lg-12">
                        <div id="editNote" class="modal fade" role="dialog">
						  <div class="modal-dialog">
						    <!-- Modal content-->
						    <div class="modal-content">
						      <div class="modal-header">
						        <button type="button" class="close" data-dismiss="modal">&times;</button>
						        <h4 class="modal-title" id="editHeader">Edit Note</h4>
						      </div>
						      <div class="modal-body">
						        <form>
						        	<div class="form-group">
						        		<input class="form-control" id="noteId" />
						        	</div>
						        	<div class="form-group">
						        		<textarea class="form-control" rows="3" cols="75" id="editNoteMade"></textarea>
						        	</div>
						        	<button type="submit" class="btn btn-primary" id="AddNotefncbtn">Submit</button>
						        </form>
						      </div>
						      <div class="modal-footer">
						        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						      </div>
						    </div>
						
						  </div>
						</div>
                    </div>
	</div>
     <!-- GLOBAL SCRIPTS -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <!-- END GLOBAL SCRIPTS --> 
    
    <script type="text/javascript" src="bootstrap/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
    <!-- DATA TABES SCRIPT -->
    <script src="bootstrap/js/bootstrap-table.js"></script>
        
    <script type="text/javascript">
	$('.form_date').datetimepicker({
		format: 'dd-mm-yyyy',
		startDate: '-0d',
        language:  'en',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		daysOfWeekDisabled: [0,6],
		forceParse: 0
    });
	$('.form_date2').datetimepicker({
		format: 'dd-mm-yyyy',
        language:  'en',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
	

</script>
<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js" type="text/javascript"></script>
<script type="text/javascript">
    	function Editfnc(id,note){
			//console.log('note to be editted....'+note);
			//document.getElementById("noteId").innerHTML = id;
			document.getElementById("editNoteMade").value = note;
			document.getElementById("noteId").value = id;
		}
		$('#AddNotefncbtn').click(function(){
           		edit();
    	});
		function edit(){
		   var id = $('#noteId').val();
		   var note = $('#editNoteMade').val();
			$.ajax({
			        type: "POST",
			        url: "EditNote",
			        data: { 
			        		noteId : 	id,
			        		editNote : 	note
			          }
			      }).done(function( msg ) {
			        alert( "Note Updated" );
			        $('#editNote').modal('hide');
			});
		}
    </script>
   <script type="text/javascript">
   	$(function()
		{
		    $(document).on('click', '.btn-add', function(e)
		    {
		        e.preventDefault();
		        var controlForm = $('.controls form:first'),
		            currentEntry = $(this).parents('.entry:first'),
		            newEntry = $(currentEntry.clone()).appendTo(controlForm);
		
		        newEntry.find('input').val('');
		        controlForm.find('.entry:not(:last) .btn-add')
		            .removeClass('btn-add').addClass('btn-remove')
		            .removeClass('btn-success').addClass('btn-danger')
		            .html('<span class="glyphicon glyphicon-minus"></span>');
		    }).on('click', '.btn-remove', function(e)
		    {
				$(this).parents('.entry:first').remove();
				e.preventDefault();
				return false;
			});
		});
   </script>
   <script>
  $(function() {
  	var user= document.getElementById("username").value;
  	//var globalUrl = 'http://192.168.79.1:8080/ecolhome';
	//var globalUrl = 'http://192.168.0.51:7001/ecollect2';
	//var globalUrl = 'http://192.168.79.175/ecollect2';
	var globalUrl = 'http://172.16.204.59/ecollect2'
	
	var cust= document.getElementById("cust").value;
    $('#note-toggle').change(function() {
      if($(this).prop('checked')==true){
      	//console.log($(this).prop('checked'));
      	var path = globalUrl+'/api/v2/notes/'+cust;
      	loadNotes(path);
      }else{
      	//console.log($(this).prop('checked'));
      	var path2 = globalUrl+'/api/v2/pin_notes/'+cust;
      	loadNotes(path2);
      }
      
      function loadNotes(inurl){
      	//console.log('calling notes'+inurl);
      	$.ajax({
			type: 'GET',
	        url: inurl,
	        success: function(data) {
	        	 $('#notesnode').empty();
	        	 document.getElementById("notesHead").innerHTML = data.length;
                 $.each(data, function(i,item){
                	 if(user==item.OWNER && item.DAYPAST==0){
                		 var ul = $('#notesnode');
                    	 var li = $("<li>");
                    	 var i = $('<i>',{'class':'fa fa-envelope'});
                    	 var i1 = $('<i>',{'class':'fa fa-clock-o'});
                    	 var span = $('<span>',{'class':'time'}).text(" "+item.NOTEDATE);
                    	 var div = $('<div>', {'class': 'timeline-item'}).append(span);
                    	 
                    	 var small = $('<small>').text(item.NOTESRC);
                    	 var h3 = $('<h3>',{'class':'timeline-header'}).append(small);
                    	 var a1 = $("<a>",{'href': '#'}).text(item.OWNER+" ");
                    	 
                    	 var div2 = $('<div>', {'class': 'timeline-body'}).text(item.NOTEMADE);
                    	 var i2 = $('<i>',{'class':'fa fa-thumb-tack fa-rotate-270'});
                    	 var edit = $('<i>',{'class':'fa fa-pencil'});
                    	 //var a2 = $("<button>",{'href':'','data-toggle':'modal','data-target':'editnote'}).append(edit);
                    	 var a2 = $("<button>",{'data-toggle':'modal','data-target':'#editNote','class': 'btn btn-default btn-xs','onClick': 'Editfnc('+item.ID+','+item.ID+')'}).append(edit);
                    	 var div3 = $('<div>', {'class': 'timeline-footer'}).append(a2);
                    	 
                    	 span.prepend(i1);
                    	 h3.prepend(a1);
                    	 div.append(h3);
                    	 div.append(div2);
                    	 div.append(div3);
                    	 li.append(i);
                    	 li.append(div);
                    	 
                    	 ul.append(li);
                	 }else{
                		 //console.log('Locked');
                		 var ul = $('#notesnode');
                    	 var li = $("<li>");
                    	 var i = $('<i>',{'class':'fa fa-envelope'});
                    	 var i1 = $('<i>',{'class':'fa fa-clock-o'});
                    	 var span = $('<span>',{'class':'time'}).text(" "+item.NOTEDATE);
                    	 var div = $('<div>', {'class': 'timeline-item'}).append(span);
                    	 
                    	 var small = $('<small>').text(item.NOTESRC);
                    	 var h3 = $('<h3>',{'class':'timeline-header'}).append(small);
                    	 var a1 = $("<a>",{'href': '#'}).text(item.OWNER+" ");
                    	 
                    	 var div2 = $('<div>', {'class': 'timeline-body'}).text(item.NOTEMADE);
                    	 var i2 = $('<i>',{'class':'fa fa-thumb-tack fa-rotate-270'});
                    	 //var edit = $('<i>',{'class':'fa fa-pencil'});
                    	 //var a2 = $("<a>",{'href':'#','id':item.ID}).append(edit);
                    	 //var div3 = $('<div>', {'class': 'timeline-footer'}).append(a2);
                    	 
                    	 span.prepend(i1);
                    	 h3.prepend(a1);
                    	 div.append(h3);
                    	 div.append(div2);
                    	 //div.append(div3);
                    	 li.append(i);
                    	 li.append(div);
                    	 
                    	 ul.append(li);
                	 }
                 })
	        }
		})
      }
    })
    //
    $('#imp-toggle').change(function() {
    	       	if($(this).prop('checked')==true){
    	         		//console.log($(this).prop('checked'));
    	         		document.getElementById("impvalue").value = "N";
    	   	    }else{
    	   	      	//console.log($(this).prop('checked'));
    	   	      	document.getElementById("impvalue").value = "Y";
    	   	    }
    }) 
  })
</script>
<script>
	function changeme(){
	var e = document.getElementById("doctype");
	var strUser = e.options[e.selectedIndex].value;
	//var strUser = $("#doctype").val();
	
		//console.log(strUser);
		document.getElementById("uploadnote").value = strUser;
	}
	
	//close
	function close_window() {
	  if (confirm("Close Window?")) {
	    close();
	  }
	}
</script>
</body>
     <!-- END BODY -->
</html>
