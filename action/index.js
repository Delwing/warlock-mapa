const { MudletMapReader } = require("mudlet-map-binary-reader");

const inputFile = "map.dat"
const outputDirectory = "page/data"

/**
 * @type {Mudlet.MudletMap}
 */
let mapModel = MudletMapReader.read(inputFile);

mapModel.areaNames = Object.fromEntries(Object.entries(mapModel.areaNames).filter(([key, value]) => !value.startsWith("Czarna wieza")))
mapModel.rooms = Object.fromEntries(Object.entries(mapModel.rooms).filter(([roomId, room]) => Object.keys(mapModel.areaNames).indexOf(room.area.toString() > -1)))


let { mudletMap, colors } = MudletMapReader.export(mapModel, outputDirectory);
