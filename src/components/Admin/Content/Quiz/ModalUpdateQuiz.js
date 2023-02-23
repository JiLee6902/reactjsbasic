import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../services/apiServices';
import _ from 'lodash';
import Select from 'react-select';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData();
    };


    
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {

        }

    }


    const handleSubmitUpdateQuiz = async () => {
        let data = await putUpdateQuiz(dataUpdate.id, description, name, type?.value, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListQuizs();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }

    const handleSubmit = () => {
        console.log("check type", type);
        console.log("check difficulty >>>: ", dataUpdate.difficulty);
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                //ngăn chặn hành vi bấm ngoài màn hình đóng bảng add user
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label>Name</label>
                             <input
                            type="text"
                            className="form-control"
                            placeholder='Your quiz name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        </div>
                        <div className="col-md-6">
                            <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Description...'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        </div>
                        <div className="col-md-6">
                        <label>Difficulty</label>
                        <Select
                            value={type}
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder={type}
                        />
                        </div>
                        <div className="col-md-12">
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;

