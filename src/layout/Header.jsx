import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'Login User' },
  { to : '/register', text: 'Sign Up' },
]

const userNav = [
  { to : '/', text: 'Home' },
  { to : '/new', text: 'New Todo' },
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
  <a className="btn btn-ghost bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-xl text-white">
  Cool {user?.id ? user.username : 'SHOE shop'}
</a>

  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {finalNav.map((el) => (
        <li key={el.to}>
          <Link to={el.to}>{el.text}</Link>
        </li>
      ))}
      {user?.id && (
        <li>
          <Link to="#" onClick={hdlLogout}>
            Logout
          </Link>
        </li>
      )}
    </ul>
  </div>
</div>

   
  );
}
