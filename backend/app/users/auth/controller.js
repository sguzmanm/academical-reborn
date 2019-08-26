exports.getAll = async (req, res, next) => {
  try {
    res.json([])
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
