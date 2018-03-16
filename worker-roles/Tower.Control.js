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
        var tower = Game.getObjectById('5a78b236e1955974d193175d');
        console.log(tower + ' online');
        if(tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var repairTargets = tower.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax});
            repairTargets.sort((a,b) => a.hits - b.hits);
            var wallsToFortify = tower.room.find(FIND_STRUCTURES, {
            filter: (!repairTargets)});
            wallsToFortify.sort((a,b) => a.hits - b.hits);
            if(closestHostile) {
                
                tower.attack(closestHostile);
            } else if(repairTargets.length){
                tower.repair(repairTargets[0]);
            } else if(wallsToFortify.length){
                tower.repair(wallsToFortify[0]);
            };
        }
    }
};