import { motion } from 'framer-motion';

const InteractionIndicator = ({ show, description }: { show: boolean; description?: string }) => {
    if (!show) return <></>;
    return (
        <>
            <motion.div
                className="absolute w-16 h-16 rounded-full border-2 border-white"
                style={{
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                    pointerEvents: 'none',
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <div>{description ?? '클릭해 주세요'}</div>
        </>
    );
};

export default InteractionIndicator;
