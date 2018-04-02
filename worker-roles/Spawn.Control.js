module.exports = {
    
    run() {
        
        var workersTargetNr = 9;
        var soldiersTargetNr = 0;
        var workers = _.filter(Game.creeps, (creep) => creep.memory.type == 'worker');
        var soldiers = _.filter(Game.creeps, (creep) => creep.memory.type == 'soldier');
        var enemies = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
        
        
        if(enemies.length){
            soldiersTargetNr = enemies.length;
        } else {
            soldiersTargetNr = 0;
        }
        
        if(workers.length < workersTargetNr && Game.spawns['Spawn1'].room.energyAvailable >= 200) {
            var newName = 'Worker' + Game.time;
            console.log('Spawning new worker: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {type: 'worker'}});
        }
    
        if(soldiers.length < soldiersTargetNr) {
            var newName = 'Soldier' + Game.time;
            console.log('Spawning new Soldier: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE], newName,
                {memory: {type: 'soldier'}});
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