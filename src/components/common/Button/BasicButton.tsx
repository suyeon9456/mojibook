import classNames from 'classnames';

interface ButtonProps {
    label: React.ReactNode;
    onClick: () => void;
    className?: string;
    type?: 'primary' | 'default' | 'icon';
}

const BasicButton = ({ label, onClick, className, type = 'default' }: ButtonProps) => {
    return (
        <button
            className={classNames(
                'p-1.5 rounded-md',
                'cursor-pointer',
                'text-[14px] font-semibold',
                {
                    'text-[#051d2c] bg-white': type === 'default',
                    'bg-linear-135 from-[#ff984f] to-[#ffdf20] text-white hover:bg-blue-600':
                        type === 'primary',
                    'text-[#051d2c] bg-transparent hover:bg-transparent': type === 'icon',
                },
                className,
            )}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default BasicButton;
