import React, { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from '../primitives/input';
import { Button } from '../primitives/button';
const SearchBar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams);
    const [query, setQuery] = useState(params.get("query") ?? "" );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
    params.set("query", query.toString());
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
                <Input value={query} onChange={handleInputChange} />
                <Button className="my-2" size={"lg"} onClick={handleSearch}>Search</Button>
            </div>
        </div>
    );
};

export default SearchBar;
