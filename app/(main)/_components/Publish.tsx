"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { useOrigin } from "@/hooks/useOrigin";

interface PublishProps {
  initialData: Doc<"documents">;
}

export default function Publish({ initialData }: PublishProps) {
  const origin = useOrigin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = useMutation(api.documents.update);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({ id: initialData._id, isPublished: true }).finally(
      () => {
        setIsSubmitting(false);
      }
    );

    toast.promise(promise, {
      loading: "Publishing note...",
      success: "Note published!",
      error: "Failed to publish note.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({ id: initialData._id, isPublished: false }).finally(
      () => {
        setIsSubmitting(false);
      }
    );
    toast.promise(promise, {
      loading: "Unpublishing note...",
      success: "Note unpublished!",
      error: "Failed to unpublish note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          // copy
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 w-4 h-4 ml-2 animate-plus" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            {/* unpublish */}
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          // publish
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-sm"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
