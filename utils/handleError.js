const handleHttpError = (res, menssage = "Algo sucedio", code = 403) => {

    res.status(code)
    res.send( {error: menssage});
}

module.exports ={ handleHttpError};