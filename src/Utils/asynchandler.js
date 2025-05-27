const asynchandler=(fun)=>{
    return async (req,res,next)=>{
        try {
            await  fun(req,res,next);
        } catch (error) {
            res.status(error.code||500).json({
                success:false,
                message:error.message
            });

            
        }
        
    };
};
export {asynchandler}


// const asynchandler2= (fun) => {
//     async (req,res,next)=>{
//         Promise.resolve(fun(req,res,next)).catch((error)=>{next(error)});
        
//     }
    
// }