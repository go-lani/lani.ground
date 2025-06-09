import { Link } from 'react-router-dom';

import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';

export default function KitPage() {
  const kitPages = [
    {
      title: 'dateKit',
      description: '날짜 포맷팅, 비교, 변환 등 날짜 관련 유틸리티 함수들',
      path: '/kits/date',
      features: ['날짜 포매팅', 'UTC 변환', '날짜 비교', '윤년 체크'],
      icon: '📅',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    },
    {
      title: 'numberKit',
      description: '숫자 포맷팅, 소수점 처리 등 숫자 관련 유틸리티 함수들',
      path: '/kits/number',
      features: ['천 단위 구분자', '소수점 포맷', '숫자 자릿수 제한'],
      icon: '🔢',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    },
    {
      title: 'stringKit',
      description: '문자열 자르기, 쿼리 변환 등 문자열 관련 유틸리티 함수들',
      path: '/kits/string',
      features: ['문자열 자르기', '쿼리 문자열 변환', '첫 글자 대문자'],
      icon: '✂️',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    },
    {
      title: 'objectKit',
      description: '객체 검증, 정리 등 객체 관련 유틸리티 함수들',
      path: '/kits/object',
      features: ['빈 객체 체크', '유효한 값만 추출', '키로 값 찾기'],
      icon: '🧩',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    },
    {
      title: 'validateKit',
      description: '이메일, 전화번호 등 데이터 형식 검증 유틸리티 함수들',
      path: '/kits/validate',
      features: ['이메일 검증', '전화번호 검증', '정규식 검증'],
      icon: '✅',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-violet-500/10 to-indigo-500/10',
    },
    {
      title: 'cookieKit',
      description: '쿠키 설정, 읽기, 삭제 등 쿠키 관련 유틸리티 함수들',
      path: '/kits/cookie',
      features: ['쿠키 설정', '쿠키 읽기', '쿠키 삭제', '쿠키 존재 체크'],
      icon: '🍪',
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10',
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="Kit Utility Functions">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kitPages.map((kit) => (
            <Link
              key={kit.path}
              to={kit.path}
              className={`group relative overflow-hidden rounded-xl border border-neutral-700/50 ${kit.bgColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-neutral-600 hover:shadow-2xl hover:shadow-neutral-900/50`}
            >
              {/* 글래스모피즘 효과를 위한 배경 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* 상단 그라데이션 헤더 */}
              <div className={`h-1 bg-gradient-to-r ${kit.color}`} />

              <div className="relative p-6">
                {/* 아이콘과 타이틀 */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800/50 text-2xl backdrop-blur-sm">
                    {kit.icon}
                  </div>
                  <h3
                    className={`bg-gradient-to-r text-xl font-bold ${kit.color} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105`}
                  >
                    {kit.title}
                  </h3>
                </div>

                {/* 설명 */}
                <p className="mb-4 text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                  {kit.description}
                </p>

                {/* 특징 목록 */}
                <div className="space-y-2">
                  {kit.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${kit.color}`}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 화살표 아이콘 */}
                <div className="absolute bottom-4 right-4 transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
