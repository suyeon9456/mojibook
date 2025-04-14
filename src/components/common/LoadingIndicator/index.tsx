import * as motion from 'motion/react-client';

const LoadingIndicator = () => {
    return (
        <motion.div
            className="absolute top-[50%] left-[50%] w-full h-full flex justify-center items-center z-100"
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
            }}
            transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
            }}
            style={box}
        />
    );
};

const box = {
    width: 30,
    height: 30,
    // backgroundColor: '#ff984f',
    background: 'linear-gradient(135deg, #ff984f, #ffdf20)',
    borderRadius: 5,
};

export default LoadingIndicator;
