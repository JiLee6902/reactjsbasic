import './ManageQuiz.scss';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiServices';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('');
    const [listQuizs, setListQuizs] = useState([]);
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListQuizs();
    }, []);

    const fetchListQuizs = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuizs(res.DT);
        }
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);

        } else {

        }
    }

    const handleClickBtnUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }

    const handleClickBtnDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
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
            await fetchListQuizs();
        } else {
            toast.error(res.EM)
        }
    }


    return (
        <div className="quiz-container">
             <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Manage Quizzes</Accordion.Header>
        <Accordion.Body>
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

            <div className="list-detail">
                <TableQuiz 
                listQuizs = {listQuizs}
                fetchListQuizs = {fetchListQuizs}
                handleClickBtnDeleteQuiz = {handleClickBtnDeleteQuiz}
                handleClickBtnUpdateQuiz = {handleClickBtnUpdateQuiz}
                />
                <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuizs={fetchListQuizs}
                resetUpdateData={resetUpdateData}
                />
                <ModalDeleteQuiz
                    show={showModalDeleteQuiz}
                    setShow={setShowModalDeleteQuiz}
                    dataDelete={dataDelete}
                    fetchListQuizs={fetchListQuizs}
                />
            </div>
        </div>
    )
}

export default ManageQuiz;