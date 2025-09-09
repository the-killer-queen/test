import { P } from '@/components/typography/P';
import { getMenuItemDescription } from '@/supabase/data/menu-service';

async function MenuItemDetailsDescription({ menuId }: { menuId: string }) {
  const { data: description, error } = await getMenuItemDescription(+menuId);
  if (error) return <p>!!!!</p>;

  return (
    <P>
      {description ||
        'Temporary description showcases how your menu item details will appear. Please update with your actual menu item description for a genuine representation of your dish :)'}
    </P>
  );
}

export default MenuItemDetailsDescription;
