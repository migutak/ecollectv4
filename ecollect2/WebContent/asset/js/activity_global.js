var custnumber = getParameterByName('custnumber');
var username = getParameterByName('username');
var accnumber = getParameterByName('accnumber');
var gusername = getParameterByName('username');

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

console.log('global username _from_ activity ===', gusername);
console.log('global accnumber _from_ activity ===', accnumber);
console.log('global custnumber _from_ activity ===', custnumber);