ScrollLottie({
    target: '#animationWindow',
    path: 'https://assets7.lottiefiles.com/packages/lf20_pivkwpog.json', 
    duration: 50, 
    speed: 'slow'
   })
   
   let progress = document.getElementById('progress');
       let gallery = document.getElementById('gallery');
       
       var queue = new createjs.LoadQueue(false);
    
       queue.on("fileload", handleFileComplete);
       queue.on('progress', event => {
           let progress = Math.floor(event.progress * 100);
           this.progress.style.width = progress+'%';
           if (progress == 100) {
               console.log('all done');
               document.querySelector('body').style.background = 'white'
           }
       })
       queue.on('complete', event => {
           gallery.classList.add('fadeIn');
           setTimeout(() => {
               progress.classList.add('expand');
           },500)
   
       })
       queue.loadFile('https://assets7.lottiefiles.com/packages/lf20_pivkwpog.json');
   
       function handleFileComplete(event) {
          
        var item = event.item; 
        var type = item.type;
   
        
        if (type == createjs.Types.IMAGE) {
           gallery.appendChild(event.result);
            
        }
   
       }
   
   //-----------Var Inits--------------
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   cx = ctx.canvas.width / 2;
   cy = ctx.canvas.height / 2;
   
   let confetti = [];
   const confettiCount = 100;
   const gravity = 0.5;
   const terminalVelocity = 5;
   const drag = 0.075;
   const colors = [
   { front: 'red', back: 'darkred' },
   { front: 'green', back: 'darkgreen' },
   { front: 'blue', back: 'darkblue' },
   { front: 'yellow', back: 'darkyellow' },
   { front: 'orange', back: 'darkorange' },
   { front: 'pink', back: 'darkpink' },
   { front: 'purple', back: 'darkpurple' },
   { front: 'turquoise', back: 'darkturquoise' }];
   
   
   //-----------Functions--------------
   resizeCanvas = () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     cx = ctx.canvas.width / 1;
     cy = ctx.canvas.height / 1;
   };
   
   randomRange = (min, max) => Math.random() * (max - min) + min;
   
   initConfetti = () => {
     for (let i = 0; i < confettiCount; i++) {
       confetti.push({
         color: colors[Math.floor(randomRange(0, colors.length))],
         dimensions: {
           x: randomRange(12, 5),
           y: randomRange(12, 5) },
   
         position: {
           x: randomRange(0, canvas.width),
           y: canvas.height - 5 },
   
         rotation: randomRange(0, 2 * Math.PI),
         scale: {
           x: 1,
           y: 1 },
   
         velocity: {
           x: randomRange(-25, 25),
           y: randomRange(0, -50) } });
   
   
     }
   };
   
   //---------Render-----------
   render = () => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
   
     confetti.forEach((confetto, index) => {
       let width = confetto.dimensions.x * confetto.scale.x;
       let height = confetto.dimensions.y * confetto.scale.y;
   
       // Move canvas to position and rotate
       ctx.translate(confetto.position.x, confetto.position.y);
       ctx.rotate(confetto.rotation);
   
       // Apply forces to velocity
       confetto.velocity.x -= confetto.velocity.x * drag;
       confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
       confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
   
       // Set position
       confetto.position.x += confetto.velocity.x;
       confetto.position.y += confetto.velocity.y;
   
       // Delete confetti when out of frame
       if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
   
       // Loop confetto x position
       if (confetto.position.x > canvas.width) confetto.position.x = 0;
       if (confetto.position.x < 0) confetto.position.x = canvas.width;
   
       // Spin confetto by scaling y
       confetto.scale.y = Math.cos(confetto.position.y * 0.1);
       ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
   
       // Draw confetto
       ctx.fillRect(-width / 1, -height / 2, width, height);
   
       // Reset transform matrix
       ctx.setTransform(1, 0, 0, 1, 0, 0);
     });
   
   
   
     window.requestAnimationFrame(render);
   };
   
   //---------Execution--------
   
   render();
   
   //----------Resize----------
   window.addEventListener('resize', function () {
     resizeCanvas();
   });
   
   //------------Click------------
   window.addEventListener('click', function () {
     initConfetti();
   });
   
   var btn = $('#button');
   
   $(window).scroll(function() {
     if ($(window).scrollTop() > 600) {
       btn.addClass('show');
     } else {
       btn.removeClass('show');
     }
   });
   
   btn.on('click', function(e) {
     e.preventDefault();
     $('html, body').animate({scrollTop:0}, '1600');
   });