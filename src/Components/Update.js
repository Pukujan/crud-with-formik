import { Select, Option, Textarea, Checkbox, Radio } from "@material-tailwind/react";
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { isVal } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../features/userSlice";
import { useLocation } from "react-router-dom";

const Update = () => {
  const { state } = useLocation();


  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  const valueSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string()
      .min(4, 'Enter more than 4 characters')
      .max(20, 'Max 20 characters')
      .required('Required'),
    msg: Yup.string().min(10, 'Enter more than 10 characters').max(100, 'Max 100 characters').required('Required'),
    country: Yup.string().required('Required'),
    program: Yup.array().required(1, 'select atleast one'),
    gender: Yup.string().required('Required'),
    image: Yup.mixed().required('Required').test('FileFormatValidation', 'invalid image format, Please upload png or jpeg file', (val) => val && ['image/png', 'image/jpeg'].includes(val.type))
  });


  // message for error in brackets


  // add below for new fields in form

  const formik = useFormik({
    initialValues: {
      email: state.email,
      username: state.username,
      country: state.country,
      msg: state.msg,
      program: state.program,
      gender: state.gender,
      image: state.image,
      imageUrl: state.imageUrl,
      id: state.id
    },
    onSubmit: (value, { resetForm }) => {
      dispatch(editUser(value));

    },
    validationSchema: valueSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validate: (values) => {
      const errors = {};
      if (values.program.length === 0) {
        errors.program = 'Select at least one program';
      }
      return errors;
    },
  });


  // checkboxes data
  const checkData = [
    { label: 'Java', color: 'red', value: 'java' },
    { label: 'Python', color: 'blue', value: 'python' },
    { label: 'Javascript', color: 'green', value: 'javascript' },
    { label: 'C++', color: 'yellow', value: 'c++' },
    { label: 'C#', color: 'orange', value: 'c#' },
    { label: 'PHP', color: 'pink', value: 'php' },
  ]

  // radiobuttons

  const checkRadio = [
    { label: 'male', color: 'green', value: 'male' },
    { label: 'female', color: 'pink', value: 'female' }
  ]


  return (
    <div className='py-3' >

      <form onSubmit={formik.handleSubmit}
        className='w-full bg-slate-100 pl-20 py-8 space-y-5 shadow-2xl'>

        {/* email */}

        <div>
          <h1 className='flex items-center gap-3 text-lg font-bold  pb-3'>Login here </h1>
          <div>
            <label
              className=''
              htmlFor="email">Email</label>
          </div>
          <input
            className='outline-none border rounded-md px-2 py-1 border-blue-gray-200  hover:text-lg duration-150'
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            placeholder='email' />

          {/* email validation error msg  */}


          {isVal(formik, 1) ? <h1 className='text-sm text-red-500'>{formik.errors.email}</h1> : null}
        </div >

        {/* username */}

        <div>
          <div>
            <label
              className=''
              htmlFor="username">Name</label>
          </div>
          <input
            className='outline-none border rounded-md px-2 py-1 border-blue-gray-200  hover:text-lg duration-150'
            type="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            id="username"
            placeholder='username ' />


          {/* username validation error msg  */}


          {isVal(formik, 2) ? <h1 className='text-red-500 text-sm'>{formik.errors.username}</h1> : null}
        </div >

        {/* select box */}

        {/* note event different for selection in FORMIK*/}

        <div className="w-72">
          <Select value={formik.values.country}
            label="Select your country"
            name="country"
            onChange={(e) => formik.setFieldValue('country', e)}
          >
            <Option value="nepal">Nepal</Option>
            <Option value="japan">Japan</Option>
            <Option value="antartica">Antartica</Option>
          </Select>


          {/* COUNTRY validation error msg  */}

          {formik.touched.country && formik.errors.country ? <h1 className='text-sm text-red-500'>{formik.errors.email}</h1> : null}
        </div>


        {/* textarea for message */}
        <div className="w-52">
          <label htmlFor="Message">Your Message</label>
          <Textarea label="Message"
            id="msg"
            value={formik.values.msg}
            onChange={formik.handleChange}
            name="msg" />

          {formik.touched.msg && formik.errors.msg ? <h1 className='text-sm text-red-500'>{formik.errors.email}</h1> : null}
        </div>

        {/* checkboxes  */}
        {/* note: unique ID important checkbox and radiobox  */}

        <div className="flex gap-5">
          {checkData.map((item) => {
            return (
              <div key={item.label}>
                <Checkbox
                  name='program'
                  id={item.color}
                  ripple={true}
                  color={item.color}
                  value={item.value}
                  label={item.label}
                  onChange={formik.handleChange}

                  defaultChecked={formik.values.program.includes(item.value) ? true : false}

                />

              </div>
            )
          })
          }
        </div>



        {/* selection error msg  */}


        {formik.touched.program && formik.errors.program ? (
          <div className='text-red-500 text-sm'>{formik.errors.program}</div>
        ) : null}

        {/* radio buttons  */}

        <div className="flex gap-5">
          {checkRadio.map((item) => {
            return (
              <div key={item.label}>
                <Radio
                  name='gender'
                  id={item.value}
                  ripple={false}
                  color={item.color}
                  value={item.value}
                  label={item.label}
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.gender === item.value ? true : false}
                />
              </div>
            )
          })
          }

          {/* radio button error msg  */}


        </div>
        {formik.touched.gender && formik.errors.gender ? (
          <div className='text-red-500 text-sm'>{formik.errors.gender}</div>
        ) : null}

        {/* image upload */}

        <div>
          <label className="block"
            htmlFor="image">Update Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => {


              // trick one to show image
              const file = e.target.files[0];
              console.log(e.target.files[0]);
              formik.setFieldValue('image', file);
              const simple = URL.createObjectURL(file);
              formik.setFieldValue('imageUrl', simple);

              //   // trick two to show image
              //   const reader = new FileReader();
              //   reader.onload = () => {
              //     if (reader.readyState === 2) {
              //       formik.setFieldValue('imageUrl', reader.result);
              //     }
              //   };
              //   reader.readAsDataURL(e.target.files[0]);
            }}
          />

          {formik.values.imageUrl ? <img className='h-[200px] my-4'
            src={formik.values.imageUrl} alt="" /> : <img className='h-[200px] my-4'
              src={state.image} alt="" />}

          {/* error image msg  */}
          {
            formik.touched.image && formik.errors.image ? (
              <div className='text-red-500 text-sm'>{formik.errors.image}</div>
            ) : null
          }

        </div>

        {/* open file reader from internet to show file  */}


        {/* submit button  */}

        <button
          type='submit'
          className='bg-red-500 text-white p-2 px-10 rounded-md shadow-md hover:shadow-lg hover:bg-slate-500 duration-150'
        >Submit</button>

      </form >
    </div >
  )
}

export default Update
