import { Roles } from "./Roles";

export default class Usuario {
    id?: number;
    nombreUsuario: string = "";
    clave: string = "";
    rol: Roles = Roles.VISOR;
}
