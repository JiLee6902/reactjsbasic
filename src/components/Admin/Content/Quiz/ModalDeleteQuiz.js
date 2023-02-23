import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiServices';


const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuiz(dataDelete.id);
    console.log('check: ', dataDelete)
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListQuizs();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

  return (
    <>

      <Modal show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      //ngăn chặn hành vi bấm ngoài màn hình đóng bảng add user
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this quiz.Name = 
          <b>{
            dataDelete && dataDelete.name ?
              dataDelete.name : ""}
          </b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { handleSubmitDeleteQuiz() }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;