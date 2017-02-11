var blessed = require('blessed')


var bar;

var screen = blessed.screen({
    autopad: true,
    smartCSR: true,
});
 // exit the program by using esc q or ctl-c
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
})

var bar = blessed.progressbar({
    parent: screen,
    border: 'line',
    style: {
        fg: 'blue',
        bg: 'default',
        bar: {
            bg: 'default',
            fg: 'blue'
        },
        border: {
            fg: 'default',
            bg: 'default'
        }
    },
    ch: ':',
    width: '50%',
    height: 3,
    top: 3,
    left: 3,
});

bar.on('complete', function()  {
    console.log('completed!')
    clearInterval(interval)
})
screen.append(bar);
screen.render();

screen.key(['i'], function(ch, key) {
    bar.progress(1);
    screen.render();
})


var count = 0
var interval = setInterval(function() {
    count = count +1
    bar.setProgress(count)
    screen.render()
}, 50)
