"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(5, { message: "Phone must be at least 5 characters." }),
  url: z.string().url({ message: "Invalid URL." }),
  socialHandles: z
    .array(
      z.object({
        platform: z.string().min(1, "Platform is required."),
        handle: z.string().min(1, "Handle is required."),
      })
    )
    .nonempty("At least one social handle is required."),
});

function InfluencerDrawer() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      url: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = {
      ...values,
      socialHandles,
    };

    console.log("Form Data:", formData);
  }

  const [socialHandles, setSocialHandles] = React.useState([
    { platform: "", handle: "" }, // Default row
  ]);

  const socialMediaOptions = [
    { value: "facebook", label: "Facebook", icon: "fhfgh" },
    { value: "instagram", label: "Instagram", icon: "fhfgh" },
    { value: "youtube", label: "YouTube", icon: "fhfgh" },
    { value: "tiktok", label: "TikTok", icon: "fhfgh" },
  ];

  const addSocialHandleRow = () => {
    setSocialHandles((prev) => [...prev, { platform: "", handle: "" }]);
  };

  const removeSocialHandleRow = (index: number) => {
    setSocialHandles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">
            <Plus />
            Add New
          </Button>
        </SheetTrigger>

        <SheetContent className="!w-full lg:!max-w-[70%]">
          <SheetHeader>
            <SheetTitle>Add Influencer</SheetTitle>
            <SheetDescription>
              Make changes here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-between h-full lg:h-[93%]"
            >
              <ScrollArea className="w-full h-full border-y my-5 py-3 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="m-3">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 m-3">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="0123-1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <fieldset className="p-3 m-3 relative border rounded-sm">
                  <legend>Social Media Handels</legend>
                  {socialHandles.map((row, index) => (
                    <div
                      key={index}
                      className="flex justify-between flex-wrap align-center my-3"
                    >
                      {/* Combobox for Social Media Platform */}
                      <FormField
                        control={form.control}
                        name={`socialHandles.${index}.platform`}
                        render={({ field }) => (
                          <FormItem className="mb-3 w-[30%]">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? socialMediaOptions.find(
                                          (option) =>
                                            option.value === field.value
                                        )?.label
                                      : "Select platform"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search platform..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No platform found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {socialMediaOptions.map((option) => (
                                        <CommandItem
                                          value={option.label}
                                          key={option.value}
                                          onSelect={() => {
                                            const updatedRows = [
                                              ...socialHandles,
                                            ];
                                            updatedRows[index].platform =
                                              option.value;
                                            setSocialHandles(updatedRows);
                                          }}
                                        >
                                          {option.icon} {option.label}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              option.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Input for Social Media Handle */}
                      <FormField
                        control={form.control}
                        name={`socialHandles.${index}.handle`}
                        render={({ field }) => (
                          <FormItem className="mb-3 w-[63%]">
                            <FormControl>
                              <Input
                                placeholder="Enter social handle (e.g., @username)"
                                {...field}
                                value={socialHandles[index].handle}
                                onChange={(e) => {
                                  const updatedRows = [...socialHandles];
                                  updatedRows[index].handle = e.target.value;
                                  setSocialHandles(updatedRows);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Delete Button */}
                      <div className="action_holder w-[5%] text-end">
                        <Button
                          variant="destructive"
                          onClick={() => removeSocialHandleRow(index)}
                          disabled={socialHandles.length === 1} // Prevent deletion of last row
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="default"
                    onClick={addSocialHandleRow}
                  >
                    <Plus /> Add New
                  </Button>
                </fieldset>
              </ScrollArea>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant={"outline"}>
                    Close
                  </Button>
                </SheetClose>
                <Button type="submit" variant={"secondary"}>
                  Save changes
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default InfluencerDrawer;
