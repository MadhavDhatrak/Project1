import { FcCustomerSupport } from "react-icons/fc";
import '../App.css'


const Header = () => {
    return (
        <div className="flex justify-self-start items-start h-screen  max-w-full">
            <FcCustomerSupport size={50} />
            <h1 className=" text-black text-2xl pt-4 ">Day 3 Assignment</h1>
        </div>
    )
}

export default Header