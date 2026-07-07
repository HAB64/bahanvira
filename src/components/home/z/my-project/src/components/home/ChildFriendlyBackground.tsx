'use client';

import { useEffect, useState } from 'react';

// Floating shapes based on child psychology principles:
// - Stars: wonder, achievement, dreams
// - Circles: wholeness, safety, comfort
// - Triangles: growth, direction, energy
// - Clouds: imagination, calm, safety
// - Bubbles: playfulness, curiosity

interface FloatingShape {
  id: number;
  type: 'star' | 'circle' | 'triangle' | 'cloud' | 'bubble' | 'diamond' | 'hexagon';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  rotation: number;
}

const colors = [
  'rgba(251, 191, 36, 0.15)',   // amber-400
  'rgba(245, 158, 11, 0.12)',   // amber-500
  'rgba(20, 184, 166, 0.12)',   // teal-500
  'rgba(16, 185, 129, 0.10)',   // emerald-500
  'rgba(251, 146, 60, 0.12)',   // orange-400
  'rgba(244, 114, 182, 0.08)',  // pink-400
  'rgba(167, 139, 250, 0.08)',  // violet-400
  'rgba(96, 165, 250, 0.08)',   // blue-400
];

function generateShapes(count: number): FloatingShape[] {
  const types: FloatingShape['type'][] = ['star', 'circle', 'triangle', 'cloud', 'bubble', 'diamond', 'hexagon'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 12 + Math.random() * 40,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 10,
    opacity: 0.3 + Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
  }));
}

function ShapeSVG({ type, size, color }: { type: FloatingShape['type']; size: number; color: string }) {
  const s = size;
  switch (type) {
    case 'star':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'circle':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 3L22 21H2L12 3z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg width={s} height={s * 0.7} viewBox="0 0 24 16" fill={color}>
          <path d="M6 14a4 4 0 01-.87-7.9A5.5 5.5 0 0115.9 6 4.5 4.5 0 0119 14H6z" />
        </svg>
      );
    case 'bubble':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="8" cy="9" r="2" fill={color} opacity="0.5" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2L22 12L12 22L2 12L12 2z" />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ChildFriendlyBackground({ variant = 'hero' }: { variant?: 'hero' | 'section' | 'light' }) {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const count = variant === 'hero' ? 18 : variant === 'section' ? 10 : 6;
    setShapes(generateShapes(count));
  }, [variant]);

  if (shapes.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft gradient orbs - child psychology: warm, safe, enveloping */}
      {variant === 'hero' && (
        <>
          <div className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-amber-200/30 via-yellow-100/20 to-orange-100/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-teal-200/25 via-emerald-100/15 to-cyan-100/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-bl from-pink-100/20 via-rose-50/15 to-orange-50/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-gradient-to-r from-violet-100/15 via-purple-50/10 to-blue-50/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
        </>
      )}

      {/* Floating shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity * (variant === 'light' ? 0.4 : variant === 'section' ? 0.6 : 1),
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
        </div>
      ))}

      {/* Rainbow arc for hero - child psychology: wonder, magic, imagination */}
      {variant === 'hero' && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.04]">
          <svg viewBox="0 0 800 400" fill="none" className="w-full h-full">
            <path d="M0 400C0 179.09 179.09 0 400 0C620.91 0 800 179.09 800 400" stroke="url(#rainbow)" strokeWidth="40" strokeLinecap="round" />
            <defs>
              <linearGradient id="rainbow" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="16%" stopColor="#fb923c" />
                <stop offset="33%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="66%" stopColor="#60a5fa" />
                <stop offset="83%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
}
