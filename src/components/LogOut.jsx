import Styled from 'styled-components'
import { useState } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'

const Wrapper = Styled.div`

  .dropdown-container{
    position: relative;
  }

  .btn{
    width: 150px;
    border-radius: 5px;
    background: #000;
    padding: 0.5rem;
    color: #fff;
  }
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 150px;
    box-shadow: 2px 2px 5px 5px rgba(0,0,0,0.5);
    text-align: center;
    visibility: hidden;
    border-radius: 5px;
    background: #fff;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: 5px;
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: #000;
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  `;

const LogOut = () => {

    const [showLogout, setShowLogout] = useState();
    return (
        <Wrapper>
            <div className='dropdown-container'>
                <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
                    <FaUserCircle />
                    username
                    <FaCaretDown />
                </button>

                <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                    <button type='button' className='dropdown-btn' onClick={() => console.log("logged out")}>
                        logout
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}
export default LogOut