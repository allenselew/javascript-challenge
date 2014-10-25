"use strict";

//Listens for the DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', function() {
	// Loads the state selects into the state dropdown
	var signupForm = document.getElementById('signup');
	var stateDropdown = signupForm.elements['state'];
	var stateOption;
	var idx;
	for (idx = 0; idx < usStates.length; ++idx) {
		stateOption = document.createElement('option');
		stateOption.innerHTML = usStates[idx].name;
		stateOption.setAttribute("value", usStates[idx].code);
		stateDropdown.appendChild(stateOption);
	}
	//Hide/Shows the Occupation Other Input
	document.getElementById('occupation').addEventListener('change', function() {
		var occupationSelected = signupForm.elements['occupation'].value;
		if (occupationSelected === 'other') {
			signupForm.elements['occupationOther'].style.display = "block";
		}
	});
	//Confirm the "No Thanks" Button
	document.getElementById('cancelButton').addEventListener('click', function() {
		var leaving = window.confirm("You are about to leave this page.");
		if (leaving) {
			window.location = "http://google.com";
		}
	});
	//Validate the Form Before Submit
	document.getElementById('signup').addEventListener('submit', onSubmit);

	var validity = true;
	function onSubmit(eventObject) {
		try {
			validity = validate(this);
		} catch (exception) {
			console.log(exception);
			validity = false;
		}
		if (!validity && eventObject.preventDefault) {
	        eventObject.preventDefault();
	    }
	    eventObject.returnValue = validity;
		return eventObject.returnValue;
	}

	function validate(form) {
		var reqFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
		if (signupForm.elements['occupation'].value === 'other') {
			reqFields.push('occupationOther');
		}
		var reqFieldsIdx;
		for (reqFieldsIdx = 0; reqFieldsIdx < reqFields.length; ++reqFieldsIdx) {
			validity &= validateReqField(signupForm.elements[reqFields[reqFieldsIdx]]);
		}
		validity &= validateZip(signupForm.elements['zip']);
		validity &= validateDOB(signupForm.elements['birthdate']);
		return validity;
	}

	function validateZip(zip) {
		var zipRegularExpression = new RegExp('^\\d{5}$');
		var zipValid = zipRegularExpression.test(zip.value);
		showFormValidity(zipValid, zip);
		return zipValid;
	}

	function validateDOB(dob) {
		var today = new Date();
	    var dateOfBirth = new Date(dob.value);
	    var yearsDiff = today.getFullYear() - dateOfBirth.getUTCFullYear();
	    var monthsDiff = today.getMonth() - dateOfBirth.getUTCMonth();
	    var daysDiff = today.getDate() - dateOfBirth.getUTCDate();
	    if (monthsDiff < 0 || (0 === monthsDiff && daysDiff < 0)) { 
	        yearsDiff--;
	    }
	    var dobValid = false;
	    if (yearsDiff >= 13) {
	    	dobValid = true;
	    	document.getElementById('birthdateMessage').style.display = 'none';
	    } else {
	    	document.getElementById('birthdateMessage').innerHTML = 'You must be at least 13 years old to sign up.';
	    }
	    showFormValidity(dobValid, birthdate);
	    return dobValid;
	}

	function showFormValidity(truthful, field) {
		if (truthful) {
			field.className = 'form-control';
		} else {
			field.className = 'form-control invalid-field';
		}
	}

	function validateReqField(field) {
	 	var trimmedInput = field.value.trim();
	 	var valid = false;
	 	if (trimmedInput.length > 0) {
	 		valid = true;
	 	}
	 	showFormValidity(valid, field);
	 	return valid;
	}
});