'use strict';

function log(input) {
    console.log(input);
};

function benchmarkObject(object, property){
    
    let objectValues = [];
    
    let start = performance.now();

    for (let i = 0; i < 10000; ++i) {
        objectValues[i] = object[property]
    }
    
    let end = performance.now();
    
    return end - start;
}




class Clock{

    template = null;
    timer = null;

    constructor({ template }){
        this.template = template;
    }

    render(){
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        log(output);
    }

    stop(){
        clearInterval(this.timer);
    }   
    
    start(){
        this.render();
        this.timer = setInterval(this.render.bind(this), 1000);
    }

}

let clock = new Clock({template: 'h:m:s'});
clock.start();
