namespace Concesionario{

    export class Auto extends Vehiculo{

        cantidadPuertas:number;
        constructor(id:number,marca:string,modelo:string,precio:number,puertas:number){
            super(id,marca,modelo,precio);
            this.cantidadPuertas = puertas;

        }
    }
}