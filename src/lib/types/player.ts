export type VisualizationType = 'waveform' | 'bars' | 'circle' | 'frequency';

export interface PlayerState {
  isPlaying: boolean;
  currentTrackId: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  visualizationType: VisualizationType;
}

export interface VisualizerOptions {
  colors: {
    waveColor: string;
    progressColor: string;
    backgroundColor?: string;
  };
  cursorWidth?: number;
  barWidth?: number;
  barGap?: number;
  responsive?: boolean;
  height?: number;
}

export interface WaveformOptions extends VisualizerOptions {
  type: 'waveform';
  waveformHeight?: number;
  showCursor?: boolean;
}

export interface BarsOptions extends VisualizerOptions {
  type: 'bars';
  barCount?: number;
  randomizeHeight?: boolean;
}

export interface CircleOptions extends VisualizerOptions {
  type: 'circle';
  radius?: number;
  rotationSpeed?: number;
}

export interface FrequencyOptions extends VisualizerOptions {
  type: 'frequency';
  fftSize?: number;
  smoothing?: number;
}

export type VisualizerConfig = 
  | WaveformOptions 
  | BarsOptions 
  | CircleOptions 
  | FrequencyOptions; 