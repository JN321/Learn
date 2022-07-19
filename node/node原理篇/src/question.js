async function async1() {
  console.log("async1 started");
  await async2();
  console.log("async end"); // m 1
}
async function async2() {
  console.log("async2");
}
console.log("script start.");
setTimeout(() => {
  console.log("setTimeout0");
  setTimeout(() => {
    console.log("setTimeout1");
  }, 0);
  setImmediate(() => {
    console.log("setImmediate");
  });
}, 0);

async1();
process.nextTick(() => {
  console.log("nextTick"); // m 0
});

new Promise((resolve) => {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(() => {
  console.log("promise.then"); // m2
});
console.log("script end.");

("script start.");
("async1 started");
("async2");
("promise1");
("promise2");
("script end.");
("nextTick");
("async end");
("promise.then");
