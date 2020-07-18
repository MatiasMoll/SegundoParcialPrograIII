namespace Concesionario{

    export class Camioneta extends Vehiculo{
        cuatroxcuatro:boolean;

        constructor(id:number,marca:string,modelo:string,precio:number,cuatroxcuatro:boolean){
            super(id,marca,modelo,precio);
            this.cuatroxcuatro = cuatroxcuatro;

        }
    }
}