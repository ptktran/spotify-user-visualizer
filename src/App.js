import React, { useEffect, useState } from "react";
import { CheckToken, GenerateCard, isLoading } from "./Generator.js";
import Login from './Login.js';
import Loading from './Loading.js';


function App() {
    return (
        <div>
            {CheckToken() ? (isLoading? <Loading /> : <GenerateCard />)
            : (<Login />)}
        </div>
    );
}
export default App;