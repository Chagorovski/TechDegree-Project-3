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

/******************************************************************
  Updating the color field and hidding it together with color label
*******************************************************************/ 

$colorField.hide();
$colorLabel.hide();

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
        $("#color option[value='gold']").show();;
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
const $crediCard = $('option[value="Credit Card"]')
const $payPal = $('#paypal').hide();
const $bitCoin = $('#bitcoin').hide();
$('#credit-card').hide();

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