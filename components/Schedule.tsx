'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type ClassType = 'yoga' | 'strength' | 'hiit' | 'cardio' | 'pilates' | 'crossfit' | '';

interface ClassCell {
  type: ClassType;
  name: string;
  trainer: string;
}

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const TIMES = ['06:00', '08:00', '10:00', '12:00', '16:00', '18:00', '20:00'];

type Row = ClassCell[];

const SCHEDULE: Row[] = [
  [
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: '',         name: '',            trainer: ''          },
  ],
  [
    { type: 'pilates',  name: 'Pilates',     trainer: 'Priya S.' },
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: 'crossfit', name: 'CrossFit',    trainer: 'Emma W.'  },
    { type: 'pilates',  name: 'Pilates',     trainer: 'Priya S.' },
  ],
  [
    { type: 'crossfit', name: 'CrossFit',    trainer: 'Emma W.'  },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: 'pilates',  name: 'Pilates',     trainer: 'Priya S.' },
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: '',         name: '',            trainer: ''          },
  ],
  [
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
    { type: '',         name: '',            trainer: ''          },
    { type: 'pilates',  name: 'Pilates',     trainer: 'Priya S.' },
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
  ],
  [
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'pilates',  name: 'Pilates',     trainer: 'Priya S.' },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
    { type: '',         name: '',            trainer: ''          },
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'crossfit', name: 'CrossFit',    trainer: 'Emma W.'  },
  ],
  [
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
    { type: 'crossfit', name: 'CrossFit',    trainer: 'Emma W.'  },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: 'hiit',     name: 'HIIT',        trainer: 'James O.' },
    { type: 'pilates',  name: 'Pilates',     trainer: 'Priya S.' },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'cardio',   name: 'Cardio',      trainer: 'Alex C.'  },
  ],
  [
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: 'strength', name: 'Strength',    trainer: 'Mike T.'  },
    { type: 'crossfit', name: 'CrossFit',    trainer: 'Emma W.'  },
    { type: '',         name: '',            trainer: ''          },
    { type: 'crossfit', name: 'CrossFit',    trainer: 'Emma W.'  },
    { type: 'yoga',     name: 'Yoga Flow',   trainer: 'Sofia R.' },
    { type: '',         name: '',            trainer: ''          },
  ],
];

const CLASS_COLORS: Record<Exclude<ClassType, ''>, string> = {
  yoga:     'bg-indigo-900/30 text-indigo-400 border border-indigo-600/30',
  strength: 'bg-red-900/25   text-forge-red  border border-red-600/30',
  hiit:     'bg-amber-900/25 text-amber-400  border border-amber-600/30',
  cardio:   'bg-emerald-900/25 text-emerald-400 border border-emerald-600/30',
  pilates:  'bg-pink-900/25  text-pink-400   border border-pink-600/30',
  crossfit: 'bg-orange-900/25 text-orange-400 border border-orange-600/30',
};

const LEGEND: [Exclude<ClassType, ''>, string][] = [
  ['yoga',     'Yoga'],
  ['strength', 'Strength'],
  ['hiit',     'HIIT'],
  ['cardio',   'Cardio'],
  ['pilates',  'Pilates'],
  ['crossfit', 'CrossFit'],
];

export default function Schedule() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="schedule" className="py-28 bg-forge-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Weekly Schedule
          </p>
          <h2 className="font-heading text-white leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Find Your <span className="text-forge-red">Perfect</span> Class
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="overflow-x-auto -mx-6 px-6"
        >
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 mb-2">
              <div className="text-forge-muted text-xs font-body font-bold tracking-wider uppercase flex items-center">
                TIME
              </div>
              {DAYS.map((d) => (
                <div key={d} className="text-center text-forge-muted text-xs font-body font-bold tracking-wider uppercase py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Rows */}
            {TIMES.map((time, rowIdx) => (
              <div key={time} className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 mb-2">
                <div className="text-forge-muted text-xs font-body font-semibold flex items-center">
                  {time}
                </div>
                {SCHEDULE[rowIdx].map((cell, colIdx) => (
                  <div key={colIdx} className="min-h-[60px]">
                    {cell.type ? (
                      <div
                        className={`h-full p-2 rounded-lg text-center transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-lg ${CLASS_COLORS[cell.type]}`}
                      >
                        <p className="font-body text-[11px] font-bold leading-tight">{cell.name}</p>
                        <p className="font-body text-[10px] opacity-70 mt-0.5 leading-tight">{cell.trainer}</p>
                      </div>
                    ) : (
                      <div className="h-full rounded-lg bg-forge-dark/30 border border-forge-border/30" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {LEGEND.map(([type, label]) => (
            <span
              key={type}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-bold tracking-wider ${CLASS_COLORS[type]}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
