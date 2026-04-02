interface props {
    title: "Rotation Time" | "Revolution Time" | "Radius" | "Average Temp";
    value: string;
}

export default function InfoCard(props: props) {
    return (
        <div className="info-card">
            <p className="info-card-text">{props.title}</p>
            <p className="info-card-value">{props.value}</p>
        </div>
    )
}