namespace Concesionario{

    window.onload = function(){

        
        document.getElementById("agregar")?.addEventListener("click",LogicaConcesionario.mostrarUOcultarContenedorAgregar);
        document.getElementById("btnAgregar")?.addEventListener("click",LogicaConcesionario.validateDataAndAddRow);
        document.getElementById("selectFiltro")?.addEventListener('change',LogicaConcesionario.buildTable);
        document.getElementById("btnPromedio")?.addEventListener('click',LogicaConcesionario.calcularPromedio);
        document.getElementById("chPrecio")?.addEventListener('change',LogicaConcesionario.ocultarTd);
        document.getElementById("chMarca")?.addEventListener('change',LogicaConcesionario.ocultarTd);
        document.getElementById("chModelo")?.addEventListener('change',LogicaConcesionario.ocultarTd);
        document.getElementById("chId")?.addEventListener('change',LogicaConcesionario.ocultarTd);
    }

    export class LogicaConcesionario{
        private static idFila = 0;
        private static viejaTabla:any;
        static lstVehiculos:Vehiculo[] = new Array();       
        
        static ocultarTd(p:any){
            let tabla = <HTMLTableElement>document.getElementById("cabeceraTabla");
           console.log(p.target.nextElementSibling.textContent);
            for(let i=0;i<tabla.childNodes.length;i++){
                
                console.log( tabla.childNodes[i].textContent);
                if(p.target.nextElementSibling.textContent == tabla.childNodes[i].textContent){
                    LogicaConcesionario.rendererTable(i);
                    (<HTMLTableElement>tabla.childNodes[i]).hidden = !(<HTMLTableElement>tabla.childNodes[i]).hidden; 
                }
            }
        }
        static rendererTable(tdABorrar:number){
            let tabla = <HTMLTableElement>document.getElementById("cuerpo");
            console.log(tabla.childNodes[0]);
            /*for(let i = 0 ;i<tabla.childNodes[0].childNodes.length;i++){
                if()
            }*/
        }
        static calcularPromedio(){
            LogicaConcesionario.searchTipo()
            .then(function(listaCoincidencias){
                let list = <Array<Vehiculo>>listaCoincidencias;
                let valorTotal = list.reduce(((acc,act)=> acc+=act.precio),0);
                (<HTMLInputElement>document.getElementById("txtPromedio")).value = (valorTotal / list.length).toString();
            });
        }

        static mostrarUOcultarContenedorAgregar():any{
            let cont = <HTMLDivElement> document.getElementById("contenedor");
            cont.hidden = !cont.hidden;
            let tipo = <HTMLSelectElement>document.getElementById("selectTipo");
            tipo.addEventListener('change',LogicaConcesionario.mostrarInputsTipo);
            
        }

        /*static mockPersonas(){
            for(let i = 0;i<4;i++){
                var people:Persona = new Persona();                      
                people.setApellido("Apellido "+i);
                people.setEdad(i);
                people.setSexo("Femenino");
                people.setNombre("Nombre "+ i);           
                LogicaConcesionario.addPerson(people,"cuerpo");
            }
        }*/

        static validateDataAndAddRow(){
            let inpMarca = (<HTMLInputElement>document.getElementById("txtMarca"));
            let inpModelo = (<HTMLInputElement>document.getElementById("txtModelo"));
            let inpPrecio = (<HTMLInputElement>document.getElementById("txtPrecio"));
            let tipoSelect = (<HTMLSelectElement>document.getElementById("selectTipo"));
            if(inpMarca.value != "" ){   
                if(inpModelo.value != ""){
                    if(inpModelo.value != ""){                       
                        var id = LogicaConcesionario.calcularId();
                        if(tipoSelect.value == "Camioneta"){
                            
                            let boolean = (<HTMLInputElement>document.getElementById("boolean")).checked;
                            var newCamioneta = new Camioneta(id,inpMarca.value,
                                                inpModelo.value,parseInt(inpPrecio.value),
                                                boolean);
                           LogicaConcesionario.addVehiculo(newCamioneta,"cuerpo");                                                 
                        }else{
                            
                            let puertas = (<HTMLInputElement>document.getElementById("txtPuerta"));
                            var newAuto = new Auto(id,inpMarca.value,
                            inpModelo.value,parseInt(inpPrecio.value),parseInt(puertas.value));
                            LogicaConcesionario.addVehiculo(newAuto,"cuerpo");
                      

                        }
                        
                    }else{
                        inpPrecio.classList.add("error");
                    }
                }else{
                    inpMarca.classList.add("error");
                }
            }else{
                inpMarca.classList.add("error");
            }
        }

        static addVehiculo(Vehiculo:Vehiculo,idTabla:string):void{
            let tabla = <HTMLTableElement>document.getElementById(idTabla);
            LogicaConcesionario.buildRow(Vehiculo,tabla);
            LogicaConcesionario.lstVehiculos.push(Vehiculo);

        }
        
 
        static buildTable(){
            if(LogicaConcesionario.lstVehiculos.length != 0){
                
                let tipoSelect = (<HTMLSelectElement>document.getElementById("selectTipo"));
                LogicaConcesionario.searchTipo().then(function(list){
                
                let personList = <Array<Vehiculo>>list;
                let tabla = <HTMLTableElement>document.getElementById("cuerpo");
                if(LogicaConcesionario.viejaTabla == ""){
                    LogicaConcesionario.viejaTabla = tabla;
                }
                tabla.innerHTML = "";
                for(let i=0 ; personList.length>i;i++){
                    LogicaConcesionario.buildRow(personList[i],tabla);
                }
                if(tipoSelect.value == "Ninguno"){
                    tabla = LogicaConcesionario.viejaTabla;
                }
                });   
            }               
        }
 
        private static buildRow(person:Vehiculo,tabla:HTMLTableElement,):void{
            let tr = document.createElement("tr");           
             
            let tdMarca = document.createElement("td");
            let tdModelo = document.createElement("td");
            let tdPrecio = document.createElement("td");
            let tdId = document.createElement("td");
            let tdAccion = document.createElement("td");
            let button = document.createElement("button");

            button.textContent = "Eliminar";
            button.addEventListener('click',LogicaConcesionario.borrar);
            tr.setAttribute("idRow",LogicaConcesionario.calcularId().toString());
            tdId.appendChild(document.createTextNode(LogicaConcesionario.calcularId().toString()));
            tr.appendChild(tdId);    
            tdMarca.appendChild(document.createTextNode(person.marca));
            tr.appendChild(tdMarca);        
            tdModelo.appendChild(document.createTextNode(person.modelo));
            tr.appendChild(tdModelo);
            tdPrecio.appendChild(document.createTextNode(person.precio.toString()));  
            tr.appendChild(tdPrecio);
 
            tdAccion.appendChild(button);
            tr.appendChild(tdAccion);
            
            tabla.appendChild(tr);
        
        }
        private static mostrarInputsTipo(){
            let tipoSelected = (<HTMLSelectElement>document.getElementById("selectTipo")).value;
            (<HTMLButtonElement>document.getElementById("btnAgregar")).disabled = false;
            if(tipoSelected == "Camioneta"){
                (<HTMLDivElement>document.getElementById("tpCamioneta")).hidden = false;
                (<HTMLDivElement>document.getElementById("tpAuto")).hidden = true;
            }else if(tipoSelected == "Auto"){
                (<HTMLDivElement>document.getElementById("tpAuto")).hidden = false;
                (<HTMLDivElement>document.getElementById("tpCamioneta")).hidden = true;
            }else{
                (<HTMLDivElement>document.getElementById("tpCamioneta")).hidden = true;
                (<HTMLDivElement>document.getElementById("tpAuto")).hidden = true;
                (<HTMLButtonElement>document.getElementById("btnAgregar")).disabled = true;
            }
        }
        private static calcularId(){
            var aux = 0;
            if(LogicaConcesionario.lstVehiculos.length>0){
                aux = LogicaConcesionario.lstVehiculos.reduce((idActual,idMayor)=> idActual.id>idMayor.id ? idMayor = idActual : idMayor).id + 1;
            }            
            return aux;
        }
        private static borrar(e:any){
            var index = -1;
            for(let i = 0;i<LogicaConcesionario.lstVehiculos.length;i++){
                if(LogicaConcesionario.lstVehiculos[i].id == e.target.parentNode.parentNode.childNodes[0].textContent){
                    index = i;
                    break;
                }
            }
            if(index != -1){
                LogicaConcesionario.lstVehiculos.splice(index,1);
                
            }            
            e.target.parentNode.parentNode.remove();
        }

        private static searchTipo(){
            let name = (<HTMLInputElement>document.getElementById("selectFiltro")).value;
            return new Promise(function(resolve){
                let vehiculoEncontrado = LogicaConcesionario.lstVehiculos.filter(function(p){
                    if(name == "Auto"){
                        return p instanceof Auto;
                    }else if(name == "Camioneta"){
                        return p instanceof Camioneta;
                    }else{
                        return p;
                    }
                })
                if(vehiculoEncontrado.length>0){
                    resolve(vehiculoEncontrado);
                }
            });           
        }


    }


    
}