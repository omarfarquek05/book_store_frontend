import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMoreTime } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { baseUrl } from "../../utils";

const ShowBook = () => {

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/books/${id}`);
       // console.log(response.data)
        //setBook(response.data);
        setBook(response.data.book);
        //console.log(setBook(response.data))
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  console.log(book)
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>

         {/*
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
            */}

          <div className=' flex justify-start items-center gap-x-1'>
          <PiBookOpenTextLight className="text-white text-xl" />
            <span>{book?.title}</span>
          </div>

          <div className='flex justify-start items-center gap-x-1 my-1'>
          <BiUserCircle className="text-white text-xl" />
            <span>{book.author}</span>
          </div>

          <div className='flex justify-start items-center gap-x-1 my-1'>
          <MdOutlineMoreTime className="text-white text-xl"/>
            <span>{book.publishYear}</span>
          </div>

          <div className='flex justify-start items-center gap-x-1 my-1'>
          <IoCallOutline className="text-white text-xl" />
            <span>{book.phone}</span>
          </div>

          <div className='flex justify-start items-center gap-x-1 my-1'>
          <MdEmail className="text-white text-xl" />
            <span>{book.email}</span>
          </div>


          <div className='flex justify-start items-center gap-x-1 my-1'>
          <BiTime className="text-white text-xl" />
            <span>{new Date(book.createdAt).toLocaleDateString()}</span>
          </div>
          <div className='flex justify-start items-center gap-x-1 my-1'>
          <BiTime className="text-white text-xl" />
            <span>{new Date(book.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook