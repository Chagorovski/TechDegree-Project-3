/********************************************************************************************************** 
 Project 3 - Interactive Form 
 
 In this project, is used JavaScript to enhance an interactive registration form for a fictional conference.
 Using the supplied HTML and CSS files from Treehouse, I have added my own JavaScript to make the form more
 user-friendly.In this project is used jQuery library.  
***********************************************************************************************************/

/****************
 Global varible(s)
*****************/
const $otherTitle =  $("#other-title");
const $designField = $('#design');
const $colorField = $('#color');
const $colorLabel = $('#colors-js-puns label');
const $totalActivityLabel = $('<span></span>').css('color','darkred'); 

/*******************************
 Focus method to the firs input
********************************/
$('#name').focus();
 
/*******************************
  Hiding the 'Other' input field
********************************/
$otherTitle.css('display', 'none'); 

/*************************************************************
  Side down or up effect if 'Other' job role is selected or not
 *************************************************************/
$("#title").change(function() {  
    if ($('#title').val() == "other") {   
        $otherTitle.slideDown(900);
    } else {
        $otherTitle.slideUp();
    }
  }
);

/***********************************************************************************
  Updating the color field and hidding it together with color label and Select Theme
************************************************************************************/ 

$colorField.hide();
$colorLabel.hide();
$('#design option:first').attr('hidden',true);

/******************************************************** 
  Listening for change in the #design 'select' element
  and if the right theme is selected we show the colors
*********************************************************/
$designField.change(() => {
    $colorField.prepend(new Option("Please select a Theme","select-color"));
    if ($designField.val() === 'js puns')  {
        $colorField.show();
        $colorLabel.show();
        $("#color option[value='cornflowerblue']").prop('selected', true);
        $("#color option[value='select-color']").hide();
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").show(); 
        $("#color option[value='darkslategrey']").show();
        $("#color option[value='gold']").show();
    }else if ($designField.val() === 'heart js') {
        $colorField.show();
        $colorLabel.show();
        $("#color option[value='tomato']").prop('selected', true);
        $("#color option[value='select-color']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
    } else {
        $colorField.show();
        $colorLabel.show();
        $("#color option[value='select-color']").prop('selected', true);
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
    }
});

/********************************** 
  Register for Activities- section
***********************************/
$('.activities').append($totalActivityLabel);
let $totalActivityCost = 0;

// Calculating the the selected activities
$('.activities').change((event) => {
    let $clickedInputElement = $(event.target);
    let $getDataCosts = $clickedInputElement.attr('data-cost');
    let $stringToNumber = $getDataCosts.replace(/\D/g,'');
    
    if ($clickedInputElement.is(':checked')) {
        let calculate = parseInt($stringToNumber,10);
        $totalActivityCost = $totalActivityCost + calculate;
        $totalActivityLabel.show();
    }else {
        let calculate = parseInt($stringToNumber,10);
        $totalActivityCost = $totalActivityCost - calculate;
        $totalActivityLabel.show();
    };
// Adding the total price <span> and hidding when the cost is 0
    $totalActivityLabel.text('Total: $' + $totalActivityCost);

    if ($totalActivityLabel.text() === 'Total: $0') {
        $totalActivityLabel.hide();
    };

    let $dayAndTime = $clickedInputElement.attr('data-day-and-time');
    
// Disabling conflicting activities
    $('.activities input').each(function() {
      const $justClickedActivity = $(this);
      if ($justClickedActivity.attr('data-day-and-time') === $dayAndTime && $clickedInputElement != $justClickedActivity ) {
        if ($clickedInputElement.prop('checked') === true) {
            $justClickedActivity.attr('disabled',true);
            $clickedInputElement.attr('disabled',false);
        }else {
            $justClickedActivity.attr('disabled',false);
            $clickedInputElement.attr('disabled',false);
        }
      }
    })
});

/***************** 
  Payment Section
******************/
const $hideSelectPayment = $('option[value="select method"]').hide();
const $paymentInfo = $('#payment');
const $crediCard = $('option[value="Credit Card"]');
const $payPal = $('#paypal').hide();
const $bitCoin = $('#bitcoin').hide();
$crediCard.attr('selected',true);

$paymentInfo.change(() => {
  if($paymentInfo.val() === 'Credit Card') {
      $crediCard.attr('selected',true);
      $('#credit-card').show();
      $payPal.hide();
      $bitCoin.hide();
  }else if ($paymentInfo.val() === 'PayPal') {
      $('option[value="PayPal"]').attr('selected',true);
      $('#credit-card').hide();
      $payPal.show();
      $bitCoin.hide();
  }else if ($paymentInfo.val() === 'Bitcoin') {
      $('option[value="Bitcoin"]').attr('selected',true);
      $('#credit-card').hide();
      $payPal.hide();
      $bitCoin.show();
  }
});

/**************************************** 
  Form Validation and Validation Messages
*****************************************/
// Error messages
var $nameErrorMsg = $('<label></label>').css('color','red');
var $emailErrorMsg = $('<label></label>').css('color','red');
var $activityErrorMsg = $('<label></label>').css('color','red');
var $ccErrorMsg = $('<label></label>').css('color','red');
var $zipErrorMsg = $('<label></label>').css('color','red');
var $cvvErrorMsg = $('<label></label>').css('color','red');

// Hiding the error messages
$nameErrorMsg.hide();
$emailErrorMsg.hide();
$activityErrorMsg.hide();
$ccErrorMsg.hide();
$zipErrorMsg.hide();
$cvvErrorMsg.hide();
 
// Performing focusout on the inputs
$('#name').focusout(function () {
  validateName();
});
$('#mail').focusout(function () {
  validateEmail();
});
$('#cc-num').focusout(function () {
  validateCreditCard();
});
$('#zip').focusout(function () {
  validateZip();
});
$('#cvv').focusout(function () {
  validateCVV();
});

// Name can't be blank and should contain only characters
function validateName() {
  var pattern = /^[a-zA-Z]*$/;
  var fname = $("#name").val();
  $('#name').after($nameErrorMsg);

  if (pattern.test(fname) && fname !== '') {
      $nameErrorMsg.hide();
      $("#name").css("border-bottom","2px solid #34F458");
      return false;
  } else if (fname === ''){
      $nameErrorMsg.html("Name field can't be blank");
      $nameErrorMsg.show();
      $("#name").css("border-bottom","2px solid #F90A0A");
  } else {
      $nameErrorMsg.html("Name should contain only Characters");
      $nameErrorMsg.show();
      $("#name").css("border-bottom","2px solid #F90A0A");
      return true;
  }
};

// Email schould have proper format
function validateEmail() {
  var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $("#mail").val();
  $('#mail').after($emailErrorMsg);

  if (pattern.test(email) && email !== '') {
      $emailErrorMsg.hide();
      $("#mail").css("border-bottom","2px solid #34F458");
      return false;
  } else if (email === ''){
      $emailErrorMsg.html("Email field is blank");
      $emailErrorMsg.show();
      $("#mail").css("border-bottom","2px solid #F90A0A");
  } else {
      $emailErrorMsg.html("Invalid Email Format");
      $emailErrorMsg.show();
      $("#mail").css("border-bottom","2px solid #F90A0A");
      return true;
  }
};

// Activity validation if user don't check any field
function validateActivity () {
  $('.activities').append($activityErrorMsg);

  if ($('.activities input[type=checkbox]:checked').length === 0) {
      $activityErrorMsg.html('You have to choose at least one activity');
      $activityErrorMsg.show();
      return false;
  } else {
      $activityErrorMsg.hide();
      return true;
  }
};

// Credit Card validatioon user should type 13-16 digits
function validateCreditCard() {
  var pattern = /^[0-9]{13,16}$/;
  var cCard = $("#cc-num").val();
  $('#cc-num').after($ccErrorMsg);

  if (pattern.test(cCard) && cCard !== '') {
      $ccErrorMsg.hide();
      $("#cc-num").css("border-bottom","2px solid #34F458");
      return false;
  } else if (cCard === ''){
      $ccErrorMsg.html("Insert Card Number");
      $ccErrorMsg.show();
      $("#cc-num").css("border-bottom","2px solid #F90A0A");
  } else {
      $ccErrorMsg.html("Insert minimum 13 numbers");
      $ccErrorMsg.show();
      $("#cc-num").css("border-bottom","2px solid #F90A0A");
      return true;
  }
}; 

// Zip code Validation if the Credic Card payment is selected
function validateZip() {
  var pattern = /^[0-9]{5}$/;
  var zipCode = $("#zip").val();
  $('#zip').after($zipErrorMsg);
  if ($crediCard.prop('selected')) {
    if (pattern.test(zipCode) && zipCode !== '') {
        $zipErrorMsg.hide();
        $("#zip").css("border-bottom","2px solid #34F458");
        return false;
    } else if (zipCode === ''){
        $zipErrorMsg.html("Insert Zip Code");
        $zipErrorMsg.show();
        $("#zip").css("border-bottom","2px solid #F90A0A");
    } else {
        $zipErrorMsg.html("Insert 5 digits");
        $zipErrorMsg.show();
        $("#zip").css("border-bottom","2px solid #F90A0A");
        return true;
    }
  };
};

// Cvv Validation,field should contain 3 numbers
function validateCVV() {
  var pattern = /^[0-9]{3}$/;
  var cvvCode = $("#cvv").val();
  $('#cvv').after($cvvErrorMsg);
  if ($crediCard.prop('selected')) {
    if (pattern.test(cvvCode) && cvvCode !== '') {
        $cvvErrorMsg.hide();
        $("#cvv").css("border-bottom","2px solid #34F458");
        return false;
    } else if (cvvCode === ''){
        $cvvErrorMsg.html("Insert CVV Code");
        $cvvErrorMsg.show();
        $("#cvv").css("border-bottom","2px solid #F90A0A");
    } else {
        $cvvErrorMsg.html("Insert 3 digits");
        $cvvErrorMsg.show();
        $("#cvv").css("border-bottom","2px solid #F90A0A");
        return true;
    }
  };
};

/***************************************************************** 
  Form Event Checks that each field has the correct information
  If the form has empty fields can't submit,and registration fails
******************************************************************/
$('form').on('submit', function (e){
  if (validateName() === false || validateEmail() === false || validateActivity() === false || validateCreditCard() === false || validateCVV() === false || validateZip() === false) {
      e.preventDefault();
      validateName();
      validateEmail();
      validateActivity();
      validateCreditCard();
      validateZip();
      validateCVV();
      alert('Registration not accepted'); 
  } else {
      alert("Registration accepted");
  }
});