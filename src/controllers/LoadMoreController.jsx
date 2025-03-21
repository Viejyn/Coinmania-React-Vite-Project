import React from "react";
import LoadMoreView from "../views/LoadMoreView";
import { useSearchParams } from "react-router-dom";

const LoadMoreController = () => {
    const [params, setParams] = useSearchParams();

    const handleClick = () => {
        // güncel sayfa sayısını al
        const pageNumber = Number(params.get('page')) || 1;
        // url'i güncelleme, sayfayı 1 arttırma
        setParams({ ...Object.fromEntries(params.entries()), page: pageNumber +1 });
    };

    return <LoadMoreView handleClick={handleClick} />;
};

export default LoadMoreController;