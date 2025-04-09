import BasicPage from './BasicPage';

interface PagesProps {
    pages: number[];
    handleAnimationComplete: (index: number) => void;
}

const Pages = ({ pages, handleAnimationComplete }: PagesProps) => {
    return (
        <>
            {pages.map((_, index) => (
                <BasicPage
                    key={index}
                    index={index}
                    totalPages={pages.length}
                    onAnimationComplete={() => handleAnimationComplete(index)}
                />
            ))}
        </>
    );
};

export default Pages;
