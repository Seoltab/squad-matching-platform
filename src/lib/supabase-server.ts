import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!url || !serviceRoleKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY를 .env.local에 설정하세요. Supabase 대시보드 > Settings > API > service_role"
  );
}

export const supabaseAdmin = createClient(url, serviceRoleKey);
