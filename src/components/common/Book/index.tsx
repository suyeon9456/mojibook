import { BookBackCover, BookCoverOuter } from './BookCover';

const Book = () => (
    <>
        <BookBackCover />
        {/* Book inner */}
        <div className="absolute inset-0 translate-x-[5px] translate-y-[8px] translate-z-[-44px] w-[382px] h-[476px] bg-yellow-100 rounded-[2%] shadow-inner [transform-style:preserve-3d]" />
        <BookCoverOuter />
        {/* Book side */}
        <div className="absolute h-full left-0 w-[50px] bg-yellow-400 origin-left rotate-y-90 rounded-sm" />

        {/* Book top */}
        <div
            className="absolute w-[380px] top-0 h-[50px] bg-yellow-100 origin-top rounded-l-sm"
            style={{
                transform: 'rotateX(90deg) translateZ(-10px) translateY(-55px) translateX(-10px)',
                backgroundImage: 'linear-gradient(180deg, #00000010 1px, transparent 0.5px)',
                backgroundSize: '8px 8px',
            }}
        />
    </>
);

export default Book;
