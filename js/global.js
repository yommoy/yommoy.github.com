
$(document).ready(function() {

    var play = 0;
    $(".music").bind("click",function() {
        var audio = $("#audio")[0];
        if(play == 0) {
            audio.pause();
            $(".music").removeClass("audioPlay").addClass("audioPaused").attr("src","images/musicClose.png");
            play = 1;
        } else {
            audio.play();
            $(".music").removeClass("audioPaused").addClass("audioPlay").attr("src","images/musicOpen.png");
            play = 0;
        }
    })

    //焦点获取滑动
    $(".menu>a").each(function() {
        $(this).bind("click",function() {
            var idName = $(this).attr("scroll");
            var scrolTop = $("#"+idName).offset().top;
            $("body,html").animate({ scrollTop: scrolTop },600,"swing");   
            if(idName == "section_3") {
                $("#section_3 .timeLine .experience").addClass("active");
                $("#section_3 .timeLine svg g ellipse").addClass("active");         
            } else {
                $("#section_3 .timeLine .experience").removeClass("active");
                $("#section_3 .timeLine .lineLoad").removeClass("active");
            }
        })
    })
})