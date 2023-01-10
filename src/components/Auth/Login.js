import './Login.scss'
import { useState } from 'react';
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner10 } from "react-icons/im"

const Login = (props) => {
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
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid Password');
            return;
        }

        setIsLoading(true);

        //submit apis
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');

        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="login-container">
                <div className="header">
                    <span>Don't have an account yet?</span>
                    <button onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
                <div className="title col-4 mx-auto">
                    Le Quynh Chi's system
                </div>
                <div className="welcome col-4 mx-auto">
                    Hello, who's this?
                </div>
                <div className="content-form col-4 mx-auto">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type={"email"}
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type={"password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <span className="forgot-password"><i>Forgot password?</i></span>
                    <div>
                        <button
                            className="btn-submit"
                            onClick={() => handleLogin()}
                            disabled={isLoading}
                        >
                            {isLoading === true && <ImSpinner10 className='loader-icon' />}
                            <span>Login to Le Quynh Chi's system</span>
                        </button>
                    </div>
                    <div className="text-OR">
                        <h2
                            className="hr-lines"
                            onClick={() => handleLogin()}
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

export default Login;