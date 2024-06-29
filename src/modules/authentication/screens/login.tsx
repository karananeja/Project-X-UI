import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    password: z.string(),
    remember: z.boolean(),
    username: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', remember: false, username: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className='flex flex-col justify-between h-[90svh]'>
      <div className='flex flex-col justify-center h-full'>
        <h1 className='font-extrabold text-5xl m-2'>Project X</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='m-2'>
                  <FormControl>
                    <Input
                      placeholder='Email or phone'
                      className='h-12 focus-visible:ring-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='m-2'>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        className='h-12 focus-visible:ring-transparent'
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent
                      '
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className='h-4 w-4' aria-hidden='true' />
                        ) : (
                          <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
                        )}
                        <span className='sr-only'>
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center justify-between m-2'>
              <FormField
                control={form.control}
                name='remember'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-1'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='data-[state=checked]:bg-primary'
                      />
                    </FormControl>
                    <FormLabel className='font-semibold !mt-0'>
                      Remember Password
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Link to='/auth/forgot-password' className='font-semibold'>
                Forgot Password?
              </Link>
            </div>
            <Button
              className='w-[96%] h-12 m-2 bg-primary hover:bg-primary/75'
              type='submit'
            >
              Login
            </Button>
          </form>
        </Form>
      </div>

      <span className='flex justify-center'>
        Don't have an Account?
        <Link to='/auth/signup' className='pl-2 text-primary font-semibold'>
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default Login;
