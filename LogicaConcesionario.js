"use strict";
var Concesionario;
(function (Concesionario) {
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = document.getElementById("agregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", LogicaConcesionario.mostrarUOcultarContenedorAgregar);
        (_b = document.getElementById("btnAgregar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", LogicaConcesionario.validateDataAndAddRow);
        (_c = document.getElementById("selectFiltro")) === null || _c === void 0 ? void 0 : _c.addEventListener('change', LogicaConcesionario.buildTable);
        (_d = document.getElementById("btnPromedio")) === null || _d === void 0 ? void 0 : _d.addEventListener('click', LogicaConcesionario.calcularPromedio);
        (_e = document.getElementById("chPrecio")) === null || _e === void 0 ? void 0 : _e.addEventListener('change', LogicaConcesionario.ocultarTd);
        (_f = document.getElementById("chMarca")) === null || _f === void 0 ? void 0 : _f.addEventListener('change', LogicaConcesionario.ocultarTd);
        (_g = document.getElementById("chModelo")) === null || _g === void 0 ? void 0 : _g.addEventListener('change', LogicaConcesionario.ocultarTd);
        (_h = document.getElementById("chId")) === null || _h === void 0 ? void 0 : _h.addEventListener('change', LogicaConcesionario.ocultarTd);
    };
    var LogicaConcesionario = /** @class */ (function () {
        function LogicaConcesionario() {
        }
        LogicaConcesionario.ocultarTd = function (p) {
            var tabla = document.getElementById("cabeceraTabla");
            console.log(p.target.nextElementSibling.textContent);
            for (var i = 0; i < tabla.childNodes.length; i++) {
                console.log(tabla.childNodes[i].textContent);
                if (p.target.nextElementSibling.textContent == tabla.childNodes[i].textContent) {
                    tabla.childNodes[i].hidden = !tabla.childNodes[i].hidden;
                }
            }
        };
        LogicaConcesionario.calcularPromedio = function () {
            LogicaConcesionario.searchTipo()
                .then(function (listaCoincidencias) {
                var list = listaCoincidencias;
                var valorTotal = list.reduce((function (acc, act) { return acc += act.precio; }), 0);
                document.getElementById("txtPromedio").value = (valorTotal / list.length).toString();
            });
        };
        LogicaConcesionario.mostrarUOcultarContenedorAgregar = function () {
            var cont = document.getElementById("contenedor");
            cont.hidden = !cont.hidden;
            var tipo = document.getElementById("selectTipo");
            tipo.addEventListener('change', LogicaConcesionario.mostrarInputsTipo);
        };
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
        LogicaConcesionario.validateDataAndAddRow = function () {
            var inpMarca = document.getElementById("txtMarca");
            var inpModelo = document.getElementById("txtModelo");
            var inpPrecio = document.getElementById("txtPrecio");
            var tipoSelect = document.getElementById("selectTipo");
            if (inpMarca.value != "") {
                if (inpModelo.value != "") {
                    if (inpModelo.value != "") {
                        var id = LogicaConcesionario.calcularId();
                        if (tipoSelect.value == "Camioneta") {
                            var boolean = document.getElementById("boolean").checked;
                            var newCamioneta = new Concesionario.Camioneta(id, inpMarca.value, inpModelo.value, parseInt(inpPrecio.value), boolean);
                            LogicaConcesionario.addVehiculo(newCamioneta, "cuerpo");
                        }
                        else {
                            var puertas = document.getElementById("txtPuerta");
                            var newAuto = new Concesionario.Auto(id, inpMarca.value, inpModelo.value, parseInt(inpPrecio.value), parseInt(puertas.value));
                            LogicaConcesionario.addVehiculo(newAuto, "cuerpo");
                        }
                    }
                    else {
                        inpPrecio.classList.add("error");
                    }
                }
                else {
                    inpMarca.classList.add("error");
                }
            }
            else {
                inpMarca.classList.add("error");
            }
        };
        LogicaConcesionario.addVehiculo = function (Vehiculo, idTabla) {
            var tabla = document.getElementById(idTabla);
            LogicaConcesionario.buildRow(Vehiculo, tabla);
            LogicaConcesionario.lstVehiculos.push(Vehiculo);
        };
        LogicaConcesionario.buildTable = function () {
            if (LogicaConcesionario.lstVehiculos.length != 0) {
                var tipoSelect_1 = document.getElementById("selectTipo");
                LogicaConcesionario.searchTipo().then(function (list) {
                    var personList = list;
                    var tabla = document.getElementById("cuerpo");
                    if (LogicaConcesionario.viejaTabla == "") {
                        LogicaConcesionario.viejaTabla = tabla;
                    }
                    tabla.innerHTML = "";
                    for (var i = 0; personList.length > i; i++) {
                        LogicaConcesionario.buildRow(personList[i], tabla);
                    }
                    if (tipoSelect_1.value == "Ninguno") {
                        tabla = LogicaConcesionario.viejaTabla;
                    }
                });
            }
        };
        LogicaConcesionario.buildRow = function (person, tabla) {
            var tr = document.createElement("tr");
            var tdMarca = document.createElement("td");
            var tdModelo = document.createElement("td");
            var tdPrecio = document.createElement("td");
            var tdId = document.createElement("td");
            var tdAccion = document.createElement("td");
            var button = document.createElement("button");
            button.textContent = "Eliminar";
            button.addEventListener('click', LogicaConcesionario.borrar);
            tr.setAttribute("idRow", LogicaConcesionario.calcularId().toString());
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
        };
        LogicaConcesionario.mostrarInputsTipo = function () {
            var tipoSelected = document.getElementById("selectTipo").value;
            document.getElementById("btnAgregar").disabled = false;
            if (tipoSelected == "Camioneta") {
                document.getElementById("tpCamioneta").hidden = false;
                document.getElementById("tpAuto").hidden = true;
            }
            else if (tipoSelected == "Auto") {
                document.getElementById("tpAuto").hidden = false;
                document.getElementById("tpCamioneta").hidden = true;
            }
            else {
                document.getElementById("tpCamioneta").hidden = true;
                document.getElementById("tpAuto").hidden = true;
                document.getElementById("btnAgregar").disabled = true;
            }
        };
        LogicaConcesionario.calcularId = function () {
            var aux = 0;
            if (LogicaConcesionario.lstVehiculos.length > 0) {
                aux = LogicaConcesionario.lstVehiculos.reduce(function (idActual, idMayor) { return idActual.id > idMayor.id ? idMayor = idActual : idMayor; }).id + 1;
            }
            return aux;
        };
        LogicaConcesionario.borrar = function (e) {
            var index = -1;
            for (var i = 0; i < LogicaConcesionario.lstVehiculos.length; i++) {
                if (LogicaConcesionario.lstVehiculos[i].id == e.target.parentNode.parentNode.childNodes[0].textContent) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                LogicaConcesionario.lstVehiculos.splice(index, 1);
            }
            e.target.parentNode.parentNode.remove();
        };
        LogicaConcesionario.searchTipo = function () {
            var name = document.getElementById("selectFiltro").value;
            return new Promise(function (resolve) {
                var vehiculoEncontrado = LogicaConcesionario.lstVehiculos.filter(function (p) {
                    if (name == "Auto") {
                        return p instanceof Concesionario.Auto;
                    }
                    else if (name == "Camioneta") {
                        return p instanceof Concesionario.Camioneta;
                    }
                    else {
                        return p;
                    }
                });
                if (vehiculoEncontrado.length > 0) {
                    resolve(vehiculoEncontrado);
                }
            });
        };
        LogicaConcesionario.idFila = 0;
        LogicaConcesionario.lstVehiculos = new Array();
        return LogicaConcesionario;
    }());
    Concesionario.LogicaConcesionario = LogicaConcesionario;
})(Concesionario || (Concesionario = {}));
