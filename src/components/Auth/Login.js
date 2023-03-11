import "./Login.scss";
import { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { doPassword } from "../../redux/action/passwordAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";
import { useTranslation, Trans } from "react-i18next";

const Login = (props) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    setIsLoading(true);

    //submit apis
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      dispatch(doPassword(password));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="header">
          <span>{t("auth.login.loginaccount")}</span>
          <button onClick={() => navigate("/signup")}>
            {t("auth.login.loginlogin")}
          </button>
          <Language />
        </div>
        <div className="title col-4 mx-auto">{t("auth.login.logintitle")}</div>
        <div className="welcome col-4 mx-auto">
          {t("auth.login.loginhello")}
        </div>
        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>{t("auth.login.logingmail")}</label>
            <input
              type={"email"}
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>{t("auth.login.loginpassword")}</label>
            <input
              type={"password"}
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
            />
          </div>
          <span className="forgot-password">
            <i>{t("auth.login.loginforgot")}</i>
          </span>
          <div>
            <button
              className="btn-submit"
              onClick={() => handleLogin()}
              disabled={isLoading}
            >
              {isLoading === true && <ImSpinner10 className="loader-icon" />}
              <span>{t("auth.login.loginbutton")}</span>
            </button>
          </div>
          <div className="text-OR">
            <h2 className="hr-lines" onClick={() => handleLogin()}>
              {t("auth.login.loginor")}
            </h2>
          </div>
          <div className="primary-auth-container">
            <div className="facebook">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              >
                <button
                  className="btn-facebook"
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  <BsFacebook /> {t("auth.login.loginface")}
                </button>
              </a>
            </div>

            <div className="google">
              <a
                href="https://www.google.com/"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              >
                <button
                  className="btn-google"
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  <FcGoogle /> {t("auth.login.logingoogle")}
                </button>
              </a>
            </div>

            <div className="sso">
              <a
                href="https://admin.typeform.com/login-sso"
                target="_blank"
                className="sidebar-btn-sso"
                rel="noopener noreferrer"
              >
                <span
                  className="sso-text"
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {t("auth.login.loginsso")}
                </span>
              </a>
            </div>
          </div>
          <div className="back">
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              <i>&#60;&#60; {t("auth.login.loginhomepage")}</i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
