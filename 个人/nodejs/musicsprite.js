// const audiosprite = require('audiosprite')
// const file1= require('./伴奏.mp3')
// const file2 = require('./越剧追鱼.mp3')
// const files = [file1, file2]
// const opts = { output: 'result' }
// audiosprite(files, opts, (err,obj) => {
//   console.log(JSON.stringify(obj,null,2));
// })
const fullPath='./uploads'
const ffmpeg=require('ffmpeg')
let cmd1 = 'amovie=' + './伴奏.mp3' + ':loop=0,volume=0.3,asetpts=N/SR/TB[bg]';
let cmd2 = '[0][bg]amix=duration=shortest,volume=0.3 ';
    ffmpeg('./越剧追鱼.mp3')
        .on('end', function () {
            console.error(new Date(), '完整音频生成成功');      
        })
        .on('error', function (err) {
            console.error(new Date(), err);
        })
        .complexFilter([cmd1, cmd2])
        .output(fullPath)
        .run();