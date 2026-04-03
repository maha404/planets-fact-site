
interface TabBarProps {
    activeTab: "overview" | "structure" | "surface" | string;
    setActiveTab: (tab: "overview" | "structure" | "surface") => void;
}

export default function Mercury(props: TabBarProps) {
    return (
        <div className="planet-menu">
                    <button 
                        className={props.activeTab === "overview" ? "active" : "not-active"} 
                        onClick={() => props.setActiveTab("overview")}
                    >
                        Overview
                    </button>
                    <button 
                        className={props.activeTab === "structure" ? "active" : "not-active"} 
                        onClick={() => props.setActiveTab("structure")}
                    >
                        Structure
                    </button>
                    <button 
                        className={props.activeTab === "surface" ? "active" : "not-active"} 
                        onClick={() => props.setActiveTab("surface")}
                    >
                        Surface
                    </button>
                </div>
    )
}  