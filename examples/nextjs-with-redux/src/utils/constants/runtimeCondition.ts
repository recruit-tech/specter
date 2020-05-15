/* istanbul ignore file */

export const isServer = typeof window === "undefined";
export const isClient = !isServer;
