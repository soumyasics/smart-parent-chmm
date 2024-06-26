import { IoIosSearch } from "react-icons/io";
import { FC } from "react";
interface SearcInputProps {
  updateSearchedParticipant: (name: string) => void;
}
const SearchInput: FC<SearcInputProps> = ({ updateSearchedParticipant }) => {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    updateSearchedParticipant(e.target.value);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <form className="tw-flex tw-items-center tw-gap-2" onSubmit={handleSubmit}>
      <label className="tw-input tw-w-full tw-input-bordered tw-flex tw-items-center">
        <IoIosSearch className="tw-text-white tw-text-xl" />

        <input
          type="text"
          className="tw-grow tw-input-sm tw-text-white"
          placeholder="Search Parent"
          onChange={handleChange}
        />
      </label>
    </form>
  );
};
export default SearchInput;
