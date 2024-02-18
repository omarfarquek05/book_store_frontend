import  { useEffect, useState } from 'react';
import axios from 'axios';
//import { useParams } from 'react-router-dom';
//import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from "react-icons/ai";
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/books");
        console.log(response?.data)
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className='p-4'>
     
    <div className='flex justify-center items-center gap-x-4'>
    <button  className='bg-gradient-to-r from-pink-500 to-violet-500 font-bold hover:bg-sky-600 px-4 py-1 rounded-lg text-white'
      onClick={() => setShowType('table')}
    >
      Table
    </button>
    <button
      className='bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold hover:bg-sky-600 px-4 py-1 rounded-lg'
      onClick={() => setShowType('card')}
    >
      Card
    </button>
  </div>

      <div className='flex justify-between items-center'> 
      <h1 className='text-3xl my-8 font-bold mx-auto'>Book List</h1>
      <Link to="/books/create">
      <MdOutlineAddBox className='text-white text-4xl'/>
      </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
        
      )}

    </div>
  )
}

export default Home