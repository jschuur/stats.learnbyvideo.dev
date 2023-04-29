import { Card, Metric, Text } from "@tremor/react";

type Props = {
  count: number | undefined;
};

export default function TotalViewsCard({ count }: Props) {
  return (
    <Card decoration="top" decorationColor="sky">
      <Text>Total Views</Text>
      <Metric>{count ? Intl.NumberFormat().format(count) : "-"}</Metric>
    </Card>
  );
}
