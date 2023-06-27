const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      // Handle the error
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

module.exports = { asyncHandler, getDaysInMonth };
