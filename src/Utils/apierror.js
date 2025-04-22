class apierror extends Error {
    constructor(
        statusCode,
        message="somthing went wrong",
        error=[],
        statck=" "
        
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.error=error
        if(statck){
            this.stack=statck
        }
        else{
            Error.captureStackTrace(this,this.costructor)
        }
        
    }
}

export {apierror}