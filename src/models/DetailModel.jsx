import { FaPercent } from 'react-icons/fa';
import { SiCoinmarketcap } from 'react-icons/si';
import { MdPriceChange, MdEventAvailable } from 'react-icons/md';
import { RiStockFill } from 'react-icons/ri';

export class DetailModel {
    constructor(coin, history) {
        this.coin = coin;

        // arayüz kutuları için veriyi hazırla
        this.infoFields = [
            {
                icon: <SiCoinmarketcap />,
                label: "Market Hacmi",
                value: Number(coin.marketCapUsd) || 0
            },
            {
                icon: <MdEventAvailable />,
                label: "Tedarik",
                value: Number(coin.supply) || 0
            },
            {
                icon: <MdPriceChange />,
                label: "Fiyat (USD)",
                value: Number(coin.priceUsd) || 0
            },
            {
                icon: <FaPercent />,
                label: "24s Değişim (%)",
                value: Number(coin.changePercent24Hr) || 0
            },
            {
                icon: <RiStockFill />,
                label: "24s Hacim",
                value: Number(coin.volumeUsd24Hr) || 0
            },
        ];

        const labels = history?.map(i => new Date(i.date).toLocaleDateString()) || [];
        const data = history?.map(i => Number(i.priceUsd) || 0) || [];

        console.log("Oluşturulan Labels:", labels);
        console.log("Oluşturulan Data:", data);

        // grafik verisini oluşturma
        this.chartData = {
            labels: labels.length > 0 ? labels : ["Veri Yok"],
            datasets:[
                {
                    label: "Fiyat",
                    data: data.length > 0 ? data : [0],
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                },
            ],
        };
        console.log("Oluşturulan Chart Data:", this.chartData);
    }
}