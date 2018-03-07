/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Role.Control');
 * mod.thing == 'a thing'; // true
 */

var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE);
var sourcesCount = sources.length;
console.log('sourcesCount = ' + sourcesCount);
var energyMissingPercent = (1-(Game.spawns['Spawn1'].room.energyAvailable)/(Game.spawns['Spawn1'].room.energyCapacityAvailable))*100;
console.log('energyMissing(%) = ' + energyMissingPercent);
var impHar = sourcesCount * energyMissingPercent;
console.log('impHar = ' + impHar);
var impUpg = 50;
var impTotal = impHar + impUpg;
var impRelHar = impHar/impTotal;
var impRelUpg = impUpg/impTotal;
var myCreeps = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS);
var myCreepsCount = myCreeps.length;
console.log('myCreepsCount = ' + myCreepsCount);
var myWorkers = _.filter(Game.creeps, (creep) => creep.memory.type == 'worker');
console.log("myWorkers = " + myWorkers);
var myWorkersCount = myWorkers.length;
var harNr = Math.round(myWorkersCount*impRelHar);
var upgNr = Math.round(myWorkersCount*impRelUpg);
console.log('harNr:upgNr = ' + harNr + ':' + upgNr );

module.exports = {
    run() {
        for(var name in Game.creeps) {
            if(!Game.creeps[name].memory.role) {
                Game.creeps[name].memory.role = 'upgrader';
                console.log('setting role upgrader:', name);
            }
            
        }
    }    
};