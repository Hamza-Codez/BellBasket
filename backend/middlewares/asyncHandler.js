const asyncHandler = (handler) => async (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(error => {
    res.status(500).json({ error: error.message });
  });
}

export default asyncHandler;