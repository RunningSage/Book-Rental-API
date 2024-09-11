<<<<<<< HEAD
const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  
  export default catchAsync;
=======
const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  
  export default catchAsync;
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
  