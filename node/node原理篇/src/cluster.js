const fs = require('fs');
const path = require('path');
const http = require('http');
// 子进程，开子进程。

const os = require('os'); // operating system
const { default: cluster } = require('cluster');

const cpu_num = os.cpus();

if(cluster.isMaster) {
    for(let i = 0; i <cpu_num.length; i++) {
        cluster.fork();
    }
} else {
    http.createServer((req, res) => {
        res.end('childPid', process.pid);
    }).listen(3000);
};