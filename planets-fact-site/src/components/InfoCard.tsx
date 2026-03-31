interface props {
    title: "Rotation Time" | "Revolution Time" | "Radius" | "Average Temp";
    value: string;
}

export default function InfoCard(props: props) {
    return (
        <div className="info-card">
            <p>{props.title}</p>
            <p>{props.value}</p>
        </div>
    )
}