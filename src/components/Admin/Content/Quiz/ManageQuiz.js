import './ManageQuiz.scss';
import React, { useState } from 'react';
import Select from 'react-select';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateNewQuiz } from '../../../../services/apiServices';
import TableQuiz from './TableQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('');


    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);

        } else {

        }
    }


    const handleSubmitQuiz = async () => {
        //vlaidate
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setType('');
            setPreviewImage('');
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Your quiz name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Description...'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div className='my-3 '>
                        <Select
                            value={type}
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder={"Quiz type..."}
                        />
                    </div>
                    <div className="more-actions">
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus /> Upload File Image
                        </label>
                        <input
                            type="file"
                            id="labelUpload"
                            hidden
                            onChange={(event) => handleUploadImage(event)}
                        />

                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage ?
                            <img src={previewImage} />
                            :
                            <span>Preview Image</span>
                        }
                    </div>
                    <div className='mt-3'>
                        <button
                            onClick={() => handleSubmitQuiz()}
                            className='btn btn-warning'>Save</button>
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                <TableQuiz />
            </div>
        </div>
    )
}

export default ManageQuiz;