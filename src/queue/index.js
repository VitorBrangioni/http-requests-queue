const Bull = require('bull');
const Queue = new Bull('Queue');

exports.Queue = (func) => {
    
    return Queue.process((job, done) => {
        console.log('executando fila');
        console.log(job);
        return func();
        /* func.then( _ => {
            console.log("job executado")
            done()
        }); */
    });
}