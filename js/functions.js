var zone_home;
var zone_focus;
var zone_portfolio;
var zone_team;
var zone_contact;
var stickyHeight;


function isMobileDevice(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
        (navigator.platform.indexOf("Android") != -1)
    );
}

$(function() {

  $('.fancybox').fancybox();
  
  // set variables
  stickyHeight = $("#nav").outerHeight();

  stickyHeightAdjusted = $("#nav").outerHeight() + 9;

  if(isMobileDevice()){
    stickyHeightAdjusted+=21;
    $("#header, #consultancy").addClass("mobile");
  }
  
  /*var top;
  zone_home = 0;
  zone_focus = $("#consultancy").offset().top-stickyHeightAdjusted;
  zone_portfolio = $("#bespoke").offset().top-stickyHeightAdjusted;  
  zone_team = $("#note").offset().top-stickyHeightAdjusted;
  zone_contact = $("#contact").offset().top-stickyHeightAdjusted;
  */


  if (isMobileDevice()) {
    $("#header, #consultancy, #mobile_nav").addClass("mobile");
  }

  var $this = $(this),
  pos   = $this.scrollTop();
  scrollZone(pos);

	// Start Doc ready
	$window = $(window);

    $(window).scroll(function() {
        if(!isMobileDevice()){
          parallax("#header","#fg");
        }
        var $this = $(this),
        pos   = $this.scrollTop();
        scrollZone(pos);
    }); 	


    $('#portfolio #startups .col .border').each(function(){

      	var bgobj = $(this).data("bg");
      	if (bgobj) {
      		bgobj = "url('" + bgobj + "')";
      		$(this).css("background-image",bgobj);
      		
      	}
    }); 

    $( "#portfolio #startups .col" ).hover(
      function() {
        // show overlay
        if(!isMobileDevice()){
          $(this).find(".overlay").fadeToggle( 100, "linear" );
        } else {
          $(this).find(".overlay").show();
        }
        
      }, function() {
        // hide overlay
        if(!isMobileDevice()){
          $(this).find(".overlay").fadeToggle( 100, "linear" );
        } else {
          $(this).find(".overlay").hide();
        }
      }
    );

    $( "#portfolio #startups .overlay" ).click(function(){
      var href= $(this).find('a').attr("href");
      if (href) {
        window.open(href,'_blank');
      }
    });

    $( "#portfolio #startups .overlay a" ).click(function(event){
      event.preventDefault();
    });

    $("#full_nav a").click(function (event) {
        var url = $(this).attr("href");
        //anchor link
        if(url.slice(0, 1) == "#"){
            if(event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
          smoothScroll(this);
        }
      });

     $("#full_nav a").hover(function(){
        if(!isMobileDevice()){
          $(this).addClass('hover');
        }
     }, function(){
        if(!isMobileDevice()){
          $(this).removeClass('hover');
        }
     });

    $("#mobile_nav a").on("click",function (event) {
      var url = $(this).attr("href");
      //anchor link
      if(url.slice(0, 1) == "#"){
          if(event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
          smoothScroll(this);
          closeMobileNav();
      };
    });    


    $(window).resize(function(){
      //setHeight("#nav");
    }).resize(); 

    $(".read_more").click(function(event) {
      event.preventDefault();
      // hide ellipsis
      $(this).prevAll(".ellipsis").hide();
      // hide this
      $(this).hide()
      // show more
      $(this).prev(".more").slideToggle(2000);
    })

    $("#mobile_nav_toggle").click(function(){
      if ($("#mobile_nav").hasClass("show")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }

    });

	// End Doc Ready
});


// Parallax: pass in selectors for background and foreground elements
function parallax(background, foreground) {
        var yForeground = -($window.scrollTop() / 5);
        var yBackground = -($window.scrollTop() / 10);
        $(foreground).css("top",yForeground); 
        var xy = "center " + yBackground + "px";
        $(background).css("background-position",xy);
}

// Smooth Scroller: pass in selector of element to scroll to 
function smoothScroll(target) {
  var target = target.hash,
  $target = $(target);
  $("html, body").stop().animate({
      "scrollTop": ($target.offset().top-stickyHeight+2)
  }, 900, "swing", function () {

  });
}

function setHeight(target, header, footer) {
  var windowHeight = $(window).height();

  if (header) {
    var headerHeight = $(header).outerHeight();  
  } else {
    var headerHeight = 0;
  }

  if (footer) {
    var footerHeight = $(footer).outerHeight();  
  } else {
    var footerHeight = 0;
  }

  targetHeight = windowHeight - headerHeight - footerHeight;
  $(target).css('height',targetHeight + 'px');
}

function scrollZone(current_scroll) {

    if (current_scroll < zone_focus) {
      selectLink("home");
    }
    if (current_scroll >= zone_focus && current_scroll < zone_portfolio) {
      selectLink("focus");
    }  
    if (current_scroll >= zone_portfolio && current_scroll < zone_team) {
      selectLink("portfolio");
    }  
    if (current_scroll >= zone_team && current_scroll < zone_contact) {
      selectLink("team");
    }  
    if (current_scroll >= zone_contact) {
      selectLink("contact");
    }

}


function selectLink(target) {
  $("#full_nav a").removeClass("active");
  var link_target = "#full_nav a.link_"+target;
  $(link_target).addClass("active");
}

function openMobileNav() {
  $("#mobile_nav").slideDown(250, function() {
    $(this).addClass("show");
  });
  $("#mobile_nav_toggle").addClass("active");
}

function closeMobileNav() {
  $("#mobile_nav").slideUp(250, function() {
    $(this).removeClass("show");
  });
  $("#mobile_nav_toggle").removeClass("active");
}