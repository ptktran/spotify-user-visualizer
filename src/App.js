import React, { useEffect, useState } from "react";
import { CheckToken, GenerateCard, isLoading } from "./Generator.js";
import Login from './Login.js';

function App() {
    return (
        <div>
            {CheckToken() ? (<GenerateCard />)
            : (<Login />)}
        </div>
    );
}
export default App;