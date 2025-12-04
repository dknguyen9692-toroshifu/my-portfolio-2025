
import React, { useEffect, useRef, useState } from 'react';

interface SoundWaveProps {
  lineCount?: number;
  speed?: number;
  opacity?: number;
}

const SoundWave: React.FC<SoundWaveProps> = ({
  lineCount = 60,
  speed = 0.003,
  opacity = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver to pause animation when not visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const render = () => {
      // Only animate if visible
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      time += speed;
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const amplitudeBase = height * 0.25;

      // Standard blending for better visibility on dark backgrounds
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < lineCount; i++) {
        const normalizedIndex = i / lineCount; // 0 to 1
        const offset = i - lineCount / 2;

        ctx.beginPath();

        // Dynamic Gradient Color Palette (Purple -> Pink -> Orange)
        // Adjusting alpha based on index to create depth
        let color = '';
        // Reduced brightness multiplier from 2 to 1.3 for subtlety
        const alpha = (0.08 + Math.sin(time + i) * 0.05) * (opacity * 1.3);

        if (normalizedIndex < 0.33) {
           // Purple
           color = `rgba(139, 92, 246, ${alpha})`;
        } else if (normalizedIndex < 0.66) {
           // Pink
           color = `rgba(236, 72, 153, ${alpha})`;
        } else {
           // Orange
           color = `rgba(249, 115, 22, ${alpha})`;
        }

        ctx.strokeStyle = color;

        // Draw the wave
        for (let x = 0; x < width; x += 15) {
          // Normalized X (-1 to 1)
          const nx = (x / width) * 2 - 1;

          // Windowing function (Cosine window) to taper amplitude at screen edges
          const windowVal = Math.cos(nx * 1.5);
          const safeWindow = Math.max(0, windowVal); // Clamp to positive

          // Complex wave synthesis
          const y = centerY +
                    // Vertical spread of lines
                    (offset * 2) +
                    // Primary slow wave
                    Math.sin(x * 0.002 + time + normalizedIndex * 2) * amplitudeBase * safeWindow +
                    // Secondary fast detail wave
                    Math.sin(x * 0.01 + time * 3 + i * 0.1) * (amplitudeBase * 0.2) * safeWindow;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    init();
    window.addEventListener('resize', init);

    // Start rendering if visible
    if (isVisible) {
      render();
    }

    return () => {
      window.removeEventListener('resize', init);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [lineCount, speed, opacity, isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default SoundWave;
