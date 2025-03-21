import millify from "millify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "category",
      ticks: { autoSkip: true, maxTicksLimit: 10 }
    },
    y: {
      beginAtZero: false,
      ticks: { callback: value => `$${value.toFixed(2)}`}
    },
  },
  plugins: {
    legend: { display: true },
  },
};

const DetailPageView = ({ model }) => {
  console.log("Grafik Labels:", model.chartData.labels);
  console.log("Grafik Data:", model.chartData.datasets[0].data);
  console.log("Model Chart Data:", model.chartData);

    return (
        <div>
          <h3 className="text-center">
            <span className="me-3 fs-4 fw-bold">{model?.coin?.symbol}</span>
            <span className="fs-3 text-warning">{model?.coin?.name}</span>
          </h3>
          <div className="row my-4"> 
            <section className="col-md-3 d-flex flex-column gap-5 p-5 p-md-4">
                {model.infoFields.map((data) => (
                    <div 
                      className="text-bg-light rounded shadow-lg text-center py-4 px-2 d-flex flex-column gap-2" 
                      key={data.label}
                    >
                        <span>{data.icon}</span>                        
                        <h3 className="fs-6 text-nowrap">{data.label}</h3>
                        <p className="fw-bold">{millify(data.value)}</p>
                    </div>
                ))}
            </section>
            <section className="col-lg-8 col-xl-9 col-md-7 pe-2 d-flex flex-column">
              {model.chartData?.datasets[0]?.data.length > 0 ? (
                  <div className="w-100 d-flex justify-content-center">
                    <div style={{ height: 500, width: "100%", maxWidth: "95%" }}>
                      <Line data={model.chartData} options={chartOptions} />
                    </div>  
                  </div>
              ) : (
                <p className="text-center text-danger">📉 Grafik verisi bulunamadı!</p>
              )}   
            </section>
          </div>
        </div>
    );
};

export default DetailPageView;