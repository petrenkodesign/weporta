
$( document ).ready(function() {

    // Services animation control
    $("#services .row div").hover(
      function () {
        $(this).find(".btn").show();
      }
    );
    $("#services .row div").mouseleave(
      function () {
        $(this).find(".btn").hide();
      }
    );

    // Control button of prima form
    $('a[href*=\\#]').on('click',
      function(e){
        var hash = e.currentTarget.hash;
        if(hash=='#prev' || hash=='#next') {
          next_form(hash);
        }
        else {
          e.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
        }
      }
    );

    $(".carousel-indicators li").click(
      function() {
        next_slide(this);
      }
    );

    // testimonials select timer
    setInterval(function() {
      var tmp = $("#testimonials .active").next();
      if(tmp.attr("data-slide-to") == undefined) {
        tmp = $("#testimonials .carousel-indicators li")[0];
      }
      next_slide(tmp);
    }, 6000);

    //Prima form collect data and sending form to mailchimp, look mailchimp.js
    $('#ctaform form button[type="submit"]').click(function ( event ) {
           if ( event ) event.preventDefault();

           var $form = $('#ctaform form');
           var num = $form[0].length;
           // console.log($form);
           for( var i=0; i<num; i++) {
             if($form[0][i].type!="hidden" || $form[0][i].type!="submit") {
               if($form[0][i].required && $form[0][i].validationMessage) {

                 $(".alert span").html($form[0][i].validationMessage+" - ");
                 $(".alert a").html($form[0][i].title);

                 $(".alert i").html("");
                 $(".alert a").click(function(e) {
                   if ( e ) e.preventDefault();
                   var qnum = parseInt($("#ctaform .bar s").text());

                   $("#ctaform form .d-md-block").addClass("d-none");
                   $("#ctaform form .d-md-block").removeClass("d-md-block");

                   chform(i+1);

                   $("#ctaform .bar span").html(i+1);

                   if((i+1)<qnum) $("#ctaform a[href*=\\#next]").removeClass("disabled");
                   if((i+1)==1) $("#ctaform a[href*=\\#prev]").addClass("disabled");
                 });

                 $(".alert").addClass("show");
                 // console.log(i);
                 return;
               }
             }
           }
           // sendanswer($form);
          $('#ctaform form').submit();
       });

       $(".alert").click(function(){ $(this).removeClass("show"); });

       $('#ctaform').keypress(function(e) {
         if (e.which == 13) {
           e.preventDefault();
           var point = parseInt($("#ctaform .bar span").text());
           if(point<7) next_form('#next');
           else $('#ctaform form').submit();
         }
       });
});

// Testimonials slider
function next_slide(e) {
  var tmp = $("#testimonials .content .d-md-block" )[0];
  $("#testimonials").find(tmp).removeClass("d-md-block");
  $("#testimonials").find(tmp).addClass("d-none");

  var tmp = $("#testimonials .active" )[0];
  $("#testimonials").find(tmp).removeClass("active");

  var dst = $(e).attr("data-slide-to");
  $(e).addClass("active");
  $("#testimonials .col-lg-5:nth-child("+dst+")").removeClass("d-none");
  $("#testimonials .col-lg-5:nth-child("+dst+")").addClass("d-md-block");
}

//Switch by inputs fields of prima form
function next_form(hash) {
  var point = parseInt($("#ctaform .bar span").text());
  var lpoint = parseInt($("#ctaform .bar s").text());
  var npoint = 1;

  if(hash=='#next') {
    npoint = point+1;
  }
  else if(point!=1) {
    npoint = point-1;
  }

  if(lpoint == npoint) {
    $("#ctaform button[type=submit]").removeClass("d-none");
    $("#ctaform a[href*=\\#next]").addClass("disabled");
  }
  if(npoint == (lpoint-1)) {
    $("#ctaform button[type=submit]").addClass("d-none");
    $("#ctaform a[href*=\\#next]").removeClass("disabled");
  }
  if(npoint == 1) $("#ctaform a[href*=\\#prev]").addClass("disabled");
  else $("#ctaform a[href*=\\#prev]").removeClass("disabled");

  chform(point, 'delete');

  $("#ctaform .bar span").html(npoint);

  chform(npoint);

}

//Control switch form input tags
function chform(p, state) {
  if(state=='delete') {
    $("#ctaform .formpoint:nth-child("+p+")").addClass("d-none");
    $("#ctaform .formpoint:nth-child("+p+")").removeClass("d-md-block");
  } else {
    $("#ctaform .formpoint:nth-child("+p+")").removeClass("d-none");
    $("#ctaform .formpoint:nth-child("+p+")").addClass("d-md-block");
  }
}

// Scroll to top button appear
$(document).scroll(function() {
  var scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
});
