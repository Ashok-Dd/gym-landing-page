'use client';

const TEXT =
  'ETERNAL STRENGTH · FORGE YOUR LEGACY · NO LIMITS · AEVUM · ELITE ONLY · BUILT TO LAST · ETERNAL STRENGTH · FORGE YOUR LEGACY · NO LIMITS · AEVUM · ELITE ONLY · BUILT TO LAST · ';

export default function Manifesto() {
  return (
    <div
      className="relative overflow-hidden py-5 select-none"
      style={{ background: 'linear-gradient(135deg,#e63946,#c52030)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.4) 10px, rgba(0,0,0,0.4) 11px)',
        }}
      />
      <div className="relative flex whitespace-nowrap">
        <span className="animate-marquee inline-block font-heading text-white text-2xl tracking-[0.14em]" aria-hidden>
          {TEXT}{TEXT}
        </span>
      </div>
    </div>
  );
}
