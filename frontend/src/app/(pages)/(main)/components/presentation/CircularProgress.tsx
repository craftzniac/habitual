type Props = {
    value: number,
    width?: number,
    backgroundStroke?: string,
    foregroundStroke?: string,
    strokeWidth?: number,
    maxValue?: number,
    fontSize?: string
}

export default function CircularProgress({
    maxValue = 100, value, strokeWidth = 3, width = 100, backgroundStroke = "#FFE0D1", foregroundStroke = "tomato", fontSize
}: Props) {
    const height = width;
    const radius = width / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const valuePercent = (value / maxValue) * 1
    const percentOfCircumference = circumference * (1 - valuePercent)
    return (
        <svg width={width} height={width} viewBox={`0 0 ${width} ${height}`}>
            <g
                transform={`rotate(-90, ${width / 2}, ${height / 2})`}
            >
                <circle cx="50%" cy="50%" r={radius} stroke={backgroundStroke} strokeWidth={strokeWidth} fill="none" />
                <circle cx="50%" cy="50%" r={radius} stroke={foregroundStroke} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={percentOfCircumference} strokeLinecap="round">
                    <animate
                        attributeName="stroke-dashoffset"
                        from={circumference}
                        to={percentOfCircumference}
                        dur="0.8"
                    />
                </circle>
            </g>
            {
                // <circle cx="50%" cy="50%" r={2} />
            }
            <text x="50%" y="50%" textAnchor="middle" fontSize={fontSize || `${width * 0.012}rem`} fill={foregroundStroke} dominantBaseline="middle" >
                {value}%
            </text>
        </svg>
    )
}
