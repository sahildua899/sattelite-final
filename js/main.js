let activeIndex = 0;
let limit = 0;
let disabled = false;
let stage;
let controls;
let canvas=false;

const SPIN_FORWARD_CLASS = 'js-spin-fwd';
const SPIN_BACKWARD_CLASS = 'js-spin-bwd';
const DISABLE_TRANSITIONS_CLASS = "js-transitions-disabled";
const SPIN_DUR = 1000;

const appendControls = () => {
    for(let i=0; i<limit;i++){
        $('.carousel__control').append(`<a href="#" data-index="${i}"></a>`);
    }
    let height = $('.carousel__control').children().last().outerHeight();
  
    $('.carousel__control').css('height', 30 + limit * height);
    controls = $('.carousel__control').children();
    controls.eq(activeIndex).addClass('active');
}

  
  const setIndexes = () => {
    $('.spinner').children().each((i, el) => {
      $(el).attr('data-index', i);
      limit++;
    });
  };
  
  const duplicateSpinner = () => {
    const $el = $('.spinner').parent();
    const html = $('.spinner').parent().html();
    $el.append(html);
    $('.spinner').last().addClass('spinner--right');
    $('.spinner--right').removeClass('spinner--left');
  };
  
  const paintFaces = () => {
    $('.spinner__face').each((i, el) => {
      const $el = $(el);
      let color = $(el).attr('data-bg');
      $el.children().css('backgroundImage', `url(${getBase64PixelByColor(color)})`);
    });
  };
  
  const getBase64PixelByColor = hex => {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.height = 1;
      canvas.width = 1;
    }
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 1, 1);
      return canvas.toDataURL();
    }
    return false;
  };
  
  const prepareDom = () => {
    setIndexes();
    paintFaces();
    duplicateSpinner();
    appendControls();
  };
  
  const spin = (inc = 1) => {
    if (disabled) return;
    if (!inc) return;
    activeIndex += inc;
    disabled = true;
  
    if (activeIndex >= limit) {
      activeIndex = 0;
    }
  
    if (activeIndex < 0) {
      activeIndex = limit - 1;
    }
  
    const $activeEls = $('.spinner__face.js-active');
    const $nextEls = $(`.spinner__face[data-index=${activeIndex}]`);
    $nextEls.addClass('js-next');
  
    if (inc > 0) {
      stage.addClass(SPIN_FORWARD_CLASS);
    } else {
      stage.addClass(SPIN_BACKWARD_CLASS);
    }
  
    controls.removeClass('active');
    controls.eq(activeIndex).addClass('active');
  
    setTimeout(() => {
      spinCallback(inc);
    }, SPIN_DUR, inc);
  };
  
  const spinCallback = inc => {
  
    $('.js-active').removeClass('js-active');
    $('.js-next').removeClass('js-next').addClass('js-active');
    stage.
    addClass(DISABLE_TRANSITIONS_CLASS).
    removeClass(SPIN_FORWARD_CLASS).
    removeClass(SPIN_BACKWARD_CLASS);
  
    $('.js-active').each((i, el) => {
      const $el = $(el);
      $el.prependTo($el.parent());
    });
    setTimeout(() => {
      stage.removeClass(DISABLE_TRANSITIONS_CLASS);
      disabled = false;
    }, 100);
  
  };
  
  const attachListeners = () => {
    const carousel__control = document.querySelector('.carousel__control').children;
    for(let i=0; i<carousel__control.length;i++){
      let j= [i][0] + 1;
      setInterval(() => {
        spin(j)
      }, 3000);
      
    }
  
    

    document.onkeyup = e => {
      switch (e.keyCode) {
        case 38:
          spin(-1);
          break;
        case 40:
          spin(1);
          break;}
    };
  

    controls.on('click', e => {
      e.preventDefault();
      if (disabled) return;
      const $el = $(e.target);
      const toIndex = parseInt($el.attr('data-index'), 10);
      spin(toIndex - activeIndex);
  
    });
  };
  
  const assignEls = () => {
    stage = $('.carousel__stage');
  };
  
  const init = () => {
    assignEls();
    prepareDom();
    attachListeners();
  };
  
  
  $(() => {
    init();
  });

//   Banner
startImageTransition();
 
        function startImageTransition() {
            var images = document.getElementsByClassName("test");
 
            for (var i = 0; i < images.length; ++i) {
                images[i].style.opacity = 1;
            }
 
            var top = 1;
 
            var cur = images.length - 1;
 
            setInterval(changeImage, 3000);
 
            async function changeImage() {
 
                var nextImage = (1 + cur) % images.length;
 
                images[cur].style.zIndex = top + 1;
                images[nextImage].style.zIndex = top;
 
                await transition();
 
                images[cur].style.zIndex = top;
 
                images[nextImage].style.zIndex = top + 1;
 
                top = top + 1;
 
                images[cur].style.opacity = 1;
               
                cur = nextImage;
 
            }
 
            function transition() {
                return new Promise(function(resolve, reject) {
                    var del = 0.01;
 
                    var id = setInterval(changeOpacity, 10);
 
                    function changeOpacity() {
                        images[cur].style.opacity -= del;
                        if (images[cur].style.opacity <= 0) {
                            clearInterval(id);
                            resolve();
                        }
                    }
 
                })
            }
        }   

        // Big Blog Slider

        var swiper = new Swiper('.blog-slider', {
          spaceBetween: 30,
          effect: 'fade',
          loop: true,
          mousewheel: {
            invert: false,
          },
          // autoHeight: true,
          pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
          }
        });


// Newsletter
var cloudOne = gsap.timeline({repeat: -1, delay: -12});
 cloudOne.to("#cloud-one", 36, {x: "-720px", ease: Linear.easeNone});

var cloudTwo = gsap.timeline({repeat: -1, delay: -3});
 cloudTwo.to("#cloud-two", 24, {x: "-720px", ease: Linear.easeNone});

var cloudFour = gsap.timeline({repeat: -1, delay: 4});
 cloudFour.to("#cloud-four", 33, {x: "-720px", ease: Linear.easeNone});

var cloudFive = gsap.timeline({repeat: -1});
 cloudFive.to("#cloud-five", 24, {x: "-720px", ease: Linear.easeNone});

$("#email").focus(function(){
  if($("#email").val() == ""){
    $("#placeholder").fadeToggle();
  }
});
$("#email").focusout(function(){
  if($("#email").val() == ""){
    $("#placeholder").fadeToggle();
  }
});

$("#btn").mouseenter(function(){
  gsap.to("#btnSVG", .3, {fill: "#d85168"});
});
$("#btn").mouseleave(function(){
  gsap.to("#btnSVG", .3, {fill: "#e96f8c"});
});

$("#email").on("keypress", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    $("#btn").click();
  }
});

gsap.set("#mail", {scale: 0, x: 20, transformOrigin: "right"});

$("#btn").click(function() {
  var submit = gsap.timeline();
    submit.to("#title, #disclaimer, #btn, #email, #placeholder", {opacity: 0, pointerEvents: "none", ease: Power1.easeInOut});
    submit.to("#inputSVG, #btnSVG", .5, {morphSVG:{shape:"#invisible-heart"}, ease: Power1.easeInOut});
    submit.to("#inputSVG, #btnSVG", .5, {y: -30, ease: Power1.easeInOut});
    submit.to("#success", .5, {delay: -.5, opacity: 1, ease: Power1.easeInOut});
  
  var mailbox = gsap.timeline();
    mailbox.to({}, 1, {});
    mailbox.to("#mailbox-stick", 3, {rotate: -90, x: 15, transformOrigin: "left", ease: Elastic.easeOut});
    mailbox.to("#cover-closed", 1, {delay: -3, y: -1, rotation:-180, transformOrigin: "bottom", ease: "Bounce.easeOut"});
    mailbox.to("#cover-open-side", .15, {delay: -2, opacity: 0});
    mailbox.to("#heart", .15, {delay: -3, opacity: 0});
    mailbox.to("#mail", 0, {delay: -3, opacity: 1, display: "block"});
    mailbox.to("#mail", 1, {delay: -3, scale: 1, x: 0, transformOrigin: "right", ease: "back.out"});
  
  var wrapper = gsap.timeline({delay: 3});
    wrapper.to("#svgWrapper", 1, {scale: .8, ease: Bounce.easeOut});
    wrapper.to("#svgWrapper", 1, {delay: -.6, x: "-200%", rotate: 9, ease: Power1.easeIn});
    wrapper.to("#title, #disclaimer, #btn, #email, #placeholder", 0, {opacity: 1, pointerEvents: "all"});
    wrapper.to("#inputSVG", 0, {morphSVG: {shape:"#inputSVG"}, y: 0});
    wrapper.to("#btnSVG", 0, {morphSVG: {shape:"#btnSVG"}, y: 0});
    wrapper.to("#success", 0, {opacity: 0});
    wrapper.to("#mailbox-stick", 0, {rotate: 0, x: 0, transformOrigin: "left"});
    wrapper.to("#cover-closed", 0, {rotation: 0, y: 0, transformOrigin: "bottom"});
    wrapper.to("#cover-open-side", 0, {opacity: 1});
    wrapper.to("#heart", 0, {opacity: 1});
    wrapper.to("#mail", 0, {opacity: 0, scale: 0, x: 0, transformOrigin: "right", display: "none"});
    wrapper.to("#svgWrapper", 0, {x: "200%"});
    wrapper.to("#svgWrapper", 1.5, {x: "0", rotate: -9, ease: "back.out"});
    wrapper.to("#svgWrapper", 1, {delay: -.5, rotate: 0, scale: 1, ease: Bounce.easeOut});
});

// Slider Carousel
