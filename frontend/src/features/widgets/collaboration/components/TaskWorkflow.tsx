import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/shadcn/select';

import CounterInput from './CounterInput';

export default function TaskWorkflow() {
  const platforms = ['GitHub Projects', 'Jira', 'Linear', 'Notion'];
  const [cycleValue, setCycleValue] = useState<number>(2);
  const [editCycleValue, setEditCycleValue] = useState<boolean>(false);
  const [cycleUnit, setCycleUnit] = useState('week');

  return (
    <div className="max-w-[400px] rounded-2xl border border-gray-700 p-6 text-gray-200">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        작업 관리
      </h2>

      <div className="mt-6">
        <p className="mb-2 text-sm">사용 플랫폼</p>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="사용 플랫폼 선택" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <p className="flex-1 text-sm">스프린트 주기</p>

        <CounterInput
          value={cycleValue}
          setValue={setCycleValue}
          editValue={editCycleValue}
          setEditValue={setEditCycleValue}
        />

        <Select value={cycleUnit} onValueChange={setCycleUnit}>
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">일</SelectItem>
            <SelectItem value="week">주</SelectItem>
            <SelectItem value="month">월</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
