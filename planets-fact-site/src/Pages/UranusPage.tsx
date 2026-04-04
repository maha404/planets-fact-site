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

export default function UranusPage() {

    const [data, setData] = useState<Planet[]>([]);
    const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

    useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    // Find Uranus data from the JSON
    const uranusData = data.find((planet) => planet.name === "Uranus");

    // Get the content and images based on the active tab
    const getContent = () => {
        if (!uranusData) return { content: "Loading...", source: "", images: [] };

        switch (activeTab) {
            case "overview":
                return {
                    content: uranusData.overview.content,
                    source: uranusData.overview.source,
                    images: [uranusData.images.planet]
                };
            case "structure":
                return {
                    content: uranusData.structure.content,
                    source: uranusData.structure.source,
                    images: [uranusData.images.internal]
                };
            case "surface":
                return {
                    content: uranusData.geology.content,
                    source: uranusData.geology.source,
                    images: [uranusData.images.planet, uranusData.images.geology]
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
                            <img key={index} src={img} alt={`Uranus ${activeTab}`} />
                        ))}
                    </div>
                </div>

                <div className="planet-content">
                    <div className="planet-text-container">
                        <h2>{uranusData?.name || "Loading..."}</h2>
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
                    <InfoCard title="Rotation Time" value={uranusData?.rotation || "Loading..."} />
                    <InfoCard title="Revolution Time" value={uranusData?.revolution || "Loading..."} />
                    <InfoCard title="Radius" value={uranusData?.radius || "Loading..."} />
                    <InfoCard title="Average Temp" value={uranusData?.temperature || "Loading..."} />
                </div>
            </div>
        </>
    );
}