import classNames from 'classnames';
import Button from './BasicButton';

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
}

const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
    return <Button className={classNames(className)} label={icon} type="icon" onClick={onClick} />;
};

export default IconButton;
