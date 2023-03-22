exports.errorHandler = (res, error, type) => {
    return res.status(type).json({
        error : true,
        message : error.message  
  })
}