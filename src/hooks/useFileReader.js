import {useState, useEffect, useMemo, useCallback} from 'react';

const useFileReader = (file) => {
    const [loading, setLoading] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (file) {
            startReading(file);
        }
    }, [file])

    const reader = useMemo(() => new FileReader(), []);
    const onLoadStart = () => {
        setLoading(0);
        setIsLoading(true);
    }

    const onLoadEnd = () => {
        setLoading(100);
        setIsLoading(false);
    }
    const onLoadSuccess = (e) => {
        const {result} = e.currentTarget;
        setFileUrl(result)
    }
    const onLoadProgress = useCallback((e) => {
        const {total, loaded} = e;
        const progressProc = ((loaded / total) * 100).toFixed(0);
        setLoading(progressProc);
    }, [])

    const startReading = (file) => {
        if (!file) throw new Error('provide a file');

        reader.readAsDataURL(file);
        reader.onloadstart = onLoadStart;
        reader.onloadend = onLoadEnd;
        reader.onload = onLoadSuccess;
        reader.onprogress = onLoadProgress;
    }


    return {loading, fileUrl, isLoading}
}

export default useFileReader;