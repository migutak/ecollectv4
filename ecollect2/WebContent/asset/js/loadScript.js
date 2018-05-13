$(document).ready(function(){
	
	var globalUrl = "https://jsonplaceholder.typicode.com";
	//var globalUrl = urladdress;
	
	var cust= custnumber;//document.getElementById("cust").value;
	var acc= accnumber;//document.getElementById("acc").value;
	var user= document.getElementById("s_in_username").value;
    var dept= document.getElementById("s_in_division").value;
    
	/*$.ajax({
		type: 'GET',
        url: globalUrl+'/api/v2/accountinfo/' + accnumber,
        //url: globalUrl+'/users',
        success: function(data) {
        	//console.log(data);
        	if(data.length > 0){
        	document.getElementById("firstname").innerHTML = data[0].FIRSTNAME;
        	document.getElementById("telnumber").innerHTML = data[0].TELNUMBER;
        	document.getElementById("addressline").innerHTML = data[0].ADDRESSLINE1;
        		//document.getElementById("firstname").innerHTML = data[0].name;
            	//document.getElementById("telnumber").innerHTML = data[0].phone;
            	//document.getElementById("addressline").innerHTML = data[0].email;
        	} else{
        		console.log('no data returned by /api/v2/accountinfo/' + acc);
        	}
        }
	})*/
	
	//retrieve facilities
	
})