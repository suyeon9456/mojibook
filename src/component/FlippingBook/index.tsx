import { motion } from 'framer-motion';
import BookCoverInner from './BookCoverInner';

const FlippingBook = () => {
    const pages = Array(8).fill(0);
    return (
        <motion.div className="relative w-[400px] h-[500px] perspective-[800px]">
            <BookCoverInner className="absolute top-0 left-[-400px]" />
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
                    animate={{ rotateY: -180, skewY: 0 - (pages.length - index) }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="bg-white" />
                </motion.div>
            ))}
            <motion.div
                className="absolute top-2 left-0 w-[380px] h-[480px] bg-white flex items-center justify-center backface-visibility-hidden"
                initial={{ rotateY: 0, skewY: -1 }}
                style={{
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }}
            />
            <BookCoverInner />
        </motion.div>
    );
};

export default FlippingBook;
