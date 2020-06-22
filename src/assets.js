const AUDIO = [
];

const audio_files = {};

const downloadAudioFiles = Promise.all(AUDIO.map(downloadAudio));

function downloadAudio(assetName) {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
        console.log(`Downloaded ${assetName}`);
        audio_files[assetName] = asset;
        resolve();
        };
        asset.src = `/audio/${assetName}`;
    });
}


export const getAudio = assetName => audio_files[assetName];


const Images = [
];

const image_files = {};

const downloadImageFiles = Promise.all(AUDIO.map(downloadImage));

function downloadImage(assetName) {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
            console.log(`Downloaded ${assetName}`);
            image_files[assetName] = asset;
            resolve();
        };
        asset.src = `/images/${assetName}`;
    });
};


export const downloadAssets = () => Promise.all([
    downloadAudioFiles,
    downloadImageFiles
]);