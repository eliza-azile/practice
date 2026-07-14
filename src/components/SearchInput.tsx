import React from "react";
import Input from "../UI/Input/Input";


interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Input 
                placeholder="Поиск"
                size="small"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ padding: '11px 15px' }}
            />
        </div>
    );
};

export default SearchInput;