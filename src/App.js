import {
    createRef,
    useRef,
} from 'react';
import axios from 'axios';

import MyButton from './components/MyButton';
import MyInput from './components/MyInput';
import MyTitle from './components/MyTitle';
import DataGrid from './components/DataGrid';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

    const myTitleRef = createRef();
    const inputNameRef = createRef();
    const alunoDataGridRef = createRef();

    const selectedRowId = useRef(null);

    const getMyTitleRef = () => {
        return myTitleRef.current;
    };

    const getInputNameRef = () => {
        return inputNameRef.current;
    };

    const getAlunoDataGridRef = () => {
        return alunoDataGridRef.current;
    };

    const setSelectedRowId = rowId => {
        selectedRowId.current = rowId;
    };

    const getSelectedRowId = () => {
        return selectedRowId.current;
    };

    const setTitle = newTitle => {
        getMyTitleRef().setTitle(newTitle);
    };

    const handleOnDataGridUpdateRow = (rowId, rowData) => {
        setSelectedRowId(rowId);

        getInputNameRef().setValue(rowData.nome);
    };

    const handleOnButtonSaveClick = async () => {
        let rowId = getSelectedRowId();

        if (rowId) {
            await axios.put(`/api/TbAluno/${rowId}`, {
                id: rowId,
                nome: getInputNameRef().getValue(),
            });

            setSelectedRowId(null);
        } else {
            await axios.post('/api/TbAluno', {
                nome: getInputNameRef().getValue(),
            });
        }

        getAlunoDataGridRef().getData();
        getInputNameRef().setValue('');
    };

    return (
        <div
            style={{
                margin: '5% 15%',
            }}
        >
            {/* <MyTitle
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
            <br /> */}
            <DataGrid
                ref={alunoDataGridRef}
                baseURL='api/TbAluno'
                idColumnName='id'
                updateRow={handleOnDataGridUpdateRow}
                columns={[
                    {
                        value: 'id',
                        display: 'ID',
                    },
                    {
                        value: 'nome',
                        display: 'Nome',
                    },
                ]}
            />
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
