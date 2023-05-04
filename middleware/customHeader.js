const customHeader = (req,res, next) => {
    
    try {
        
    } catch (error) {
        res.status(403)
        res.send({error: "Algo ocurrio en el custom headers"})
    }
}

module.exports = customHeader;