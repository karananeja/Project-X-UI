import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='w-3/5 h-[29rem] flex flex-col justify-center items-center'>
        <span className='text-[1.625rem] mt-6 font-bold'>
          We've lost this page
        </span>
        <p className='flex justify-center items-center mt-6'>
          Sorry, the page you are looking for doesn't exist.
        </p>
        <p>
          Take a run around the block or you can go back to{' '}
          <span
            className='text-[#136EF5] cursor-pointer'
            onClick={() => navigate('/')}
          >
            Home page
          </span>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
