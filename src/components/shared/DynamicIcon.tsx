import * as LucideIcons from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type DynamicIconProps = {
  iconName: string;
  fallBackIcon?: ForwardRefExoticComponent<
    Omit<LucideIcons.LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  size?: number;
  className?: string;
};

function DynamicIcon({
  iconName,
  fallBackIcon,
  size = 24,
  className,
}: DynamicIconProps) {
  const IconComponent = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as LucideIcons.LucideIcon;

  if (!IconComponent) {
    const Icon = fallBackIcon || LucideIcons.Coffee;
    return <Icon size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
}

export default DynamicIcon;
