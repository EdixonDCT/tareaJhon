import { routers } from "./routers"

export const router = (elemento) => {
    const hast = location.hash.slice(1);
    const ruta = recorrerRutas(routers, hast);
     cargarVista(ruta.path, elemento)  
    //  ruta.controller();
    // console.log(ruta)

      
}

const recorrerRutas = (routers, hast) => {
    console.log(hast)
    for (const key in routers) {
        // console.log(routers[key]);
        
        
        console.log(hast.split("/"))       

        if (key == hast) { 
        for(const elemento in routers[key]){
            console.log(elemento);
            


            if(typeof routers[key][elemento] == "object"){
            if(elemento == "/"){
              return  routers[key][elemento]
            }
            }else{
                return  routers[key][elemento]
            }
        }
            
            return routers[key];            
        }
    }
    return "";
    
}
 const cargarVista = async (path, elemento) => {
    console.log(path, elemento);
    const seccion = await fetch(`./src/views/${path}`);
    if (!seccion.ok) throw new Error("No pudimos leer el archivo");
    const html = await seccion.text();
    elemento.innerHTML =  html;
    
 }