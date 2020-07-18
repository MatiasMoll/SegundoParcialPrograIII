"use strict";
var ABM;
(function (ABM) {
    var Persona = /** @class */ (function () {
        function Persona() {
            this.nombre = "";
            this.apellido = "";
            this.sexo = "";
            this.edad = 0;
            this.nombre = "";
            this.apellido = " ";
            this.sexo = "";
            this.edad = 0;
        }
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        Persona.prototype.getSexo = function () {
            return this.sexo;
        };
        Persona.prototype.getEdad = function () {
            return this.edad;
        };
        Persona.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Persona.prototype.setApellido = function (apellido) {
            this.apellido = apellido;
        };
        Persona.prototype.setEdad = function (edad) {
            this.edad = edad;
        };
        Persona.prototype.setSexo = function (sexo) {
            this.sexo = sexo;
        };
        return Persona;
    }());
    ABM.Persona = Persona;
})(ABM || (ABM = {}));
