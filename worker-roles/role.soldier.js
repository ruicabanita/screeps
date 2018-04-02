/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.soldier');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(soldier) {
        var closestHostile = soldier.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            if(soldier.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                    soldier.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
    }
};