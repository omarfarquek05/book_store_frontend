import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";


const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-indigo-500 rounded-lg text-white font-semibold">
        {book.publishYear}
      </h2>

      <div className="flex justify-start items-center gap-x-2 my-2">
       
        <div
          className={`rounded-sm h-20 w-20 flex justify-center items-center bg-cover bg-center ${
            book.avatar ? "" : "bg-gray-300"
          }`}
          style={
            book.avatar
              ? {
                  backgroundImage: `url(${book.avatar})`,
                  height: "150px",
                  width: "220px",
                }
              : { height: "150px", width: "150px" }
          }
        >
          {!book.avatar && <FaBook className="text-white text-4xl" />}
        </div>
      </div>

      {/* <h4 className="my-2 text-gray-500">{book._id}</h4> */}

      <div className="flex justify-start items-center gap-x-3">
        <PiBookOpenTextLight className="text-white text-xl" />
        <h2 className="my-1">{book.title}</h2>
      </div>


      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-white text-xl" />
        <h2 className="my-1">{book.author}</h2>
      </div>


      <div className="flex justify-start items-center gap-x-2">
        <IoCallOutline className="text-white text-xl" />
        <h2 className="my-1">{book.phone}</h2>
      </div>

      <div className="flex justify-start items-center gap-x-2">
        <MdEmail className="text-white text-xl" />
        <h2 className="my-1">{book.email}</h2>
      </div>


      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
