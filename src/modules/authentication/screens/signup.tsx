import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    name: z.string(),
    password: z.string(),
    username: z.string(),
    confirmPassword: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className='flex flex-col justify-between h-[98svh] lg:h-svh'>
      <div className='flex flex-col justify-center h-full lg:items-start lg:mx-auto w-[22rem]'>
        <h1 className='font-extrabold text-5xl m-2 text-left'>Project X</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='m-2'>
                  <FormControl>
                    <Input
                      placeholder='Name'
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
                        placeholder='Password'
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

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='m-2'>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='password'
                        placeholder='Confirm Password'
                        className='h-12 focus-visible:ring-transparent'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className='m-2 text-xs text-center'>
              By signing up, you accept our{' '}
              <span className='text-primary font-medium'>
                Terms & Conditions
              </span>{' '}
              and{' '}
              <span className='text-primary font-medium'>Privacy Policy</span>.
            </p>
            <Button
              className='w-[96%] h-12 m-2 bg-primary hover:bg-primary/75 uppercase'
              type='submit'
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>

      <span className='flex justify-center'>
        Already have an Account?
        <Link to='/auth/login' className='pl-2 text-primary font-semibold'>
          Login
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
