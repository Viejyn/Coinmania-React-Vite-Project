import { useEffect, useState } from "react";
import DetailPageView from "../views/DetailPageView";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { DetailModel } from "../models/DetailModel";

const DetailPageController = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const coinRes = await axios.get(`/assets/${id}`);
                if (isMounted) {
                    setCoin(coinRes.data.data);
                    console.log("Coin Verisi:", coinRes.data.data);
                }

                const historyRes = await axios.get(`/assets/${id}/history?interval=d1`);
                if (isMounted) {
                    setHistory(historyRes.data.data); 
                    console.log("History Data:", historyRes.data.data);
                }               
            } catch (error) {
                console.error("API hatası:", error); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) return <p className="text-center">⏳ Grafik yükleniyor...</p>;
    if (!coin || !history) return <p className="text-center text-danger">❌ Veri yüklenemedi!</p>;

    // model'den bir instance oluşturma
    const model = new DetailModel(coin, history);

    return <DetailPageView model={model} />;
};

export default DetailPageController;