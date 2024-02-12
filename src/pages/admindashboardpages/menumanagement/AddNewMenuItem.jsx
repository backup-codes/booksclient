import Wrapper from "../../../assets/wrappers/adminwrappers/Forms";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import Table from "react-bootstrap/Table";

//icon imports
import { FaUpload } from "react-icons/fa6";

//backend updates
import { useForm } from "react-hook-form";
import { AddMenuData, MenuCategory } from "../../../config/routeApi/owner";
import { useEffect, useState } from "react";
import Uploading from "../../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../../helpers/helpers";
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Space, Select, Input, Radio } from "antd";
const { TextArea } = Input;
import Zoom from "react-medium-image-zoom";

const AddNewMenuItem = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [cuisine, setSubcuisine] = useState([]);
  const [ItemImage, setItemImage] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [imgpreview, setImagePreview] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleMenuCategoriesData = async () => {
    try {
      const response = await MenuCategory();
      if (response.data.success) {
        const Options = response.data.Categories.map((data) => ({
          key: data._id,
          value: `${data.category} - ${data._id}`,
          label: `${data.category}`,
        }));

        setMenuCategories(response.data.Categories);
        setOptions(Options);
      } else {
        toastSuccess(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMenuCategoriesData();
  }, []);

  const handleItemImage = (e) => {
    
    const image = e.target.files[0];
    
    if (image) {
      setItemImage(image);
      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(image);
    }
  };

  const onFinish = async (data) => {
    console.log(data, "i am data");

    setUploading(true);

    const response = await AddMenuData({ ...data, ItemImage });
    setUploading(false);
    console.log(response, "response");
    if (response.data.success) {
      // navigate("/dashboard/menu-management/menu");
      toastSuccess(response.data.message);
    } else {
      toastError(response.data.message);
    }
  };

  const handleCuisineonChange = async (selectedValue) => {
    console.log(menuCategories, "hehehe");

    const uniqueIdToFind = selectedValue.split("-")[1].trim();

    const foundedCategory = menuCategories.find(
      (category) => category._id === uniqueIdToFind
    );

    if (foundedCategory) {
      console.log("Found Category:", foundedCategory);

      const Options = foundedCategory.subcategory.map((data) => ({
        value: `${data} `,
        label: `${data} `,
      }));
      setSubcuisine(Options);
    } else {
      console.log("Category not found");
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}

      <Wrapper className="page">
        <div className="page-content">
          <div>
            <h3>Add Menu Item</h3>
          </div>

          <div className="custom-form">
            {/* <form onSubmit={handleSubmit(handleMenuSubmit)}> */}

            <Form onFinish={onFinish} autoComplete="off">
              <div className="form-input-row" style={{ marginTop: "2px" }}>
                <div className="form-input">
                  <label htmlFor="category" className="text-left">
                    Cuisine<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.Item
                    name="Cuisine"
                    rules={[{ required: true, message: "Select a Cuisine" }]}

                  >
                    <Select
                      showSearch="single"
                      placeholder="Select Cuisine"
                      options={options}
                      onChange={(e) => handleCuisineonChange(e)}
                      style={{
                        width: "100%",
                        height: "45px",
                        border: "1px solid #A7CFFF",
                        borderRadius: "7px",
                      }}
                      className="antd-select-customization"
                      bordered={false}
                    />
                  </Form.Item>
                </div>

                <div className="form-input">
                  <label htmlFor="category" className="text-left">
                    Sub Cuisine<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.Item
                    name="subCuisine"
                    rules={[{ required: true, message: "Select a Sub-Cuisine" }]}

                  >
                    <Select
                      showSearch="single"
                      placeholder="Select Sub Cuisine"
                      options={cuisine}
                      style={{
                        width: "100%",
                        height: "45px",
                        border: "1px solid #A7CFFF",
                        borderRadius: "7px",
                      }}
                      className="antd-select-customization"
                      bordered={false}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label htmlFor="item" className="text-left">
                    Item Name<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.Item
                    name="Item"
                    rules={[{ required: true, message: "Missing Item Name" }]}
                  >
                    <Input placeholder="Item Name" />
                  </Form.Item>
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-textarea">
                  <label>
                    Item Description<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: "Missing description" }]}
                  >
                    <TextArea
                      showCount
                      maxLength={100}
                      placeholder="Description"
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-input-full">
                  <label>
                    Item Type<span className="text-danger">*</span>
                  </label>
                  <div className="form-input-radio">
                    <Form.Item
                      name="itemType"
                      rules={[{ required: true, message: "Missing Item Type" }]}
                    >
                      <Radio.Group name="radiogroup">
                        <Radio value={"non-veg"}>Non-Veg</Radio>

                        <Radio value={"veg"}>Veg</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="form-input-row" style={{ marginTop: "2px" }}>
                <div className="form-input">
                  <label htmlFor="Quantity" className="text-left">
                    Quantity<span className="text-danger">*</span>
                  </label>
                  <br />

                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Quantity",
                                },
                              ]}
                              name={"Quantity"}
                            >
                              <Input placeholder="Quantity" type="Number" />
                            </Form.Item>
                     
                </div>
              </div>

              <div className="form-input-row" style={{ marginTop: "2px" }}>
                <div className="form-input">
                  <label htmlFor="actualPrice" className="text-left">
                    Restaurant<span className="text-danger">*</span>
                  </label>
                  <br />

                  <Form.List name="restaurant" initialValue={[""]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            align="baseline"
                            className="form-commodity-row"
                          >
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Actual Price",
                                },
                              ]}
                              name={[name, "actualPrice"]}
                            >
                              <Input placeholder="Actual Price" type="Number" />
                            </Form.Item>
                            <Form.Item name={[name, "discountPrice"]} rules={[
                                {
                                  required: true,
                                  message: "Discount Price",
                                },
                              ]}>
                              <Input
                                placeholder="Discount Price"
                                type="Number"
                              />
                            </Form.Item>
                          </Space>
                        ))}
                      </>
                    )}
                  </Form.List>
                </div>
              </div>

              <div className="form-input-row" style={{ marginTop: "2px" }}>
                <div className="form-input">
                  <label htmlFor="actualPrice" className="text-left">
                    Zomato
                  </label>
                  <br />

                  <Form.List name="Zomato" initialValue={[""]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            align="baseline"
                            className="form-commodity-row"
                          >
                            <Form.Item name={[name, "actualPrice"]}>
                              <Input placeholder="Actual Price" type="Number" />
                            </Form.Item>
                            <Form.Item name={[name, "discountPrice"]}>
                              <Input
                                placeholder="Discount Price"
                                type="Number"
                              />
                            </Form.Item>
                          </Space>
                        ))}
                      </>
                    )}
                  </Form.List>
                </div>

                <div className="form-input">
                  <label htmlFor="discountPrice" className="text-left">
                    Swiggy
                  </label>
                  <br />

                  <Form.List name="Swiggy" initialValue={[""]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            align="baseline"
                            className="form-commodity-row"
                          >
                            <Form.Item name={[name, "actualPrice"]}>
                              <Input placeholder="Actual Price" type="Number" />
                            </Form.Item>
                            <Form.Item name={[name, "discountPrice"]}>
                              <Input
                                placeholder="Discount Price"
                                type="Number"
                              />
                            </Form.Item>
                          </Space>
                        ))}
                      </>
                    )}
                  </Form.List>
                </div>
              </div>
              <div className="form-input-row" style={{ marginTop: "2px" }}>
                <div className="form-input">
                  <label htmlFor="actualPrice" className="text-left">
                    Bromag
                  </label>
                  <br />

                  <Form.List name="Bromag" initialValue={[""]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            align="baseline"
                            className="form-commodity-row"
                          >
                            <Form.Item name={[name, "actualPrice"]}>
                              <Input placeholder="Actual Price" type="Number" />
                            </Form.Item>
                            <Form.Item name={[name, "discountPrice"]}>
                              <Input
                                placeholder="Discount Price"
                                type="Number"
                              />
                            </Form.Item>
                          </Space>
                        ))}
                      </>
                    )}
                  </Form.List>
                </div>

                <div className="form-input">
                  <label htmlFor="discountPrice" className="text-left">
                    Others
                  </label>
                  <br />

                  <Form.List name="Others" initialValue={[""]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            align="baseline"
                            className="form-commodity-row"
                          >
                            <Form.Item name={[name, "actualPrice"]}>
                              <Input placeholder="Actual Price" type="Number" />
                            </Form.Item>
                            <Form.Item name={[name, "discountPrice"]}>
                              <Input
                                placeholder="Discount Price"
                                type="Number"
                              />
                            </Form.Item>
                          </Space>
                        ))}
                      </>
                    )}
                  </Form.List>
                </div>
              </div>

              {/* <div className="form-input-row" style={{marginTop:"2px"}}>
              <div className="form-input">
                <label htmlFor="actualPrice" className="text-left">
                  Bromag
                </label>
                <br />

                
            
<Form.Item name={"Zomato"}>
            <Input.Group compact>
              <Input style={{ width: '50%' }} placeholder="Actual Price" />
              <Input style={{ width: '50%' }} placeholder="Discount Price" />
            </Input.Group>
          </Form.Item>
                
                {errors.actualPrice &&
                  errors.actualPrice.type === "required" && (
                    <label className="text-sm text-danger">
                      Please enter the actual price
                    </label>
                  )}
              </div>

              <div className="form-input">
                <label htmlFor="discountPrice" className="text-left">
                Others
                </label>
                <br />


                <Form.Item name={"Swiggy"}>
            <Input.Group compact>
              <Input style={{ width: '50%' }} placeholder="Actual Price" />
              <Input style={{ width: '50%' }} placeholder="Discount Price" />
            </Input.Group>
          </Form.Item>
              
              </div>
            </div> */}

              <div className="form-input-row">
                <div className="form-input-upload">
                  <label htmlFor="itemImage" className="text-left">
                    Upload Item Picture<span className="text-danger">*</span>
                  </label>

                  <br />

                  <label htmlFor="itemImage" className="file-upload">
                    {/* <input
                      type="file"
                      id="itemImage"
                      accept="image/jpeg, image/png"
                    
                      {...register("itemImage", { required: true })}
                      onChange={handleItemImage}
                    /> */}

                    
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Missing Item Image",
                        },
                        
                      ]}
                              name={"Image"}
                    >
                      
                    <Input
                      type="file"
                      id="itemImage"
                      accept="image/jpeg, image/png"
                      onChange={handleItemImage}
                     />
                      </Form.Item>
                    <span className="upload-icon">
                      <FaUpload />
                    </span>
                    <label htmlFor="itemImage" className="browse-btn">
                      Browse File
                    </label>
                  </label>

                  {errors.itemImage && errors.itemImage.type === "required" && (
                    <label className="text-sm text-danger">
                      Please upload an item picture
                    </label>
                  )}
                </div>

                {imgpreview ? (
                  <div className="col-md-5 mt-3">
                    <Zoom>
                      <img
                        src={imgpreview}
                        alt="Aadhaar Preview"
                        className="img-fluid rounded-4"
                        style={{ width: "300px" }}
                      />
                    </Zoom>
                  </div>
                ) : null}
              </div>

              <div className="buttons">
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <Link to="/dashboard/menu-management/menu">
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
export default AddNewMenuItem;
