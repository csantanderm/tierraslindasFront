import React from 'react';
import FamilyForm from '../../Components/forms/FamilyForm';
import { useParams } from 'react-router-dom';

const EditFamilyPage = () => {
    const {id} = useParams()
    return (
        <div>
            <FamilyForm id={id}></FamilyForm>
        </div>
    );
}

export default EditFamilyPage;
