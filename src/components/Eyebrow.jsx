import { Badge, Text } from "@mantine/core";

export const Eyebrow = ({ label, variant }) => {
  const variantType = {
    1: {
      variant: "outline",
      color: "white",
      textColor: "var(--mantine-color-brand-0)",
    },
    2: {
      variant: "outline",
      color: "var(--mantine-color-brand-2)",
      textColor: "white",
    },
    3: {
      variant: "outline",
      color: "var(--mantine-color-brand-2)",
      textColor: "var(--mantine-color-brand-0)",
    },
  };
  return (
    <Badge
      py={"md"}
      px={"lg"}
      mb="xl"
      variant={variantType[variant ? variant : 1].variant}
      color={variantType[variant ? variant : 1].color}
      c={variantType[variant ? variant : 1].textColor}
      style={{
        borderWidth: ".1rem",
      }}
    >
      <Text size="sm" fw="600">
        {label}
      </Text>
    </Badge>
  );
};
