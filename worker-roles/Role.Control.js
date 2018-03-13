/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Role.Control');
 * mod.thing == 'a thing'; // true
 */

// Workers | Harversters
var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE);
var sourcesCount = sources.length;
console.log('Sources = ' + sourcesCount);
var energyMissingPercent = (1-(Game.spawns['Spawn1'].room.energyAvailable)/(Game.spawns['Spawn1'].room.energyCapacityAvailable))*100;
console.log('energyMissing(%) = ' + Math.round(energyMissingPercent));
var impHar = sourcesCount * energyMissingPercent;

// Workers | Upgraders
var impUpg = 50;

// Workers | Builders
var cSites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
var cSitesCount = cSites.length;
var damagedStructures = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES);
var damagedStructuresCount = damagedStructures.length;
var missingStructureHitpoints = 0;
var totalStructureHitpoints = 0;
for(var i = 0; i < damagedStructuresCount; i+=1){
    var damagedStructure = damagedStructures[i];
    missingStructureHitpoints = missingStructureHitpoints + damagedStructure.hitsMax - damagedStructure.hits;
    totalStructureHitpoints = totalStructureHitpoints + damagedStructure.hitsMax;
}
var missingStructureHitpointsPercentage = (missingStructureHitpoints / totalStructureHitpoints)*100;
var impBld = 50 * cSitesCount + missingStructureHitpointsPercentage;
console.log('Construction Sites | Missing Structure Hitpoints(%)= ' + cSitesCount + ' | ' + missingStructureHitpointsPercentage);

// Proportions
var impTotal = impHar + impUpg + impBld;
var impRelHar = impHar/impTotal;
var impRelUpg = impUpg/impTotal;
var impRelBld = impBld/impTotal;
var myCreeps = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS);
var myCreepsCount = myCreeps.length;
var myWorkers = _.filter(Game.creeps, (creep) => creep.memory.type == 'worker');
var myWorkersCount = myWorkers.length;
console.log('Workers:Soldiers = ' + myWorkersCount + ':0');
var harNr = Math.round(myWorkersCount*impRelHar);
var upgNr = Math.round(myWorkersCount*impRelUpg);
var bldNr = Math.round(myWorkersCount*impRelBld);
console.log('Harversters:Upgraders:Builders = ' + harNr + ':' + upgNr + ':' + bldNr);
var changedMemory = 0;
var workerRoles = ['harvester', 'upgrader', 'builder'];

module.exports = {
    run() {
        for(var name in Game.creeps) {
            if(!Game.creeps[name].memory.role) {
                Game.creeps[name].memory.role = 'upgrader';
                console.log('setting role upgrader:', name);
            }
        }
        for(var i = 0; i < myWorkersCount; i+=1){
            var worker = myWorkers[i];
            if(changedMemory < harNr){
                worker.memory.role = workerRoles[0];
            } else if (changedMemory < harNr + upgNr) {
                worker.memory.role = workerRoles[1];
            } else if (changedMemory < harNr + upgNr + bldNr) {
                worker.memory.role = workerRoles[2];
            }
        changedMemory +=1;    
        }
    }    
};