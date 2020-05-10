/* eslint-disable @typescript-eslint/explicit-function-return-type */
import net from "net";
export const redisMiniServer = net.createServer();
const CRLF = "\r\n";
const map = new Map();
function set(key: string, value: string) {
  map.set(key, value);
}

function get(key: string) {
  return map.get(key);
}

function del(key: string) {
  map.delete(key);
}

function keys(pattern: string) {
  const ks = map.keys();
  if (pattern === "*") {
    return Array.from(ks);
  }
  return Array.from(ks);
}

redisMiniServer.on("connection", socket => {
  socket.on("data", command => {
    const c = command.toString();
    const cs = c.split(CRLF);
    const com = cs[2];
    const arg1 = cs[4];
    const arg2 = cs[6];
    if (com === "set") {
      set(arg1, arg2);
    }
    if (com === "get") {
      const value = get(arg1) || "(nil)";
      socket.write(`+${value}${CRLF}`);
      return;
    }
    if (com === "del") {
      del(arg1);
    }
    if (com === "keys") {
      const ks = keys(arg1);
      const len = `*${ks.length}`;
      const r = [];
      ks.forEach(k => {
        r.push(`$${k.length}`);
        r.push(k);
      });
      r.unshift(len);
      const result = r.join(CRLF);
      socket.write(`+${result}${CRLF}`);
      return;
    }
    if (com === "COMMAND") {
      socket.end();
      return;
    }
    socket.write("+OK" + CRLF);
  });
});
