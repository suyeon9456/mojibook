import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import styles from './page.module.css';
import Button from '@/components/common/Button';
import { ComponentProps } from 'react';

interface ZoomPageProps {
    message: string;
    actions?: {
        label: string;
        buttonType?: ComponentProps<typeof Button>['type'];
        onClick: () => void;
    }[];
}

const ZoomPage = ({ message, actions }: ZoomPageProps) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    return (
        <motion.div
            className={classNames(
                'absolute top-0 left-0 w-full h-full bg-white box-shadow-lg p-40 z-100 flex items-center justify-center transform-origin-center pointer-events-auto rounded-sm flex-col gap-[50px]',
                styles.paper,
            )}
            initial={{ scale: 1, rotateX: 20 }}
            animate={{ scale: 1.2, rotateX: 0, translateY: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
        >
            <h2
                className={classNames(
                    'text-center',
                    isSmallScreen ? 'w-[100vw] text-lg px-[60px]' : 'text-lg',
                )}
            >
                {message}
            </h2>
            <div className="flex justify-center">
                {message &&
                    actions?.map((action) => (
                        <Button
                            key={action.label}
                            type={action.buttonType}
                            label={action.label}
                            onClick={action.onClick}
                        />
                    ))}
            </div>
        </motion.div>
    );
};

export default ZoomPage;
