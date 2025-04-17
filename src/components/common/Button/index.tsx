import classNames from 'classnames';

interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
    type?: 'primary' | 'default';
}

const Button = ({ label, onClick, className, type = 'default' }: ButtonProps) => {
    return (
        <button
            className={classNames(
                'p-2 rounded-md',
                'cursor-pointer',
                {
                    'text-[#051d2c] bg-white': type === 'default',
                    'bg-linear-135 from-[#ff984f] to-[#ffdf20] text-white hover:bg-blue-600':
                        type === 'primary',
                },
                className,
            )}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
