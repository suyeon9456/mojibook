import { motion } from 'framer-motion';
import BookCoverInner from './BookCoverInner';
import BookPage from './BookPage';

const FlippingBook = () => {
    const pages = Array(8).fill(0);
    return (
        <motion.div className="relative w-[800px] h-[500px] perspective-[800px]">
            <BookCoverInner className="absolute top-0 left-0" />
            {pages.map((_, index) => (
                <BookPage key={index} index={index} totalPages={pages.length} />
            ))}
            <BookCoverInner />
        </motion.div>
    );
};

export default FlippingBook;
