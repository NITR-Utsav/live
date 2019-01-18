
    
    'use strict'; 
    
    // Links Add Active Class 

    //$('.links li').click(function () {
        
      //  $(this).addClass('active').siblings().removeClass('active'); 
         
    //});
    
    // Smooth Scroll To Div
    
    $('#features').mouseenter(function () {
        
        $('html, body').animate({
            
            scrollTop: $('#features1').offset().top
            
        }, 2000);
        
    }); 


     $('#portfolio').mouseenter(function () {
        
        $('html, body').animate({
            
            scrollTop: $('#portfolio1').offset().top
            
        }, 2000);
        
    }); 


     $('#home').mouseenter(function () {
        
        $('html, body').animate({
            
            scrollTop: $('#home1').offset().top
            
        }, 2000);
        
    }); 


   $('#pages').mouseenter(function () {
        
        $('html, body').animate({
            
            scrollTop: $('#pages1').offset().top
            
        }, 2000);
        
    }); 

   $('#contact1').mouseenter(function () {
        
        $('html, body').animate({
            
            scrollTop: $('#contact2').offset().top
            
        }, 2000);
        
    }); 






