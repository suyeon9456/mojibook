import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['var(--font-pretendard)'],
                sans: ['Pretendard', 'sans-serif'],
            },
        },
    },
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    plugins: [],
};
export default config;
