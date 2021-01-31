import {useRef} from 'react';

import useDrop from "../hooks/useDrop";
import useFileReader from "../hooks/useFileReader";

import '../assets/styles/DropZone.css'

const DropZone = () => {
    const ref = useRef();

    const {file, active} = useDrop(ref);
    const {fileUrl, loading, isLoading} = useFileReader(file);

    return (
        <div>
            <input id='upload' type="file" className='hidden'/>
            <div ref={ref}
                 className={`drop__area ${active ? 'drop__area--active' : ''} `}>
                {isLoading ? 'uploading...' : 'drop file here or click'}
                <label className={'label'} htmlFor={'upload'}/>
            </div>

            {loading ? <div>{loading}%</div> : null}
            {fileUrl && <div>
                <img className='loaded_image' src={fileUrl} alt=""/>
            </div>}
        </div>
    );
}

export default DropZone;
