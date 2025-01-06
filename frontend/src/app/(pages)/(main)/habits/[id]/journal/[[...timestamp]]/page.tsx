import { JournalDays } from "../components/presentation/JournalDays";
import { JournalNote } from "../components/presentation/JournalNote";
import { getJournalEntryFor } from "@/app/services/habitDayJournal";
import { redirect } from "next/navigation";
import { getHabit } from "@/app/services/habitsService";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import ErrorPage from "../../../components/presentation/error-page";
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays";
import { getDateOnlyTimestamp, getUTCDateString } from "@/app/utils/helpers/tinyHelpers";
import JournalProvider from "./context/JournalProvider";

export default async function HabitJournalPage({ params }: { params: { id: string, timestamp: [string] } }) {
    const habitId = params.id;
    const accessToken = await getAccessToken();
    const habitRes = await getHabit({ id: habitId, accessToken });
    if (!habitRes.success) {
        return <ErrorPage errorMsg={habitRes.message} />
    }
    const habit = habitRes.data.habit;
    const habitDayDates = generateHabitDays({ frequency: Array.from(habit.frequency || []), durationInDays: habit.durationInDays, startDateString: habit.startDate });

    let timestamp = undefined;

    if (params.timestamp && params.timestamp[0]) {
        timestamp = parseInt(params.timestamp[0])
    }

    if (!timestamp) {
        // if a timestamp isn't provided, get a default timestamp and redirect
        const todayTimestamp = getDateOnlyTimestamp(new Date());

        for (let i = 0; i < habitDayDates.length; i++) {
            const d = getDateOnlyTimestamp(new Date(habitDayDates[i]));
            if (d > todayTimestamp) {
                if (i - 1 >= 0) {
                    timestamp = habitDayDates[i - 1];
                } else {
                    timestamp = habitDayDates[0];
                }
                break;
            }
        }
        if (!timestamp) {
            timestamp = habitDayDates[habitDayDates.length - 1];
        }
        redirect(`/habits/${habitId}/journal/${timestamp}`);
    }

    //2. dateText represents a valid habit day for this habit
    const isFound = habitDayDates.find(d => {
        const dd = getDateOnlyTimestamp(new Date(d));
        if (dd === timestamp) return true; else return false;
    });
    if (!isFound) {
        return (
            <ErrorPage errorMsg="This habit has no entry for this date" />
        )
    }

    // proceed to get journal for habit day using the date
    console.log("timestamp:", timestamp);
    const journalRes = await getJournalEntryFor({ accessToken, timestamp, habitId });
    if (!journalRes.success) {
        return <ErrorPage errorMsg={journalRes.message} />
    }

    return (
        <section className="w-full h-full flex flex-col px-4">
            <JournalProvider journalData={journalRes.data.entry} habitDaysDates={habitDayDates.map(timestamp => getUTCDateString(new Date(timestamp)))}>
                <JournalNote />
                <JournalDays />
            </JournalProvider>
        </section>
    )
}

