const Loading = () => {
    return (
        <div className="inset-0 absolute bottom-0 left-0 flex items-center justify-center gap-2 bg-white">
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    )
}

export default Loading
