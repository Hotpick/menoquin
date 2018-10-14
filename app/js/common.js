var showMore = (function(){
    var
        btn = $('.js-show-more')
    ;

    btn.on('click', function (e) {
       var $this = $(this);

       e.preventDefault();
       if($this.hasClass('active')) {
           return false;
       } else {
           btn.parent().removeClass('active');
           $this.parent().addClass('active')
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
            var height = $this.attr('data-percent');
            $this.find('.bar').css('height', height);
        });
    });

})();