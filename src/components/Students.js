import React from 'react';

import MyDataGrid from './MyDataGrid';

function Students(props) {
    const {
        onNewButtonClick,
        onUpdateButtonClick,
    } = props;

    const handleOnMyDataGridUpdateRow = (rowId, rowData) => {
        onUpdateButtonClick({
            id: rowId,
            nome: rowData.nome,
        });
    };

    return (
        <MyDataGrid
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
    );
}

export default Students;
