import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "../products/Ratings";
import { backend_url } from "../../server";
import { getAllEvents } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  // const { allProducts } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const { id } = useParams();
  const allReviews =
    products && products.map((product) => product.reviews).flat();
  const { events } = useSelector((state) => state.events);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching
    dispatch(getAllProductsShop(id)); // Use id for products
    // Only fetch events if isOwner is true and seller is defined
    if (isOwner && seller && seller._id) {
      dispatch(getAllEvents(seller._id));
    } else if (id) {
      dispatch(getAllEvents(id)); // Use id for non-owner preview
    }
    setIsLoading(false); // Set loading to false after fetching
  }, [dispatch, id, isOwner, seller]);

  // console.log("Events:", events);
  // console.log("Seller:", seller);
  // console.log("ID:", id);
  // console.log("All Products:", products); // Added to verify product data

  if (isLoading) {
    return <div>Loading shop data...</div>; // Fallback while loading
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/seller-dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={i._id || index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={i._id || index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events have for this shop!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4" key={item._id || index}>
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt={item.user.fullName}
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.fullName}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2day ago"}</p>
                </div>
              </div>
            ))}
          {(!allReviews || allReviews.length === 0) && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews have for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;