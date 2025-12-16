"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { uploadImage } from "./helpers/uploadImage";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  console.log("🚀 ~ ImageUpload ~ preview:", preview);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    uploadImage(selectedFile).then((url) => {
      console.log("🚀 ~ handleChange ~ url:", url);
    });
  };

  return (
    <Card className="max-w-sm">
      <CardContent className="space-y-4 p-4">
        <Input type="file" accept="image/*" onChange={handleChange} />

        {preview && (
          <Image
            src={preview}
            alt="Preview"
            className="h-40 w-full rounded-full object-contain"
            width={200}
            height={200}
          />
        )}
      </CardContent>
    </Card>
  );
}
