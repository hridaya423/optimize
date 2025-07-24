'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  text: string;
  size: number;
  opacity: number;
  angle: number;
  radius: number;
  speed: number;
  color: string;
}

interface VortexAnimationProps {
  onComplete: () => void;
  duration?: number;
}

const FILE_SIZE_TEXTS = [
  '200MB', '100MB', '50MB', '25MB',
  'malloc()', 'free()', 'pool', 'cache',
  '1010101', '1100110', '1111000', '0101010',
  'bytes', 'KB', 'MB', 'RAM',
  'heap', 'stack', 'memory', 'buffer',
  '0xFF', '0x64', '0x32', '0x19',
  'compress', 'optimize', 'minimize', 'efficient',
  'GC', 'alloc', 'dealloc', 'leak',
  'virtual', 'physical', 'paging', 'swap'
];

export default function VortexAnimation({ onComplete, duration = 3500 }: VortexAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState<'particles' | 'text' | 'complete'>('particles');
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const completionTriggeredRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mounted = true;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const initParticles = () => {
      const particles: Particle[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

      FILE_SIZE_TEXTS.forEach((text, index) => {
        const count = text.length < 4 ? 3 : 2;
        
        for (let i = 0; i < count; i++) {
          const angle = (index * 360 / FILE_SIZE_TEXTS.length) + (i * 120 / count);
          const radius = Math.random() * maxRadius + 100;
          
          particles.push({
            x: centerX + Math.cos((angle * Math.PI) / 180) * radius,
            y: centerY + Math.sin((angle * Math.PI) / 180) * radius,
            targetX: centerX,
            targetY: centerY,
            text,
            size: Math.random() * 20 + 12,
            opacity: 0.8 + Math.random() * 0.2,
            angle: angle,
            radius: radius,
            speed: 0.02 + Math.random() * 0.01,
            color: '#ffffff'
          });
        }
      });

      particlesRef.current = particles;
    };

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    initParticles();
    startTimeRef.current = Date.now();

    timeoutRef.current = setTimeout(() => {
      if (!completionTriggeredRef.current && mounted) {
        console.warn('Animation timeout reached, forcing completion');
        completionTriggeredRef.current = true;
        setIsComplete(true);
        onComplete();
      }
    }, duration + 2000);

    const animate = (timestamp: number) => {
      if (!mounted || isComplete || completionTriggeredRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = Date.now() - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.7) {
        if (mounted) setAnimationPhase('particles');
      } else if (progress < 1) {
        if (mounted) setAnimationPhase('text');
      } else {
        if (mounted) setAnimationPhase('complete');
      }

      if (progress < 0.8) {
        particlesRef.current.forEach((particle) => {
          if (progress < 0.4) {
            particle.angle += particle.speed * 2;
            particle.radius = Math.max(particle.radius - 1, 50);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            particle.x = centerX + Math.cos((particle.angle * Math.PI) / 180) * particle.radius;
            particle.y = centerY + Math.sin((particle.angle * Math.PI) / 180) * particle.radius;
          } else {
            const convergeFactor = (progress - 0.4) / 0.4;
            particle.x = particle.x + (particle.targetX - particle.x) * convergeFactor * 0.1;
            particle.y = particle.y + (particle.targetY - particle.y) * convergeFactor * 0.1;
            particle.size *= 0.98;
            particle.opacity = Math.max(particle.opacity - 0.04, 0);
          }

          if (particle.opacity > 0.01) {
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.font = `${particle.size}px "Courier New", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 2;
            ctx.fillText(particle.text, Math.floor(particle.x), Math.floor(particle.y));
            ctx.restore();
          }
        });
      }

      if (progress >= 0.7) {
        const textProgress = (progress - 0.7) / 0.3;
        const easedProgress = easeInOutCubic(textProgress);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const targetY = canvas.height * 0.4;
        const currentX = centerX;
        const currentY = centerY + (targetY - centerY) * easedProgress;
        const currentSize = 60 + (easedProgress * 80);
        const currentOpacity = Math.min(textProgress * 2, 1);
        
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = getComputedStyle(document.documentElement)
          .getPropertyValue('--particle-primary').trim() || '#ffffff';
        ctx.font = `bold ${Math.floor(currentSize)}px Oswald, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 0;
        ctx.fillText('OPTIMIZE', Math.floor(currentX), Math.floor(currentY));
        ctx.restore();
      }

      if (progress < 1 && mounted) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (mounted && !completionTriggeredRef.current) {
        completionTriggeredRef.current = true;
        setIsComplete(true);
        onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      mounted = false;
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onComplete, duration]); 

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: isComplete ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: isComplete ? 'none' : 'auto'
        }}
      />
      
      
      {!isComplete && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-lg text-text-secondary opacity-70">
            {animationPhase === 'particles' && 'Loading...'}
            {animationPhase === 'text' && 'Optimizing...'}
            {animationPhase === 'complete' && 'Ready!'}
          </div>
        </div>
      )}
    </div>
  );
}