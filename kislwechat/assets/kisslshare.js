$(function () {
    function loadingfn() {
        var num = 0;
        var arry = ['arr.png', 'bg.png', 'music.gif', 'music_off.png', 'page1/left.png', 'page1/meui.png', 'page1/right.png', 'page1/ttu1.png', 'page1/ttu2.png', 'page2/mg1.png', 'page2/mg2.png', 'page2/mg3.png', 'page2/title2.png', 'page3/p3mg1.png', 'page3/p3mg2.png', 'page4/p4mg1.png', 'page4/p4mg2.png', 'page4/p4mg3.png', 'page5/p5mg1.png', 'page5/p5mg2.png', 'page6/p6mg1.png', 'page6/p6mg2.png', 'page6/p6title.png', 'page7/p7mg1.png', 'page7/p7mg2.png', 'page7/p7mg3.png', 'page7/p7title.png', 'page8/p8mg1.png', 'page8/p8mg2.png', 'page8/p8mg3.png', 'page8/p8title.png', 'page9/p9mg1.png', 'page9/p9mg2.png', 'page9/p9mg2.png', 'page9/p9mg3.png', 'page9/p9title.png', 'page10/ewm.png', 'page10/maney.png', 'page10/p10t.png', 'page10/p10tbg.png', '1.mp3'];
        for (var i = 0; i < arry.length; i++) {
            var imgobj = new Image();
            imgobj.src = 'assets/WeChat-img/' + arry[i];
            imgobj.onload = function () {
                num++;
                var s = parseInt((num / arry.length) * 100);
                console.log(s, arry.length, num);
                $('.loadWord').html(s + '%');
                if (num ==40) {
                    $('.spinner').remove();
                    $('.loadBg').fadeOut(1000, function () {
                        $('.loadBg').remove();
                    })
                    $('.list>li').eq(0).addClass('current inAnimate');
                }
            }
            imgobj.onerror = function () {
                $('.loadWord').html('100%');
                $('.spinner').remove();
                $('.loadBg').fadeOut(1000, function () {
                    $('.loadBg').remove();
                })
                $('.list>li').eq(0).addClass('current inAnimate');
            }

        }

    }
    loadingfn();

    $(document).on('touchstart', function (event) {
        event.preventDefault();
    });

    var aLi = $('.list>li');
    //一屏的高度
    var viewHeight = $(window).height();
    var nextorprevIndex, nowIndex, startY;

    function startFn(event) {

        var touch = event.originalEvent.changedTouches[0];
        startY = touch.pageY;
        nowIndex = $(this).index();
        aLi.on('touchmove.our', moveFn);
        aLi.on('touchend.our', endFn);
    }
    aLi.on('touchstart.our', startFn);

    function moveFn(event) {

        var touch = event.originalEvent.changedTouches[0];
        var moveY = touch.pageY;

        var s = -(startY - moveY);

        if (startY > moveY) {		//↑

            if (nowIndex == 9) {
                nextorprevIndex = 0;
            } else {
                nextorprevIndex = nowIndex + 1;
            }
            aLi.eq(nextorprevIndex).addClass('current').siblings().removeClass('current');

            aLi.eq(nextorprevIndex).show().css('top', viewHeight + s);

        } else if (startY < moveY) {		//↓

            if (nowIndex == 0) {
                nextorprevIndex = 9;
            } else {
                nextorprevIndex = nowIndex - 1;
            }

            aLi.eq(nextorprevIndex).addClass('current').siblings().removeClass('current');

            aLi.eq(nextorprevIndex).show().css('top', (-viewHeight + s));
        }
    }

    function endFn(event) {
        var touch = event.originalEvent.changedTouches[0];
        var endY = touch.pageY;
        var startY = touch.pageY;
        aLi.eq(nextorprevIndex).addClass('current').siblings().removeClass('current');
        aLi.eq(nextorprevIndex).show().css('top', 0);
        aLi.eq(nextorprevIndex).css('transition', '.7s ease 0s');
        if (startY != endY) {
            aLi.off('.our');
        }
    }

    aLi.on('transitionEnd webkitTransitionEnd', function (event) {
        if (aLi.is(event.target)) {
            aLi.eq(nextorprevIndex).siblings().hide();
            aLi.eq(nextorprevIndex).addClass('inAnimate').siblings().removeClass('inAnimate');
            aLi.css('transition', '');
            aLi.on('touchstart', startFn);
        }
    })

    $('.musicbt').on( 'touchend',function () {
        $('.musicbt img').attr('src', $('.musicbt img').attr('src') == 'assets/WeChat-img/music.gif' ? 'assets/WeChat-img/music_off.png' : 'assets/WeChat-img/music.gif')
        $('#music').attr('src', $('#music').attr('src') == 'assets/WeChat-img/1.mp3' ? '' : 'assets/WeChat-img/1.mp3')
    })

})
