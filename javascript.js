//declare variables
var newPassword = "";
var myform = document.forms.myform;
var invalidLengthText = document.getElementById("invalidLength");
var invalidSelection = document.getElementById("invalidSelection");
var lowercaseCheckbox = myform.lowercase;
var uppercaseCheckbox = myform.uppercase;
var numbersCheckbox = myform.numbers;
var specialCheckbox = myform.special;
var passLength = myform.length.value;
var passLower = myform.lowercase.checked;
var passUpper = myform.uppercase.checked;
var passNum = myform.numbers.checked;
var passSpec = myform.special.checked;


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
//function to convert ascii number to character
function convertToString(number){
    result = String.fromCharCode(number);
    return result;
};

// function to randomly select character type to add to password and randomly select a character of that type
function randomCharGenerator(passwordLength){
    for (var i = 0; i < passwordLength; i++){
        var randomArrayIndex = 0;
        randomArrayIndex = Math.floor(Math.random() * 4);
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
    };
    return newPassword;
};

//generate password, runs when button clicked
function genPassword(){
    // reset variables if user makes a new input
    lowercaseCheckbox = myform.lowercase;
    uppercaseCheckbox = myform.uppercase;
    numbersCheckbox = myform.numbers;
    specialCheckbox = myform.special;
    newPassword = "";
    passLength = myform.length.value;
    passLower = myform.lowercase.checked;
    passUpper = myform.uppercase.checked;
    passNum = myform.numbers.checked;
    passSpec = myform.special.checked;

    console.log(`passLower = ${passLower}`);
    console.log(`passNum = ${passNum}`);
    console.log(`passUpper = ${passUpper}`);
    console.log(`passSpec = ${passSpec}`);

    //variables to check if password contains character type
    var containsNumber = false;
    var containsSpecial = false;
    var containsLower = false;
    var containsUpper = false;
    // variables to confirm the users input is valid
    var lengthInvalid = false;
    var charsInvalid = false;

   
    // this will run if user enters a invalid length
    //warning text and red box shadow will appear if invalid
    if (passLength < 8 || passLength > 128){
        lengthInvalid = true;
        myform.length.style.boxShadow = "0 0 0 0.2rem rgba(252, 60, 46, 0.774)";
        invalidLengthText.style.display="block";
        console.log("length invalid");
    } else {
        // if password is valid don't display warning
        myform.length.style.boxShadow = "none";
        invalidLengthText.style.display="none";
    };

    //if user doesn't select any character types
    if (passLower===false && passUpper===false && passNum===false && passSpec===false){
        charsInvalid = true;
        invalidSelection.style.display = "block";
        lowercaseCheckbox.style.boxShadow = "0 0 0 0.2rem rgba(252, 60, 46, 0.774)";
        uppercaseCheckbox.style.boxShadow = "0 0 0 0.2rem rgba(252, 60, 46, 0.774)";
        numbersCheckbox.style.boxShadow = "0 0 0 0.2rem rgba(252, 60, 46, 0.774)";
        specialCheckbox.style.boxShadow = "0 0 0 0.2rem rgba(252, 60, 46, 0.774)";
        console.log("type selection invalid");
    } else {                
        invalidSelection.style.display = "none";
        lowercaseCheckbox.style.boxShadow = "none";
        uppercaseCheckbox.style.boxShadow = "none";
        numbersCheckbox.style.boxShadow = "none";
        specialCheckbox.style.boxShadow = "none";
    };
        
    //if the user fills in the form correctly generate a password    
    if (charsInvalid===false && lengthInvalid===false){
        newPassword = randomCharGenerator(passLength);
        console.log(`password after first run = ${newPassword}`);
    } else {
        // if the user doesn't make a valid input stop the function
        return;
    }

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
    };

    console.log(`missing types: 
    containsNumber = ${containsNumber}
    containsSpecail = ${containsSpecial}
    containsUpper = ${containsUpper}
    containsLower = ${containsLower}`);

    // check if all the selected types are included in the generated password
    if (    (containsLower===false && passLower===true) 
        || (containsUpper===false && passUpper===true)
        || (containsNumber===false && passNum===true)
        || (containsSpecial===false && passSpec===true)){
        console.log("ran generator again");
        // if a selected type is missing, run the function again
        genPassword();
    } else {
        // if the generated password meets are the requirements show it on the page
        document.getElementById("password-is").style.display= "block";
        document.getElementById('password-output').innerHTML= newPassword;
    }
};

// function to copy the password to the users clipboard
function copyPassword() {
/* Get the password being displayed */
var copyText = document.getElementById("password-output").innerHTML;
// copy the password to clip board
navigator.clipboard.writeText(copyText);
/* Alert the copied text */
alert(`${copyText} added to clipboard`);
}      
