/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Tower.Control');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var repairTargets = tower.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax});
        repairTargets.sort(function(a,b){return a.hits - b.hits});
        var fortifyTargets = tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax});
        fortifyTargets.sort(function(a,b){return a.hits - b.hits});
        if(closestHostile) {
            tower.attack(closestHostile);
        } else if(repairTargets.length && tower.energy/tower.energyCapacity > .5){
            tower.repair(repairTargets[0]);
        /* } else if(fortifyTargets.length && tower.energy/tower.energyCapacity > .95){
            tower.repair(fortifyTargets[0]); */
        };
    }
};