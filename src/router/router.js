import { routers } from "./routers"

export const router =  async (elemento) => {
    const hast = location.hash.slice(1);
    const ruta = recorrerRutas(routers, hast);
    await cargarVista(ruta.path, elemento) 
    ruta.controller();
}
const recorrerRutas = (routers, hast) => {
    let lista = hast.split("/"); 
    let separador = (hast.split("/").length);
    console.log(separador);
    
    if (separador == 1) {
        for (const key in routers) {
        if (key == hast)
        { 
        for(const elemento in routers[key])
        {
            if(typeof routers[key][elemento] == "object")
            {
            if(elemento == "/")
            {
              return  routers[key][elemento];
            }
            }
            else if(elemento == "path")
            {
                return  routers[key];
            }
            else
            {
                return routers.inicio;
            }
        }
        }
    }
    return routers.inicio;
    }
    if (separador == 2)
    {
        for (const key in routers) 
        {  
        if (key == lista[0])
        { 
        for(const elemento in routers[key])
        {
            if(typeof routers[key][elemento] == "object")
            {
            if(elemento == "crear" && lista[1] == "crear")
            {
              console.log("Accedio cantidad 2 del hash a CREAR");
              return routers.inicio;
            }
            else if(elemento == "editar" && lista[1] == "editar")
            {
                console.log("Accedio cantidad 2 del hash a EDITAR");
                return routers.inicio;
            }
            }
            else
            {
                console.log("Accedio cantidad 2 pero el hash no coincidio");
                return routers.inicio;
            }
        }
        }
    }
    }
    
}

 const cargarVista = async (path, elemento) => {
    const seccion = await fetch(`./src/views/${path}`);
    if (!seccion.ok) throw new Error("No pudimos leer el archivo");
    const html = await seccion.text();
    elemento.innerHTML =  html;

 }