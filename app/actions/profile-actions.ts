"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
  fullName: z.string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must be less than 100 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Full name can only contain letters, spaces, hyphens, and apostrophes." }),
  headline: z.string()
    .min(5, { message: "Headline must be at least 5 characters." })
    .max(200, { message: "Headline must be less than 200 characters." }),
  skills: z.string()
    .max(500, { message: "Skills description must be less than 500 characters." })
    .optional(),
  bio: z.string()
    .max(1000, { message: "Bio must be less than 1000 characters." })
    .optional(),
  location: z.string()
    .max(100, { message: "Location must be less than 100 characters." })
    .optional(),
  portfolioUrl: z.string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, { 
      message: "Please enter a valid phone number." 
    })
    .optional()
    .or(z.literal('')),
});

export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Authentication required.", status: "error" };
  }

  const validatedFields = ProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    headline: formData.get("headline"),
    skills: formData.get("skills"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    portfolioUrl: formData.get("portfolioUrl"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return {
      message: Object.values(validatedFields.error.flatten().fieldErrors).flat().join(", "),
      status: "error",
    };
  }

  const { fullName, headline, skills, bio, location, portfolioUrl, phone } = validatedFields.data;

  try {
    // First, check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Fetch Error:", fetchError);
      return { message: `Failed to fetch profile: ${fetchError.message}`, status: "error" };
    }

    const updateData = {
      full_name: fullName,
      headline: headline,
      skills: skills || null,
      bio: bio || null,
      location: location || null,
      portfolio_url: portfolioUrl || null,
      phone: phone || null,
      updated_at: new Date().toISOString(),
    };

    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("user_id", user.id);

      if (error) {
        console.error("Database Error:", error);
        return { message: `Failed to update profile: ${error.message}`, status: "error" };
      }

      // Log profile update for audit trail (optional - if audit table exists)
      try {
        await supabase
          .from("profile_audit_logs")
          .insert({
            user_id: user.id,
            action: "update",
            changes: {
              full_name: { old: existingProfile.full_name, new: fullName },
              headline: { old: existingProfile.headline, new: headline },
            },
            timestamp: new Date().toISOString(),
          });
      } catch (auditError) {
        // Silently ignore audit logging failures
        console.warn("Audit logging failed:", auditError);
      }
    } else {
      // Create new profile
      const { error } = await supabase
        .from("profiles")
        .insert({
          user_id: user.id,
          ...updateData,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Database Error:", error);
        return { message: `Failed to create profile: ${error.message}`, status: "error" };
      }
    }

    revalidatePath("/dashboard");
    revalidatePath("/profile/edit");

    return { message: "Profile updated successfully!", status: "success" };
  } catch (e) {
    console.error("Unhandled Error:", e);
    return { 
      message: e instanceof Error ? e.message : "An unexpected error occurred.", 
      status: "error" 
    };
  }
}

export async function getProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return profile;
}

export async function updateUserGoals(goal: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ goals: goal })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/onboarding");
  return { success: true };
}

export async function updateUserJobTypes(jobTypes: string[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ job_types: jobTypes })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/onboarding");
  return { success: true };
}
