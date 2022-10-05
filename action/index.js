const { MudletMapReader } = require("mudlet-map-binary-reader");

const inputFile = "map.dat"
const outputDirectory = "page/data"

/**
 * @type {Mudlet.MudletMap}
 */
let mapModel = MudletMapReader.read(inputFile);

Object.entries(mapModel.areaNames).forEach(([key, value]) => {
    if (value.startsWith("Czarna wieza")) {
        delete mapModel.areaNames[key];
        delete mapModel.areas[key];
    }
})
mapModel.rooms = Object.fromEntries(Object.entries(mapModel.rooms).filter(([roomId, room]) => Object.keys(mapModel.areaNames).indexOf(room.area.toString() > -1)))


let { mudletMap, colors } = MudletMapReader.export(mapModel, outputDirectory);
