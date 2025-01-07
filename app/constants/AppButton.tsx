import { Button } from "@/components/ui/button";
import React from "react";

function AppButton({
  btnText,
  btnVariant,
  btnIcon,
}: {
  btnText: string;
  btnVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  btnIcon?: React.ReactNode;
}) {
  return (
    <Button variant={btnVariant}>
      {btnIcon}
      {btnText}
    </Button>
  );
}

export default AppButton;
