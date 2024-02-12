import Wrapper from "../../assets/wrappers/CustomDropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from 'react';

const DesignationDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState("Choose Designation");

    const options = ["Admin", "Captain", "POS"];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleSelect = (option) => {
        setSelected(option)
    }

    return (
        <Wrapper>
            <div className='dropdown-div' >
                <div className='dropdown' onClick={handleToggle}>
                    <div className="dropdown-btn">
                        {selected} <IoMdArrowDropdown className='icon' style={{ display: isOpen ? 'none' : '' }} />
                        {isOpen && <IoMdArrowDropup className='icon' />}
                    </div>


                    <div className="dropdown-content" style={{ display: isOpen ? 'block' : 'none' }}>

                        {options.map((option) => {
                            return <div onClick={() => handleSelect(option)} className="dropdown-item" key={option}>
                                {option}
                            </div>
                        })}

                    </div>

                </div>
            </div>
        </Wrapper>
    )
}
export default DesignationDropDown