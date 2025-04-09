import { motion } from 'framer-motion';

interface BasicPageProps {
    index: number;
    totalPages: number;
    onAnimationComplete: () => void;
}

const BasicPage = ({ index, totalPages, onAnimationComplete }: BasicPageProps) => {
    return (
        <>
            <motion.div className="flipping-page" initial={{ rotateY: 0 }} />
            <motion.div
                className="flipping-page"
                key={index}
                style={{
                    zIndex: totalPages - index,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transformOrigin: 'left',
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                }}
                onAnimationComplete={onAnimationComplete}
            >
                <div className="bg-white" />
                <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 10%)',
                    }}
                />
            </motion.div>
        </>
    );
};

export default BasicPage;
