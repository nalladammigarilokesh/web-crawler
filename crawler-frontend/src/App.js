import React, { useState } from 'react';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/search?query=${query}`);
            const data = await response.json();
            const dataUrl =  data.links.filter(link => !link.includes("google.com/"));
            let uniqueUrls = dataUrl.filter((item, index) => dataUrl.indexOf(item)===index);
            setResults(uniqueUrls);
            console.log(uniqueUrls.length,"lokesh")
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor:'aliceblue', height:'100vh'}}>
            <h1>Please enter the product which you wanted to search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Product Name"
                style={{ padding: '10px', width: '40%', marginBottom: '10px' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px 30px', backgroundColor: 'blue', color: 'white', border: '2px solid blue'}}>Search</button>

            {loading ? <p>Loading...</p> : <ul style={{ listStyleType: 'none', padding: 0 }}>
                {results.map((link, index) => (
                    <li key={index} style={{ margin: '10px 0' }}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>}
        </div>
    );
}

export default App;