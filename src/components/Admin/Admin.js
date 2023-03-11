import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink, useNavigate } from "react-router-dom";
import Language from "../Header/Language";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { logout } from "../../services/apiServices";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      //clear data
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className="leftside" />
          </span>
          <div className="rightside">
            <Language />
            <NavDropdown
              title={t("header.submenu.subtitle")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                {t("header.submenu.subprofile")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogOut()}>
                {t("header.submenu.sublogout")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
