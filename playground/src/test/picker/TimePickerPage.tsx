import { dateKit } from '@lani.ground/kits';
import { TimePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/TimePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function TimePickerPage() {
  const { formatDate } = dateKit;

  // TimePicker
  const [basicTime, setBasicTime] = useState<Date | null>(null);
  const [basicTimeOpen, setBasicTimeOpen] = useState(false);

  const [panelSnapTime, setPanelSnapTime] = useState<Date | null>(new Date());
  const [panelSnapTimeOpen, setPanelSnapTimeOpen] = useState(false);

  const examples = [
    {
      title: 'TimePicker - Default',
      description:
        '기본적인 시간 선택기입니다. 시, 분, 초를 개별적으로 선택할 수 있는 휠 형태의 인터페이스를 제공합니다.',
      icon: '⏰',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      value: basicTime,
      isOpen: basicTimeOpen,
      onToggle: () => setBasicTimeOpen(true),
      onChange: setBasicTime,
      onOpenChange: setBasicTimeOpen,
      timeUnits: ['hour', 'minute', 'second'],
      mode: undefined,
      enableSnap: false,
      format: 'HH:mm:ss',
      hasAmPm: false,
      placeholder: '시간을 선택하세요',
    },
    {
      title: 'TimePicker - Panel + Snap',
      description:
        '패널 모드의 시간 선택기로 15분 단위 스냅 기능이 포함되어 있습니다. AM/PM 형식도 지원합니다.',
      icon: '🕐',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      value: panelSnapTime,
      isOpen: panelSnapTimeOpen,
      onToggle: () => setPanelSnapTimeOpen(true),
      onChange: setPanelSnapTime,
      onOpenChange: setPanelSnapTimeOpen,
      timeUnits: ['hour', 'minute', 'second', 'ampm'],
      mode: 'panel' as const,
      enableSnap: true,
      format: 'A hh:mm:ss',
      hasAmPm: true,
      placeholder: '시간을 선택하세요 (15분 단위)',
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="TimePicker Examples">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-1 lg:gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`rounded-lg border sm:rounded-xl ${example.borderColor} ${example.bgColor} p-4 transition-all duration-300 hover:shadow-lg sm:p-6`}
            >
              {/* 헤더 */}
              <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                  {example.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`bg-gradient-to-r text-base font-bold sm:text-lg ${example.color} bg-clip-text leading-tight text-transparent`}
                  >
                    {example.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                    {example.description}
                  </p>
                </div>
              </div>

              {/* 인터랙션 영역 */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex-shrink-0 text-xs font-medium text-gray-300 sm:text-sm">
                    선택된 시간:
                  </span>
                  <button
                    onClick={example.onToggle}
                    className={`cursor-pointer rounded-lg border ${example.borderColor} w-full min-w-0 bg-neutral-800/30 px-3 py-2 text-center text-xs transition-all duration-200 hover:border-opacity-60 hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:w-auto sm:text-left sm:text-sm`}
                  >
                    <span className="block truncate">
                      {formatDate(example.value, example.format) ||
                        example.placeholder}
                    </span>
                  </button>
                </div>

                <TimePicker
                  mode={example.mode}
                  value={example.value}
                  onChange={example.onChange}
                  isOpen={example.isOpen}
                  timeUnits={example.timeUnits as any}
                  onOpenChange={example.onOpenChange}
                  enableSnap={example.enableSnap}
                />

                {/* 기능 설명 */}
                <div className="mt-3 rounded-lg bg-neutral-800/30 p-3 sm:mt-4 sm:p-4">
                  <h4 className="mb-2 text-xs font-medium text-gray-300 sm:text-sm">
                    주요 기능
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        {example.hasAmPm ? 'AM/PM 12시간 형식' : '24시간 형식'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        {example.mode === 'panel'
                          ? '패널 모드 UI'
                          : '휠 스크롤 UI'}
                      </span>
                    </li>
                    {example.enableSnap && (
                      <li className="flex items-center gap-2">
                        <div
                          className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                        />
                        <span className="leading-relaxed">
                          15분 단위 스냅 기능
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
