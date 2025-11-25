
import React, { useEffect, useRef } from 'react';

const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      swing: number;
      swingSpeed: number;
    }

    const particles: Particle[] = [];

    const init = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      particles.length = 0;
      // Responsive density: fewer particles on mobile, more on desktop
      const density = width < 768 ? 40 : 80;

      for (let i = 0; i < density; i++) {
        particles.push(createParticle(true));
      }
    };

    const createParticle = (randomY = false): Particle => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -10,
      size: Math.random() * 2 + 0.5, // Small size for abstract feel
      speedY: Math.random() * 0.5 + 0.1, // Slow, varying fall speed
      opacity: Math.random() * 0.4 + 0.1, // Varying opacity
      swing: Math.random() * Math.PI * 2, // Initial swing phase
      swingSpeed: Math.random() * 0.02 + 0.005 // How fast it sways side to side
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update position
        p.y += p.speedY;
        p.swing += p.swingSpeed;
        p.x += Math.sin(p.swing) * 0.3; // Gentle horizontal drift

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Reset if out of bounds (bottom)
        if (p.y > height + 5) {
          Object.assign(p, createParticle());
        }
        
        // Wrap around horizontally just in case drift takes them too far
        if (p.x > width + 5) p.x = -5;
        if (p.x < -5) p.x = width + 5;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    init();
    window.addEventListener('resize', init);
    render();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-70"
    />
  );
};

export default SnowEffect;
