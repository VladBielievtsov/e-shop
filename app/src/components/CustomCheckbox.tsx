import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: `border-black border bg-transparent hover:bg-default-200 min-w-[40px] h-[28px]`,
    content: "text-black uppercase font-bold text-sm",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary",
        content: "text-[#f3af7f]",
      },
    },
  },
});

const checkboxLarge = tv({
  slots: {
    base: `border-black rounded-xl border bg-transparent px-4 hover:bg-default-200 min-w-[50px] h-[50px]`,
    content: "text-black uppercase font-bold text-sm",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary",
        content: "text-white",
      },
    },
  },
});

export const CustomCheckbox = (props: any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const { large } = props;

  const styles = !large
    ? checkbox({ isSelected })
    : checkboxLarge({ isSelected });

  return (
    <label {...getBaseProps()} className="pr-1 pb-1 cursor-pointer">
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
