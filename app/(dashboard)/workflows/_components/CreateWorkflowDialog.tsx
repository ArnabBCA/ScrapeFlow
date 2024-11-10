"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateWorkFlowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: { name: "", description: "" },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (res) => {
      toast.success("Workflow created", { id: "create-workflow" });
      if (res.workflowId) {
        router.push(`/workflow/editor/${res.workflowId}`);
      }
    },
    onError: (error) => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: CreateWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title={"Create workflow"}
          subTitle={"Start building your workflow"}
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                    </FormLabel>
                    <p className="text-xs text-primary">(required)</p>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">(optional)</p>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.{" "}
                      <br /> This is a optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkFlowDialog;
