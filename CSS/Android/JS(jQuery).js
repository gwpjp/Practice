


$(document).ready(function(){

    $("body").fadeTo(2000,1);

    $("h4").hover(function(){
        $(this).css("color" , "orange");
      },
      function(){
        $(this).css("color", "rgb(35, 201, 245)");
      }
    );

    $(".caption").click(function(){
      $("h4").fadeTo(2000, .5);
    })

    $(".caption").dblclick(function(){
      $("h4").fadeTo("fast", 1);
    })

    $(".l_android").click(function(){
      $(".l_android .pupil").animate({height: "12px",width: "12px",
        borderRadius: "6px", margin: "4px", "background": "red"}, 2000)
        .css({"background":"rgb(184, 33, 47)", height: "12px",width: "12px",
          borderRadius: "6px", margin: "4px"});
    });

    $(".r_android").click(function(){
      $(".l_android .pupil").stop();
    });


    $(".l_android").mouseleave(function(){
      $(".l_android .pupil").css("background", "rgb(71, 97, 79)");
    });

    $(".caption h4").click(function(){
      $(".caption p").slideToggle("slow");
    });

    $("#userName").blur(function(){
      var name = $("#userName").val();
      $("#userRespond").text("Hello " + name + "!");
    })
});
