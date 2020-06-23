export const RetrieveFilters = function(req, res, next) {
    req.filters = {}
    if(req.query){
        Object.keys(req.query).filter(filter => filter !== 'includes').map(filter => {
            req.filters[filter] = req.query[filter];
            delete req.query[filter];
        })
    }


    next()
}