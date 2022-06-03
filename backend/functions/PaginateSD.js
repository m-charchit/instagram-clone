// @ts-nocheck
const { default: mongoose } = require("mongoose");

const paginate = async (Model,id,page,type) => {
    let limit = 2
    id = mongoose.Types.ObjectId(id)
    console.log(id)
        const totalDocs = await Model.aggregate([
            {$match:{_id:id}},
            {$project: {_id: 0, dataSize: {$size: `$${type}`}}}
        ])

        let hasNextPage = (Math.ceil(totalDocs[0].dataSize / limit) || 1) > page
        let details = {
            nextPage:hasNextPage ? page+1 : null,
            hasNextPage,
            totalDocs:totalDocs[0].dataSize,
            currentPage:page
        }
        const follow_ers_ing = await Model.findById(id).populate(
        [{
            path: type,
            select:"_id username name",
            options:{
                skip:(page-1)*limit,limit
            }
        }]
        ).select(type)
        let result = {}
        result[type] = {docs:follow_ers_ing[type],...details}
        return result
        
  }
  module.exports =  paginate