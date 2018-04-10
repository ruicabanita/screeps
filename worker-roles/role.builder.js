var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working) {
            var buildTargets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
            var repairTargets = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
            var fortifyTargets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
            fortifyTargets.sort(function(a,b){return a.hits - b.hits});
            if(buildTargets.length) {
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (repairTargets.length) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } else if (fortifyTargets.length){
                if(creep.repair(fortifyTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(fortifyTargets[0], {visualizePathStyle: {stroke: '#00ff00'}});
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