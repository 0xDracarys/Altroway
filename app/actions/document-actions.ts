"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_UPLOADS_PER_DAY = 20; // Rate limit: 20 uploads per day per user

const UploadSchema = z.object({
  document: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File is required.")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      ".pdf, .jpg, .png, and .webp files are accepted."
    ),
});

export async function uploadDocument(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Authentication required.", status: "error" };
  }

  const validatedFields = UploadSchema.safeParse({
    document: formData.get("document"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.document?.join(", ") ?? "Invalid file.",
      status: "error",
    };
  }

  const { document: file } = validatedFields.data;

  try {
    // Check rate limit: max uploads per day
    const today = new Date().toISOString().split('T')[0];
    const { data: todayUploads, error: countError } = await supabase
      .from("documents")
      .select("id")
      .eq("user_id", user.id)
      .eq("upload_date", today);

    if (countError) {
      console.error("Rate limit check error:", countError);
    }

    if (todayUploads && todayUploads.length >= MAX_UPLOADS_PER_DAY) {
      return { 
        message: `Daily upload limit reached (${MAX_UPLOADS_PER_DAY} per day). Please try again tomorrow.`, 
        status: "error" 
      };
    }

    // Check for duplicate filenames from same user in past 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: duplicateCheck } = await supabase
      .from("documents")
      .select("id")
      .eq("user_id", user.id)
      .eq("name", file.name)
      .gte("upload_date", yesterday);

    if (duplicateCheck && duplicateCheck.length > 0) {
      return { 
        message: "A file with this name was uploaded recently. Consider renaming to avoid duplicates.", 
        status: "warning" 
      };
    }

    // 1. Upload file to Supabase Storage
    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      console.error("Storage Error:", uploadError);
      return { message: `Failed to upload file: ${uploadError.message}`, status: "error" };
    }

    // 2. Insert record into the documents table
    const { error: dbError, data: insertedDoc } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        name: file.name,
        type: file.type,
        size_bytes: file.size,
        status: "Uploaded",
        upload_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        storage_path: filePath,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database Error:", dbError);
      // Attempt to delete the file from storage if DB insert fails to maintain consistency
      await supabase.storage.from("documents").remove([filePath]);
      return { message: `Failed to save document record: ${dbError.message}`, status: "error" };
    }

    // 3. Revalidate the dashboard path
    revalidatePath("/dashboard");

    return { 
      message: "Document uploaded successfully!", 
      status: "success",
      documentId: insertedDoc?.id 
    };
  } catch (e) {
    console.error("Unhandled Error:", e);
    return { 
      message: e instanceof Error ? e.message : "An unexpected error occurred.", 
      status: "error" 
    };
  }
}
