// function to check validity of user input
function chkMandatory(key){
	if (key == 1){
		if(document.getElementById("iName").value == ""){
			// alert message if validation not pass
			alert("Please enter your name.")
		}else{
			// alert message to represent form submit
			alert("Form succesfully submitted.")
		}
	} else if(key == 2){
		if(isNaN(document.getElementById("iAge").value) || document.getElementById("iAge").value < 1 || document.getElementById("iAge").value=="")
		{
			// alert message if validation not pass
			alert("Please enter integer more than 0.")
		}else(
			// alert message to represent form submit
			alert("Form succesfully submitted.")
		)
	}
}

// show avaiable model for sell
function showModel(){
	var fAvail_Model = document.getElementById('Available_Model');
	fAvail_Model.innerHTML = '';

	//set available Model in array
	var arr_Samsung_model = ["Samsung Galaxy S20","Samsung Galaxy A51"];
	var arr_iPhone_model = ["iPhone7","iPhone8","iPhone8 plus"];

	// create <select> tag
	var phoneModel = document.createElement("select");
	phoneModel.id = "sel_phoneModel";

	if(document.getElementsByName('vMobile')[0].value == 'Samsung')
	{
		// append <select> tag in <span>
		fAvail_Model.appendChild(phoneModel);

		// loop pre-defined Samsumg model in an array
		for (var i = 0; i < arr_Samsung_model.length; i++) {
			// create <option> tag 
		    var option = document.createElement("option");
			// assign value to <option>
		    option.value = arr_Samsung_model[i];
			// assign text to <option>
		    option.text = arr_Samsung_model[i];
			// append <option> tag in <select>
		    phoneModel.appendChild(option);
		}
	}else if (document.getElementsByName('vMobile')[0].value == 'iPhone'){
		fAvail_Model.appendChild(phoneModel);

		// loop pre-defined iPhone model in an array
		for (var i = 0; i < arr_iPhone_model.length; i++) {
			// create <option> tag 
		    var option = document.createElement("option");
			// assign value to <option>
		    option.value = arr_iPhone_model[i];
			// assign text to <option>
		    option.text = arr_iPhone_model[i];
		    // append <option> tag in <select>
		    phoneModel.appendChild(option);
		}
	}
}

/* 
	remove css to show difference of layout with and without css
*/
function removecss(){
	$('link[href="css/styles.css"]').prop('disabled', true);
	$('link[href="css/styles_demonstration.css"]').prop('disabled', true);
}

//set global variable for stoping function
var func_interval;
var counter;

function removeData(){
	// clear populated data in table
	$("#coronavirus-table > tbody:last").children().remove();
}

function loadCovidData(cnt) {
	//call function to remove data in table
	removeData();
	$("#coronavirus-table > tbody").append("<tr id=loadimg><td colspan=8 align=center><img src='images/loading-gif.gif' height=20px width=200px></td></tr>");
	//Call ajax
	var xhttp = new XMLHttpRequest();

	if(cnt <= 0){
		if(func_interval)
			clearInterval(func_interval);
	}

	xhttp.onreadystatechange = function() {
		try{
			//status code =200 mean Success
			if (this.readyState == 4 && this.status == 200) {
				//assign response of ajax request to variable jsonresult
				var jsonresult = JSON.parse(this.responseText)
				//remove loading gif
				$("#loadimg").remove();
				//pass json result to populate into table
				populateCovidData(jsonresult);
			}
		} catch (e){
			console.warn("Failed to load.")
		}
	};
	xhttp.open("GET", "https://coronavirus-tracker-api.herokuapp.com/v2/locations", true);
	xhttp.setRequestHeader("Content-Type","application/json");
	xhttp.send();
}

// call ajax at specified interval
function loadCovidDataWTime(cnt2){
	counter = cnt2;
	//call loadCovidData() every 5 seconds
 	func_interval = setInterval(function(){ 
 		counter--;
		//use counter to limit to 5 times call
		loadCovidData(counter);
		console.log(counter);
	}, 5000);
}

// call ajax at specified interval
function showUserAction(actiontype){
	if(actiontype == 1){
		$("#TableMsg").text('Fetch Data');
	}
	else if (actiontype == 2){
		$("#TableMsg").text('Fetch Data Periodically. Please wait. Ajax run every 5 seconds for 5 times.');
	}
	else if (actiontype == 3){
		$("#TableMsg").text('Clear Data');
	}
}

function populateCovidData(json)
{
	var cnt=0;
	json.locations.forEach((row, index) => 
	{	
		//populate retrieved data into table
		if(row.country == 'Australia'){
			cnt++;
			$("#coronavirus-table > tbody").append("<tr></tr>");
			$("#coronavirus-table tr:last").append("<td>"+ cnt +"</td>");
			$("#coronavirus-table tr:last").append("<td>"+ row.country +"</td>");
			$("#coronavirus-table tr:last").append("<td>"+ row.country_population +"</td>");
			$("#coronavirus-table tr:last").append("<td>"+ row.province +"</td>");

			$("#coronavirus-table tr:last").append("<td>"+ row.last_updated +"</td>");
			$("#coronavirus-table tr:last").append("<td>"+ row.latest.confirmed +"</td>");
			$("#coronavirus-table tr:last").append("<td>"+ row.latest.deaths +"</td>");
			$("#coronavirus-table tr:last").append("<td>"+ row.latest.recovered +"</td>");
		}
	});
}

function calculate()
{
	//field value set to 0 if not pass the validation
	//only allow number format to be fill in this field
	if(document.getElementsByName('aVal1')[0].value == "" || isNaN(document.getElementsByName('aVal1')[0].value)){
		alert('Please enter integer value');
		document.getElementsByName('aVal1')[0].value = 0;
	}else if (document.getElementsByName('aVal2')[0].value == "" || isNaN(document.getElementsByName('aVal2')[0].value)){
		alert('Please enter integer value');
		document.getElementsByName('aVal2')[0].value = 0;
	}

	var vVal1 = document.getElementsByName('aVal1')[0].value;
	var vVal2 = document.getElementsByName('aVal2')[0].value;
	// sum up and display the total of input fields
	document.getElementById('showtotal').innerHTML = parseFloat(vVal1) + parseFloat(vVal2);
}

//function to show javascript able to change css
function ChangeCss(){
	if(document.getElementById('chg_css_color').value != '')
		document.getElementById('showcss').style.color =  document.getElementById('chg_css_color').value;
	if(document.getElementById('chg_css_type').value != '')
	document.getElementById('showcss').style.fontFamily = document.getElementById('chg_css_type').value;
}