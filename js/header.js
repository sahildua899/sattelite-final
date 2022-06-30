
$('.auto-grid').owlCarousel({
  loop:true,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:4
      },
      1000:{
          items:4
      }
  }
})



try {
    setInterval(()=>{

        // Digital CLock
    
        let hours = document.getElementById('hour');
        let minutes = document.getElementById('minutes');
        let seconds = document.getElementById('seconds');
        let ampm = document.getElementById('ampm');
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
    
        // add zero before single digit number
    
            h=(h<10)? "0" + h :h;
            m=(m<10)? "0" + m :m;
            s=(s<10)? "0" + s :s;
            
            let am = h >= 12 ? "PM":"AM";
    
        // Convert 24 hours clock to 12 hours
        if(h>12) {
            h=h-12;
        }
    
    
        
        hours.innerHTML = h;
        minutes.innerHTML = m;
        seconds.innerHTML = s;
        ampm.innerHTML = am;
        })
} catch (error) {
    console.log(error)
}



    // Logo

    (function() {
        // We must use JS as we need to select previous
        // elements which can't be done with CSS.
        $('.skew-title').children('span').hover((function() {
          var $el, n;
          $el = $(this);
          n = $el.index() + 1;
          $el.addClass('flat');
          if (n % 2 === 0) {
            return $el.prev().addClass('flat');
          } else {
            if (!$el.hasClass('last')) {
              return $el.next().addClass('flat');
            }
          }
        }), function() {
          return $('.flat').removeClass('flat');
        });
      
      }).call(this);

// Bulb
const finalbulb = document.querySelector('.finalbulb');
const bulbCheckbox = document.querySelector('.bulbcheckbox');
const lightDark = document.querySelector('.lightDark');
const timeColor = document.getElementById('time').children;
const horizontalLine = document.querySelectorAll('.horizontal-line');
const weatherPara = document.querySelector('.Weatherpara');
const refreshWeather = document.querySelector('.refreshweather');
const Menus = document.querySelectorAll('.item');
const MostPopular = document.querySelector('.most-popular-section');
const mostPopularLines = document.querySelectorAll('.most-popular-lines');
const articleSidebar = document.querySelectorAll('.article-sidebar-details');
const newsletterHeading = document.querySelector('.newsletter-heading');
const footer = document.querySelector('.footer');



bulbCheckbox.onclick = function(){
    audio.play();
    var lighton = lightDark.classList.toggle('onn');
    lightDarkmode(lighton);
    }

finalbulb.onclick = function() {
    audio.play();
    var lighton = lightDark.classList.toggle('on');
    lightDarkmode(lighton);
}



function lightDarkmode (lighton) {
    if(lighton === true) {
        document.body.style.background = "var(--background-blue)";
        MostPopular.style.color ="var(--background-black)";
        newsletterHeading.style.color = "var(--background-black)";
        footer.style.background = "var(--background-black)";
        footer.style.color = "var(--background-blue)";

        MostPopular.addEventListener('mouseover', function(){
          MostPopular.style.color = "#fff"
        })
        

        // Time Color

        for(i=0; i<timeColor.length; i++) {
            timeColor[i].style.color = "var(--background-black)";
        }

        // Horizontal-line

     for(i=0; i<horizontalLine.length; i++){
          horizontalLine[i].background = "var(--background-blue)";
    }

    for(i=0; i<Menus.length; i++){
        Menus[i].style.boxShadow = "0 0 5px #144c6e";
    }

    // Most Popular
      for(i=0;i<mostPopularLines.length;i++ ){
        mostPopularLines[i].style.background = "var(--background-black)";
      }
      // Article Sidebar
      for(i=0;i<articleSidebar.length; i++){
        articleSidebar[i].style.color = "var(--background-black)";
      }

  
    }else {
        document.body.style.background = "var(--background-black)";
        MostPopular.style.color = "#fff";
        newsletterHeading.style.color = "var(--background-blue)";
        footer.style.background = "var(--background-blue)";
        footer.style.color = "var(--background-black)";
        

        // Time Color

        for(i=0; i<timeColor.length; i++) {
            timeColor[i].style.color = "var(--background-blue)";
        }

        // Horizontal-line

        for(i=0; i<horizontalLine.length; i++){
            horizontalLine[i].background = "var(--background-black)";
        }

        // Menu Shadow

        for(i=0; i<Menus.length; i++){
            Menus[i].style.boxShadow = "0 0 5px #fff";
        }
        // Most Popular
        for(i=0;i<mostPopularLines.length;i++){
          mostPopularLines[i].style.background = "#fff";
          console.log(mostPopularLines[i])
        }
        // Article Sidebar
        for(i=0;i<articleSidebar.length; i++){
          articleSidebar[i].style.color = "var(--background-blue)";
        }
       
    }
}

const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const playBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');

playBtn.addEventListener('click', function(e) {
    e.preventDefault();
    play.classList.toggle('visibility');
    pause.classList.toggle('visibility');
    playBtn.classList.toggle('shadow');
    wave1.classList.toggle('paused');
    wave2.classList.toggle('paused');
  });


// Weather
$(document).ready(function() {
    checkingweather();
});



function checkingweather() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else {
    alert('your browser not support')
    }
    
    
    
    function onSuccess(position){
        
        let {latitude, longitude} = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2252139de2424b4ab5312ff4c27ee385`)
        .then(response => response.json()).then(response =>{
            let allDetails = response.results[0].components;
            checkWeather(allDetails.city)
            let {county, postcode, country} = allDetails;
        }).catch(()=>{
            checkWeather.innerHTML = `Please Allow`
        });
    }
    
    function onError(error) {
        console.log(error);
    }
    
    function checkWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d3fce2b1754d7f87ca9096fb20f9011e`)
        .then(response => response.json()).then(response => {
            weatherPara.innerHTML = `${location} ${response.main.temp}<sup>o</sup>C`
        })
    }
}

refreshWeather.addEventListener('click', function(){
    checkingweather()
})


// Video on Click

let videobtn = document.querySelector(".circle__btn");
let clip = document.querySelector('.clip');
let close = document.querySelector('.close');
let video = document.querySelector('video');
const playButton = document.querySelector('.play-button');
videobtn.onclick = function(){
    videobtn.classList.add('active');
    clip.classList.add('active');
    video.play();
    video.currentTime = 0;
    console.log(videobtn.classList[1])

    if(videobtn.classList[1] == "active") {
        document.body.style.overflow = "hidden"
    }else {
        document.body.style.overflow = "visible"
    }
}

close.onclick = function(){
    videobtn.classList.remove('active');
    clip.classList.remove('active');
    video.pause();
    document.body.style.overflow = "visible"
}



$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:false,
    autoplay:true,
    pagination:false,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:4
        },
        1000:{
            items:8
        }
    }
})

// Scroll Line
$(document).ready(function(){
    $(window).scroll(function(){
      var windowTop = $(window).scrollTop(),
      documentHeight = $(document).height(),
      windowHeight = $(window).height();
      var scroll = (windowTop / (documentHeight - windowHeight))*100;
      $('.scroll-line').css("width", (scroll + '%'));
    });
  });


//   Particle

function pop (e) {
    let amount = 30;
    switch (e.target.dataset.type) {
      case 'shadow':
      case 'line':
        amount = 60;
        break;
    }
    // Quick check if user clicked the button using a keyboard
    if (e.clientX === 0 && e.clientY === 0) {
      const bbox = e.target.getBoundingClientRect();
      const x = bbox.left + bbox.width / 2;
      const y = bbox.top + bbox.height / 2;
      for (let i = 0; i < 30; i++) {
        // We call the function createParticle 30 times
        // We pass the coordinates of the button for x & y values
        createParticle(x, y, e.target.dataset.type);
      }
    } else {
      for (let i = 0; i < amount; i++) {
        createParticle(e.clientX, e.clientY + window.scrollY, e.target.dataset.type);
      }
    }
  }
  function createParticle (x, y, type) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 200;
    let destinationY = (Math.random() - 0.5) * 200;
    let rotation = Math.random() * 420;
    let delay = Math.random() * 100;
    
    switch (type) {
      case 'square':
        particle.style.background = `hsl(${Math.random() * 90 + 270}, 90%, 60%)`;
        particle.style.border = '1px solid white';
        break;
      
    }
    
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 0.2
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
        opacity: 0
      }
    ], {
      duration: Math.random() * 1000 + 5000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: delay
    });
    animation.onfinish = removeParticle;
  }
  function removeParticle (e) {
    e.srcElement.effect.target.remove();
  }
  
  if (document.body.animate) {
    document.querySelectorAll('img').forEach(img => img.addEventListener('click', pop));
    document.querySelectorAll('li').forEach(li => li.addEventListener('click', pop));
  }
  

  