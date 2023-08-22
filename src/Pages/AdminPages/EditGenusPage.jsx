import React from 'react';
import { useParams } from 'react-router-dom';
import GenusForm from '../../Components/forms/GenusForm';

const EditGenusPage = () => {
    const {id} = useParams()
    return (
        <div>
            <GenusForm id={id}></GenusForm>
        </div>
    );
}

export default EditGenusPage;
