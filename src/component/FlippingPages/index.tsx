import { motion } from 'framer-motion';

const FlippingPages = () => {
    const pages = Array(15).fill(0);
    const halfIndex = Math.floor(pages.length / 2);
    return (
        <div className="relative w-[400px] h-[500px] perspective-[800px] mx-auto">
            {pages.slice(0, halfIndex).map((content, index) => (
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-white border border-gray-300 flex items-center justify-center backface-visibility-hidden"
                    key={index}
                    style={{
                        zIndex: pages.length - index,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        transformOrigin: 'left',
                    }}
                    initial={{ rotateY: 0, skewY: 0 }}
                    animate={{ rotateY: -180, skewY: 2 }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'easeInOut',
                    }}
                ></motion.div>
            ))}
        </div>
    );
};

export default FlippingPages;
