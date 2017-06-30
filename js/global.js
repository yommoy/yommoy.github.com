
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

    //获取菜单距离左边的位置，保持居中
    $(".menu").css("left",function() {
        var menuW =  $(this).width();
        var bodyW = $(window).width();
        var leftL = (bodyW - menuW)/2;
        return leftL;
    })

    //焦点获取滑动并添加其他事件
    $(".menu>a").each(function() {
        $(this).bind("click",function() {
            var idName = $(this).attr("scroll");
            var scrolTop = $("#"+idName).offset().top;
            $(".menu>a").removeClass("active");
            $(this).addClass("active");
            $("body,html").animate({ scrollTop: scrolTop },600,"swing");    
            if(idName == "section_2") {
                $("#section_2 .progress").removeClass("active");
                setTimeout(function() {
                    $("#section_2 .progress").addClass("active");
                },300)       
            }
            if(idName == "section_3") {
                $("#section_3 .timeLine").removeClass("active");       
                setTimeout(function() { 
                    $("#section_3 .timeLine").addClass("active");     
                },300)         
            } 
        })
    })
})