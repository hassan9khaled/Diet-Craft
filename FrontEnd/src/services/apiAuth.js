/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function signUp({
  email,
  password,
  firstName,
  lastName,
  avatar = ""
}) {
  // Check if the user already exists
  const { data: existingUser, error: existingUserError } = await supabase
    .from("guests")
    .select("email")
    .eq("email", email)
    .single();

  if (existingUserError && existingUserError.code !== "PGRST116") {
    throw new Error(
      `Error checking existing user: ${existingUserError.message}`
    );
  }
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  // Sign up the new user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, avatar }
    }
  });

  if (signUpError) {
    throw new Error(`Sign up failed: ${signUpError.message}`);
  }

  return { data: signUpData, error: null };
}

export async function updateUser({
  firstName,
  lastName,
  email,
  password,
  currentPassword,
  avatar
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found.");
  }

  // 💡 Step 1: If changing password, verify current password
  if (password) {
    const { error: passwordError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword
    });

    if (passwordError) {
      throw new Error("Current password is incorrect.");
    }

    // Optional: prevent updating with the same password
    if (password === currentPassword) {
      throw new Error(
        "New password must be different from the current password."
      );
    }
  }
  let updateData;
  if (password) updateData = { password };
  if (email) updateData = { email };
  if (firstName && lastName) updateData = { data: { firstName, lastName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (!avatar) return data;
  if (error) {
    throw new Error(error.message);
  }
  // imageName
  const imageName = `avatar-${Date.now()}-${Math.random()}.jpg`;
  // Upload the Avatar Image
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }

  // update in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({ data: { avatar: imagePath } });
  if (updateUserError) {
    throw new Error(updateUserError.message);
  }
  return updatedUser;
}
export async function signOut() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
