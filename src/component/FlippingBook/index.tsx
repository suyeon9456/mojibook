import { motion } from 'framer-motion';
import BookCoverInner from './BookCoverInner';
import BookPage from './BookPage';

const FlippingBook = () => {
    const pages = Array(8).fill(0);
    return (
        <motion.div className="relative w-[400px] h-[500px] perspective-[800px]">
            <BookCoverInner className="absolute top-0 left-[-400px]" />
            {pages.map((_, index) => (
                <BookPage key={index} index={index} totalPages={pages.length} />
            ))}
            <motion.div
                className="absolute top-2 left-0 w-[380px] h-[480px] bg-white flex items-center justify-center backface-visibility-hidden rounded-sm"
                initial={{ rotateY: 0 }}
                style={{
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }}
            />
            <BookCoverInner />
        </motion.div>
    );
};

export default FlippingBook;
