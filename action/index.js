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

const exitKeys = ["east", "west", "north", "south", "northeast", "northwest", "southeast", "southwest", "up", "down", "in", "out"]

let roomsToDelete = Object.entries(mapModel.rooms).filter(([roomId, room]) => Object.keys(mapModel.areaNames).indexOf(room.area.toString()) == -1).map(([roomId, room]) => roomId)
roomsToDelete.forEach(id => delete mapModel.rooms[id])
Object.entries(mapModel.rooms).forEach(([roomId, room]) => {
    exitKeys.forEach(key => {
        if (roomsToDelete.indexOf(room[key].toString()) > -1) {
            room[key] = -1
        }
    })
})
let { mudletMap, colors } = MudletMapReader.export(mapModel, outputDirectory);
