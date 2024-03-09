const credentails = [
    {
        email : "default@gmail.com",
        password : "default"
    }
]


export const authenticateUser = (email:string,password:string) => {

    for(let i = 0; i < credentails.length; i++)
        if(credentails[i].email === email && credentails[i].password === password )
            return true;
    
    return false;        

}