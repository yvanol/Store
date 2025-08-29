import styles from "../../../styles/styles";
import {Link} from 'react-router-dom'


const Hero = () => {
  return (
    <div className={`relative min-h-[60vh] 800px:min-h-[75vh] w-full bg-no-repeat ${styles.normalFlex} `}
    style={{
        backgroundImage:"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
    }}
    >
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
            <h1 className={`text-[25px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                The store Provide to you the best Collection for <br /> Your Personal Need
            </h1>
            <Link to="/products" className='inline-block'>
              <div className={`${styles.button} mt-5`}>
                <span className='text-[#fff] font-[Poppins] text-[18px]'>
                  Shop Now
                </span>
              </div>

            </Link>
        </div>
    </div>
  )
}

export default Hero