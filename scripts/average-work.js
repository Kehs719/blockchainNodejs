const Blockchain = require("../blockchain/index");

const blockchain = new Blockchain();

blockchain.addBlock({ data: "initial" });

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;
const times = [];
console.log('first block', blockchain.chain[blockchain.chain.length - 1])

for (let i = 0; i < 1000; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    blockchain.addBlock({ data: `Block ${i}` });

    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;

    times.push(timeDiff);
    average = times.reduce((total, num) => (total + num)) / times.length;

    console.log(`Time to mine a block : ${timeDiff}ms.Difficulty :${nextBlock.difficulty}.Average time : ${average}ms.`);
}