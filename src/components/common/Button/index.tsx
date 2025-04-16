const Button = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className="p-2 text-white bg-transparent rounded-md" onClick={onClick}>
            Click me
        </button>
    );
};

export default Button;
