import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import styles from './page.module.css';
import Button from '@/components/common/Button';
import { ComponentProps } from 'react';
import Image from 'next/image';
import { Message } from '@/models/message';

interface ZoomPageProps {
    messageId: Message['id'];
    message: string;
    actions?: {
        label: string;
        buttonType?: ComponentProps<typeof Button>['type'];
        onClick: () => void;
    }[];
}

const ZoomPage = ({ messageId, message, actions }: ZoomPageProps) => {
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
            <Button.Share
                className="absolute top-[32px] right-[32px]"
                icon={
                    <Image
                        src="/icons/talk.svg"
                        alt="카카오톡 공유 아이콘"
                        width={16}
                        height={16}
                    />
                }
                onClick={() => {
                    (window as any).Kakao.Share.sendDefault({
                        objectType: 'feed',
                        content: {
                            title: '모지북',
                            description: '당신을 위한 한마디를 받아보세요. ✨',
                            imageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/images/og_image.png`,
                            link: {
                                mobileWebUrl: `${process.env.NEXT_PUBLIC_APP_URL}/message?id=${messageId}`,
                                webUrl: `${process.env.NEXT_PUBLIC_APP_URL}/message?id=${messageId}`,
                            },
                        },
                    });
                }}
            />
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
