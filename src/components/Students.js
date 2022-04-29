import React,
{
    createRef,
    useRef,
} from 'react';
import axios from 'axios';

import MyButton from './MyButton';
import MyInput from './MyInput';
import MyDataGrid from './MyDataGrid';

function Students(props) {
    const {
        onNewButtonClick,
        onUpdateButtonClick,
    } = props;

    const inputNameRef = createRef();
    const alunoMyDataGridRef = createRef();

    const selectedRowId = useRef(null);

    const getInputNameRef = () => {
        return inputNameRef.current;
    };

    const getAlunoMyDataGridRef = () => {
        return alunoMyDataGridRef.current;
    };

    const setSelectedRowId = rowId => {
        selectedRowId.current = rowId;
    };

    const getSelectedRowId = () => {
        return selectedRowId.current;
    };

    const handleOnMyDataGridUpdateRow = (rowId, rowData) => {
        onUpdateButtonClick({
            id: rowId,
            nome: rowData.nome,
        });

        // setSelectedRowId(rowId);

        // getInputNameRef().setValue(rowData.nome);
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

        getAlunoMyDataGridRef().getData();
        getInputNameRef().setValue('');
    };

    return (
        <div>
            <MyDataGrid
                ref={alunoMyDataGridRef}
                title='Alunos'
                baseURL='api/TbAluno'
                idColumnName='id'
                onNewButtonClick={onNewButtonClick}
                updateRow={handleOnMyDataGridUpdateRow}
                columns={[
                    {
                        field: 'id',
                        headerName: 'ID',
                        width: 90,
                    },
                    {
                        field: 'nome',
                        headerName: 'Nome',
                        flex: 1,
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

export default Students;
