import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import {
  getMenuCategoryById,
  updateMenuCategory,
} from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { Form, Space, Select, Input, Radio } from "antd";
const { TextArea } = Input;
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const UpdateMenuCategory = () => {
  const [form] = Form.useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isUploading, setUploading] = useState(false);

  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMenuCategoryById(categoryId);
        const categoryData = response.data.category;
console.log(categoryData,"i am category data");
        form.setFieldsValue({
          CuisineName: categoryData.category,
          Description: categoryData.description,
          subcuisine: categoryData.subcategory.map((sub, index) => ({ subCuisine: sub, key: index })),
        })

        // setValue("category", categoryData.category);
        // setValue("description", categoryData.description);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categoryId, setValue]);

  // const handleCategorySubmit = async (data) => {
  //   try {
  //     setUploading(true);
  //     const response = await updateMenuCategory(categoryId, data);
  //     setUploading(false);

  //     if (response.data.success) {
  //       navigate("/dashboard/menu-management/categories");
  //       toastSuccess(response.data.message);
  //     } else {
  //       toastError(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onFinish = async (data) => {
    try {
      setUploading(true);
      
      
      const response = await updateMenuCategory(categoryId, data);
      setUploading(false);
      if (response.data.success) {
        navigate(-1);
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
   
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Edit Cuisine</h3>
          </div>

          <div className="custom-form">
            {/* <form onSubmit={handleSubmit(handleCategorySubmit)}> */}

            <Form form={form} onFinish={onFinish} autoComplete="off">
              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="CuisineName" className="text-left">
                    Cuisine Name<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.Item
                    name="CuisineName"
                    rules={[{ required: true, message: "Missing Cuisine Name" }]}
                  >
                    <Input placeholder="Cuisine Name" />
                  </Form.Item>
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-textarea">
                  <label>
                    Cuisine Description<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.Item
                    name="Description"
                    rules={[{ required: true, message: "Missing Description" }]}
                  >
                    <TextArea
                      showCount={true}
                      maxLength={100}
                      placeholder="Description"
                      style={{ height: 120, resize: "none" }}
                    />
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
              {/* </form>
               */}
            </Form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default UpdateMenuCategory;
