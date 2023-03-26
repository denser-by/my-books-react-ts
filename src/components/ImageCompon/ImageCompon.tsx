import React from 'react';
import './imagecompon.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';

type ImageComponProps = {
    onImagePathChange: (value: ImageListType, addUpdatedIndex?: Array<number>) => void;
    placeholderText: string;
    imageSource: string;
    viewOnly: boolean;
};

function ImageEditCompon({ onImagePathChange, placeholderText, imageSource, viewOnly }: ImageComponProps) {

    const [imageStore, setImageStore] = React.useState([]);

    return (
        <span className={!viewOnly ? "imageComponFrame" : "ctrlHidden"}>
            <ImageUploading
                multiple
                onChange={onImagePathChange}
                value={imageStore}
                maxNumber={1}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <img className="imageComponCtrl" onClick={onImageUpload} alt={placeholderText} src={imageSource} />
                )}
            </ImageUploading>
        </span>
    );
}

function ImageViewCompon({ onImagePathChange, placeholderText, imageSource, viewOnly }: ImageComponProps) {
    return (
        <span className={viewOnly ? "imageComponFrame" : "ctrlHidden"}>
            <img className="imageComponCtrl" alt={placeholderText} src={imageSource} />
        </span>
    );
}

function ImageCompon({ onImagePathChange, placeholderText, imageSource, viewOnly }: ImageComponProps) {

    return (
        <span className='imageComponBoth'>
            <ImageEditCompon onImagePathChange={onImagePathChange} placeholderText={placeholderText}
                imageSource={imageSource} viewOnly={viewOnly} />
            <ImageViewCompon onImagePathChange={onImagePathChange} placeholderText={placeholderText}
                imageSource={imageSource} viewOnly={viewOnly} />
        </span>
    );
}

export default ImageCompon;