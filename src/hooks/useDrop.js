import {useEffect, useState, useCallback} from 'react';

const eventsToPrevent = ['drop', 'dragover'];
const eventsStatus = ['dragenter', 'dragleave'];
const dropEvent = ['drop'];

const useDrop = (ref) => {
    const [file, setFile] = useState(null);
    const [active, setActive] = useState(false);

    const prevent = useCallback((e) => e.preventDefault(), []);
    const drop = useCallback(e => {
        const [droppedFile] = e.dataTransfer?.files;
        setFile(droppedFile);
        setActive(false)
    }, []);
    const setStatus = useCallback((event) => () => {
        if (event.includes('dragenter')) {
            setActive(true)
        } else {
            setActive(false);
        }
    }, []);


    useEffect(() => {
            if (ref && ref.current) {
                const {current} = ref;
                eventsToPrevent.forEach(event => {
                    current.addEventListener(event, prevent)
                });
                eventsStatus.forEach(event => {
                    current.addEventListener(event, setStatus(event));
                });
                dropEvent.forEach(event => {
                    current.addEventListener(event, drop)
                })
            }

            return () => {
                const {current} = ref;
                if (current) {
                    eventsToPrevent.forEach(event => {
                        current.removeEventListener(event, prevent)
                    });
                    eventsStatus.forEach(event => {
                        current.removeEventListener(event, setStatus(event))
                    });
                    dropEvent.forEach(event => {
                        current.removeEventListener(event, drop)
                    });
                }
            }
        },
        [ref && ref.current]
    );


    return {file, active}
};

export default useDrop;