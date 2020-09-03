        
var myform = document.forms.myform;

        //declare variables
        var newPassword = "";
        var passLength = myform.length.value;
        var passLower = myform.lowercase.checked;
        var passUpper = myform.uppercase.checked;
        var passNum = myform.numbers.checked;
        var passSpec = myform.special.checked;
        var typeCount = 0;
        

//functions to get random character of selected type using ascii character numbers
function genRandNum() {
  var min = Math.ceil(48);
  var max = Math.floor(57);
  return Math.floor(Math.random() * (max - min + 1) + min); 
};
function genRandSpecial() {
  var min = Math.ceil(33);
  var max = Math.floor(47);
  return Math.floor(Math.random() * (max - min + 1) + min); 
};
function genRandUpper() {
  var min = Math.ceil(65);
  var max = Math.floor(90);
  return Math.floor(Math.random() * (max - min + 1) + min); 
};
function genRandLower() {
  var min = Math.ceil(97);
  var max = Math.floor(122);
  return Math.floor(Math.random() * (max - min + 1) + min); 
};
//function to convert ascii number to ascii character
function convertToString(number){
    result = String.fromCharCode(number);
    return result;
};

// function to randomly select character type to add to password and randomly select a character of that type
    function randomCharGenerator(passwordLength){
        for (var i = 0; i < passwordLength; i++){
                var randomArrayIndex = 0;
                randomArrayIndex = Math.floor(Math.random() * 3);
                if (randomArrayIndex === 0 && passNum === true){
                    newPassword = newPassword + convertToString(genRandNum());
                } else if (randomArrayIndex === 1 && passLower === true){
                    newPassword = newPassword + convertToString(genRandLower());
                } else if (randomArrayIndex === 2 && passUpper === true){
                    newPassword = newPassword + convertToString(genRandUpper());
                } else if (randomArrayIndex === 3 && passSpec === true){
                    newPassword = newPassword + convertToString(genRandSpecial());
                    //if randomArrayIndex randomly selects a type that isnt selected run loop again
                } else if ((randomArrayIndex === 0 && passNum !== true) || (randomArrayIndex === 1 && passLower !== true) || (randomArrayIndex === 2 && passUpper !== true) || (randomArrayIndex === 3 && passSpec !== true)){
                        i--;
                } 
            }
    }
//generate password, runs when button clicked
        function genPassword(){
            //variables to check if password contains character type
            var containsNumber = false;
            var containsSpecial = false;
            var containsLower = false;
            var containsUpper = false;
            // variables to confirm the users input is valid
            var lengthInvalid = false;
            var charsInvalid = false;

            //user enters password length
            //will loop until password length is valid
           
                // this will run if user enters a invalid length
                if (passLength < 8 || passLength > 128){
                    lengthInvalid = true;
                    myform.length.style.boxShadow = "0 0 0 0.2rem rgba(252, 60, 46, 0.774)";
                    myform.passwordHelpBlock.style.display="block";
                };

            //user selects character types
            //runs until one character type is selected
            while (passLower===false && passUpper===false && passNum===false && passSpec===false){
                //run function to get types
                if (!charsInvalid){
                    getTypes();
                };
                //if user doesn't select any character types
                if (passLower===false && passUpper===false && passNum===false && passSpec===false){
                    alert("please select at least 1 character type");
                    getTypes();
                    charsInvalid = true;
                };
            };
                
            //calculate the number of types selected
            if (passLower){
                typeCount++;
            } if (passNum){
                typeCount++;
            } if (passUpper){
                typeCount++;
            } if (passSpec){
                typeCount++;
            }
            
            //randomly select type and randomly select character within that type
            // loop stops before the desired password length to make sure the generated password contains at 
            // least one of each selected character type
            randomCharGenerator(passLength - typeCount);

            // check all selected types are included in password
            for (var i = 0; i < newPassword.length; i ++){
                //convert password string to number
                var number = newPassword.charCodeAt(i);
                if (number <= 57 && number >= 48){
                    containsNumber = true;
                } else if (number >= 33 && number <=47){
                    containsSpecial = true;
                } else if (number >= 65 && number <=90){
                    containsUpper = true;
                } else if (number >= 97 && number <=122){
                    containsLower = true;
                } 
            }

            // insert any missing types
            if (containsNumber === false && passNum === true){
                newPassword = newPassword + convertToString(genRandNum());
            } if (containsLower === false && passLower === true){
                newPassword = newPassword + convertToString(genRandLower());
            } if (containsUpper === false && passUpper === true){
                newPassword = newPassword + convertToString(genRandUpper());
            } if (containsSpecial === false && passSpec === true){
                newPassword = newPassword + convertToString(genRandSpecial());
            }
            //calculate characters still needed
            var missingChars = passLength - newPassword.length;
            //run character generator loop again to fill in any missing digits
            randomCharGenerator(missingChars);

            //add password to html
            document.getElementById("password-is").style.display= "block";
            document.getElementById("password-output").innerHTML= newPassword;
        }