import "./ManageQuiz.scss";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  postCreateNewQuiz,
  getAllQuizForAdmin,
} from "../../../../services/apiServices";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation, Trans } from "react-i18next";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const { t } = useTranslation();

  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
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
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };

  const handleClickBtnUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
  };

  const handleClickBtnDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(quiz);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleSubmitQuiz = async () => {
    //vlaidate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setPreviewImage("");
      await fetchListQuizs();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {t("admin.managementquiz.mqmq.mqtitle")}
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  {t("admin.managementquiz.mqmq.mqadd")}
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>{t("admin.managementquiz.mqmq.mqname")}</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>{t("admin.managementquiz.mqmq.mqdescription")}</label>
                </div>
                <div className="my-3 ">
                  <Select
                    value={type}
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type..."}
                  />
                </div>
                <div className="more-actions">
                  <label
                    className="form-label label-upload"
                    htmlFor="labelUpload"
                  >
                    <FcPlus /> {t("admin.managementquiz.mqmq.mqfile")}
                  </label>
                  <input
                    type="file"
                    id="labelUpload"
                    hidden
                    onChange={(event) => handleUploadImage(event)}
                  />
                </div>
                <div className="col-md-12 img-preview">
                  {previewImage ? (
                    <img src={previewImage} />
                  ) : (
                    <span>{t("admin.managementquiz.mqmq.mqpreview")}</span>
                  )}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-warning"
                  >
                    {t("admin.managementquiz.mqmq.mqsave")}
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz
                listQuizs={listQuizs}
                fetchListQuizs={fetchListQuizs}
                handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
                handleClickBtnUpdateQuiz={handleClickBtnUpdateQuiz}
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
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {t("admin.managementquiz.mqupdate.mqutitle")}
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            {t("admin.managementquiz.mqassign.mqatitle")}
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
