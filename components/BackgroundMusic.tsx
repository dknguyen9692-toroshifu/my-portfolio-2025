import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tracks = [
    {
        title: "snowfall",
        artist: "øneheart x reidenshi",
        src: "https://res.cloudinary.com/dcc0zasye/video/upload/v1764618556/bgm_s3u4ed.mp3"
    },
    {
        title: "Mục hạ vô nhân",
        artist: "SOOBIN X BINZ",
        src: "https://res.cloudinary.com/dcc0zasye/video/upload/v1764617541/bgm2_qvhq6v.mp3"
    },
    {
        title: "Ain't Letting You Down",
        artist: "Martin Garrix & Saksham feat. Scott Quinn",
        src: "https://res.cloudinary.com/dcc0zasye/video/upload/v1764618183/bgm3_ldifqq.mp3"
    },
    {
        title: "Idea 22",
        artist: "Gibran Alcocer",
        src: "https://res.cloudinary.com/dcc0zasye/video/upload/v1764619327/bgm4_oq0uz5.mp3"
    },
    {
        title: "hope to see you again",
        artist: "antent",
        src: "https://res.cloudinary.com/dcc0zasye/video/upload/v1764620108/bgm5_ngmjks.mp3"
    }
];

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Initialize random track on client side only to avoid hydration mismatch if SSR (though this is SPA)
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        setCurrentTrackIndex(randomIndex);
        setHasStarted(true);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;

            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.log("Audio playback failed:", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]); // Re-run when track changes

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTrackEnd = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    if (!hasStarted) return null; // Prevent rendering until random track is set

    const currentTrack = tracks[currentTrackIndex];

    return (
        <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4 mix-blend-difference">
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onEnded={handleTrackEnd}
                preload="none"
            />

            <button
                onClick={togglePlay}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={!isPlaying ? "Play background music" : undefined}
            >
                {/* Visualizer Bars Animation */}
                <AnimatePresence>
                    {isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center gap-[3px] pointer-events-none opacity-50">
                            {[1, 2, 3, 4].map((bar) => (
                                <motion.div
                                    key={bar}
                                    className="w-[2px] bg-white"
                                    animate={{
                                        height: [8, 16, 8],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: bar * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                <Music
                    size={20}
                    className={`text-white transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
            </button>

            <AnimatePresence mode="wait">
                {isPlaying && (
                    <motion.div
                        key="music-text"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="group relative text-white/50 text-xs font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleTrackEnd}
                        title="Click to skip track"
                    >
                        <div className="overflow-hidden">
                            <motion.div
                                key={isHovered ? "song" : "status"}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isHovered ? (
                                    <span className="text-white">"{currentTrack.title}" by {currentTrack.artist}</span>
                                ) : (
                                    "Sound On"
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BackgroundMusic;
