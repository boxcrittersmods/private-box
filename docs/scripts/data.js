var hamster_data = {
    images: ["hamster.png"],
    frames: [[2, 2, 90, 120], [2, 122, 90, 120], [2, 242, 90, 120], [2, 362, 90, 120], [2, 602, 90, 120], [92, 602, 90, 120], [182, 602, 90, 120]],
    animations: {
        "stand4": [0], // South - Front
        "stand5": [1],
        "stand6": [1], // South West - Left - no ok
        "stand7": [2],
        "stand0": [3], // North - Back
        "stand1": [1],
        "stand2": [4], // ok
        "stand3": [4] // South East - ok
    },
    scaleX: .6, //90 big hamster | 5 normal critter
    scaleY: .6, //90 big hamster | 5 normal critter
    regX: 45,
    regY: 100,
    framerate: 24,
    balloonY: 80, //80 big hamster | 60 normal critter
    balloonX: 0
};

var settings = {
    character: hamster_data,
    roomPath: SERVER_URL + '/media/rooms/'
};
