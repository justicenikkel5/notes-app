'use client';

import { Button } from '@/components/ui/button';
import { VisualizationType } from '@/lib/types/player';
import { usePlayerStore } from '@/lib/store/player-store';
import { WavesIcon, BarChart3Icon, CircleIcon, ActivityIcon } from 'lucide-react';

export function VisualizationPicker() {
  const { visualizationType, setVisualizationType } = usePlayerStore();

  const visualizations: {
    type: VisualizationType;
    icon: React.ReactNode;
    label: string;
  }[] = [
    {
      type: 'waveform',
      icon: <WavesIcon className="h-4 w-4" />,
      label: 'Waveform'
    },
    {
      type: 'bars',
      icon: <BarChart3Icon className="h-4 w-4" />,
      label: 'Bars'
    },
    {
      type: 'circle',
      icon: <CircleIcon className="h-4 w-4" />,
      label: 'Circle'
    },
    {
      type: 'frequency',
      icon: <ActivityIcon className="h-4 w-4" />,
      label: 'Frequency'
    }
  ];

  return (
    <div className="flex gap-1">
      {visualizations.map((viz) => (
        <Button
          key={viz.type}
          variant={visualizationType === viz.type ? "default" : "outline"}
          size="sm"
          onClick={() => setVisualizationType(viz.type)}
          title={viz.label}
          className="px-2"
        >
          {viz.icon}
        </Button>
      ))}
    </div>
  );
} 