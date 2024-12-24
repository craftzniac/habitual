import { JournalDays } from "../components/presentation/JournalDays";
import { JournalNote } from "../components/presentation/JournalNote";
import { getJournalEntryFor } from "@/app/services/habitDayJournal";
import { redirect } from "next/navigation";
import { getHabit } from "@/app/services/habitsService";
import { getAccessToken } from "@/app/api/auth/[...nextauth]/getAccessToken";
import ErrorPage from "../../../components/presentation/error-page";
import { generateHabitDays } from "@/app/utils/helpers/generateHabitDays";
import { getUTCDateString } from "@/app/utils/helpers/tinyHelpers";
import JournalProvider from "./context/JournalProvider";

/**
 * Check if the input text can be parsed to a valid date object
 * */
function isValidDateString(text: string): boolean {
    const d = new Date(text);
    if (isNaN(d.getTime())) {
        return false;
    }
    return true;
}

export default async function HabitJournalPage({ params }: { params: { id: string, date: [string] } }) {
    const habitId = params.id;
    const accessToken = await getAccessToken();
    const habitRes = await getHabit({ id: habitId, accessToken });
    if (!habitRes.success) {
        return <ErrorPage errorMsg={habitRes.message} />
    }
    const habit = habitRes.data.habit;
    const habitDayDates = generateHabitDays({ frequency: Array.from(habit.frequency || []), durationInDays: habit.durationInDays, startDateString: habit.startDate });

    let date = params.date ? params.date[0] : undefined;
    if (!date) {
        // if a date isn't provided, get a default date and redirect
        const todayDate = getUTCDateString(new Date());

        for (let i = 0; i < habitDayDates.length; i++) {
            const d = getUTCDateString(new Date(habitDayDates[i]));
            if (d > todayDate) {
                if (i - 1 >= 0) {
                    date = habitDayDates[i - 1];
                } else {
                    date = habitDayDates[0];
                }
                break;
            }
        }
        if (!date) {
            date = habitDayDates[habitDayDates.length - 1];
        }
        redirect(`/habits/${habitId}/journal/${getUTCDateString(new Date(date))}`);
    }

    // check that 
    //1. dateText is a valid date
    if (isValidDateString(date) === false) {
        return (
            <ErrorPage errorMsg="Invalid date" />
        )
    }

    date = getUTCDateString(new Date(date));

    //2. dateText represents a valid habit day for this habit
    const isFound = habitDayDates.find(d => {
        const dd = getUTCDateString(new Date(d));
        if (dd === date) return true; else return false;
    });
    if (!isFound) {
        return (
            <ErrorPage errorMsg="This habit has no entry for this date" />
        )
    }

    // proceed to get journal for habit day using the date
    const journalRes = await getJournalEntryFor({ accessToken, date: getUTCDateString(new Date(date)), habitId });
    if (!journalRes.success) {
        return <ErrorPage errorMsg={journalRes.message} />
    }

    return (
        <section className="w-full h-full flex flex-col px-4">
            <JournalProvider journalData={journalRes.data.entry} habitDaysDates={habitDayDates.map(date => getUTCDateString(new Date(date)))}>
                <JournalNote />
                <JournalDays />
            </JournalProvider>
        </section>
    )
}

