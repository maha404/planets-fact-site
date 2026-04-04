import MobileMenu from "../components/Mobile/MobileMenu";
import { useEffect, useState } from "react";
import TabBar from "../components/Mobile/TabBar";
import InfoCard from "../components/InfoCard";
import iconSource from '../assets/icon-source.svg';
import DesktopMenu from "../components/Mobile/TabletMenu";
import Button from "../components/Button";

// Define the Planet interface
interface Planet {
    name: string;
    overview: {
        content: string;
        source: string;
    };
    structure: {
        content: string;
        source: string;
    };
    geology: {
        content: string;
        source: string;
    };
    rotation: string;
    revolution: string;
    radius: string;
    temperature: string;
    images: {
        planet: string;
        internal: string;
        geology: string;
    };
}

export default function VenusPage() {

    const [data, setData] = useState<Planet[]>([]);
    const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

    useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    // Find Venus data from the JSON
    const venusData = data.find((planet) => planet.name === "Venus");

    // Get the content and images based on the active tab
    const getContent = () => {
        if (!venusData) return { content: "Loading...", source: "", images: [] };

        switch (activeTab) {
            case "overview":
                return {
                    content: venusData.overview.content,
                    source: venusData.overview.source,
                    images: [venusData.images.planet]
                };
            case "structure":
                return {
                    content: venusData.structure.content,
                    source: venusData.structure.source,
                    images: [venusData.images.internal]
                };
            case "surface":
                return {
                    content: venusData.geology.content,
                    source: venusData.geology.source,
                    images: [venusData.images.planet, venusData.images.geology]
                };
            default:
                return { content: "", source: "", images: [] };
        }
    };

    const { content, source, images } = getContent();

    return (
        <>
            <MobileMenu />
            <DesktopMenu />

            <div className="planet-page">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="planet-image">
                    <div className="image-container">
                        {images.map((img, index) => (
                            <img key={index} src={img} alt={`Venus ${activeTab}`} />
                        ))}
                    </div>
                </div>

                <div className="planet-content">
                    <div className="planet-text-container">
                        <h2>{venusData?.name || "Loading..."}</h2>
                        <p>{content}</p>
                        <div className="link-container">
                            <p>Source : </p><a href={source} target="_blank">Wikipedia</a> <img src={iconSource} alt="" />
                        </div>
                    </div>
                    <div className="desktop-toggle">
                        <Button 
                            number="01" 
                            text="Overview" 
                            option="overview" 
                            onClick={() => setActiveTab("overview")}
                            active={activeTab === "overview"}
                        />
                        <Button 
                            number="02" 
                            text="Internal Structure" 
                            option="structure" 
                            onClick={() => setActiveTab("structure")}
                            active={activeTab === "structure"}
                        />
                        <Button 
                            number="03" 
                            text="Surface Geology" 
                            option="geology" 
                            onClick={() => setActiveTab("surface")}
                            active={activeTab === "surface"}
                        />
                    </div>
                </div>

                <div className="info-card-container">
                    <InfoCard title="Rotation Time" value={venusData?.rotation || "Loading..."} />
                    <InfoCard title="Revolution Time" value={venusData?.revolution || "Loading..."} />
                    <InfoCard title="Radius" value={venusData?.radius || "Loading..."} />
                    <InfoCard title="Average Temp" value={venusData?.temperature || "Loading..."} />
                </div>
            </div>
        </>
    );
}