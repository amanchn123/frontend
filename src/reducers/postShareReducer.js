
export const postShareReducer=(state,action)=>{
   switch(action.type){
    case "POSTSHARE_REQUEST":
        return {...state,loading:true}

    case "POSTSHARE_SUCCESS":
        return {...state,postData:action.data,loading:false}
        
        case "POSTSHARE_SUCCESS":
            return {...state,loading:false} 
            
    default :
       return {...state}  
            
   }
}

export const currentPost=(state,action)=>{
   switch(action.type){
    case "GETPOST_REQUEST":
        return{...state,loading:true}

    case "GETPOST_SUCCESS":
        return{...state,data:action.data.data,loading:false}
        
    case "GETPOST_FAILED":
        return{...state,loading:false}
        
    default :
    return{...state}    
   }
}

export const deletePost=(state,action)=>{
    switch(action.type){
        case "DELETEPOST_REQUEST":
            return{...state}

        case "DELETEPOST_SUCCESS":
            return{...state}    
    }
}

export const CreatestoryReduces=(state,action)=>{
 switch(action.type){
    case  "CREATESTORY_REQUEST":
        return({...state})

    case "CREATESTORY_SUCCESS":
        return({...state,data:action.data})
        
     case "CREATESTORY_FAIL":
        return({...state})
        
     default:
        return({...state})   
 }
}

export const getstoryReducer=(state,action)=>{
    switch(action.type){
        case "GETSTORY_REQUEST":
            return({...state})

        case "GETSTORY_SUCCESS":
            return({...state,data:action.data})
            
        case "GETSTORY_FAIL":
            return({...state})
            
        default:
            return({...state})    
    }
}

