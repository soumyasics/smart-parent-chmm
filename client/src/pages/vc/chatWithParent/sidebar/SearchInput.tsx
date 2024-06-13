import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className='tw-flex tw-items-center tw-gap-2'>
      <input type='text' placeholder='Search…' className='tw-input tw-input-bordered tw-rounded-full' />
      <button type='submit' className='tw-btn tw-btn-circle tw-bg-sky-500 tw-text-white'>
        <IoSearchSharp className='tw-w-6 tw-h-6 tw-outline-none' />
      </button>
    </form>
  );
};
export default SearchInput;
