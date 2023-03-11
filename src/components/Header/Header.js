import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiServices";
import { store } from "../../redux/store";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
import { Profiler, useState } from "react";
import Profile from "./Profile.js";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  //2 cach dung deu duoc
  // const account = store?.getState()?.user?.account;

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

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
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">PROJECT 1</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">
            {t("header.system")}
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t("header.submenu.subhome")}
              </NavLink>
              <NavLink to="/users" className="nav-link">
                {t("header.submenu.subuser")}
              </NavLink>
              <NavLink to="/admins" className="nav-link">
                {t("header.submenu.subadmin")}
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    {t("header.submenu.sublogin")}
                  </button>
                  <button className="btn-signup" onClick={() => handleSignup()}>
                    {t("header.submenu.subsignup")}
                  </button>
                </>
              ) : (
                <NavDropdown
                  title={t("header.submenu.subtitle")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => setShow(true)}>
                    {t("header.submenu.subprofile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {t("header.submenu.sublogout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={show} setShow={setShow} />
    </>
  );
};

export default Header;
