import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../../utils/modification/capitalizeFirstLetter";
import "./dropdownSearch.css";
interface DropdownSearchProps {
  items: string[];
  selectItem: (value: string) => void;
  placeholder?: string;
  searchedItem: string;
  updateSearchedItem: (value: string) => void
}

export const DropdownSearch: FC<DropdownSearchProps> = ({
  items,
  selectItem,
  placeholder,
  searchedItem,
  updateSearchedItem
}) => {
  
  const [displayItems, setDisplayItems] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  useEffect(() => {
    const uniqueItems = Array.from(new Set(items));
    if (searchedItem.length === 0) {
      setFilteredItems(uniqueItems);
    } else {
      const filteringItems = uniqueItems.filter((item) =>
        item.toLowerCase().includes(searchedItem.toLowerCase())
      );
      setFilteredItems(filteringItems);
    }
  }, [searchedItem, items]);

  const searchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchedItem(e.target.value);
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
    updateSearchedItem(item);
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
                onMouseDown={() => {
                  handleSelectItem(item);
                }}
                className="ps-3 mt-2 custom-dropdown-option d-flex align-items-center"
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
