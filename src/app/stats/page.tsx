import { getStats } from "../../api/getStats";
import { Stats } from "../../components/pages/Stats";

export const revalidate = 60;

export default async function StatsPage() {
  const stats = await getStats();

  return <Stats {...stats} />;
}
