




export const isVal = (formik, index) => {

  switch (index) {
    case 1:
      if (formik.touched.email && formik.errors.email) {
        return true;
      } else {
        return false
      }

    case 2:
      if (formik.touched.username && formik.errors.username) {
        return true;
      } else {
        return false
      }

    default:

      break;


  }



}