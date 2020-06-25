const AUDIO = [
    "test.mp3",
    "test1.mp3"
];

const audio_files = {};

const downloadAudioFiles = Promise.all(AUDIO.map(downloadAudio));

function downloadAudio(assetName) {
    console.log(assetName);
    return new Promise(resolve => {
        const asset = new Audio(`/audio/${assetName}`);

        
        asset.addEventListener("canplay", () => {
            console.log(`Downloaded ${assetName}`);
            audio_files[assetName] = asset;
            resolve();
        });
        console.log(asset);
        
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


export const downloadAssets = async () => {
    await downloadAudioFiles;
    await downloadImageFiles;
};