import MobileMenu from "../components/Mobile/MobileMenu";
import { useEffect, useState } from "react";
import TabBar from "../components/Mobile/TabBar";
import InfoCard from "../components/InfoCard";
import iconSource from '../assets/icon-source.svg';

export default function UranusPage() {

    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

    useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    // Find Mercury data from the JSON
    const mercuryData = data.find((planet: any) => planet.name === "Uranus");

    // Get the content and images based on the active tab
    const getContent = () => {
        if (!mercuryData) return { content: "Loading...", images: [] };

        switch (activeTab) {
            case "overview":
                return {
                    content: mercuryData.overview.content,
                    source: mercuryData.overview.source,
                    images: [mercuryData.images.planet]
                };
            case "structure":
                return {
                    content: mercuryData.structure.content,
                    source: mercuryData.structure.source,
                    images: [mercuryData.images.internal]
                };
            case "surface":
                return {
                    content: mercuryData.geology.content,
                    source: mercuryData.geology.source,
                    images: [mercuryData.images.planet, mercuryData.images.geology]
                };
            default:
                return { content: "", images: [] };
        }
    };

    const { content, source, images } = getContent();

    return (
        <>
            <MobileMenu />

            <div className="planet-page">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />  
                <div className="planet-image">
                    <div className="image-container">
                        {images.map((img, index) => (
                            <img key={index} src={img} alt={`Mercury ${activeTab}`} />
                        ))}
                    </div>
                </div>

                <div className="planet-content">
                    <h2>{mercuryData?.name || "Loading..."}</h2>
                    <p>{content}</p>
                    <div className="link-container">
                        <p>Source : </p><a href={source} target="_blank">Wikipedia</a> <img src={iconSource} alt="" />
                    </div>
                </div>
                
                <div className="info-card-container">
                    <InfoCard title="Rotation Time" value={mercuryData?.rotation || "Loading..."} />
                    <InfoCard title="Revolution Time" value={mercuryData?.revolution || "Loading..."} />
                    <InfoCard title="Radius" value={mercuryData?.radius || "Loading..."} />
                    <InfoCard title="Average Temp" value={mercuryData?.temperature || "Loading..."} />
                </div>
            </div>
        </>
    );
    
}