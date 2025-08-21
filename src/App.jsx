import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import React from 'react';
import { useGSAP } from '@gsap/react';
import { useState, useEffect, useRef } from 'react';
import 'remixicon/fonts/remixicon.css';

 

function App() {
  let [showContent, setShowContent] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Audio functionality
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Set to loop infinitely
      audioRef.current.volume = 0.5; // Set volume to 50%
      
      // Add event listeners for audio state
      audioRef.current.addEventListener('play', () => setIsAudioPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsAudioPlaying(false));
      audioRef.current.addEventListener('ended', () => setIsAudioPlaying(false));
    }
  }, []);

  // Function to handle audio play/pause
  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        if (isAudioPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  // Try to play audio when user interacts with the page
  const handleUserInteraction = React.useCallback(async () => {
    if (audioRef.current && !isAudioPlaying) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  }, [isAudioPlaying]);

  // Add user interaction listeners
  useEffect(() => {
    const handleClick = () => handleUserInteraction();
    const handleKeyPress = () => handleUserInteraction();
    
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isAudioPlaying, handleUserInteraction]);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
  })
 useGSAP(()=>{
  const main = document.querySelector(".main");
  main?.addEventListener("mousemove", function (e) {
    const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
    gsap.to(".imagesdiv .text", {
      x: `${xMove * 0.4}%`,
    });
    gsap.to(".sky", {
      x: xMove,
    });
    gsap.to(".bg", {
      x: xMove * 1.7,
    });
  });
 },[showContent])
 

    

   


   




  return (
    <>
      {/* Audio element for background music */}
      
     <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && <div className="main w-full h-screen ">
        <div className='landing w-full h-screen '>
        <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
             
            </div>
          <div className='imagesdiv relative w-full h-screen overflow-hidden'>
          <img className='sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" />
            <img className='bg scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
            <div className="text text-white flex flex-col gap-3 absolute top-[-13%] left-[52%] -translate-x-1/2 scale-[0.6] ">
                <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[12rem] leading-none ml-20">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
              </div>
            <img
                className="absolute character -bottom-[72%] left-[54%] -translate-x-1/2  scale-[0.8] "
                src="./girlbg.png"
                alt=""
              />
              
          </div>
          <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
        </div>
        <div className="w-full h-[100vh] flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[0.8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-30 absolute right-[20%] bottom-[-98%]">
                <h1 className="text-6xl">Still Running,</h1>
                <h1 className="text-6xl">Not Hunting</h1>
               
                <p className="mt-3 text-lg font-[Helvetica_Now_Display]">
                GTA 6 is the upcoming installment in Rockstar Games' legendary Grand Theft Auto series, set in the fictional state of Leonida, inspired by Florida. The game follows two main characters, Lucia and Jason, as they navigate a criminal underworld in a story reminiscent of Bonnie and Clyde. With a return to Vice City 

                </p>
               
                <button className="bg-yellow-500 px-8 py-8 text-black mt-10 text-2xl">
                  Download Now
                </button>
              </div>
            </div>
            
          </div>
          
          {/* Replace the old video section with the scroll-synced video */}
          <ScrollVideo />
          <div id="form" className="w-full min-h-screen bg-black text-white flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-2xl bg-[linear-gradient(135deg,theme(colors.red.500),theme(colors.orange.400),theme(colors.yellow.300),theme(colors.blue.500))] p-[2px] rounded-2xl">
              <div className="rounded-2xl bg-black p-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Contact</h2>
                <p className="text-sm text-gray-400 mb-8">Got a question? Reach out and we’ll get back to you.</p>
                <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-lg bg-neutral-900/70 border border-neutral-800 px-4 py-3 outline-none placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-blue-400/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Player ID</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. LC-90210"
                        className="w-full rounded-lg bg-neutral-900/70 border border-neutral-800 px-4 py-3 outline-none placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-blue-400/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg bg-neutral-900/70 border border-neutral-800 px-4 py-3 outline-none placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-blue-400/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Message</label>
                    <textarea
                      rows="5"
                      placeholder="Tell us what’s up…"
                      className="w-full rounded-lg bg-neutral-900/70 border border-neutral-800 px-4 py-3 outline-none placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-blue-400/40"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-orange-400 to-blue-500 px-6 py-3 font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      
      
      }
      
    </>
  )
}

// Scroll-synced video component
function ScrollVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const frameRef = useRef();
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {};
    const handleError = () => {
      console.log('Video failed to load');
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    let scrollTween;
    setTimeout(() => {
      scrollTween = gsap.to({}, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: self => {
            if (video.readyState >= 1 && video.duration) {
              targetTimeRef.current = self.progress * video.duration;
              if (!frameRef.current) {
                frameRef.current = requestAnimationFrame(updateVideoTime);
              }
            }
          },
        },
      });
    }, 100);

    function updateVideoTime() {
      if (!video) return;
      const current = video.currentTime;
      const target = targetTimeRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        video.currentTime += diff * 0.18; // Snappier response
        frameRef.current = requestAnimationFrame(updateVideoTime);
      } else {
        video.currentTime = target;
        frameRef.current = null;
      }
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (scrollTween) scrollTween.kill();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: '200vh', backgroundColor: '#000' }}
    >
      <video
        ref={videoRef}
        src="/jason.mp4"
        style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'sticky', top: 0, willChange: 'transform' }}
        muted
        playsInline
      />
    </div>
  );
}

export default App
