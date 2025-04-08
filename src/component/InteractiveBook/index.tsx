import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCallback } from 'react';

const InteractiveBook = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [15, -50]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-50, 15]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
            x.set(offsetX);
            y.set(offsetY);
        },
        [x, y],
    );

    return (
        <div style={{ perspective: '1200px' }}>
            <motion.div
                className="relative w-[400px] h-[500px] cursor-pointer flex items-center justify-center my-auto"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
            >
                {/* Book back cover */}
                <motion.div className="absolute inset-0 rounded-sm bg-yellow-300 z-0 brightness-80 translate-z-[-50px] origin-center [transform-style:preserve-3d]" />
                {/* Book inner */}
                <div className="absolute inset-0 translate-x-[134px] translate-y-[8px] translate-z-[-44px] w-[252px] h-full bg-yellow-100 rounded-[2%] shadow-inner [transform-style:preserve-3d]" />
                {/* Book cover */}
                <motion.div
                    className="absolute inset-0 bg-yellow-300 rounded-sm origin-left"
                    style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
                    }}
                >
                    <div className="inset-0 flex flex-col justify-between p-10 pl-16">
                        <h3 className="text-black text-lg font-semibold leading-tight">
                            MOJI BOOK
                        </h3>
                        <p className="text-black text-sm opacity-70">yeonfuzoom</p>
                    </div>

                    <div
                        className="absolute inset-0 mix-blend-multiply opacity-30 rounded-sm"
                        style={{
                            backgroundImage: `radial-gradient(rgba(0,0,0,0.15) 1px, transparent 0.5px), url('/images/geometric.svg')`,
                            backgroundSize: `8px 8px, auto`,
                            backgroundPosition: `0 0, center 240px`,
                            backgroundRepeat: `repeat, no-repeat`,
                        }}
                    />
                </motion.div>

                {/* Book side */}
                <div className="absolute h-full left-0 w-[50px] bg-yellow-400 origin-left rotate-y-90 rounded-sm" />

                {/* Book top */}
                <div
                    className="absolute w-[380px] top-0 h-[50px] bg-yellow-100 origin-top rounded-l-sm"
                    style={{
                        transform:
                            'rotateX(90deg) translateZ(-10px) translateY(-55px) translateX(-10px)',
                        backgroundImage:
                            'linear-gradient(180deg, #00000010 1px, transparent 0.5px)',
                        backgroundSize: '8px 8px',
                    }}
                />

                {/* Book spine */}
                <div
                    className="absolute top-0 left-0 h-full w-9 bg-yellow-300 rounded-l-sm"
                    style={{ transformStyle: 'preserve-3d' }}
                />
                {/* Book spine shadow */}
                <div
                    className="absolute inset-0 pointer-events-none w-[16px] translate-x-[0px] left-1"
                    style={{
                        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.49) 0%, rgb(0, 0, 0) 39%, rgba(0, 0, 0, 0.3) 100%);`,
                        opacity: 0.1,
                        transformStyle: 'preserve-3d',
                    }}
                />
                {/* Book spine shadow */}
                <div
                    className="absolute inset-0 pointer-events-none w-[10px] translate-x-[0px] left-8"
                    style={{
                        background: `linear-gradient(270deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.7) 80%, rgba(255, 255, 255, 0.5) 100%)`,
                        opacity: 0.1,
                        transformStyle: 'preserve-3d',
                    }}
                />
            </motion.div>
        </div>
    );
};

export default InteractiveBook;
