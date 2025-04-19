import BasicButton from './BasicButton';
import ShareButton from './ShareButton';

const Button = BasicButton as typeof BasicButton & {
    Share: typeof ShareButton;
};

Button.Share = ShareButton;

export default Button;
