var showMore = (function(){
    var
        btn = $('.js-show-more')
    ;

    btn.on('click', function (e) {
       var $this = $(this);

       e.preventDefault();

       if($this.parent().hasClass('active')) {
           $this.parent().removeClass('active');
       } else {
           $this.parent().addClass('active');
       }
    });
})();

var diagram = (function(){
    var
        bar = $('.js-bar'),
        container = $('.js-bar-list')
    ;

    $(document).ready(function () {
        container.find(bar).each(function () {
            var $this = $(this);
            var size = $this.attr('data-percent');
            if($(window).width() >= 778) {
                $this.find('.bar').css('height', size);
            } else {
                $this.find('.bar').css('width', size);
            }
        });
    });

    $(window).on('scroll', function(){
       var $this = $(this);

        if($(window).width() >= 778) {
           if($this.scrollTop() + 250 >= container.offset().top) {
               container.removeClass('hide');
           }
        }

    });

})();

var goTo = (function(){

    var
        link = $('.js-go-link');
    ;

    link.click(function(e){
        e.preventDefault();
        var
            href = $(this).attr('href'),
            target = $(href).offset().top - 100
        ;
        $('body,html').animate({scrollTop:target},500,'swing');
    });

})();

var headerSize = (function(){
    var header = $('.header');

    if($(window).width() >= 1250) {
        $(window).scroll(function(){
            if($(document).scrollTop() > 100) {
                header.addClass('resize');
            } else {
                header.removeClass('resize');
            }
        });
    }
})();

var menu = (function(){
    var
        btn = $('.js-call-menu'),
        menu = $('.js-menu'),
        btnClose = $('.js-close-menu'),
        scrolContainer = menu.find('.menu__list')
    ;

    btn.on('click', function (e) {
        e.preventDefault();
        menu.addClass('show');
    });

    btnClose.on('click', function (e) {
        e.preventDefault();
        menu.removeClass('show');
    });

    scrolContainer.onePageNav({
        currentClass: 'current',
        changeHash: false
    });

    scrolContainer.find('a').on('click',function () {
        if($(window).width() <= 1250) {
            menu.removeClass('show');
        }
    });


})();

var scrollAnimations = (function() {
    var reveal = ScrollReveal();

    $('.js-reveal').map(function(i, element) {
        var data = element.dataset;

        reveal.reveal(element, {
            origin: data.origin,
            distance: data.distance || 0,
            duration: Number(data.duration) || 500,
            delay: Number(data.delay) || 0,
            rotate: { z: Number(data.rotate) || 0 },
            opacity: Number(data.opacity) || 0,
            scale: Number(data.scale) || 1,
            easing: data.easing || 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            mobile: Boolean(data.mobile),
            viewFactor: Number(data.viewfactor) || .75,
            reset: true
        })
    })
})();
