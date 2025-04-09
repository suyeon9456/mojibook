'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCallback, useState } from 'react';
import Book from '../common/Book';
import InteractionIndicator from '../common/InteractionIndicator';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

const InteractiveBook = ({ handleBookClick }: { handleBookClick: () => void }) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    const rotateX = useTransform(y, [-0.5, 0.5], [15, -50]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-50, 15]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
            x.set(offsetX);
            y.set(offsetY);
        },
        [x, y],
    );

    return (
        <div style={{ perspective: '1200px' }}>
            <motion.div
                className={classNames(
                    'w-[400px] h-[500px] relative cursor-pointer flex items-center justify-center my-auto',
                    isSmallScreen ? 'scale-60' : 'scale-80',
                )}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onClick={handleBookClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Book />
                <InteractionIndicator show={isHovering} />
            </motion.div>
        </div>
    );
};

export default InteractiveBook;
