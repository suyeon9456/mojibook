import BasicButton from './BasicButton';
import IconButton from './IconButton';

const Button = BasicButton as typeof BasicButton & {
    Icon: typeof IconButton;
};

Button.Icon = IconButton;

export default Button;
