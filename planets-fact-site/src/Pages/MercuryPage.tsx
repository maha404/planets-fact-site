import MobileMenu from "../components/Mobile/MobileMenu";
import { useEffect, useState } from "react";
import TabBar from "../components/Mobile/TabBar";

export default function Mercury() {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

    useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    // Find Mercury data from the JSON
    const mercuryData = data.find((planet: any) => planet.name === "Mercury");

    // Get the content and images based on the active tab
    const getContent = () => {
        if (!mercuryData) return { content: "Loading...", images: [] };

        switch (activeTab) {
            case "overview":
                return {
                    content: mercuryData.overview.content,
                    images: [mercuryData.images.planet]
                };
            case "structure":
                return {
                    content: mercuryData.structure.content,
                    images: [mercuryData.images.internal]
                };
            case "surface":
                return {
                    content: mercuryData.geology.content,
                    images: [mercuryData.images.planet, mercuryData.images.geology]
                };
            default:
                return { content: "", images: [] };
        }
    };

    const { content, images } = getContent();

    return (
        <>
            <MobileMenu />

            <div className="planet-page">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />  
                <div className="planet-image">
                    {images.map((img, index) => (
                        <img key={index} src={img} alt={`Mercury ${activeTab}`} />
                    ))}
                </div>

                <div className="planet-content">
                    <h2>{mercuryData?.name || "Loading..."}</h2>
                    <p>{content}</p>
                </div>

            </div>
        </>
    );
}