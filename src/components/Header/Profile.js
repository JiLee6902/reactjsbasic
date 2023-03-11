import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import MainInfor from "../Auth/MainInfor";
import Password from "../Auth/Password";
import History from "../Auth/History";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Profile.scss";

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
        className="modal-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Tabs
          defaultActiveKey="Information"
          id="uncontrolled-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="Information" title="Infor">
            <MainInfor />
          </Tab>
          <Tab eventKey="Update password" title="Process password">
            <Password />
          </Tab>
          <Tab eventKey="History" title="History">
            <div className="history-table">
              <PerfectScrollbar>
                <History />
              </PerfectScrollbar>
            </div>
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
};

export default Profile;
