import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Using Unsplash images to match the aesthetic (Corgis, Travel, Lifestyle)
const snapshots = [
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135146/snapshot12_bh3y6r.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135145/snapshot11_dnipfn.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135144/snapshot9_be6em2.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135144/snapshot10_cwlski.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135144/snapshot8_clpvb9.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135044/snapshot7_roweue.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135039/snapshot6_xshmhq.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135038/snapshot5_wqesut.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135037/snapshot4_lhveck.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135037/snapshot3_a05lvd.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135036/snapshot2_lvbdk3.jpg",
  "https://res.cloudinary.com/dcc0zasye/image/upload/v1764135036/snapshot1_o7irp7.jpg",
];

const SnapshotItem: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }} // Stagger based on column
      className="aspect-square overflow-hidden rounded-xl relative group"
    >
      <motion.div style={{ y, scale: 1.1 }} className="w-full h-full">
        <img
          src={src}
          alt={`Life snapshot ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          loading="lazy"
        />
      </motion.div>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

const LifeSnapshots: React.FC = () => {
  return (
    <section id="life" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative z-10">
      <div className="container mx-auto max-w-[90rem]"> {/* Wider container for this section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Left Side - Typography */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-32">
              {/* Heavy top border line to match reference */}
              <div className="w-full h-[2px] bg-primary mb-8 origin-left transform transition-all duration-1000"></div>

              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary font-bold tracking-tight leading-none mb-6">
                Life <br className="hidden lg:block" /> snapshots
              </h2>
            </div>
          </div>

          {/* Right Side - Image Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {snapshots.map((src, index) => (
                <SnapshotItem key={index} src={src} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LifeSnapshots;