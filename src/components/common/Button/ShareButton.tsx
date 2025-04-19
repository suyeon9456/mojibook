import classNames from 'classnames';
import Button from './BasicButton';

interface ShareButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
}

const ShareButton = ({ icon, onClick, className }: ShareButtonProps) => {
    return (
        <Button
            className={classNames('absolute top-[32px] right-[32px]', className)}
            label={icon}
            type="icon"
            onClick={onClick}
        />
    );
};

export default ShareButton;
