import { useState, useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { changePassword } from "../../services/apiServices";
import "./MainInfor.scss";
import { toast } from "react-toastify";
import { store } from "../../redux/store";
import { doLogout } from "../../redux/action/userAction";
import { NavLink, useNavigate } from "react-router-dom";

const Password = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pw = useSelector((state) => state.userpassword.pw.password);
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (confirmpassword !== newpassword) {
      toast.error(
        "Wrong confirm new password! Please enter the correct new password!"
      );
      return;
    }
    let data = await changePassword(currentpassword, newpassword);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      dispatch(doLogout());
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <form className="row g-3 mx-3 me-3 modal-add-user">
        <div className="col-md-6">
          <label className="form-label">Your current password: </label>
          <input
            type="text"
            className="form-control"
            value={currentpassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <label className="form-label">Your new password: </label>
          <input
            type="text"
            className="form-control"
            value={newpassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Confirm new password: </label>
          <input
            type="text"
            className="form-control"
            value={confirmpassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      </form>
      <button
        className="btn btn-warning mx-4 mb-4 mt-3"
        onClick={() => handleSave()}
      >
        Change
      </button>
    </>
  );
};

export default Password;
