import { Card, Metric, Text } from "@tremor/react";

type Props = {
  count: number | undefined;
};

export default function RecentVideoCard({ count }: Props) {
  return (
    <Card decoration="top" decorationColor="emerald">
      <Text>Recent Videos</Text>
      <Metric>{count ? Intl.NumberFormat().format(count) : "-"}</Metric>
    </Card>
  );
}
