import videoHomepage from '../../assets/video-homepage.mp4'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
    const {t} = useTranslation();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    {t('homepage.title1')}
                </div>
                <div className='title-2'>
                {t('homepage.title2')}
                </div>
                <div className='title-3'>
                    {
                        isAuthenticated === false ?
                            <button onClick={() => { handleLogin() }}>{t('homepage.title3.login')}</button>
                            :
                            <button onClick={() => navigate('/users')}>{t('homepage.title4.start')}</button>
                    }
                </div>
            </div>
        </div >
    )
}
export default HomePage;