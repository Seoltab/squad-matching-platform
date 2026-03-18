"use client";

import { useState } from "react";
import Link from "next/link";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function IntroPage() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <div className="min-h-screen bg-seoltab-gray flex flex-col">
      <header className="bg-white border-b border-seoltab-sub shrink-0">
        <div className="px-6 py-4">
          <h1 className="text-seoltab-blue font-bold text-xl">설탭</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        {/* 세로 비율/모바일: 위아래 배치, 가로 비율 768px+: 좌우 배치 */}
        <div className="w-full max-w-3xl flex flex-col wide:flex-row gap-5 wide:gap-6">
          {/* 스마트 선생님 탐색 */}
          <Link
            href="/search"
            className="flex-1 min-h-[140px] rounded-2xl p-6 sm:p-8
              bg-gradient-to-br from-white to-seoltab-sub/30
              border border-seoltab-sub
              shadow-tactile
              hover:shadow-tactile-hover hover:border-seoltab-light
              active:shadow-tactile-press active:translate-y-0.5
              transition-all duration-200 group"
          >
            <h2 className="text-seoltab-dark font-bold text-lg sm:text-xl group-hover:text-seoltab-blue transition-colors">
              스마트 선생님 탐색
            </h2>
            <p className="text-seoltab-dark/80 text-sm mt-3 leading-relaxed">
              더 이상 배정을 기다리지 마세요. 1만 명의 설탭 선생님 중 우리 아이와
              꼭 맞는 한 분을 직접 지목하세요.
            </p>
          </Link>

          {/* 설탭 MVP 앰버서더 수강신청 - 비활성화 */}
          <button
            type="button"
            onClick={() => setComingSoonOpen(true)}
            className="flex-1 min-h-[140px] text-left rounded-2xl p-6 sm:p-8
              bg-gradient-to-br from-white to-seoltab-sub/20
              border border-seoltab-sub
              shadow-tactile
              hover:shadow-[0_2px_0_0_#b7a1ff,0_6px_16px_rgba(93,61,200,0.1)]
              hover:border-seoltab-light
              active:shadow-tactile-press active:translate-y-0.5
              transition-all duration-200 group cursor-pointer"
          >
            <h2 className="text-seoltab-dark font-bold text-lg sm:text-xl group-hover:text-seoltab-blue transition-colors">
              설탭 MVP 앰버서더 수강신청
            </h2>
            <p className="text-seoltab-dark/80 text-sm mt-3 leading-relaxed">
              아이돌 티케팅보다 치열한 설탭 스타강사 매칭, 지금 수강신청이
              시작됩니다.
            </p>
          </button>
        </div>
      </main>

      <ComingSoonModal
        isOpen={comingSoonOpen}
        onClose={() => setComingSoonOpen(false)}
      />
    </div>
  );
}
