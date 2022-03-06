var generateBtn = document.querySelector('#generate');

// Assignment code here
function generatePassword() {
  // --------------- Declare all necessary parameter for creating the password
  // Declare all criteria's in one object to keep it simple
  var parameters = {
    // Create a separate array for each parameter using the .split method
    // The .split method cleans up the code and is more efficient
    lettersLower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    lettersUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    numbers: '0123456789'.split(''),
    symbols: '!@#$%*()_+-=?/'.split(''),
  };

  var tempReqs = [false, false, false, false];

  // --------------- Extract conditional data (num-of-chars, special-chars and etc.)
  // Extract the value from the number of characters input
  var numOfChar = document.getElementById('numOfChar').value;

  // Extract the value from the checkboxes
  // If checkbox has been checked, convert the boolean to true
  var specialChars = document.getElementById('special-chars');
  specialChars.checked ? (tempReqs[0] = true) : '';

  var lowerChar = document.getElementById('lower-char');
  lowerChar.checked ? (tempReqs[1] = true) : '';

  var upperChar = document.getElementById('upper-char');
  upperChar.checked ? (tempReqs[2] = true) : '';

  var numericVal = document.getElementById('numeric-val');
  numericVal.checked ? (tempReqs[3] = true) : '';

  // --------------- Create the password
  var password = '4322';

  // --------------- Check final password and write to HTML element
  if (
    tempReqs[0] == false &&
    tempReqs[1] == false &&
    tempReqs[2] == false &&
    tempReqs[3] == false &&
    numOfChar == ''
  ) {
    alert('Please use at least one criteria and fill in character count.');
  } else if (
    (tempReqs[0] == false &&
      tempReqs[1] == false &&
      tempReqs[2] == false &&
      tempReqs[3] == false &&
      numOfChar > 128) ||
    (tempReqs[0] == false &&
      tempReqs[1] == false &&
      tempReqs[2] == false &&
      tempReqs[3] == false &&
      numOfChar < 8)
  ) {
    alert(
      'Please use at least one criteria and choose a valid character count between 8 and 128'
    );
  } else if (
    tempReqs[0] == false &&
    tempReqs[1] == false &&
    tempReqs[2] == false &&
    tempReqs[3] == false
  ) {
    alert('Please use at least one criteria.');
  } else if (numOfChar < 8 || numOfChar > 128) {
    alert('Please type a valid character count between 8 and 128');
  } else {
    // Get references to the #generate element
    var passwordText = document.querySelector('#password');
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', () => {
  generatePassword();
});

/*
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
*/
