export type IconSize = 'extra-small' | 'small' | 'medium' | 'large' | 'full';

export interface IconProps {
  className?: string;
  size?: IconSize;
  bold?: boolean;
  rotation?: number;
  'aria-label'?: string;
  title?: string;
}
