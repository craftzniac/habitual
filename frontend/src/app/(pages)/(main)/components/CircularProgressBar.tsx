import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
type Props = { value: number }
export default function CircularProgressBar({ value }: Props) {
    const data = [
        {
            label: "",
            value: value,
            fill: "#923DE7"
        },
    ]
    return (
        <div className="w-[7rem] h-[4rem] flex">
            <ResponsiveContainer width="100%" height="100%" className={"flex"}>
                <RadialBarChart
                    cx={"50%"} cy={"50%"}
                    innerRadius={"50%"}
                    outerRadius={"100%"}
                    barSize={5}
                    data={data}
                    margin={{ top: -30, left: -20, right: -20, bottom: -20 }}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        background={true}
                        dataKey={"value"}
                        cornerRadius={"100%"}
                    />
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline={"middle"}
                        className="text-base fill-primary-700"
                    >
                        {`${data[0].value}%`}
                    </text>
                </RadialBarChart>
            </ResponsiveContainer >
        </div >
    )
}
