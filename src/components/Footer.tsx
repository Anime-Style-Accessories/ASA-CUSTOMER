import { ROUTES } from '@/constants';
import { Image, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Linkedin,
  SendHorizonal,
  Twitter,
  Youtube,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { theme } = useTheme();
  return (
    <div className="flex w-full flex-col border-t border-t-gray-100 px-5 dark:border-t-gray-800 dark:bg-gradient-to-br dark:from-slate-900 dark:to-black md:px-10 lg:px-[50px] xl:px-16">
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 pt-16 md:grid-cols-3 lg:pb-16 lg:pt-24 xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 2xl:grid-cols-5">
        <div className="flex flex-col gap-2">
          <div className="h-8 md:h-16">
            <Link to={ROUTES.HOME}>
              <Image
                src={
                  theme === 'dark'
                    ? '/ASA_LOGO_DARK.png'
                    : '/ASA_LOGO_LIGHT.png'
                }
                width={140}
                height={140}
                alt="Logo"
                className="object-contain w-[80px] h-[80px]"
              />
            </Link>
          </div>
          <p className="text-gray-600 dark:text-slate-300">
            Anime Style Accessories is a platform helps you to find and buy the
            best products from the best brands.
          </p>
          <p>
            Email:{' '}
            <Link
              to="mailto:customer@animeStyleAccessories.com"
              color="foreground">
              customer@asa.com
            </Link>
          </p>
          <p>
            Tel:{' '}
            <Link to="tel:+1234567890" color="foreground">
              +1 234 567 890
            </Link>
          </p>
          <div className="flex flex-wrap gap-2">
            <Facebook size={20} className="cursor-pointer" />
            <Twitter size={20} className="cursor-pointer" />
            <Instagram size={20} className="cursor-pointer" />
            <Youtube size={20} className="cursor-pointer" />
            <Linkedin size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-8 md:h-16">
            <h4 className="text-lg font-semibold">Subcribe Now</h4>
          </div>
          <p className="text-gray-600 dark:text-slate-300">
            Subscribe to our newsletter to get the latest news and updates.
          </p>
          <Input
            placeholder="Enter your email here"
            type="email"
            variant="bordered"
            radius="sm"
            fullWidth
            size="lg"
            endContent={
              email.length > 0 && (
                <motion.button
                  className="transition-colors hover:sm:text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}>
                  <SendHorizonal size={20} />
                </motion.button>
              )
            }
            onValueChange={setEmail}
            value={email}
          />
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col items-center gap-2 border-t border-t-gray-200 pb-20 pt-8 dark:border-t-gray-800 lg:mt-0 lg:flex-row lg:justify-between lg:border-t-0 lg:pb-12">
        <span className="order-2 shrink-0 text-sm lg:order-1">
          ©2024 AnimeStyleAccessories. Copyright © ASA. All rights reserved
          worldwide. ASA
        </span>
      </div>
    </div>
  );
};

export default Footer;
