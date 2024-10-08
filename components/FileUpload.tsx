"use client";
import { useDropzone } from "react-dropzone";
import React from "react";
import { Inbox } from "lucide-react";
import { uploadToS3 } from "@/lib/s3";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size is too big. Please upload a file smaller than 10MB.");
        return;
      }
      try {
        const data = await uploadToS3(file);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps()}
        className="flex border-2 border-dashed border-gray-300 bg-gray-50 p-4 rounded-xl cursor-pointer text-center justify-center items-center "
      >
        <input {...getInputProps()} />
        <p className="">Drag & Drop PDF Here</p>
        <Inbox className="w-10 h-10 text-gray-500 ml-2" />
      </div>
    </div>
  );
};


export default FileUpload;
