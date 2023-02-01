import React, { useEffect, useState } from "react";
import { CheckToken, GenerateCard } from "./Generator.js";
import Login from './Login.js';

function App() {
    return (
        <div>
            {!CheckToken() ? 
                (<Login />) : (
                <div>
                    <GenerateCard />
                </div>
            )}

        </div>
    );
}
export default App;