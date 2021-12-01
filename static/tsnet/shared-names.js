const fs = require("fs");
console.log("graph G {");
const lines = fs.readFileSync(__dirname + "/ts.csv", "utf-8").trim().split("\n").slice(1);
const nameNetworks = {};
const networkNames = {};
const networks = new Set();
lines.forEach(line => {
    const parts = line.trim().split(","); // uh this is valid CSV parsing right
    const name = parts[1];
    const net = parts[2];
    networks.add(net);
    if (!nameNetworks[name]) nameNetworks[name] = [];
    if (!networkNames[net]) networkNames[net] = [];
    nameNetworks[name].push(net);
    networkNames[net].push(name);
});
const linesDrawn = [];
networks.forEach(network => {
    //console.log(`"${network}";`); // display orphans
    networkNames[network].forEach(name => {
        nameNetworks[name].forEach(relNetwork => {
            const lineId = network < relNetwork ? (network + "*" +  relNetwork) : (relNetwork + "*" + network);
            if (linesDrawn.includes(lineId)) return;
            linesDrawn.push(lineId);
            if (relNetwork !== network) console.log(`"${network}" -- "${relNetwork}"`);
        });
    });
});
console.log("}");
