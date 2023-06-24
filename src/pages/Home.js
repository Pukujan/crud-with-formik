import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser, toggleModal } from '../features/userSlice';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import Update from '../Components/Update';
import AddContactCrud from '../Components/AddContactCrud';

const Home = () => {
  const { userInfo: user, isOpen } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleOpen = () => {
    dispatch(toggleModal());
  };

  return (
    <div>
      <div className='text-5xl font-bold text-center'>
        Welcome to the first app
        <li className='text-xl font-light'>Go to contacts to continue</li>
      </div>
      <div className='p-5'>
        <h1 className='text-lg text-center text-red-400 font-bold pb-3'>
          Here are the User Informations
        </h1>
        <div className='lg:grid grid-cols-3 gap-10 text-xs m-auto md:m-0'>
          {user.map((item, index) => {
            return (
              <ul className='text-start text-xs p-2 px-2  grid grid-rows-2 rounded-md mb-2' key={index}>
                <div>
                  <li className='md:grid grid-cols-2 capitalize md:grid-cols-[90px_20px_auto] py-2'>
                    <span className='font-bold text-blue-gray-700'>Name </span>
                    <span> : </span> {item.username}
                  </li>

                  <li className='md:grid grid-cols-2 md:grid-cols-[90px_20px_auto] py-2'>
                    <span className='font-bold text-blue-gray-700'>Email </span>
                    <span> : </span> {item.email}
                  </li>

                  <li className='md:grid max-w-sm grid-cols-2 text-justify md:grid-cols-[90px_20px_auto] py-2'>
                    <span className='font-bold text-blue-gray-700'>Message </span>
                    <span> : </span> {item.msg}
                  </li>

                  <li className='md:grid grid-cols-2 capitalize md:grid-cols-[90px_20px_auto] py-2'>
                    <span className='font-bold text-blue-gray-700'>Gender </span>
                    <span> : </span> {item.gender}
                  </li>

                  <li className='md:py-0 py-4 capitalize grid md:grid-cols-[90px_20px_auto]'>
                    <span className='font-bold text-blue-gray-700'>Programming Language </span>
                    <span> : </span>
                    <p>
                      {item.program.map((item, index) => {
                        return (
                          <span key={index} className='text-md text-blue-gray-400'>
                            {' '}
                            {item}{' '}
                          </span>
                        );
                      })}
                    </p>
                  </li>

                  <li className='md:grid grid-cols-[90px_20px_auto] py-2'>
                    <span className='font-bold text-blue-gray-700 capitalize'>Country </span>
                    <span> : </span> {item.country}
                  </li>
                </div>
                <div>
                  <img className='py-10 max-h-80 object-contain' src={item.imageUrl} alt="userImage" />

                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                    onClick={() =>
                      nav('/update/',
                        {
                          state: item
                        }
                      )
                    }>
                    Edit
                  </button>

                  <button className='bg-red-500 text-red px-4 py-2 rounded-md text-white' onClick={handleOpen}>
                    Delete
                  </button>

                  <Dialog
                    open={isOpen}
                    onClose={handleOpen}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0.9, y: -100 },
                    }}
                  >
                    <DialogHeader>Warning</DialogHeader>
                    <DialogBody className="text-red-500" divider>
                      Are you sure?
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        color="red"
                        onClick={() => {
                          dispatch(removeUser(item.id));
                          handleOpen();
                        }}
                        className="mr-1"
                      >
                        Confirm
                      </Button>
                      <Button variant="gradient" color="green" onClick={handleOpen}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </ul>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home;
