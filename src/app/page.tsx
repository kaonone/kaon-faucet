import { Faucet } from "../components/pages/Faucet";

export const revalidate = 0;

export default async function HomePage() {
  return <Faucet />;
}
