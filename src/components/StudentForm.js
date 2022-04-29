import React,
{
    createRef,
} from 'react';
import axios from 'axios';
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MyButton from './MyButton';
import MyInput from './MyInput';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    saveButtonGrid: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

function StudentForm(props) {
    const {
        studentId,
        studentName,
        onSave,
    } = props;

    const inputNameRef = createRef();

    const getInputNameRef = () => {
        return inputNameRef.current;
    };

    const handleOnButtonSaveClick = async () => {
        if (studentId) {
            await axios.put(`/api/TbAluno/${studentId}`, {
                id: studentId,
                nome: getInputNameRef().getValue(),
            });

            onSave('Aluno alterado com sucesso');
        } else {
            await axios.post('/api/TbAluno', {
                nome: getInputNameRef().getValue(),
            });

            onSave('Aluno cadastro com sucesso');
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={6}
                >
                    <MyInput
                        fullWidth
                        ref={inputNameRef}
                        defaultValue={studentName}
                        label='Nome: '
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.saveButtonGrid}
                >
                    <MyButton
                        text='Salvar'
                        onClick={handleOnButtonSaveClick}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default StudentForm;
