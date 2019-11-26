var hamster_data = {
    images: ["hamster.png"],
    frames: [[2, 2, 90, 120], [2, 122, 90, 120], [2, 242, 90, 120], [2, 362, 90, 120], [2, 602, 90, 120], [92, 602, 90, 120], [182, 602, 90, 120]],
    animations: {
        "stand4": [0],
        "stand5": [1],
        "stand6": [1],
        "stand7": [2],
        "stand0": [3],
        "stand1": [4],
        "stand2": [5],
        "stand3": [5]
    },
    scaleX: .6,
    scaleY: .6,
    regX: 45,
    regY: 100,
    framerate: 24,
    balloonY: 60,
    balloonX: 0
};

var settings = {
    character: hamster_data,
    roomPath: '/media/rooms/'
};
