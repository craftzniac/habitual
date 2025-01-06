import CircularProgress from "../../../components/presentation/CircularProgress";

export default function HabitConsistencyPercent({ percent }: { percent: number }) {
    return (
        <span className="flex gap-1 items-center text-sm">
            <span className="text-primary-900/50">consistency</span>
            <CircularProgress value={percent} fontSize="0.8rem" strokeWidth={4} width={45} foregroundStroke="#923DE7" backgroundStroke="#F8E6F8" />
        </span>
    )

}
