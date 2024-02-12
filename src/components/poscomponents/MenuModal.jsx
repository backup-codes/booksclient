import Wrapper from '../../assets/wrappers/poswrappers/PosMenuModal';

import AddToCartMenuCard from '../Menu/AddToCartMenuCard';

//icons
import { FaPrint } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

const MenuModal = (props) => {





    return (
        <Wrapper
            width='800px'
            centered
            {...props}
            wrapClassName="blurred-modal"
        >

            <div className='content'>
                <h4 className='title'>Menu</h4>

                <div className='top-content'>
                    <div className='input-div'>
                        <input type="text" placeholder='Search' />
                    </div>
                    <div className='input-div'>
                        <input type="text" placeholder='Categories' />
                    </div>
                    <div className='input-div'>
                        <FaFilter className='filter-icon' />
                        <input type="text" placeholder='Sort by' />
                    </div>
                </div>

                <div className='bottom-content'>
                    <h5 className='sub-title'>Your Order</h5>

                    <div className='menu-cards'>
                        <AddToCartMenuCard />
                        <AddToCartMenuCard />
                        <AddToCartMenuCard />
                    </div>
                </div>

            </div>



            <div className='modal-buttons'>
                <button type='button' className='modal-btn'> Hold </button>
                <button type='button' className='modal-btn'> KOT </button>
                <button type='button' className='modal-btn'><FaPrint className='btn-icon' /> Print Bill </button>
            </div>
        </Wrapper>
    )
}
export default MenuModal