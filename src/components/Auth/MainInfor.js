import { useState, useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { updateProfile } from "../../services/apiServices";
import "./MainInfor.scss";
import { toast } from "react-toastify";
import { store } from "../../redux/store";


const MainInfor = (props) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const userupdate = account;
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(account.username);
    setEmail(account.email);
    setImage(account.image);
    if (account.image) {
      setPreviewImage(`data:image/jpeg;base64,${account.image}`);
    }
  }, [account]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };

  const handleSave = async () => {
    let data = await updateProfile(username, image);
    if (data && data.EC === 0) {
      console.log("check username: ", account);
      //   dispatch(doUpdateProfile(data));
      toast.success(data.EM);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <form className="row g-3 mx-3 me-3 modal-add-user">
      <div className="col-md-6">
          <label className="form-label">Username: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-md-6">
        <label className="form-label">Email: </label>
          <input
            type="text"
            className="form-control"
            value={email}
            disabled
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label label-upload" htmlFor="labelUpload">
            <FcPlus /> Upload File Image
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
            <span>Preview Image</span>
          )}
        </div>
      </form>
      <button
        className="btn btn-warning mx-4 mb-4 mt-3"
        onClick={() => handleSave()}
      >
        Update
      </button>
    </>
  );
};

export default MainInfor;
