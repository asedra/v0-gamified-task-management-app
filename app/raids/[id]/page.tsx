import { RaidDetailClient } from "./raid-detail-client"

export default async function RaidDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <RaidDetailClient id={id} />
}
