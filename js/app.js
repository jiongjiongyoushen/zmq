// $.urlParam = function(name){
//     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     if (results==null){
//        return null;
//     }
//     else{
//        return decodeURI(results[1]) || 0;
//     }
// }

// No Grid / VIsibility Classes / Interchange
var timeInterval = null;
var today = new Date();
var hour = today.getHours();
var randomNumber = getRandomInt(1,4);
if(hour >= 22 || hour <= 4){
    randomNumber = getRandomInt(1,7);
}
var circle = $('#landing .progress-ring .progress-ring__circle')[0];
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = circumference + ' ' + circumference;
circle.style.strokeDashoffset = circumference;

var smallCircle = $('#landing .progress-ring-small .progress-ring__circle')[0];
var smallRadius = smallCircle.r.baseVal.value;
var smallCircumference = smallRadius * 2 * Math.PI;
smallCircle.style.strokeDasharray = smallCircumference + ' ' + smallCircumference;
smallCircle.style.strokeDashoffset = smallCircumference;

var landingVideoElement = null;
var stopLandingVideoElementTracking = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function setLandingProgress(percent){
    var offset = circumference - percent / 100 * circumference;
    var smallOffset = smallCircumference - percent / 100 * smallCircumference;
    circle.style.strokeDashoffset = offset;
    smallCircle.style.strokeDashoffset = smallOffset;
}
function createVideo(){
    $(document).on('focus click', function(){
        if($('#landing-video-wrapper video').length > 0){
            if(stopLandingVideoElementTracking === false) $('#landing-video-wrapper video')[0].play();
        }
    });
    var videoElement = document.createElement('video');
    videoElement.id = 'landing-video';
    videoElement.preload = true;
    videoElement.loop = true;
    videoElement.muted = true;
    if(Foundation.MediaQuery.is('small only')){
        videoElement.poster ='../images/Juvil_V4.jpg';
    }else{
        videoElement.poster = '../images/Juvil_V4.jpg';
    }
    videoElement.autoplay = true;
    videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');
    videoElement.setAttribute('playsinline', 'playsinline');
    // videoElement.onplay = trackProgress();
    var sourceElement = document.createElement('source');
    if(Foundation.MediaQuery.is('small only')){
        sourceElement.src = 'https://www.juvil.cn/images/landing/Juvil_V' + randomNumber + '_mobile.mp4';   
    }else{
        sourceElement.src = 'https://www.juvil.cn/images/landing/Juvil_V' + randomNumber + '.mp4';
    }
    sourceElement.type = 'video/mp4';
    $(videoElement).append(sourceElement);
    $('#landing-video-wrapper').append(videoElement);
}
function replaceVideo(){
    if($('#landing-video source').length > 0){
        var videoElement = $('#landing-video')[0];
        var sourceElement = $('#landing-video source')[0];
        if(Foundation.MediaQuery.is('small only')){
            if(sourceElement.src.indexOf('mobile') == -1){
                videoElement.pause();
                sourceElement.setAttribute('src','https://www.juvil.cn/images/landing/Juvil_V' + randomNumber + '_mobile.mp4');
                videoElement.load();
                videoElement.play();
            }
        }else{
            if(sourceElement.src.indexOf('mobile') != -1){
                videoElement.pause();
                sourceElement.setAttribute('src','https://www.juvil.cn/images/landing/Juvil_V' + randomNumber + '.mp4');
                videoElement.load();
                videoElement.play();
            }
        }
    }
}
function trackProgress(){
    if(!landingVideoElement) landingVideoElement = $('#landing-video')[0];
    if(landingVideoElement){
        setLandingProgress((landingVideoElement.currentTime/ landingVideoElement.duration)*100);
    }
    if(requestAnimationFrame && !stopLandingVideoElementTracking) requestAnimationFrame(trackProgress);
}
function resizeVideo(){
    var width = 1920;
    var height = 1080;
    var ratio = 0.5625;
    if(Foundation.MediaQuery.is('small only')){
        width = 750;
        height = 1254;
        ratio = 1.672;
    }
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var windowRatio = windowHeight / windowWidth;
    if(windowRatio >= ratio){
        $('#landing-video').css({
            height: windowHeight,
            width: windowHeight / ratio
        });
    }else{
        $('#landing-video').css({
            width: windowWidth,
            height: windowWidth*ratio,
        });
    }
}
function initMain(){
    $('body').removeClass('locked');
    $('.video-play-button').on('click', function(e){
        e.preventDefault();
        $('#full-video-popup').toggleClass('active');
        if($('#full-video-popup').is('.active')){
            if($(this).data('iframe')){
                $('#full-video-player-inner-box').append('<iframe width="1046" height="588" src="' + $(this).data('iframe') + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            }
        }
    });
    $('#full-video-player-close, #full-video-bg').on('click', function(e){
        e.preventDefault();
        $('#full-video-player-inner-box').html('');
        $('#full-video-popup').removeClass('active');
    });
    $('.wechat-opener').on('click', function(e){
        e.preventDefault();
        $('#mobile-menu-btn-close').trigger('click');
        var target = null;
        if(Foundation.MediaQuery.is('small only')){
            target = $(this).data('openermobile');
        }else{
            target = $(this).data('opener');
        }
        if(typeof target !== 'undefined' && target !== null){
            var targetElem = $('#' + target);
            if(targetElem.length > 0){
                targetElem.addClass('active');
            }
        }
    });
    $('.wechat-closer').on('click', function(e){
        e.preventDefault();
        if(typeof $(this).data('closer') !== 'undefined'){
            var target = $('#' + $(this).data('closer'));
            if(target.length > 0){
                target.removeClass('active');
            }
        }
    });
    $('#fullpage').fullpage({
        // autoScrolling: false,
        // verticalCentered: true,
        // anchors: ['anchor1', 'anchor2', 'anchor3'],
        // menu: '#menu',
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],
        afterRender: function(){
            if(timeInterval) clearInterval(timeInterval);
            timeInterval = setInterval(function(){
                $.fn.fullpage.moveSlideRight();
            }, 6000);
        },
        onLeave: function(index, nextIndex, direction){
            if(timeInterval) clearInterval(timeInterval);
            timeInterval = setInterval(function(){
                $.fn.fullpage.moveSlideRight();
            }, 6000);
            var sectionLength = $('#fullpage > .section').length;
            if(index === 1){
                // From slide 1
                TweenMax.set($('#header'), { autoAlpha:0, y: -40 });
                TweenMax.set($('#mobile-menu-btn'), { autoAlpha:0});
                stopLandingVideoElementTracking = true;
                landingVideoElement.pause();
            }
            if(nextIndex === 1){
                // To slide 1
                TweenMax.set($('#header'), { autoAlpha:0, y: -40 });
                TweenMax.set($('#mobile-menu-btn'), { autoAlpha:0});
                stopLandingVideoElementTracking = false;
                trackProgress();
                landingVideoElement.play();
            }
            if(sectionLength === nextIndex){
                TweenMax.to($('#header'), 0.4, { autoAlpha:0, y: -40 });
                TweenMax.to($('#mobile-menu-btn'), 0.4, { autoAlpha:0 });
            }
            if(sectionLength === nextIndex){
                TweenMax.to($('#logo'), 0.4, { autoAlpha: 1 });
            }else if(nextIndex > 2){
                var sectionIndex = nextIndex - 1;
                var $section = $('#fullpage > .section').eq(sectionIndex);
                if($section.is('.section-with-slider')){
                    if($section.find('.fp-slides .fp-slidesContainer >.slide.active').is('.white-header')){
                        TweenMax.set($section, { className: '-=dark'});
                        TweenMax.set($('#header'), { className: '+=white'});
                        TweenMax.set($('#mobile-menu-btn'), { className: '+=white' });
                    }else{
                        TweenMax.set($section, { className: '+=dark'});
                        TweenMax.set($('#header'), { className: '-=white'});
                        TweenMax.set($('#mobile-menu-btn'), { className: '-=white' });
                    }
                    if($section.find('.fp-slides .fp-slidesContainer >.slide.active').index() !== 0){
                        TweenMax.to($('#logo'), 0.4, { autoAlpha: 0 });
                    }else{
                        TweenMax.to($('#logo'), 0.4, { autoAlpha: 1 });
                    }
                }else{
                    TweenMax.to($('#logo'), 0.4, { autoAlpha: 1 });
                    if($section.is('.white-header')){
                        TweenMax.set($('#header'), { className: '+=white'});
                        TweenMax.set($('#mobile-menu-btn'), { className: '+=white' });
                    }else{
                        TweenMax.set($('#header'), { className: '-=white'});
                        TweenMax.set($('#mobile-menu-btn'), { className: '-=white' });
                    }
                }
            }else{
                TweenMax.set($('#header'), { className: '-=white'});
                TweenMax.set($('#mobile-menu-btn'), { className: '-=white' });
                TweenMax.to($('#logo'), 0.4, { autoAlpha: 1 });
            }
            if(sectionLength === nextIndex){
            }else{
                var sectionIndex = index - 1;
                var $section = $('#fullpage > .section').eq(sectionIndex);
                $section.removeClass('animate');
            }
        },
        afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            var sectionLength = $('#fullpage > .section').length;
            if(index > 1 && sectionLength !== index){
                TweenMax.to($('#header'), 0.8, { y:0, autoAlpha: 1 });
                TweenMax.to($('#mobile-menu-btn'), 0.8, { autoAlpha:1 });
            }
            loadedSection.addClass('animate');
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
            if(timeInterval) clearInterval(timeInterval);
            timeInterval = setInterval(function(){
                $.fn.fullpage.moveSlideRight();
            }, 6000);
            var sectionIndex = index - 1;
            var $section = $('#fullpage > .section').eq(sectionIndex);
            var slideLength = $section.find('.fp-slides .fp-slidesContainer >.slide').length;
            var lastSlideIndex = $section.find('.fp-slides .fp-slidesContainer >.slide').length - 1;
            if(nextSlideIndex === lastSlideIndex){
                TweenMax.to($section.find('.fp-controlArrow.fp-next'), 0.4, {autoAlpha: 0});
            }else{
                TweenMax.to($section.find('.fp-controlArrow.fp-next'), 0.4, {autoAlpha: 1});
            }
            if(nextSlideIndex === 0){
                TweenMax.to($section.find('.fp-controlArrow.fp-prev'), 0.4, {autoAlpha: 0});
                TweenMax.to($section.find('.section-title'), 0.4, {autoAlpha: 0});
                TweenMax.to($('#logo'), 0.4, { autoAlpha: 1 });
            }else{
                TweenMax.to($section.find('.fp-controlArrow.fp-prev'), 0.4, {autoAlpha: 1});
                TweenMax.to($section.find('.section-title'), 0.4, {autoAlpha: 1});
                TweenMax.to($('#logo'), 0.4, { autoAlpha: 0 });
            }

            if($section.find('.fp-slides .fp-slidesContainer >.slide:eq(' + nextSlideIndex + ')').is('.white-header')){
                TweenMax.set($section, { className: '-=dark'});
                TweenMax.set($('#header'), { className: '+=white'});
                TweenMax.set($('#mobile-menu-btn'), { className: '+=white' });
            }else{
                TweenMax.set($section, { className: '+=dark'});
                TweenMax.set($('#header'), { className: '-=white'});
                TweenMax.set($('#mobile-menu-btn'), { className: '-=white' });
            }
            $section.find('.slider-dots li.active').removeClass('active');
            $section.find('.slider-dots li:eq(' +  nextSlideIndex + ')').addClass('active');
        }
    });
    $(document).on('click', '.section-with-slider .slider-dots button', function(e){
        var sectionIndex = $('.section-with-slider.active').index();
        var dotIndex = $(this).closest('li').index();
        $.fn.fullpage.moveTo(sectionIndex+1, dotIndex);
    });

    $('#mobile-menu-btn').on('click', function(e){
        e.preventDefault();
        TweenMax.set($('#header-mobile'), { height: window.innerHeight });
        TweenMax.set($('#header-mobile-wrapper'), { minHeight: window.innerHeight });
        TweenMax.to($('#header-mobile'), 0.4, { autoAlpha: 1});
    });
    $('#mobile-menu-btn-close').on('click', function(e){
        e.preventDefault();
        TweenMax.to($('#header-mobile'), 0.4, { autoAlpha: 0});
    });

    $('#landing').on('resizeme.zf.trigger', resizeVideo);
    $('#landing').on('resizeme.zf.trigger', replaceVideo);
    resizeVideo();

    stopLandingVideoElementTracking = false;
    trackProgress();
    landingVideoElement.play();

    if(window.location.href.indexOf('section_') !== -1){
        var index = window.location.href.indexOf('section_');
        var sectionName = window.location.href.substring(index + 8);
        console.log(sectionName);
        if(sectionName){
            var $section = $('#' + sectionName);
            if($section.length === 1){
                var sectionIndex = $section.index() + 1;
                if($section.is('.section-with-slider')){
                    if($(this).data('slide')){
                        $.fn.fullpage.moveTo(sectionIndex, 0);
                    }else{
                        $.fn.fullpage.moveTo(sectionIndex, 0);
                    }
                }else{
                    $.fn.fullpage.moveTo(sectionIndex);
                }
            }
            window.history.pushState("", "", location.pathname);
        }
    }

    $('.section-jumper').on('click', function(e){
        e.preventDefault();
        if(Foundation.MediaQuery.is('small only')){
            TweenMax.to($('#header-mobile'), 0.4, { autoAlpha: 0});
        }
        if(!$(this).data('section')){
            return;
        }
        var $section = $('#' + $(this).data('section'));
        if($section.length === 1){
            var sectionIndex = $section.index() + 1;
            if($section.is('.section-with-slider')){
                if($(this).data('slide')){
                    $.fn.fullpage.moveTo(sectionIndex, parseInt($(this).data('slide')));
                }else{
                    $.fn.fullpage.moveTo(sectionIndex, 0);
                }
            }else{
                $.fn.fullpage.moveTo(sectionIndex);
            }
        }
    });
}
$(document).foundation();
$(document).ready(function() {
    setTimeout(function(){
        $('#loading').hide();
        createVideo();
        initMain();
        TweenMax.to($('#landing-heading>h1'), 1, { delay: 0.5, y:0 , ease: Power3.easeOut});
        // var tl = new TimelineMax({});
        // tl.set($('#loading'), { height: window.innerHeight });
        // tl.to($('#loading-progress'), 1.5, { top: 0, ease: Power3.easeOut});
        // tl.to($('#loading-logo-image'), 1, { y: 0, ease: Power3.easeOut}, '-= 0.75');
        // tl.to($('#loading-progress'), 1.5, { bottom: '100%', ease: Power3.easeOut}, '-= 0.25');
        // tl.call(initMain);
        // tl.to($('#loading'), 1, { autoAlpha: 0 });
        // tl.to($('#landing-heading>h1'), 1, { y:0 , ease: Power3.easeOut}, '-= 0.5');
    }, 1000);
});