import Wrapper from './../../assets/wrappers/adminwrappers/ModalStyle'


const EditCategoryModal = (props) => {
    return (
        <Wrapper
            centered
            {...props}

        >
            <div className='content-div'>
                <input type='text' placeholder='Update Category'></input>
                <button className='add-btn'>Edit</button>
            </div>
        </Wrapper>
    )
}
export default EditCategoryModal