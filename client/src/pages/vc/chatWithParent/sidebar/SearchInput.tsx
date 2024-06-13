import { IoIosSearch } from "react-icons/io";
const SearchInput = () => {
  return (
    <form className="tw-flex tw-items-center tw-gap-2">
      <label className="tw-input tw-w-full tw-input-bordered tw-flex tw-items-center">
        <IoIosSearch  className="tw-text-white tw-text-xl"/>

        <input
          type="text"
          className="tw-grow tw-input-sm tw-text-white"
          placeholder="Search Parent"
        />
      </label>
    </form>
  );
};
export default SearchInput;
