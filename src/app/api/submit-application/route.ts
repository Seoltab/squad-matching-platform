import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { StudentApplicationFormData } from "@/components/StudentApplicationForm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, selectedUserIds } = body as {
      formData: StudentApplicationFormData;
      selectedUserIds: string[];
    };

    if (!formData || !selectedUserIds?.length) {
      return NextResponse.json(
        { error: "formData와 selectedUserIds가 필요합니다." },
        { status: 400 }
      );
    }

    const { data: appData, error: appError } = await supabaseAdmin
      .from("Application")
      .insert({
        student_gender: formData.studentGender,
        student_grade: formData.studentGrade,
        student_subject: formData.studentSubject,
        student_grade_level: formData.studentGradeLevel || null,
        admission_type: formData.admissionType || null,
        desired_field_major: formData.desiredFieldMajor || null,
        preferred_teacher_style: formData.preferredTeacherStyle || null,
        preferred_teacher_strengths:
          formData.preferredTeacherStrengths.length > 0
            ? JSON.stringify(formData.preferredTeacherStrengths)
            : null,
        special_requests: formData.specialRequests || null,
      })
      .select("id")
      .single();

    if (appError) {
      console.error("Application insert error:", appError);
      return NextResponse.json(
        { error: appError.message },
        { status: 500 }
      );
    }

    const appId = (appData as { id: string }).id;
    const selections = selectedUserIds.map((user_id: string) => ({
      app_id: appId,
      user_id,
    }));

    const { error: selError } = await supabaseAdmin
      .from("Selection")
      .insert(selections);

    if (selError) {
      console.error("Selection insert error:", selError);
      return NextResponse.json(
        { error: selError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("submit-application error:", e);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
