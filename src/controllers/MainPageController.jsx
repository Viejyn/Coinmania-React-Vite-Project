import axios from "axios";
import MainPageView from "../views/MainPageView";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MainPageController = () => {
    const [coins, setCoins] = useState([]);
    const [popular, setPopular] = useState(null);
    const [loading, setLoading] = useState(false);

    // url'deki arama parametrelerine erişme
    const [params] = useSearchParams();
    const page = params.get("page");

    useEffect(() => {
        if (loading) return;
        setLoading(true);

        axios
            .get(`/assets?limit=15&offset=${page ? page : 1}`)
            .then((res) => {
                setCoins((prevCoins) => [...prevCoins, ...res.data.data]);
                if (!popular) {
                    setPopular(res.data.data.slice(0, 3));
                }
            })
            .catch((err) => console.error("API Hatası:", err))
            .finally(() => setLoading(false));
    }, [params]);
    
    return <MainPageView popular={popular} coins={coins} />;
};

export default MainPageController;