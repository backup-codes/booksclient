import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
//backend updates
import { useForm } from "react-hook-form";
import { addMenuCategory } from "../../../config/routeApi/owner";
import { useState } from "react";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Space, Input } from 'antd';
const { TextArea } = Input;

const AddMenuCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isUploading, setUploading] = useState(false);

  const navigate = useNavigate();



  const onFinish = async (values) => {
    // setUploading(true)
    const response = await addMenuCategory(values);
    setUploading(false)

    if (response.data.success) {

      navigate("/dashboard/menu-management/categories");

      toastSuccess(response.data.message)

    } else {
      toastError(response.data.message)

    }

  }



  return (

    <>
      {isUploading ? (<Uploading isUploading={isUploading} />) : null}
      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Add Cuisine</h3>
          </div>

          <div className="custom-form">
            {/* <form onSubmit={handleSubmit(handleCategorySubmit)}>
           */}

            <Form
              onFinish={onFinish}

              autoComplete="off" >

              <div className="form-input-row">
                <div className="form-input form-input-full">
                  <label htmlFor="vendorName" className="text-left">
                    Cuisine Name<span className="text-danger">*</span>
                  </label>
                  <br />


                  <Form.Item

                    name="category"
                    rules={[{ required: true, message: 'Missing Cuisine' }]}
                  >
                    <Input placeholder="Cuisine Name" />
                  </Form.Item>


                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-textarea">
                  <label>Cuisine Description<span className="text-danger">*</span></label>
                  <br />

                  <Form.Item name="description" rules={[{ required: true, message: 'Missing description' }]}>

                    <TextArea
                      showCount
                      maxLength={100}
                      placeholder="Description"

                      style={{ height: 120, resize: 'none' }} />

                  </Form.Item>


                </div>
              </div>

              <label>Sub Cuisine<span className="text-danger">*</span></label>
              <br />
              <Form.List name="subcuisine" in initialValue={['']}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (

                      <div key={index}>
                        {/* style={{ display: 'flex', marginBottom: 8 }} */}
                        <Space key={key} align="baseline" className="form-commodity-row">


                          <Form.Item
                            style={{ marginBottom: "5px" }}
                            {...restField}
                            name={[name, 'subCuisine']}
                            rules={[{ required: true, message: 'Missing Sub-Cuisine' }]}
                          >
                            <Input placeholder="Sub Cuisine" />
                          </Form.Item>


                          <MinusCircleOutlined className="minus-circle" onClick={() => remove(name)} />

                        </Space>
                      </div>
                    ))}
                    <Form.Item style={{ marginTop: "20px" }}>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add More
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/menu-management/categories">
                  <Button className="cancel-btn" type="button">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Form>
            {/* </form> */}
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default AddMenuCategory;
