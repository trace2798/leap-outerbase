"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
// import { useUser } from "@clerk/nextjs";

// import { ImageUpload } from "@/components/image-upload";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt.",
  }),
  //   author: z.string().min(1, {
  //     message: "Name is required.",
  //   }),
  //   description: z.string().min(1, {
  //     message: "Description is required.",
  //   }),
  //   src: z.string().min(1, {
  //     message: "Image is required.",
  //   }),
  //   user_id: z.string().min(1, {
  //     message: "User id is required.",
  //   }),
  //   user_name: z.string().min(1, {
  //     message: "User name is required.",
  //   }),
});

export const NewBookForm = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  //   const { user } = useUser();
  //   console.log(user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      //   name: "",
      //   description: "",
      //   src: "",
      //   author: "",
      //   user_id: user?.id ?? "Anomynous",
      //   user_name: user?.firstName ?? "Anomynous",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);

      await fetch(`https://spiritual-aqua.cmd.outerbase.io/addImagetoQueue`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          prompt: values.prompt,
        }),
      });
      console.log("Request through Outerbase Sent");
      toast({
        description: "Success. Request Sent",
        duration: 3000,
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Outerbase Error" || "Something went wrong.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">
                Outerbase Leap Integration
              </h3>
              <p className="text-sm text-muted-foreground">
                Send a prompt to Leap.AI through an Outerbase Command to
                generate an image
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="The Wonderful Wizard of Oz"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Prompt for the image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="author"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Author&apos;s name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="L. Frank Baum"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Author of the book.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Brief description about the book"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for the Book
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="space-y-2 w-full">
            <Separator className="bg-primary/10" />
          </div>

          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              Send Request
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};