var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var repairTargets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
            var wallsToFortify = creep.room.find(FIND_STRUCTURES, {
            filter: (!repairTargets)});
            wallsToFortify.sort((a,b) => a.hits - b.hits);
            var wallsToFortifyCount = wallsToFortify.length;
            if(buildTargets.length) {
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (repairTargets.length) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } else if (wallsToFortify.length){
                if(creep.repair(wallsToFortify[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(wallsToFortify[0], {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }
        else {
            var targetSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;