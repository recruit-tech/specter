import { AddressInfo } from "net";

export default async function getPort(
    server: import("http").Server
): Promise<AddressInfo> {
    return await new Promise<AddressInfo>((resolve, reject) =>
        server.on("listening", () => {
            const address = server.address();
            if (!address) {
                reject(new Error("missing address"));
            } else {
                resolve(address as AddressInfo);
            }
        })
    );
}
