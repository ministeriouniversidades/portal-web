var fixmeTop = $('.fixme_bread').offset().top;
$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll > 330) {
        $('.fixme_bread').css({
            position: 'fixed',
            top: '100px',
            left: '0',
            //padding: '180px 0px 0px',
        });
    } else {
        $('.fixme_bread').css({
            position: 'static',
            padding: '0px 0px 0px',
        });
    }
});

var fixmeTop = $('.fixme').offset().top;
$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll > 340) {
        $('.fixme').css({
            position: 'fixed',
            top: '130px',
            left: '0',
            padding: '50px 0px 0px',
        });
    } else {
        $('.fixme').css({
            position: 'static',
            padding: '20px 0px 0px',
        });
    }
});