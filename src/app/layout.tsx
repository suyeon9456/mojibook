import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import localFont from 'next/font/local';
import classNames from 'classnames';

const pretendard = localFont({
    src: '../../public/fonts/Pretendard/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: 'MOJI BOOK',
    description: '무엇이든 대답해주는 모지북',
    metadataBase: new URL('https://mojibook.vercel.app'),
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
    other: {
        'Content-Security-Policy': 'upgrade-insecure-requests',
    },
    openGraph: {
        title: 'MOJI BOOK',
        description: '무엇이든 대답해주는 모지북',
        images: [
            {
                url: '/images/og_image.png',
            },
        ],
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preload" href="/images/bg1.png" as="image" />
            </head>
            <body className={classNames(pretendard.variable, 'font-pretendard')}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
