


// // localStorage is a browser feature
// // it is used to store data in browser
// and persists after refreshes
// setItem and getItem are default methods of localStorage and cannot be named something else
// JSON.stringify is used to convery array to string
// JSON.parse is used to convert string to array


// // so we need to convert array to string
// // and string to array


// json doesnt support array as data type
// but as String

// // eg: JSON.stringify([1,2,3,4,5]) - "[1,2,3,4,5]"
// // eg: JSON.parse("[1,2,3,4,5]") - [1,2,3,4,5]



export const addToLocal = (userInfo) => {
  localStorage.setItem('users', JSON.stringify(userInfo));
}

export const getLocal = () => {
  const data = localStorage.getItem('users');
  return data === null ? [] : JSON.parse(data);
}