import Redis from "ioredis";

/*
 * connect to the redis server
 * Redis is a key-value store that is used to store data in memory.
 * Key value will be address => timestamp of last faucet request.
 * Total transfers and total value would be stored there too under keys "count" and "total"
 */
const redisIO = new Redis(process.env.REDIS_URL as string);

export const redis = {
  async getLastReceive(evmAddress: string) {
    evmAddress = evmAddress.toUpperCase();
    const timestamp = await redisIO.get(`${evmAddress}_TIMESTAMP`);
    const txHash = await redisIO.get(`${evmAddress}_TX_HASH`);

    return timestamp && txHash
      ? {
          date: new Date(parseInt(timestamp) * 1000),
          txHash,
        }
      : null;
  },
  async updateLastReceive(evmAddress: string, date: Date, txHash: string) {
    evmAddress = evmAddress.toUpperCase();
    await redisIO.set(
      `${evmAddress}_TIMESTAMP`,
      Math.floor(date.getTime() / 1000)
    );
    await redisIO.set(`${evmAddress}_TX_HASH`, txHash);
  },

  async getPayoutsTotalAmount() {
    const total = await redisIO.get("TOTAL");
    return total ? parseInt(total) : 0;
  },
  async incrbyPayoutsTotalAmount(increment: number) {
    await redisIO.incrby("TOTAL", increment);
  },

  async getPayoutsNumber() {
    const count = await redisIO.get("COUNT");
    return count ? parseInt(count) : 0;
  },
  async incrPayoutsNumber() {
    await redisIO.incr("COUNT");
  },
};
