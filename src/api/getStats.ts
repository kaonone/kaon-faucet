"use server";

type Stats = {
  availableBalance: number;
  payoutsNumber: number;
  payoutsTotalAmount: number;
};

// TODO
export async function getStats(): Promise<Stats> {
  return {
    availableBalance: 5939328.72123123,
    payoutsNumber: 252,
    payoutsTotalAmount: 194548,
  };
}
