module.exports = {
    
    run() {
        
        var workersTargetNr = 9;
        var workers = _.filter(Game.creeps, (creep) => creep.memory.type == 'worker');
        
        if(workers.length < workersTargetNr) {
            var newName = 'Worker' + Game.time;
            console.log('Spawning new worker: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {type: 'worker'}});
        }
    
        
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.type,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

    }
}