import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../../utils/modification/capitalizeFirstLetter";
interface DropdownSearchProps {
  items: string[];
  selectItem: (value: string) => void;
  placeholder?: string;
}
export const DropdownSearch: FC<DropdownSearchProps> = ({
  items,
  selectItem,
  placeholder,
}) => {
  const [searchedItem, setSearchedItem] = useState<string>("");
  const [displayItems, setDisplayItems] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  useEffect(() => {
    if (searchedItem.length === 0) {
      setFilteredItems(items);
    } else {
      const filteringItems = items.filter((item) =>
        item.toLowerCase().includes(searchedItem.toLowerCase())
      );
      setFilteredItems(filteringItems);
    }
  }, [searchedItem, items]);

  const searchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (!search) {
      handleSelectItem("");
      return;
    }
    setSearchedItem(e.target.value);
  };

  const handleFocus = () => {
    setDisplayItems(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDisplayItems(false);
    }, 200);
  };

  const handleSelectItem = (item: string) => {
    selectItem(item);
    setSearchedItem(item);
    setDisplayItems(false);
  };

  return (
    <div>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder={placeholder || "Search"}
          name="name"
          onChange={searchItem}
          value={searchedItem}
          required
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Form.Group>
      {displayItems && (
        <div style={{ maxHeight: "300px", overflow: "auto" }}>
          {filteredItems.map((item, index) => {
            return (
              <div
                key={index}
                style={{ height: "30px", cursor: "pointer" }}
                onMouseDown={() => {
                  handleSelectItem(item);
                }}
                className="ps-3 mt-2 bg-warning"
              >
                <p className="mb-0">{capitalizeFirstLetter(item)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
