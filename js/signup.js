/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener('DOMContentLoaded', function() {
	var state-dropdown = document.getElementsbyName('state');
	var state-option;
	var signupForm = document.getElementbyId('signup');
	var idx;
	for (idx = 0; idx < usStates.length; ++idx) {
		state-option = document.createElement('option');
		state-option.innerHTML = usStates[idx].name;
		state-option.value = usStates[idx].value;
		state-dropdown.appendChild(state-option);
	}
});