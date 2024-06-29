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
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const Login = () => {
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
                  className='h-12'
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
                <Input
                  placeholder='Enter your password'
                  className='h-12'
                  {...field}
                />
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
        <Button className='w-[96%] h-12 m-2' type='submit'>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default Login;
