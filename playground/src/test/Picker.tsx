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
    },
    {
      title: 'RangePicker',
      description: '기간 선택을 위한 범위 picker',
      path: '/react-picker/range',
      features: ['빠른 선택 옵션', '다중 달력', '스크롤 달력'],
    },
    {
      title: 'DateTimePicker',
      description: '날짜와 시간을 동시에 선택할 수 있는 picker',
      path: '/react-picker/datetime',
      features: ['날짜 + 시간 선택', 'AM/PM 지원', '스크롤 달력'],
    },
    {
      title: 'TimePicker',
      description: '시간 선택을 위한 전용 picker',
      path: '/react-picker/time',
      features: ['기본 시간 선택', '패널 모드', '15분 단위 스냅'],
    },
    {
      title: 'Custom Picker',
      description: 'Calendar와 TimePicker를 조합한 커스텀 picker 예시',
      path: '/react-picker/custom',
      features: ['모달 형태', '날짜+시간 범위', '커스텀 UI'],
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="React Picker Components">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pickerPages.map((picker) => (
            <Link
              key={picker.path}
              to={picker.path}
              className="group rounded-lg border border-neutral-600 p-4 transition-all hover:border-blue-400 hover:bg-neutral-800"
            >
              <h3 className="mb-2 text-lg font-bold text-blue-400 group-hover:text-blue-300">
                {picker.title}
              </h3>
              <p className="mb-3 text-sm text-gray-300">{picker.description}</p>
              <ul className="space-y-1">
                {picker.features.map((feature, index) => (
                  <li key={index} className="text-xs text-gray-400">
                    • {feature}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
