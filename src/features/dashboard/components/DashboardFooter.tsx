import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getUser } from '@/supabase/data/user-service';
import Logout from './Logout';
import UserMenuNav from './UserMenuNav';

async function DashboardFooter() {
  const user = await getUser();
  if (!user) throw new Error();

  const userInitials =
    user?.email?.split('@')[0].slice(0, 2).toUpperCase() || 'U';
  const truncatedEmail =
    user.email!.length > 20
      ? user.email?.split('').slice(0, 20).join('') + '...'
      : user.email;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='group h-12 hover:!bg-inherit'>
            <SidebarMenuButton>
              <div className='flex flex-1 items-center gap-2'>
                <div className='relative'>
                  <Avatar>
                    <AvatarImage
                      src={user.user_metadata?.picture}
                      alt={'User profile'}
                    />
                    <AvatarFallback className='bg-primary/5 text-primary text-xs font-semibold'>
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='border-background bg-primary absolute -right-0.5 -bottom-1 h-3 w-3 animate-pulse rounded-full border-2'></div>
                </div>
                <span>{truncatedEmail}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent side='top' align='end' className='w-64 p-2'>
            <DropdownMenuItem className='hover:!bg-transparent'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage
                    src={user.user_metadata?.picture}
                    alt={'User profile'}
                  />
                  <AvatarFallback className='bg-primary/5 text-primary font-semibold'>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='text-sm font-medium'>
                    {user.user_metadata.name || user?.email?.split('@')[0]}
                  </span>
                  <span className='text-muted-foreground text-xs'>
                    {truncatedEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className='my-2' />

            <UserMenuNav />

            <DropdownMenuSeparator className='my-2' />

            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default DashboardFooter;
