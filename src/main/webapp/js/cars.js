// Cars :

var cars, server,            // Model parts (client and stub for server)
    controller,              // Controller
    events,                  // A tiny event registration service
    table, inputArea    // View parts
    ;

cars = {
    CARS: {},
    get: function (id) {
        return id ? this.CARS[id] : this.CARS;
    },
    getLength: function (carData) {
        var length = 0;
        $.each(carData || this.CARS, function () {
            length++
        });
        return length;
    },
    update: function (carData) {
        var self = this, update = false;
        $.each(carData, function (id, car) {
            if (id) self.CARS[id] = car;
            update = true;
        });
        if (update) events.raise("update", carData);
    },
    deleteSingle: function (id) {
        delete this.CARS[id];
        events.raise("deleteSingle", id);
    },
    fields: {
        name: "name",
        description: "DESCRIPTION",
        color: "COLOR",
        cost: "COST",
        year: "YEAR"
    }
};

inputArea = {
    fillFromCar: function (id, car) {
        $.each(cars.fields, function (name) {
            $("#" + name).val(car[name]);
        });
        $("#ID").val(id);
    },
    reset: function () {
        $("#carData input").val("");
    },
    get: function () {
        var car = { };
        $.each(cars.fields, function (name) {
            car[name] = $("#" + name).val();
            if (car[name] === null) car[name] = "";
        });
        car._id = $("#ID").val();
        return car;
    }
}

function Table() {
    this.dataTable = $("#result").dataTable({
        aoColumns: this.aoColumns(cars.fields),
        bFilter: false,
        bPaginate: false,
        bInfo: false
    });
}

$.extend(Table.prototype, {
    update: function (carData) {
        var dataTable = this.dataTable,
            settings = dataTable.fnSettings(),
            data = this.mapToDataTable(carData);
        $.each(data, function (index, row) {
            var tr = document.getElementById(row.DT_RowId);
            if (tr)  // row exists -> update
                dataTable.fnUpdate(row, tr);
            else     // new row    -> add it
                dataTable.oApi._fnAddData(settings, row);
        });
        settings.aiDisplay = settings.aiDisplayMaster.slice();
        dataTable.fnDraw();
    },
    mapToDataTable: function (carData) {
        var table = [];
        $.each(carData, function (id, car) {
            var row = {};
            row.DT_RowId = id;
            var index = 0;
            $.each(cars.fields, function (name) {
                row[index] = car[name];
                index++;
            });
            table.push(row);
        });
        return table;
    },
    deleteRow: function (id) {
        this.dataTable.fnDeleteRow(document.getElementById(id));
    },
    selectRow: function (id) {
        this.deselectRows();
        $("#" + id).addClass("row_selected");
    },
    deselectRows: function () {
        $("#result tr.row_selected").removeClass("row_selected");
    },
    aoColumns: function (fields) {
        return $.map(fields, function (index, name) {
            return { sName: name, sTitle: fields[name] };
        });
    }

});

events = {
    registry: {},
    register: function (entries) {
        var self = this;
        $.each(entries, function (event, handlers) {
            if (!self.registry[event]) self.registry[event] = [];
            $.each(handlers, function (index, handler) {
                self.registry[event].push(function (data) {
                    handler[0][handler[1]].call(handler[0], data);
                });
            });
        });
    },
    raise: function (event, data) {
        var handlers = this.registry[event];
        $.each(handlers, function (index, registeredHandler) {
            registeredHandler(data);
        });
    }
};

function Controller() {
    var controller = this;
    server = new Server();

    $.each(["save", "new", "create", "delete", "reset"], function (index, id) {
        $("#" + id).click(controller["click_" + id]);
    });

    table = new Table();

    $("#result tbody").on("click", "tr", function (e) {
        controller.click_row(this);
    });

// Register for model notifications
    events.register({
        update: [
            [table, "update"]
        ],
        deleteSingle: [
            [table, "deleteRow"],
            [inputArea, "reset"]
        ]
    });

    server.getCars(function (data) {
        cars.update(data.CARS);
    });

}

$.extend(Controller.prototype, {
    click_save: function () {
            server.saveCar(inputArea.get(), function (data) {
                cars.update(data.CARS);
            });
    },
    click_new: function () {
        inputArea.reset();
        table.deselectRows();
    },
    click_create: function () {
        server.createCar(inputArea.get(), function (data) {
            cars.update(data.CARS);
        });
        inputArea.reset();
    },
    click_delete: function () {
        var id = $("#ID").val();
        if (id) {
            server.deleteCar(id, function (data) {
                cars.deleteSingle(id);
            });
        }
    },
    click_row: function (row) {
        if ($(row).hasClass("row_selected")) {
            table.deselectRows();
            inputArea.reset();
        }
        else {
            var car = cars.get(row.id);
            table.selectRow(row.id);
            inputArea.fillFromCar(row.id, car);
        }
    },
    updateFromServer: function (data, callback) {
        callback(data);
    }
});

// The object for remote calls to the server
function Server() {

    this.BASE_URL = "http://localhost:8080/JQueryRest/rest/";
    this.CAR_MANAGER = this.BASE_URL + "cars/";

    $.ajaxSetup({
        url: this.CAR_MANAGER,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        data: "",
        processData: false
    });

}

$.extend(Server.prototype, {
    getCars: function (callback) {
        $.ajax({
            success: function (data) {
                controller.updateFromServer(data, callback);
            }
        });
    },
    saveCar: function (car, callback) {
        $.ajax({
            url: this.CAR_MANAGER + car._id,
            type: "PUT",
            data: JSON.stringify(car),
            success: function (data) {
                controller.updateFromServer(data, callback);
            }
        });
    },
    createCar: function (car, callback) {
        $.ajax({
            url: this.CAR_MANAGER,
            type: "POST",
            data: JSON.stringify(car),
            success: function (data) {
                controller.updateFromServer(data, callback);
            }
        });
    },
    deleteCar: function (id, callback) {
        $.ajax({
            url: this.CAR_MANAGER + id,
            type: "DELETE",
            success: function (data) {
                controller.updateFromServer(data, callback);
            }
        });
    }
});

$(function () {
    controller = new Controller()
});