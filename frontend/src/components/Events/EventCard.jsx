import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/no-event.json";

import { addToCart } from "../../redux/actions/cart";
import Cart from "../cart/cart";


const EventCard = ({active, data}) => {
  const [openCart, setOpenCart] = useState(false);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        setOpenCart(true);
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }


  // console.log(data)

    if (!data) {
    return <div className="text-center w-full pb-[110px] text-[20px]"
    ><Lottie options={defaultOptions} width={300} height={300} />

      
      <h1 className="text-center mb-14 text-[25px] text-[#000000a1]">
       There is  No Event
      </h1>
    
    </div>;
  }

  return (
    <div className={`w-full block bg-white rounde-lg ${active ? "unset" : "mb-12"} lg:flex p-2 mb-12`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img 
        src={`${backend_url}${data.images[0]}`}
        alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>
         {data.description}
        </p>
        <div className="flex py-2 justify-between">
            <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    {data.originalPrice}$
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                    {data.discountPrice}$
                </h5>
            </div>
            <span className="pr-3 font-[400] text-[17] text-[#44a55e]">
            {data?.sold_out}sold
            </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
          {/* Cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>
      </div>
   </div>
  );
};

export default EventCard;
