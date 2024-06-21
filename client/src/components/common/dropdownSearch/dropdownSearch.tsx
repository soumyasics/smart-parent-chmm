import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

interface DropdownSearchProps {
  items: string[];
  selectItem: (value: string) => void;
}
export const DropdownSearch: FC<DropdownSearchProps> = ({
  items,
  selectItem,
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
    setSearchedItem(e.target.value);
  };

  const handleFocus = () => {
    setDisplayItems(true);
  };

  const handleBlur = () => {
    setDisplayItems(false);
  };

  return (
    <div>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search vaccine here."
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
                onClick={() => {
                  selectItem(item);
                }}
                className="ps-3 mt-2 bg-warning"
              >
                <p className="mb-0">{item}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
