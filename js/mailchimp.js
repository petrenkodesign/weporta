function sendanswer($form) {
  $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      data: $form.serialize(),
      cache       : false,
      dataType    : 'json',
      contentType: "application/json; charset=utf-8",
      error       : function(err) {
        $(".alert span").html("Could not connect to the server! Please ");
        $(".alert a").html("try again");
        $(".alert a").attr("href", "#ctaform");
        $(".alert i").html(" later.");
        $(".alert").addClass("show");
      },
      success     : function(data) {
          if (data.result != "success") {
            $(".alert span").html("Form sent! We will contact you shortly.");
            $(".alert a").html("");
            $(".alert a").attr("href", "#");
            $(".alert i").html("");
            $(".alert").addClass("show");
          } else {
            $(".alert span").html("Error! Can`t sent ");
            $(".alert a").html("form");
            $(".alert a").attr("href", "#ctaform");
            $(".alert i").html(". Please try again later.");
            $(".alert").addClass("show");
          }
      }
  });
}
