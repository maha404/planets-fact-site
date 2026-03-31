
interface TabBarProps {
    activeTab: "overview" | "structure" | "surface" | string;
    setActiveTab: (tab: "overview" | "structure" | "surface") => void;
}

export default function Mercury(props: TabBarProps) {
    return (
        <div className="planet-menu">
                    <button 
                        className={props.activeTab === "overview" ? "active" : ""} 
                        onClick={() => props.setActiveTab("overview")}
                    >
                        Overview
                    </button>
                    <button 
                        className={props.activeTab === "structure" ? "active" : ""} 
                        onClick={() => props.setActiveTab("structure")}
                    >
                        Structure
                    </button>
                    <button 
                        className={props.activeTab === "surface" ? "active" : ""} 
                        onClick={() => props.setActiveTab("surface")}
                    >
                        Surface
                    </button>
                </div>
    )
}  