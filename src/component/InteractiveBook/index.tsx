import { motion } from 'framer-motion';

const InteractiveBook = () => {
    return (
        <motion.div className="relative w-[400px] h-[500px] cursor-pointer flex items-center justify-center my-auto">
            {/* Book pages */}
            <motion.div
                className="absolute inset-0 rounded-[3.9%_/_3.1%] bg-yellow-300 z-0"
                style={{
                    filter: 'brightness(0.8)',
                    transform: 'translate3d(0px, 0px, -20px)',
                    transformOrigin: '50% 50%',
                }}
            />
            <div className="absolute inset-0 translate-x-[134px] translate-y-[2px] w-[20px] h-full bg-yellow-100 rounded-[2%] shadow-inner" />
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
                    <h3 className="text-black text-lg font-semibold leading-tight">MOJI BOOK</h3>
                    <p className="text-black text-sm opacity-70">yeonfuzoom</p>
                </div>

                <div className="absolute inset-0 bg-[url('/images/geometric.svg')] bg-[center_240px] bg-no-repeat mix-blend-multiply opacity-30 rounded-sm" />
            </motion.div>
            {/* Book spine */}
            <div className="absolute top-0 left-0 h-full w-9 bg-yellow-300 rounded-l-sm" />
            {/* Book spine shadow */}
            <div
                className="absolute inset-0 pointer-events-none w-[16px] translate-x-[0px] left-1"
                style={{
                    background: `linear-gradient(90deg, rgba(255, 255, 255, 0.49) 0%, rgb(0, 0, 0) 39%, rgba(0, 0, 0, 0.3) 100%);`,
                    opacity: 0.1,
                }}
            />
            {/* Book spine shadow */}
            <div
                className="absolute inset-0 pointer-events-none w-[10px] translate-x-[0px] left-8"
                style={{
                    background: `linear-gradient(270deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.7) 80%, rgba(255, 255, 255, 0.5) 100%)`,
                    opacity: 0.1,
                }}
            />
        </motion.div>
    );
};

export default InteractiveBook;
