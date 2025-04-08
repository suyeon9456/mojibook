import { motion } from 'framer-motion';
// initial={{ rotateY: 0, skewY: 0, scale: 1, x: 0 }}
//                     animate={{ rotateY: -180, skewY: 2, scale: 1.2, x: 100 }}
const FlippingPages = () => {
    const pages = Array(8).fill(0);
    return (
        <motion.div className="relative w-[400px] h-[500px] perspective-[800px]">
            {pages.map((_, index) => (
                <motion.div
                    className="absolute top-2 left-0 w-[380px] h-[480px] bg-white flex items-center justify-center backface-visibility-hidden"
                    key={index}
                    style={{
                        zIndex: pages.length - index,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        transformOrigin: 'left',
                    }}
                    initial={{ rotateY: 0, skewY: 0 }}
                    animate={{ rotateY: -180, skewY: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="bg-white" />
                </motion.div>
            ))}
            <div
                className="rounded-sm bg-yellow-400 z-0 origin-center h-full flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)`,
                    backgroundSize: '5px 5px',
                    backgroundPosition: '0 0',
                    backgroundRepeat: 'repeat',
                }}
            />
        </motion.div>
    );
};

export default FlippingPages;
