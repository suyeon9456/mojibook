export const BookCoverOuter = () => {
    return (
        <>
            <div
                className="absolute inset-0 origin-left bg-yellow-300 rounded-sm"
                style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
                }}
            >
                <div className="inset-0 flex flex-col justify-between p-10 pl-16">
                    <h3 className="text-black text-[36px] font-semibold leading-tight">
                        MOJI BOOK
                    </h3>
                    <p className="text-sm font-semibold text-black opacity-70">ypeuzoom</p>
                </div>

                <div
                    className="absolute inset-0 rounded-sm mix-blend-multiply opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(rgba(0,0,0,0.15) 1px, transparent 0.5px), url('/images/ellipse.svg')`,
                        backgroundSize: `8px 8px, auto`,
                        backgroundPosition: `0px 0px, 120px 340px`,
                        backgroundRepeat: `repeat, no-repeat`,
                    }}
                />
            </div>
            {/* Book spine */}
            <div
                className="absolute top-0 left-0 h-full bg-yellow-300 rounded-l-sm w-9"
                style={{ transformStyle: 'preserve-3d' }}
            />
            {/* Book spine shadow */}
            <div
                className="absolute inset-0 pointer-events-none w-[16px] translate-x-[0px] left-1"
                style={{
                    background: `linear-gradient(90deg, rgba(255, 255, 255, 0.49) 0%, rgb(0, 0, 0) 39%, rgba(0, 0, 0, 0.3) 100%);`,
                    opacity: 0.1,
                    transformStyle: 'preserve-3d',
                }}
            />
            {/* Book spine shadow */}
            <div
                className="absolute inset-0 pointer-events-none w-[10px] translate-x-[0px] left-8"
                style={{
                    background: `linear-gradient(270deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.7) 80%, rgba(255, 255, 255, 0.5) 100%)`,
                    opacity: 0.1,
                    transformStyle: 'preserve-3d',
                }}
            />
        </>
    );
};

export const BookBackCover = () => {
    return (
        <div className="absolute inset-0 rounded-sm bg-yellow-300 z-0 brightness-80 translate-z-[-50px] origin-center [transform-style:preserve-3d]" />
    );
};
