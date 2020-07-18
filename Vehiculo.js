"use strict";
var Concesionario;
(function (Concesionario) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    Concesionario.Vehiculo = Vehiculo;
})(Concesionario || (Concesionario = {}));
