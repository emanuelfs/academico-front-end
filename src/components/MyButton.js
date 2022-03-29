import { useState } from 'react';

function MyButton(props) {
    const {
        text,
        increment,
        setTitle,
        onClick,
    } = props;

    const [count, setCount] = useState(0);

    const handleOnClick = event => {
        if (onClick) {
            onClick(event);
        } else {
            setTitle(text);
            setCount(count + increment);
        }
    };

    return (
        <button onClick={handleOnClick}>
            {!!increment ? `${text}: ${count}` : text}
        </button>
    );
}

export default MyButton;
