import { motion } from 'framer-motion';

interface ZoomPageProps {
    message: string;
}

const ZoomPage = ({ message }: ZoomPageProps) => {
    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white box-shadow-lg p-40 z-100 flex items-center justify-center transform-origin-center pointer-events-auto rounded-sm"
            initial={{ scale: 1, rotateX: 20 }}
            animate={{ scale: 1.2, rotateX: 0, translateY: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
        >
            <h2>{message}</h2>
        </motion.div>
    );
};

export default ZoomPage;
