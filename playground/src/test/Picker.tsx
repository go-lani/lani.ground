import { Link } from 'react-router-dom';
import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';

export default function PickerPage() {
  const pickerPages = [
    {
      title: 'DatePicker',
      description: '날짜 선택을 위한 다양한 캘린더 형태의 picker',
      path: '/react-picker/date',
      features: ['기본 달력', '다중 달력', '스크롤 달력'],
      icon: '📅',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    },
    {
      title: 'RangePicker',
      description: '기간 선택을 위한 범위 picker',
      path: '/react-picker/range',
      features: ['빠른 선택 옵션', '다중 달력', '스크롤 달력'],
      icon: '📊',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    },
    {
      title: 'DateTimePicker',
      description: '날짜와 시간을 동시에 선택할 수 있는 picker',
      path: '/react-picker/datetime',
      features: ['날짜 + 시간 선택', 'AM/PM 지원', '스크롤 달력'],
      icon: '🕐',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    },
    {
      title: 'TimePicker',
      description: '시간 선택을 위한 전용 picker',
      path: '/react-picker/time',
      features: ['기본 시간 선택', '패널 모드', '15분 단위 스냅'],
      icon: '⏰',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    },
    {
      title: 'Custom Picker',
      description: 'Calendar와 TimePicker를 조합한 커스텀 picker 예시',
      path: '/react-picker/custom',
      features: ['모달 형태', '날짜+시간 범위', '커스텀 UI'],
      icon: '🎨',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-violet-500/10 to-indigo-500/10',
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="React Picker Components">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pickerPages.map((picker) => (
            <Link
              key={picker.path}
              to={picker.path}
              className={`group relative overflow-hidden rounded-xl border border-neutral-700/50 ${picker.bgColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-neutral-600 hover:shadow-2xl hover:shadow-neutral-900/50`}
            >
              {/* 글래스모피즘 효과를 위한 배경 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* 상단 그라데이션 헤더 */}
              <div className={`h-1 bg-gradient-to-r ${picker.color}`} />

              <div className="relative p-6">
                {/* 아이콘과 타이틀 */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800/50 text-2xl backdrop-blur-sm">
                    {picker.icon}
                  </div>
                  <h3
                    className={`bg-gradient-to-r text-xl font-bold ${picker.color} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105`}
                  >
                    {picker.title}
                  </h3>
                </div>

                {/* 설명 */}
                <p className="mb-4 text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                  {picker.description}
                </p>

                {/* 특징 목록 */}
                <div className="space-y-2">
                  {picker.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${picker.color}`}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 화살표 아이콘 */}
                <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
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
