import { dateKit } from '@lani.ground/kits';
import { TimePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/TimePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';
import PickerTrigger from '../components/picker/PickerTrigger';

export default function TimePickerPage() {
  const { formatDate } = dateKit;

  // TimePicker
  const [basicTime, setBasicTime] = useState<Date | null>(null);
  const [basicTimeOpen, setBasicTimeOpen] = useState(false);

  const [panelSnapTime, setPanelSnapTime] = useState<Date | null>(new Date());
  const [panelSnapTimeOpen, setPanelSnapTimeOpen] = useState(false);

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="TimePicker">
        <div>
          <p className="mb-2 text-base font-bold">TimePicker - Default</p>
          <PickerTrigger
            type="time"
            onClick={() => setBasicTimeOpen(true)}
            placeholder="시간을 선택하세요"
            value={formatDate(basicTime, 'HH:mm:ss')}
          />
          <TimePicker
            value={basicTime}
            onChange={setBasicTime}
            isOpen={basicTimeOpen}
            timeUnits={['hour', 'minute', 'second']}
            onOpenChange={setBasicTimeOpen}
          />
        </div>
        <div>
          <p className="mb-2 text-base font-bold">TimePicker - Panel + Snap</p>
          <PickerTrigger
            type="time"
            onClick={() => setPanelSnapTimeOpen(true)}
            placeholder="시간을 선택하세요 (15분 단위)"
            value={formatDate(panelSnapTime, 'A hh:mm:ss')}
          />
          <TimePicker
            mode="panel"
            value={panelSnapTime}
            onChange={setPanelSnapTime}
            isOpen={panelSnapTimeOpen}
            onOpenChange={setPanelSnapTimeOpen}
            timeUnits={['hour', 'minute', 'second', 'ampm']}
            enableSnap
          />
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
