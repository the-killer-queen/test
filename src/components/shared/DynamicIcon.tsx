import * as LucideIcons from 'lucide-react';

type DynamicIconProps = { iconName: string; size?: number; className?: string };

function DynamicIcon({ iconName, size = 24, className }: DynamicIconProps) {
  const IconComponent = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as LucideIcons.LucideIcon;

  if (!IconComponent)
    return <LucideIcons.HelpCircle size={size} className={className} />;

  return <IconComponent size={size} className={className} />;
}

export default DynamicIcon;
