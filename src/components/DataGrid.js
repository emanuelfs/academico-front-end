import axios from 'axios';
import {
    forwardRef,
    Fragment,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';

const DataGrid = forwardRef((props, ref) => {
    const {
        baseURL,
        columns,
        idColumnName,
        updateRow,
    } = props;

    const [state, setState] = useState({
        loadData: true,
        rows: [],
    });

    const handleOnUpdate = (rowId, rowData) => {
        updateRow(rowId, rowData);
    };

    const getData = async () => {
        const { data } = await axios.get(baseURL);

        setState({
            loadData: false,
            rows: data,
        });
    };

    const deleteRow = async rowId => {
        await axios.delete(`${baseURL}/${rowId}`);

        getData();
    };

    useEffect(() => {
        if (state.loadData) {
            getData();
        }
    }, [state.loadData, getData]);

    useImperativeHandle(ref, () => ({
        getData,
    }));

    const {
        rows,
    } = state;

    return (
        <Fragment>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                {columns.map(column => <div key={column.value}>{column.display}</div>)}
                <div>
                    Ações
                </div>
            </div>
            {rows.map((row, index) =>
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {columns.map(column => <div key={`${index}_${column.value}`}>{row[column.value]}</div>)}
                    <div>
                        <button
                            onClick={() => {
                                handleOnUpdate(row[idColumnName], row);
                            }}
                        >
                            Alterar
                        </button>
                        <button
                            onClick={() => {
                                deleteRow(row[idColumnName]);
                            }}
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    );
});

export default DataGrid;
