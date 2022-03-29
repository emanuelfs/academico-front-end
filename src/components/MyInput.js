import {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';

const MyInput = forwardRef((props, ref) => {
    const {
        label,
        defaultValue,
    } = props;

    const [value, setValue] = useState(defaultValue);

    const getValue = () => {
        return value;
    }

    const handleOnChange = ({ target }) => {
        setValue(target.value);
    };

    useImperativeHandle(ref, () => ({
        getValue,
    }));

    return (
        <div>
            <label>{label}</label>
            <input
                value={value}
                onChange={handleOnChange}
            />
        </div>
    );
});

export default MyInput;
