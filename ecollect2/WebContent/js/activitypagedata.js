/**
 * 
 * 
 */

		
$(document).ready(function() {
	//var globalUrl =	'http://192.168.79.1:8080/ecolhome';
	//var globalUrl = 'http://192.168.0.51:7001/ecollect_test';
	//var globalUrl = 'http://192.168.79.175/ecollect2';
	var globalUrl = 'http://172.16.204.59/ecollect2'
		
	var cust= document.getElementById("cust").value;
	var acc= document.getElementById("acc").value;
	var dept= document.getElementById("dept").value;
	var user= document.getElementById("username").value;
	document.getElementById("uploadcust").value=cust;
	document.getElementById("uploadacc").value=acc
	//console.log('dept is....'+dept);
	$.ajax({
		type: 'GET',
        url: globalUrl+'/api/v2/accountinfo/'+acc,
        success: function(data) {
        	//console.log(data);
        	document.getElementById("firstname").innerHTML = data[0].FIRSTNAME;
        	document.getElementById("telnumber").innerHTML = data[0].TELNUMBER;
        	document.getElementById("dob").innerHTML = data[0].DOB;
        	document.getElementById("nationalid").innerHTML = data[0].NATIONID;
        	document.getElementById("email").innerHTML = data[0].EMAIL;
        	document.getElementById("address").innerHTML = data[0].ADDRESSLINE1;
        	document.getElementById("postcode").innerHTML = data[0].POSTCODE;
        	document.getElementById("colofficer").innerHTML = data[0].COLOFFICER;
        	document.getElementById("branch").innerHTML = data[0].BRANCHNAME;
        }
	})
	
	  $("#emailtext").wysihtml5();
		
		
		if(dept!=="CMD"){
			document.getElementById("cmdstatus").disabled = true;
			document.getElementById("brstatus").disabled = true;
			document.getElementById("smsMessage").disabled = true;
		}else{
			document.getElementById("cmdstatus").disabled = false;
			document.getElementById("brstatus").disabled = false;
			document.getElementById("smsMessage").disabled = false;
		}
		
		
		$.ajax({
			type: 'GET',
	        url: globalUrl+'/api/v2/notes/'+cust,
	        success: function(data) {
	        	//console.log(data[0].DAYPAST);
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
                    	 
                    	 var small = $('<small>').text(item.NOTESRC+" on acc: "+item.ACCNUMBER);
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
                    	 
                    	 var small = $('<small>').text(item.NOTESRC+" on acc: "+item.ACCNUMBER);
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
		
	$.ajax({
        type: 'GET',
        url: globalUrl+'/api/v2/meta/'+cust,
        success: function(data) {
        	document.getElementById("custnumber").value = cust;
        	document.getElementById("MetaEmployer").innerHTML = data[0].EMPLOYER;
        	document.getElementById("MetaDob").innerHTML = data[0].DOB
        	document.getElementById("MetaDoe").innerHTML = data[0].DOE
        	document.getElementById("MetaMarital").innerHTML = data[0].MARITAL
        	document.getElementById("MetaPhone").innerHTML = data[0].PHONE
        	document.getElementById("MetaSalary").innerHTML = data[0].SALARY
        	document.getElementById("MetaResidential").innerHTML = data[0].RESIDENTIAL
        	document.getElementById("MetaFileno").innerHTML = data[0].FILENO
        	document.getElementById("MetaEmpstatus").innerHTML = data[0].EMPSTATUS
        	document.getElementById("MetaEmail").innerHTML = data[0].EMAIL
     //   	
     
     		document.getElementById("txtemployeredit").value = data[0].EMPLOYER;
        	document.getElementById("txtdobedit").value = data[0].DOB
        	document.getElementById("txtdateempedit").value = data[0].DOE
        	document.getElementById("txtmaritaledit").value = data[0].MARITAL
        	document.getElementById("txtphoneedit").value = data[0].PHONE
        	document.getElementById("txtsalaryedit").value = data[0].SALARY
        	document.getElementById("txtaddressedit").value = data[0].RESIDENTIAL
        	document.getElementById("txtfileno").value = data[0].FILENO
        	document.getElementById("txtstatusedit").value = data[0].EMPSTATUS
        	document.getElementById("txtemailedit").value = data[0].EMAIL
        	
        	document.getElementById("emailto").value = data[0].EMAIL
        	
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert('Timeout contacting server..');
        }
        });
        $('#Add').click(function(){
           		sendData();
    	});
    	
    	function sendData(){
		   var custnumber = $('#custnumber').val();
		   var txtemployeredit = $('#txtemployeredit').val();
		   var txtdobedit = $('#txtdobedit').val();
		   var txtdateempedit = $('#txtdateempedit').val();
		   var txtmaritaledit = $('#txtmaritaledit').val();
		   var txtphoneedit = $('#txtphoneedit').val();
		   var txtsalaryedit = $('#txtsalaryedit').val();
		   var txtaddressedit = $('#txtaddressedit').val();
		   var txtfileno = $('#txtfileno').val();
		   var txtstatusedit = $('#txtstatusedit').val();
		   var txtemailedit = $('#txtemailedit').val();
		    $.ajax({
		        type: "POST",
		        url: "Meta",
		        data: { 
		        		custnumber : 		custnumber,
		        		txtemployeredit : 	txtemployeredit,
		        		txtdobedit : 		txtdobedit,
		        		txtdateempedit : 	txtdateempedit,
		        		txtmaritaledit : 	txtmaritaledit,
		        		txtphoneedit : 		txtphoneedit,
		        		txtaddressedit : 	txtaddressedit,
		        		txtfileno : 		txtfileno,
		        		txtstatusedit : 	txtstatusedit,
		        		txtemailedit : 		txtemailedit,
		        		txtsalaryedit : 	txtsalaryedit
		          }
		      }).done(function( msg ) {
		        alert( "Data Updated" );
		        $('#metadatapop').modal('hide');
		      });
		}
    	
    	$('#sendEmail').click(function(){
    		sendEmail();
		});
		
		function sendEmail(){
		   var emailaddress = $('#emailto').val();
		   var emailmessage = $('#emailtext').val();
		   var emailsubject = $('#subject').val();
		   var username = $('#username').val();
		   var cust = $('#cust').val();
		    $.ajax({
		        type: "POST",
		        url: "SendEmail",
		        data: { 
		        		emailaddress : 	emailaddress,
		        		emailmessage : 	emailmessage,
		        		emailsubject : 	emailsubject,
		        		username : 	username,
		        		cust : 	cust
		          }
		      }).done(function(msg) {
		        alert( "Email Sent" );
		      });
		}
	})