'use client';
import { QUERY_KEY, ROUTES } from '@/constants';
import { CategoryData } from '@/dto';
import { cn } from '@/lib';
import { categoryService } from '@/services/category';
import { useFavoriteStore, useSearchStore } from '@/store';
import {
  Badge,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Heart, SearchIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartMenu from './CartMenu';
import ThemeSwitcher from './ThemeSwitcher';

const Topbar = () => {
  const { theme } = useTheme();
  const { onChange } = useSearchStore();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES],
    queryFn: async () => {
      const res = await categoryService.getAllCategories({ page: 0, size: 10 });
      return res.data;
    },
  });
  const categories = data?.data || ([] as CategoryData[]);
  const { favorites } = useFavoriteStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname.includes(path.replace(/\s/g, '-'));
  };

  return (
    <div className="flex h-20 gap-4 border-b-1 border-foreground-200 bg-background p-4 px-[10%] items-center self-start sticky top-0 z-20">
      <Link to={ROUTES.HOME}>
        <Image
          src={theme === 'dark' ? '/ASA_LOGO_DARK.png' : '/ASA_LOGO_LIGHT.png'}
          width={140}
          height={140}
          alt="Logo"
          className="object-contain w-[80px] h-[80px]"
        />
      </Link>

      <div className="flex gap-2 flex-1 justify-evenly">
        <Link
          to={ROUTES.HOME}
          className={cn(
            'hover:text-primary transition-colors',
            isActive(ROUTES.HOME) ? 'text-primary' : 'text-foreground',
          )}>
          Home
        </Link>
        <Dropdown>
          <DropdownTrigger>
            <button
              className={cn(
                'hover:text-primary transition-colors',
                isActive(ROUTES.CATEGORIES.INDEX) ? 'text-primary' : '',
              )}>
              Categories
            </button>
          </DropdownTrigger>
          <DropdownMenu
            color="primary"
            bottomContent={
              <>
                <Divider />
                <Link
                  to={ROUTES.CATEGORIES.INDEX}
                  className="text-primary hover:text-primary-200 transition-colors w-full text-center mt-1">
                  View all categories
                </Link>
              </>
            }>
            {categories.map(category => (
              <DropdownItem key={category.id}>
                <Link
                  to={ROUTES.CATEGORIES.ID.replace(':id', category.name)}
                  className={cn(
                    'flex-1 w-full block',
                    isActive(ROUTES.CATEGORIES.ID.replace(':id', category.name))
                      ? 'text-primary'
                      : '',
                  )}>
                  {category.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Input
        radius="full"
        className="cursor-pointer max-w-md"
        placeholder="Search..."
        endContent={<SearchIcon onClick={() => console.log(1)} />}
        onFocus={() => navigate(ROUTES.SEARCH)}
        onValueChange={onChange}
      />
      <ThemeSwitcher />
      <Link to={ROUTES.FAVORITES}>
        <Badge content={favorites.length} color="danger">
          <Heart size={24} />
        </Badge>
      </Link>
      <CartMenu />
    </div>
  );
};

export default Topbar;
