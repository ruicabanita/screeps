/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Tower.Control');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run() {
        var myTowers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, { filter: {structureType: 'tower'}});
        if(myTowers.length) {
            for(var i=0; i < myTowers.length; i++){
                var myTower = myTowers[i];
                var closestHostile = myTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var repairTargets = myTower.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax});
                //repairTargets.sort((a,b) => a.hits - b.hits);
                var wallsToFortify = myTower.room.find(FIND_STRUCTURES, {
                filter: (!repairTargets)});
                //wallsToFortify.sort((a,b) => a.hits - b.hits);
                if(closestHostile) {
                    myTower.attack(closestHostile);
                } else if(repairTargets.length){
                    myTower.repair(repairTargets[0]);
                /*} else if(wallsToFortify.length){
                    myTower.repair(wallsToFortify[0]);*/
                };
            }
        }
    }
};