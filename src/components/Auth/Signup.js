import './Signup.scss'
import { useState } from 'react';
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../../services/apiServices'
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignup = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid Password');
            return;
        }

        //submit apis
        let data = await postSignup(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/')

        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <div className="login-container">
                <div className="header">
                    <span>Already have an account?</span>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
                <div className="title col-4 mx-auto">
                    Le Quynh Chi's system
                </div>
                <div className="welcome col-4 mx-auto">
                    Start your journey?
                </div>
                <div className="content-form col-4 mx-auto">
                    <div className="form-group">
                        <label>Email &#40;*&#41; </label>
                        <input
                            type={"email"}
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group class-password">
                        <label>Password &#40;*&#41;</label>
                        <input
                            type={isShowPassword ? "text" : "password"}
                            className="form-control "
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {isShowPassword ?
                            <span
                                className="icons-eye"
                                onClick={() => setIsShowPassword(false)}>
                                <VscEye />
                            </span>
                            :
                            <span
                                className="icons-eye"
                                onClick={() => setIsShowPassword(true)}>
                                <VscEyeClosed />
                            </span>
                        }
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type={"text"}
                            className="form-control"
                            value={username}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className="btn-submit"
                            onClick={() => handleSignup()}
                        >Create my free account</button>
                    </div>
                    <div className="text-OR">
                        <h2
                            className="hr-lines"

                        > OR </h2>
                    </div>
                    <div className="primary-auth-container">
                        <div className="facebook">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                className="sidebar-btn"
                                rel="noopener noreferrer"
                            >
                                <button className="btn-facebook" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    <BsFacebook /> Log in with Facebook
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
                                <button className="btn-google" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    <FcGoogle /> Log in with Google
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
                                <span className="sso-text" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    Log in with SSO
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className='back'>
                        <span onClick={() => { navigate('/') }}>
                            <i>
                                &#60;&#60; Go to HomePage
                            </i>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;