const Master = {
    getClaim :{
        url : "/claim-type",
        method : "GET"
    },
    addClaim : {
        url : "/claim-type",
        method : "POST"
    },
    editClaim :(id)=> ({
        url : `/claim-type/${id}`,
        method : "PUT"
    }),
    deleteClaim : (id)=>({
        url : `/claim-type/${id}`,
        method : "DELETE"
    }),
    getCategory : {
        url : "/category",
        method : "GET"
    },
    createCategory : {
        url : "/category",
        method : "POST"
    },
    updateCategory : (id)=>({
        url : `/category/${id}`,
        method : "PUT"
    }),
    deleteCategory : (id)=>({
        url : `/category/${id}`,
        method : "DELETE"
    })
};
export default Master;