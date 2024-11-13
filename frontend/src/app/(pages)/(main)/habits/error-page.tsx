export default function ErrorPage({ errorMsg }: { errorMsg: string }) {
    return (
        <div className="w-full h-full justify-center items-center p-4">
            <p className="text-2xl">
                {errorMsg}
            </p>
        </div>
    )
}
