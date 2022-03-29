import { createRef } from 'react';
import axios from 'axios';

import MyButton from './components/MyButton';
import MyInput from './components/MyInput';
import MyTitle from './components/MyTitle';

function App() {

    const myTitleRef = createRef();
    const inputNameRef = createRef();

    const getMyTitleRef = () => {
        return myTitleRef.current;
    };

    const getInputNameRef = () => {
        return inputNameRef.current;
    };

    const setTitle = newTitle => {
        getMyTitleRef().setTitle(newTitle);
    };

    const handleOnButtonSaveClick = async () => {
        await axios.post('/api/TbAluno', {
            nome: getInputNameRef().getValue(),
        });
    };

    return (
        <div>
            <MyTitle
                ref={myTitleRef}
                defaultTitle='Minha aplicação'
            />
            <br />
            <MyButton
                text='Botão 1'
                increment={1}
                setTitle={setTitle}
            />
            <br />
            <MyButton
                text='Botão 2'
                increment={2}
                setTitle={setTitle}
            />
            <br />
            <MyButton
                text='Botão 3'
                increment={3}
                setTitle={setTitle}
            />
            <br />
            <MyButton
                text='Botão 4'
                increment={4}
                setTitle={setTitle}
            />
            <br />
            {[1, 2, 3, 4, 5, 6, 7].map((value, index) =>
                <MyButton
                    key={index}
                    text={`Botão ${value}`}
                    increment={value}
                    setTitle={setTitle}
                />
            )}
            <br />
            <br />
            <MyInput
                ref={inputNameRef}
                label='Nome: '
            />
            <br />
            <MyButton
                text='Salvar'
                onClick={handleOnButtonSaveClick}
            />
        </div>
    );
}

export default App;
