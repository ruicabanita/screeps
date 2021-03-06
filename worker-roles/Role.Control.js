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
Memory.memoryVariables.sourcesCount=sourcesCount;
var tower1 = Game.getObjectById('5a78b236e1955974d193175d');
var tower2 = Game.getObjectById('5aac56f1922bbc6d1f4998b9');
var storage1 = Game.getObjectById('5accd8bfa019f614e51d7efa');
var room1 = Game.spawns['Spawn1'].room;
var energy1MissingPercent = (1-(room1.energyAvailable + tower1.energy + tower2.energy)/(room1.energyCapacityAvailable + tower1.energyCapacity + tower2.energyCapacity))*100;
var energy2MissingPercent = (1-Math.round((storage1.store[RESOURCE_ENERGY])/(storage1.storeCapacity * .01)))*100;
Memory.memoryVariables.energy1MissingPercent = Math.round(energy1MissingPercent);
Memory.memoryVariables.energy2MissingPercent = Math.round(energy2MissingPercent);
var impHar = sourcesCount * energy1MissingPercent * 5 + sourcesCount * energy2MissingPercent;

// Workers | Upgraders
var impUpg = 10;

// Workers | Builders
var cSites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
var cSitesCount = cSites.length;
Memory.memoryVariables.cSitesCount = cSitesCount;
var cSitesMissingProgress = 0;
for(const id in Game.constructionSites){
    var cSite = Game.constructionSites[id];
    cSitesMissingProgress = cSitesMissingProgress + (cSite.progressTotal - cSite.progress);
}
var damagedStructures = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES);
var damagedStructuresCount = damagedStructures.length;
var missingStructureHitpoints = 0;
var totalStructureHitpoints = 0;
for(var i = 0; i < damagedStructuresCount; i+=1){
    var damagedStructure = damagedStructures[i];
    missingStructureHitpoints = missingStructureHitpoints + damagedStructure.hitsMax - damagedStructure.hits;
    totalStructureHitpoints = totalStructureHitpoints + damagedStructure.hitsMax;
};
var missingStructureHitpointsPercentage = (missingStructureHitpoints / totalStructureHitpoints)*100;
var impBld = (cSitesMissingProgress / 30) + (missingStructureHitpointsPercentage * 10) + 10;
Memory.memoryVariables.missingStructureHitpointsPercentage = missingStructureHitpointsPercentage;

// Proportions
var impTotal = impHar + impUpg + impBld;
Memory.memoryVariables.impHar = impHar;
Memory.memoryVariables.impUpg = impUpg;
Memory.memoryVariables.impBld = impBld;
var impRelHar = impHar/impTotal;
var impRelUpg = impUpg/impTotal;
var impRelBld = impBld/impTotal;
var myCreeps = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS);
var myCreepsCount = myCreeps.length;
var myWorkers = _.filter(Game.creeps, (creep) => creep.memory.type == 'worker');
var myWorkersCount = myWorkers.length;
var mySoldiers = _.filter(Game.creeps, (creep) => creep.memory.type == 'soldier');
var mySoldiersCount = mySoldiers.length;
Memory.memoryVariables.myWorkersCount = myWorkersCount;
Memory.memoryVariables.mySoldiersCount = mySoldiersCount;
var harNr = Math.round((myWorkersCount -1) * impRelHar);
var upgNr = 1 + Math.round((myWorkersCount -1) * impRelUpg);
var bldNr = Math.round((myWorkersCount -1) * impRelBld);
Memory.roleproportions = {harNr, upgNr, bldNr};
var changedMemory = 0;
var workerRoles = ['harvester', 'upgrader', 'builder'];

module.exports = {
    run() {
        for(var name in Game.creeps) {
            if(!Game.creeps[name].memory.role) {
                Game.creeps[name].memory.role = 'upgrader';
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