import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Places from './Places';
import AccountNavigation from '../AccountNavigation';

export default function Profile() {
    const { user, ready, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    const navigate = useNavigate();

    if (subpage === undefined) {
        subpage = 'profile';
    }
    if (!ready) {
        return 'Loading...';
    }
    if (ready && !user) {
        navigate('/login');
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        navigate('/');
    }

    return (
        <div>
            <AccountNavigation />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    {' '}
                    Logged in as {user.name} ({user.email}) <br />
                    <button className="primary max-w-sm mt-2" onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
            {subpage === 'places' && <Places />}
        </div>
    );
}
