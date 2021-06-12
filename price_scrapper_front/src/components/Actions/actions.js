export const savingToStorage=(token)=>{
    localStorage.setItem("token",token)
    console.log(token)
    return{
        type:"token",
        token
    }
}