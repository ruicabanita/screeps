console.log('beep!')
var typeWorker = require('type.worker');
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
        if(creep.memory.type == 'worker'){
            typeWorker.run(creep);
        }
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

//Command towers starting with the ones with the most energy aquired
    var towers = _.filter(Game.structures, (structure) => structure.structureType == 'tower');
    towers.sort(function(a,b){return b.energy - a.energy});

    for(var i=0; i < towers.length; i++ ) {
        var tower = towers[i];
        towerControl.run(tower);
    }
}