/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Role.Control');
 * mod.thing == 'a thing'; // true
 */

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