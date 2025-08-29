import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
  updateProduct,
} from "../../redux/actions/product";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/base";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { categoriesData } from "../../static/data";
import { RxCross1 } from "react-icons/rx";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  }

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const updatedForm = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images: images.map((image) => image.name)
    };
    const formData = new FormData();
  for (const key in updatedForm) {
    if (key === "images") {
      for (let i = 0; i < updatedForm.images.length; i++) {
        formData.append("images[]", updatedForm.images[i]);
      }
    } else {
      formData.append(key, updatedForm[key]);
    }
  }
    dispatch(updateProduct(productId, updatedForm));
  };
  const columns = [
    { field: "id", headerName: "product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Update",
      flex: 0.8,
      minWidth: 120,
      headerName: "Update",
      type: "number",
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setProductId(params.id);
                setOpen(true);
              }}
            >
              <MdOutlineSystemUpdateAlt size={25} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  //   console.log(products && products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 50, 100, 150]}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center ">
              <div className="w-[50%] 800px:w-[50%] bg-white shadow h-[100vh] rounded-[4px] p-3  overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Update Product
                </h5>
                {/* update product */}
                <form onSubmit={updateHandler}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter the product name"
                    />
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      row="8"
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-4 px-3 h-[130px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your product description..."
                    ></textarea>
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      id=""
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="choose a category">
                        Choose a category
                      </option>
                      {categoriesData &&
                        categoriesData.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter your product tags..."
                    />
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">Original Price</label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Enter your product price..."
                    />
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">
                      Price (With Discount){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Enter your product price with discount..."
                    />
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">
                      Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter your product stock..."
                    />
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">
                      Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex item-center">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle
                          size={30}
                          className="mt-3 cursor-pointer"
                          color="#555"
                        />
                      </label>
                      {images &&
                        images.map((i) => (
                          <img
                            src={URL.createObjectURL(i)}
                            key={i}
                            alt=""
                            className="h-[120px] w-[120px] object-cover m-2 "
                          />
                        ))}
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="update"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
