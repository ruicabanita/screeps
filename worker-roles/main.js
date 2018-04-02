console.log('beep!')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldier = require('role.soldier');
var spawnControl = require('Spawn.Control');
var roleControl = require('Role.Control');
var towerControl = require('Tower.Control');

module.exports.loop = function () {

// Delete empty memories
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawnControl.run();

// Creep roles
    roleControl.run();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'soldier') {
            roleBuilder.run(creep);
        }
    }

    for(const id in Game.structures) {
        var structure = Game.structures[id];
        if (structure.structureType == 'tower'){
            towerControl.run(structure);
        }   
    }
}