import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.png';
import './SideBar.scss';
import { Link, useNavigate } from "react-router-dom";

const SideBar = (props) => {
    const navigate = useNavigate();
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span className="tiltle-name" onClick={() => navigate('/')}>
                            Le Quynh Chi
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        //suffix={<span className="badge red">New</span>}
                        >
                            <Link to="/admins">Dashboard</Link>
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            // icon={<FaRegLaughWink />}
                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem> Management Users
                                <Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem> Management Quiz
                                <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem> Management Questions</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; Le Quynh Chi
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar >
        </>
    )
}

export default SideBar;
