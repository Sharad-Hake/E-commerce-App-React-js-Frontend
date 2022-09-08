import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import logo from '../assets/alex-knight-2EJCSULRwC8-unsplash.jpg'
const Nav =() =>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.clear("user");
        navigate('/signup')
    }

    return(
        <div className='header'>
            {auth ?
            <ul className='nav-ul'>
                 <img className='logo' src={logo} alt='logo'/>
                <li><Link to="/"><b>Products</b></Link></li>
                <li><Link to="/add"><b>Add Products</b></Link></li>
                <li><Link to="/update"><b>Update Products</b></Link></li>
                <li><Link onClick={logout} to="/signup"><b>Logout</b> (   {JSON.parse(auth).name}  )</Link></li>
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to="/signup">SignUp</Link></li> 
                <li><Link to="/login">Login</Link></li>
            </ul>
            }
        </div>
    )
}
export default Nav;