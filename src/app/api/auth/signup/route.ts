import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Create user with admin API — auto-confirms email
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // This auto-confirms the email!
      user_metadata: {
        full_name: name || "",
      },
    });

    if (error) {
      // Handle duplicate email
      if (error.message.includes("already been registered")) {
        return NextResponse.json(
          { error: "This email is already registered. Please sign in." },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { id: data.user.id, email: data.user.email },
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Signup API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
