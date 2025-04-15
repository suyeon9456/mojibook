import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
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
                url: '/images/og-image.png',
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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
