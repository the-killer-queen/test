import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

type IngredientsListProps = {
  name: string;
  quantity?: string | undefined;
}[];

function IngredientsList(field: ControllerRenderProps) {
  if (!field.value || field.value.length === 0) return null;

  return (
    <Card className='flex-wrap p-0 !px-3 !py-2'>
      <CardContent className='flex !flex-wrap items-center gap-2 p-0'>
        {(field.value as IngredientsListProps).map((ing, i) => (
          <Badge variant={'secondary'} key={i}>
            {ing.name} ({ing?.quantity})
            <span
              className='hover:text-destructive transition-colors duration-200 hover:cursor-pointer'
              onClick={() => {
                field.onChange(
                  (field.value || []).filter(
                    (f: IngredientsListProps[0]) => f.name !== ing.name,
                  ),
                );
              }}
            >
              <X className='size-3' />
            </span>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

export default IngredientsList;
