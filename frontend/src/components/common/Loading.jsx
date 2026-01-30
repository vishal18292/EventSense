const Loading = ({ fullScreen = true }) => {
    if (fullScreen) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="spinner mb-4"></div>
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            <div className="spinner"></div>
        </div>
    );
};

export default Loading;
