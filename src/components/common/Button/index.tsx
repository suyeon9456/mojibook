import classNames from 'classnames';

interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
    return (
        <button
            className={classNames('p-2 text-[#051d2c] bg-white rounded-md', className)}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
