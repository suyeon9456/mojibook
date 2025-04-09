const BookCoverInner = ({ className }: { className?: string }) => {
    return (
        <div
            className={`rounded-sm bg-yellow-400 z-0 origin-center h-full w-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.15)] ${className || ''}`}
            style={{
                backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)`,
                backgroundSize: '5px 5px',
                backgroundPosition: '0 0',
                backgroundRepeat: 'repeat',
            }}
        />
    );
};

export default BookCoverInner;
