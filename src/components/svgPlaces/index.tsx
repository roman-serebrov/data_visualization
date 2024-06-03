import Loader from "../Loader";
import './aresvg.css';
import Title from "../Title";

interface Params {
    loading: boolean,
    title: string
}
function SVGPlaces({loading, title}: Params) {
    
    return (
        <div className={'area__svg'}>
            {loading && <Loader />}
            <Title
                title={title}
                loading={loading}
            />
                <svg id="chart"  className={'svg__grafic'}>
                    <g width="109" height="16" viewBox="0 0 109 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="55" y="460" width="16" height="16" rx="3" fill="#4AB6E8" />
                        <text x="75" y="473" fill="#898290">Клиентская часть</text>
                        </g>
                    <g width="105" height="16" viewBox="0 0 105 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="235" y="460" width="16" height="16" rx="3" fill="#AA6FAC"/>
                        <text x="255" y="473" fill="#898290">Серверная часть</text>
                    </g>
                    <g fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="415" y="460" width="16" height="16" rx="3" fill="#E85498"/>
                        <text x="435" y="473" fill="#898290">База Данных</text>
                    </g>
                </svg>
        </div>
    )
}




export default SVGPlaces;