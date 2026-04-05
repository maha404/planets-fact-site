import MobileMenu from "../components/Mobile/MobileMenu";
import { useEffect, useState } from "react";
import TabBar from "../components/Mobile/TabBar";
import InfoCard from "../components/InfoCard";
import iconSource from '../assets/icon-source.svg';
import DesktopMenu from "../components/Mobile/TabletMenu";
import Button from "../components/Button";

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
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
}

export default function MarsPage() {
    const [data, setData] = useState<Planet[]>([]); // Define type for data
    const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

    useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data: Planet[]) => setData(data)) // Ensure fetched data matches type
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    // Find Mars data from the JSON
    const mercuryData = data.find((planet) => planet.name === "Mars");

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
            <DesktopMenu />
           
            <div className="planet-page">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />  
                
                <div className="planet-page-container">
                <div className="planet-image">
                    <div className="image-container">
                        {images.map((img, index) => (
                            <img key={index} src={img} alt={`Mars ${activeTab}`} />
                        ))}
                    </div>
                </div>

                <div className="planet-content">
                    <div className="planet-text-container">
                        <h2>{mercuryData?.name || "Loading..."}</h2>
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