import { Auth } from "./auth.entity";


type AuthReturnDto = Omit<Auth, "password"> & {token : string}