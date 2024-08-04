import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { signUp } from '@/network/auth-apis';
import { REGEX } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z
  .object({
    name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
    mobile: z.string().regex(REGEX.phoneNumber, 'Invalid Number'),
    email: z.string().email({ message: 'Invalid Email' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormSchema = z.infer<typeof formSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      mobile: '',
      email: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormSchema) => {
    const payload: SignUpPayload = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
    };

    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res: [SignUpResponse, ErrResp] = await signUp(payload);
    if (res[1] === null) {
      localStorage.setItem('user-info', JSON.stringify(res[0]));
      navigate('/auth/login');
      form.reset();
    } else {
      toast({
        title: res[1].errcode,
        description: res[1].msg,
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col justify-between h-[98svh] lg:h-svh'>
      <div className='flex flex-col justify-center h-full lg:items-start mx-auto w-[22rem]'>
        <h1 className='font-extrabold text-5xl m-2'>Project X</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='m-2 relative'>
                  <FormControl>
                    <Input
                      placeholder='Name'
                      className='form-input'
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <p className='absolute -bottom-5 text-sm font-medium text-red-500 dark:text-red-900'>
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='mobile'
              render={({ field }) => (
                <FormItem className='m-2 relative'>
                  <FormControl>
                    <Input
                      placeholder='Phone'
                      className='form-input'
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.mobile && (
                    <p className='absolute -bottom-5 text-sm font-medium text-red-500 dark:text-red-900'>
                      {form.formState.errors.mobile.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='m-2 relative'>
                  <FormControl>
                    <Input
                      placeholder='Email'
                      className='form-input'
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className='absolute -bottom-5 text-sm font-medium text-red-500 dark:text-red-900'>
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='m-2 relative'>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        className='form-input'
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
                  {form.formState.errors.password && (
                    <p className='absolute -bottom-5 text-sm font-medium text-red-500 dark:text-red-900'>
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='m-2 relative'>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='password'
                        placeholder='Confirm Password'
                        className='form-input'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.confirmPassword && (
                    <p className='absolute -bottom-5 text-sm font-medium text-red-500 dark:text-red-900'>
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
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
              disabled={isLoading}
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
