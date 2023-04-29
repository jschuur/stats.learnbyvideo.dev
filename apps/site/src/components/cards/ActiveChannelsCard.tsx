import { Card, Metric, Text } from "@tremor/react";

type Props = {
  count: number | undefined;
};

export default function ActiveChannelsCard({ count }: Props) {
  return (
    <Card decoration="top" decorationColor="orange">
      <Text>Active Channels</Text>
      <Metric>{count ? Intl.NumberFormat().format(count) : "-"}</Metric>
    </Card>
  );
}
